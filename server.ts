import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { z } from 'zod';
import {
  FAQ,
  initialFAQs,
  initialProjects,
  initialServices,
  initialSiteSettings,
  initialTestimonials,
  MessageLead,
  Project,
  Service,
  Testimonial,
} from './src/data/initialData';
import { logAdminAction } from './src/server/audit';
import {
  authenticateAdmin,
  generateAdminSessionToken,
  requireAdmin,
  verifyAdminSessionToken,
} from './src/server/auth';
import { isSupabaseConfigured, memoryDb, supabaseAdmin } from './src/server/db';
import { sendLeadNotification } from './src/server/email';
import { checkRateLimit, getClientIp } from './src/server/rateLimit';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

// Body Parser with strict payload limit (protect against DoS)
app.use(express.json({ limit: '6mb' }));
app.use(express.urlencoded({ extended: true, limit: '6mb' }));

// 1. Strict Security Headers
app.use((_req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https: wss: ws: http:",
      "frame-src 'self' https://challenges.cloudflare.com",
      "object-src 'none'",
      "base-uri 'self'",
    ].join('; ')
  );
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// ==============================================================================
// PUBLIC API ROUTES
// ==============================================================================

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    supabaseConnected: isSupabaseConfigured,
  });
});

// Contact Form Zod Schema
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(150),
  project_type: z.string().trim().min(1, 'Please select a project type'),
  budget: z.string().trim().optional(),
  message: z.string().trim().min(15, 'Please provide a message of at least 15 characters').max(3000),
  // Honeypot field (hidden in UI; bots usually fill it)
  website: z.string().optional(),
  // Cloudflare Turnstile token
  turnstileToken: z.string().optional(),
});

// Contact Route: Rate limited, Zod validated, honeypot protected, email notified
app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
  try {
    const clientIp = getClientIp(req);

    // 1. IP Rate Limiting: 5 requests per 15 minutes
    const rateCheck = checkRateLimit(clientIp, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      res.status(429).json({
        success: false,
        error: `Too many submissions from your connection. Please retry in ${rateCheck.resetInSec} seconds.`,
      });
      return;
    }

    // 2. Validate input schema
    const parseResult = contactSchema.safeParse(req.body);
    if (!parseResult.success) {
      const issue = parseResult.error.issues[0]?.message || 'Invalid form input.';
      res.status(400).json({ success: false, error: issue });
      return;
    }

    const { name, email, project_type, budget, message, website, turnstileToken } = parseResult.data;

    // 3. Honeypot Bot Trap: If "website" is filled out, reject quietly without error details
    if (website && website.trim().length > 0) {
      res.json({ success: true, message: 'Message received.' });
      return;
    }

    // 4. Cloudflare Turnstile Verification (if enabled)
    if (process.env.ENABLE_TURNSTILE === 'true' && process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        res.status(400).json({ success: false, error: 'Spam verification token required.' });
        return;
      }
      try {
        const turnstileResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
            response: turnstileToken,
            remoteip: clientIp,
          }),
        });
        const turnstileData = (await turnstileResp.json()) as { success: boolean };
        if (!turnstileData.success) {
          res.status(400).json({ success: false, error: 'Anti-spam check failed. Please refresh and try again.' });
          return;
        }
      } catch (err) {
        console.warn('Turnstile verification error:', err);
      }
    }

    // 5. Persist to Database (Supabase or memoryDb)
    const newLead: MessageLead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name,
      email,
      project_type,
      budget: budget || 'Not specified',
      message,
      status: 'new',
      notes: '',
      deal_value: 0,
      ip_address: clientIp,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (supabaseAdmin) {
      try {
        const { data: inserted, error: dbError } = await supabaseAdmin
          .from('messages')
          .insert({
            name,
            email,
            project_type,
            budget: budget || 'Not specified',
            message,
            status: 'new',
            ip_address: clientIp,
          })
          .select()
          .maybeSingle();

        if (dbError) {
          console.warn('Supabase message insert warning:', dbError.message);
          memoryDb.messages.unshift(newLead);
          saveDiskLead(newLead);
        } else if (inserted) {
          const persisted = {
            ...newLead,
            id: inserted.id,
            created_at: inserted.created_at || newLead.created_at,
            updated_at: inserted.updated_at || newLead.updated_at,
          };
          memoryDb.messages.unshift(persisted);
          saveDiskLead(persisted);
        } else {
          memoryDb.messages.unshift(newLead);
          saveDiskLead(newLead);
        }
      } catch (err) {
        console.warn('Supabase message insert exception:', err);
        memoryDb.messages.unshift(newLead);
        saveDiskLead(newLead);
      }
    } else {
      memoryDb.messages.unshift(newLead);
      saveDiskLead(newLead);
    }

    // 6. Send Email Notification
    sendLeadNotification({
      name,
      email,
      projectType: project_type,
      budget,
      message,
    }).catch((err) => console.warn('Email dispatch warning:', err));

    // 7. Safe visitor response (no internal details exposed)
    res.json({
      success: true,
      message: 'Thank you for reaching out! Sajjad will review your details and respond within 24 hours.',
    });
  } catch (err) {
    console.error('Contact endpoint internal error:', err);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while sending your message. Please email directly at sajjad2003khan@gmail.com.',
    });
  }
});

// Public Site Settings (handles both /api/settings and /api/site-settings)
const getSiteSettingsHandler = async (_req: Request, res: Response) => {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (!error && data) {
        const merged = {
          ...memoryDb.siteSettings,
          ...data,
          whatsapp: data.whatsapp && !data.whatsapp.includes('[') ? data.whatsapp : memoryDb.siteSettings.whatsapp,
        };
        res.json(merged);
        return;
      }
    } catch (err) {
      console.warn('Supabase site_settings query error, using fallback:', err);
    }
  }
  res.json(memoryDb.siteSettings);
};

app.get('/api/site-settings', getSiteSettingsHandler);
app.get('/api/settings', getSiteSettingsHandler);

// Public Services
app.get('/api/services', async (_req, res) => {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    if (!error && data) {
      res.json(data);
      return;
    }
  }
  res.json(memoryDb.services.filter((s) => s.published).sort((a, b) => a.sort_order - b.sort_order));
});

// Public Projects
app.get('/api/projects', async (_req, res) => {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    if (!error && data) {
      res.json(data);
      return;
    }
  }
  res.json(memoryDb.projects.filter((p) => p.published).sort((a, b) => a.sort_order - b.sort_order));
});

// Public Single Project Case Study
app.get('/api/projects/:slug', async (req, res): Promise<void> => {
  const { slug } = req.params;
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    if (!error && data) {
      res.json(data);
      return;
    }
  }
  const match = memoryDb.projects.find((p) => p.slug === slug && p.published);
  if (!match) {
    res.status(404).json({ error: 'Project not found or unpublished.' });
    return;
  }
  res.json(match);
});

// Public Testimonials
app.get('/api/testimonials', async (_req, res) => {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('testimonials')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) {
        // Only return Supabase data if it has real quotes and not old placeholders
        const hasPlaceholders = data.some(
          (t) =>
            t.quote?.includes('[paste') ||
            t.quote?.includes('[client') ||
            t.author_name?.includes('[name')
        );
        if (!hasPlaceholders) {
          res.json(data);
          return;
        }
      }
    } catch (err) {
      console.warn('Supabase testimonials query error:', err);
    }
  }
  res.json(memoryDb.testimonials.filter((t) => t.published).sort((a, b) => a.sort_order - b.sort_order));
});
// Public FAQs
app.get('/api/faqs', async (_req, res) => {
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('faqs')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    if (!error && data) {
      res.json(data);
      return;
    }
  }
  res.json(memoryDb.faqs.filter((f) => f.published).sort((a, b) => a.sort_order - b.sort_order));
});

// ==============================================================================
// SEO SITEMAP & ROBOTS.TXT ROUTES (DYNAMIC FROM DATABASE)
// ==============================================================================

app.get('/sitemap.xml', async (req, res): Promise<void> => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'sajjadkhan.dev';
  const baseUrl = process.env.APP_URL ? process.env.APP_URL.replace(/\/$/, '') : `${protocol}://${host}`;

  let projectsList = memoryDb.projects.filter((p) => p.published);
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from('projects')
      .select('slug, updated_at')
      .eq('published', true);
    if (data && data.length > 0) projectsList = data as any;
  }

  const currentDate = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/work</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ${projectsList
    .map(
      (p) => `  <url>
    <loc>${baseUrl}/work/${p.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

app.get('/robots.txt', (req, res): void => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'sajjadkhan.dev';
  const baseUrl = process.env.APP_URL ? process.env.APP_URL.replace(/\/$/, '') : `${protocol}://${host}`;

  res.header('Content-Type', 'text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin
Disallow: /api/contact

Sitemap: ${baseUrl}/sitemap.xml
`);
});

// ==============================================================================
// ADMIN AUTHENTICATION ROUTES
// ==============================================================================

// Admin Login
app.post('/api/admin/login', async (req, res): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const isValid = await authenticateAdmin(email, password);
  if (!isValid) {
    res.status(401).json({ error: 'Invalid admin credentials or unauthorized account.' });
    return;
  }

  const token = generateAdminSessionToken(email.toLowerCase());
  await logAdminAction({
    userEmail: email,
    action: 'ADMIN_LOGIN',
    entity: 'auth',
    details: { ip: getClientIp(req) },
  });

  res.json({
    success: true,
    token,
    user: { email: email.toLowerCase() },
  });
});

// Admin Session Verification
app.get('/api/admin/session', (req, res): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ authenticated: false });
    return;
  }
  const token = authHeader.substring(7);
  const session = verifyAdminSessionToken(token);
  if (!session) {
    res.status(401).json({ authenticated: false });
    return;
  }
  res.json({ authenticated: true, user: { email: session.email } });
});

// ==============================================================================
// PROTECTED ADMIN MANAGEMENT ROUTES (requireAdmin)
// ==============================================================================

// Persistent file storage fallback for leads (protects across dev server reloads)
const LEADS_STORAGE_FILE = path.join(process.cwd(), 'leads-storage.json');

function loadDiskLeads(): MessageLead[] {
  try {
    if (fs.existsSync(LEADS_STORAGE_FILE)) {
      const content = fs.readFileSync(LEADS_STORAGE_FILE, 'utf8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('Could not read disk leads:', err);
  }
  return [];
}

function saveDiskLead(lead: MessageLead): void {
  try {
    const list = loadDiskLeads();
    const updated = [lead, ...list.filter((l) => l.id !== lead.id)];
    fs.writeFileSync(LEADS_STORAGE_FILE, JSON.stringify(updated, null, 2), 'utf8');
  } catch (err) {
    console.warn('Could not persist lead to disk:', err);
  }
}

// Helper to get all combined leads (disk backup + memoryDb + Supabase)
async function getCombinedLeads(): Promise<MessageLead[]> {
  const map = new Map<string, MessageLead>();

  // 1. Load from disk backup first (persists even if dev server restarts)
  for (const d of loadDiskLeads()) {
    if (d && d.id) {
      map.set(d.id, d);
    }
  }

  // 2. Load memory leads
  for (const m of memoryDb.messages) {
    if (m && m.id) {
      map.set(m.id, m);
    }
  }

  // 3. Overlay with Supabase leads if available
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        for (const row of data) {
          if (row && row.id) {
            map.set(row.id, row as MessageLead);
          }
        }
      }
    } catch (err) {
      console.warn('Supabase fetch messages warning:', err);
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
  );
}

// Dashboard Overview Metrics
app.get('/api/admin/stats', requireAdmin, async (_req, res) => {
  const messages = await getCombinedLeads();

  const newCount = messages.filter((m) => m.status === 'new').length;
  const contactedCount = messages.filter((m) => m.status === 'contacted').length;
  const proposalCount = messages.filter((m) => m.status === 'proposal_sent').length;
  const wonCount = messages.filter((m) => m.status === 'won').length;
  const lostCount = messages.filter((m) => m.status === 'lost').length;

  const totalValue = messages.reduce((acc, m) => acc + (Number(m.deal_value) || 0), 0);
  const today = new Date().toISOString().split('T')[0];
  const overdueFollowUps = messages.filter(
    (m) => m.follow_up_date && m.follow_up_date < today && m.status !== 'won' && m.status !== 'lost'
  ).length;

  res.json({
    messages: {
      total: messages.length,
      new: newCount,
      contacted: contactedCount,
      proposal_sent: proposalCount,
      won: wonCount,
      lost: lostCount,
      pipelineValue: totalValue,
      overdueFollowUps,
    },
    counts: {
      projects: memoryDb.projects.length,
      publishedProjects: memoryDb.projects.filter((p) => p.published).length,
      services: memoryDb.services.length,
      testimonials: memoryDb.testimonials.length,
      faqs: memoryDb.faqs.length,
    },
  });
});

// Messages / Leads List
app.get('/api/admin/messages', requireAdmin, async (req, res) => {
  const { status, search } = req.query;
  let leads = await getCombinedLeads();

  if (status && typeof status === 'string' && status !== 'all') {
    leads = leads.filter((m) => m.status === status);
  }

  if (search && typeof search === 'string' && search.trim()) {
    const q = search.trim().toLowerCase();
    leads = leads.filter(
      (m) =>
        (m.name || '').toLowerCase().includes(q) ||
        (m.email || '').toLowerCase().includes(q) ||
        (m.project_type || '').toLowerCase().includes(q) ||
        (m.message || '').toLowerCase().includes(q)
    );
  }

  res.json(leads);
});

// Messages Status & Notes Update
app.patch('/api/admin/messages/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status, notes, deal_value, follow_up_date } = req.body;

  let updatedLead: MessageLead | null = null;

  if (supabaseAdmin) {
    try {
      const updateData: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };
      if (status !== undefined) updateData.status = status;
      if (notes !== undefined) updateData.notes = notes;
      if (deal_value !== undefined) updateData.deal_value = Number(deal_value) || 0;
      if (follow_up_date !== undefined) updateData.follow_up_date = follow_up_date || null;

      const { data, error } = await supabaseAdmin
        .from('messages')
        .update(updateData)
        .eq('id', id)
        .select()
        .maybeSingle();

      if (!error && data) {
        updatedLead = data as MessageLead;
      }
    } catch (err) {
      console.warn('Supabase patch message warning:', err);
    }
  }

  const leadIndex = memoryDb.messages.findIndex((m) => m.id === id);
  if (leadIndex !== -1) {
    const updated = {
      ...memoryDb.messages[leadIndex],
      ...(status && { status }),
      ...(notes !== undefined && { notes }),
      ...(deal_value !== undefined && { deal_value: Number(deal_value) || 0 }),
      ...(follow_up_date !== undefined && { follow_up_date }),
      updated_at: new Date().toISOString(),
    };
    memoryDb.messages[leadIndex] = updated;
    if (!updatedLead) updatedLead = updated;
  }

  if (!updatedLead) {
    res.status(404).json({ error: 'Message lead not found' });
    return;
  }

  const adminEmail = (req as Request & { adminUser?: { email: string } }).adminUser?.email || 'admin';
  await logAdminAction({
    userEmail: adminEmail,
    action: 'UPDATE_LEAD',
    entity: 'messages',
    entityId: id,
    details: { status, deal_value },
  });

  res.json(updatedLead);
});

// Messages Delete
app.delete('/api/admin/messages/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  memoryDb.messages = memoryDb.messages.filter((m) => m.id !== id);

  if (supabaseAdmin) {
    try {
      await supabaseAdmin.from('messages').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete message warning:', err);
    }
  }

  const adminEmail = (req as Request & { adminUser?: { email: string } }).adminUser?.email || 'admin';
  await logAdminAction({
    userEmail: adminEmail,
    action: 'DELETE_LEAD',
    entity: 'messages',
    entityId: id,
  });

  res.json({ success: true });
});

// Export Leads to CSV
app.get('/api/admin/messages/export', requireAdmin, async (_req, res) => {
  const leads = memoryDb.messages;
  const header = ['ID', 'Name', 'Email', 'Project Type', 'Budget', 'Status', 'Deal Value', 'Follow Up', 'Created At'];
  const rows = leads.map((l) => [
    l.id,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.email.replace(/"/g, '""')}"`,
    `"${l.project_type.replace(/"/g, '""')}"`,
    `"${(l.budget || '').replace(/"/g, '""')}"`,
    l.status,
    l.deal_value || 0,
    l.follow_up_date || '',
    l.created_at,
  ]);

  const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="leads-export-${new Date().toISOString().split('T')[0]}.csv"`);
  res.send(csv);
});

// Admin Projects CRUD
app.get('/api/admin/projects', requireAdmin, async (_req, res) => {
  res.json(memoryDb.projects.sort((a, b) => a.sort_order - b.sort_order));
});

app.post('/api/admin/projects', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  const body = req.body;
  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const newProject: Project = {
    id: `proj-${Date.now()}`,
    title: body.title,
    slug,
    summary: body.summary || '',
    problem: body.problem || '',
    solution: body.solution || '',
    result: body.result || '',
    tech: Array.isArray(body.tech) ? body.tech : [],
    cover_image_url: body.cover_image_url || '',
    gallery: Array.isArray(body.gallery) ? body.gallery : [],
    live_url: body.live_url || '',
    repo_url: body.repo_url || '',
    client_name: body.client_name || '',
    show_client_name: Boolean(body.show_client_name),
    featured: Boolean(body.featured),
    sort_order: memoryDb.projects.length + 1,
    published: body.published !== false,
  };

  memoryDb.projects.push(newProject);

  // Persist to Supabase when configured (critical for Vercel stateless deployments)
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from('projects').insert({
        title: newProject.title,
        slug: newProject.slug,
        summary: newProject.summary,
        problem: newProject.problem,
        solution: newProject.solution,
        result: newProject.result,
        tech: newProject.tech,
        cover_image_url: newProject.cover_image_url,
        gallery: newProject.gallery,
        live_url: newProject.live_url,
        repo_url: newProject.repo_url,
        client_name: newProject.client_name,
        show_client_name: newProject.show_client_name,
        featured: newProject.featured,
        sort_order: newProject.sort_order,
        published: newProject.published,
      });
      if (error) console.warn('Supabase project insert warning:', error.message);
    } catch (err) {
      console.warn('Supabase project insert exception:', err);
    }
  }

  const adminEmail = (req as Request & { adminUser?: { email: string } }).adminUser?.email || 'admin';
  await logAdminAction({
    userEmail: adminEmail,
    action: 'CREATE_PROJECT',
    entity: 'projects',
    entityId: newProject.id,
    details: { title: newProject.title },
  });

  res.status(201).json(newProject);
});

app.put('/api/admin/projects/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const index = memoryDb.projects.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }

  const updated: Project = {
    ...memoryDb.projects[index],
    ...req.body,
    updated_at: new Date().toISOString(),
  };
  memoryDb.projects[index] = updated;

  // Persist to Supabase when configured
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('projects')
        .update({
          title: updated.title,
          slug: updated.slug,
          summary: updated.summary,
          problem: updated.problem,
          solution: updated.solution,
          result: updated.result,
          tech: updated.tech,
          cover_image_url: updated.cover_image_url,
          gallery: updated.gallery,
          live_url: updated.live_url,
          repo_url: updated.repo_url,
          client_name: updated.client_name,
          show_client_name: updated.show_client_name,
          featured: updated.featured,
          sort_order: updated.sort_order,
          published: updated.published,
        })
        .eq('id', id);
      if (error) console.warn('Supabase project update warning:', error.message);
    } catch (err) {
      console.warn('Supabase project update exception:', err);
    }
  }

  const adminEmail = (req as Request & { adminUser?: { email: string } }).adminUser?.email || 'admin';
  await logAdminAction({
    userEmail: adminEmail,
    action: 'UPDATE_PROJECT',
    entity: 'projects',
    entityId: id,
    details: { title: updated.title },
  });

  res.json(updated);
});

app.delete('/api/admin/projects/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  memoryDb.projects = memoryDb.projects.filter((p) => p.id !== id);

  // Persist to Supabase when configured
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);
      if (error) console.warn('Supabase project delete warning:', error.message);
    } catch (err) {
      console.warn('Supabase project delete exception:', err);
    }
  }

  const adminEmail = (req as Request & { adminUser?: { email: string } }).adminUser?.email || 'admin';
  await logAdminAction({
    userEmail: adminEmail,
    action: 'DELETE_PROJECT',
    entity: 'projects',
    entityId: id,
  });

  res.json({ success: true });
});

// Admin Services CRUD
app.get('/api/admin/services', requireAdmin, async (_req, res) => {
  res.json(memoryDb.services.sort((a, b) => a.sort_order - b.sort_order));
});

app.post('/api/admin/services', requireAdmin, async (req: Request, res: Response) => {
  const newService: Service = {
    id: `srv-${Date.now()}`,
    title: req.body.title,
    description: req.body.description,
    icon: req.body.icon || 'LayoutDashboard',
    sort_order: memoryDb.services.length + 1,
    published: req.body.published !== false,
  };
  memoryDb.services.push(newService);

  // Persist to Supabase when configured
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from('services').insert({
        title: newService.title,
        description: newService.description,
        icon: newService.icon,
        sort_order: newService.sort_order,
        published: newService.published,
      });
      if (error) console.warn('Supabase service insert warning:', error.message);
    } catch (err) {
      console.warn('Supabase service insert exception:', err);
    }
  }

  res.status(201).json(newService);
});

app.put('/api/admin/services/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const index = memoryDb.services.findIndex((s) => s.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Service not found' });
    return;
  }
  memoryDb.services[index] = { ...memoryDb.services[index], ...req.body };

  // Persist to Supabase when configured
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('services')
        .update({
          title: memoryDb.services[index].title,
          description: memoryDb.services[index].description,
          icon: memoryDb.services[index].icon,
          sort_order: memoryDb.services[index].sort_order,
          published: memoryDb.services[index].published,
        })
        .eq('id', id);
      if (error) console.warn('Supabase service update warning:', error.message);
    } catch (err) {
      console.warn('Supabase service update exception:', err);
    }
  }

  res.json(memoryDb.services[index]);
});

app.delete('/api/admin/services/:id', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  memoryDb.services = memoryDb.services.filter((s) => s.id !== id);

  // Persist to Supabase when configured
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from('services').delete().eq('id', id);
      if (error) console.warn('Supabase service delete warning:', error.message);
    } catch (err) {
      console.warn('Supabase service delete exception:', err);
    }
  }

  res.json({ success: true });
});

// Admin Testimonials CRUD
app.get('/api/admin/testimonials', requireAdmin, async (_req, res) => {
  res.json(memoryDb.testimonials.sort((a, b) => a.sort_order - b.sort_order));
});

app.post('/api/admin/testimonials', requireAdmin, async (req: Request, res: Response) => {
  const newTestimonial: Testimonial = {
    id: `tst-${Date.now()}`,
    author_name: req.body.author_name,
    author_role: req.body.author_role,
    quote: req.body.quote,
    avatar_url: req.body.avatar_url || '',
    sort_order: memoryDb.testimonials.length + 1,
    published: req.body.published !== false,
  };
  memoryDb.testimonials.push(newTestimonial);

  // Persist to Supabase when configured
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from('testimonials').insert({
        author_name: newTestimonial.author_name,
        author_role: newTestimonial.author_role,
        quote: newTestimonial.quote,
        avatar_url: newTestimonial.avatar_url,
        sort_order: newTestimonial.sort_order,
        published: newTestimonial.published,
      });
      if (error) console.warn('Supabase testimonial insert warning:', error.message);
    } catch (err) {
      console.warn('Supabase testimonial insert exception:', err);
    }
  }

  res.status(201).json(newTestimonial);
});

app.put('/api/admin/testimonials/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const index = memoryDb.testimonials.findIndex((t) => t.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Testimonial not found' });
    return;
  }
  memoryDb.testimonials[index] = { ...memoryDb.testimonials[index], ...req.body };

  // Persist to Supabase when configured
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('testimonials')
        .update({
          author_name: memoryDb.testimonials[index].author_name,
          author_role: memoryDb.testimonials[index].author_role,
          quote: memoryDb.testimonials[index].quote,
          avatar_url: memoryDb.testimonials[index].avatar_url,
          sort_order: memoryDb.testimonials[index].sort_order,
          published: memoryDb.testimonials[index].published,
        })
        .eq('id', id);
      if (error) console.warn('Supabase testimonial update warning:', error.message);
    } catch (err) {
      console.warn('Supabase testimonial update exception:', err);
    }
  }

  res.json(memoryDb.testimonials[index]);
});

app.delete('/api/admin/testimonials/:id', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  memoryDb.testimonials = memoryDb.testimonials.filter((t) => t.id !== id);

  // Persist to Supabase when configured
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from('testimonials').delete().eq('id', id);
      if (error) console.warn('Supabase testimonial delete warning:', error.message);
    } catch (err) {
      console.warn('Supabase testimonial delete exception:', err);
    }
  }

  res.json({ success: true });
});

// Admin FAQs CRUD
app.get('/api/admin/faqs', requireAdmin, async (_req, res) => {
  res.json(memoryDb.faqs.sort((a, b) => a.sort_order - b.sort_order));
});

app.post('/api/admin/faqs', requireAdmin, async (req: Request, res: Response) => {
  const newFaq: FAQ = {
    id: `faq-${Date.now()}`,
    question: req.body.question,
    answer: req.body.answer,
    sort_order: memoryDb.faqs.length + 1,
    published: req.body.published !== false,
  };
  memoryDb.faqs.push(newFaq);

  // Persist to Supabase when configured
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from('faqs').insert({
        question: newFaq.question,
        answer: newFaq.answer,
        sort_order: newFaq.sort_order,
        published: newFaq.published,
      });
      if (error) console.warn('Supabase faq insert warning:', error.message);
    } catch (err) {
      console.warn('Supabase faq insert exception:', err);
    }
  }

  res.status(201).json(newFaq);
});

app.put('/api/admin/faqs/:id', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const index = memoryDb.faqs.findIndex((f) => f.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'FAQ not found' });
    return;
  }
  memoryDb.faqs[index] = { ...memoryDb.faqs[index], ...req.body };

  // Persist to Supabase when configured
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('faqs')
        .update({
          question: memoryDb.faqs[index].question,
          answer: memoryDb.faqs[index].answer,
          sort_order: memoryDb.faqs[index].sort_order,
          published: memoryDb.faqs[index].published,
        })
        .eq('id', id);
      if (error) console.warn('Supabase faq update warning:', error.message);
    } catch (err) {
      console.warn('Supabase faq update exception:', err);
    }
  }

  res.json(memoryDb.faqs[index]);
});

app.delete('/api/admin/faqs/:id', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  memoryDb.faqs = memoryDb.faqs.filter((f) => f.id !== id);

  // Persist to Supabase when configured
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin.from('faqs').delete().eq('id', id);
      if (error) console.warn('Supabase faq delete warning:', error.message);
    } catch (err) {
      console.warn('Supabase faq delete exception:', err);
    }
  }

  res.json({ success: true });
});

// Admin Site Settings Update (handles both /api/admin/settings and /api/admin/site-settings)
const updateSiteSettingsHandler = async (req: Request, res: Response) => {
  memoryDb.siteSettings = {
    ...memoryDb.siteSettings,
    ...req.body,
    updated_at: new Date().toISOString(),
  };

  if (supabaseAdmin) {
    try {
      const { data: existing } = await supabaseAdmin.from('site_settings').select('id').limit(1).maybeSingle();
      if (existing?.id) {
        await supabaseAdmin.from('site_settings').update({
          hero_headline: memoryDb.siteSettings.hero_headline,
          hero_subheadline: memoryDb.siteSettings.hero_subheadline,
          availability_text: memoryDb.siteSettings.availability_text,
          availability_open: memoryDb.siteSettings.availability_open,
          contact_email: memoryDb.siteSettings.contact_email,
          whatsapp: memoryDb.siteSettings.whatsapp,
          booking_url: memoryDb.siteSettings.booking_url,
          linkedin_url: memoryDb.siteSettings.linkedin_url,
          github_url: memoryDb.siteSettings.github_url,
          fiverr_url: memoryDb.siteSettings.fiverr_url,
          resume_url: memoryDb.siteSettings.resume_url,
          seo_title: memoryDb.siteSettings.seo_title,
          seo_description: memoryDb.siteSettings.seo_description,
          updated_at: new Date().toISOString(),
        }).eq('id', existing.id);
      } else {
        await supabaseAdmin.from('site_settings').insert({
          hero_headline: memoryDb.siteSettings.hero_headline,
          hero_subheadline: memoryDb.siteSettings.hero_subheadline,
          availability_text: memoryDb.siteSettings.availability_text,
          availability_open: memoryDb.siteSettings.availability_open,
          contact_email: memoryDb.siteSettings.contact_email,
          whatsapp: memoryDb.siteSettings.whatsapp,
          booking_url: memoryDb.siteSettings.booking_url,
          linkedin_url: memoryDb.siteSettings.linkedin_url,
          github_url: memoryDb.siteSettings.github_url,
          fiverr_url: memoryDb.siteSettings.fiverr_url,
          resume_url: memoryDb.siteSettings.resume_url,
          seo_title: memoryDb.siteSettings.seo_title,
          seo_description: memoryDb.siteSettings.seo_description,
        });
      }
    } catch (err) {
      console.warn('Supabase site_settings save error:', err);
    }
  }

  const adminEmail = (req as Request & { adminUser?: { email: string } }).adminUser?.email || 'admin';
  await logAdminAction({
    userEmail: adminEmail,
    action: 'UPDATE_SITE_SETTINGS',
    entity: 'site_settings',
  });

  res.json(memoryDb.siteSettings);
};

app.put('/api/admin/site-settings', requireAdmin, updateSiteSettingsHandler);
app.put('/api/admin/settings', requireAdmin, updateSiteSettingsHandler);
app.get('/api/admin/site-settings', requireAdmin, getSiteSettingsHandler);
app.get('/api/admin/settings', requireAdmin, getSiteSettingsHandler);

// Admin Audit Logs View
app.get('/api/admin/audit-logs', requireAdmin, async (_req, res) => {
  res.json(memoryDb.auditLogs);
});

// Admin Asset Upload (Size limit 5MB, strict mime type check)
app.post('/api/admin/upload', requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { dataUrl, filename, mimeType } = req.body;
    if (!dataUrl || !mimeType) {
      res.status(400).json({ error: 'Missing image data or MIME type.' });
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf'];
    if (!allowedTypes.includes(mimeType)) {
      res.status(400).json({ error: 'Invalid file type. Allowed: JPG, PNG, WebP, SVG, PDF.' });
      return;
    }

    // In production with Supabase Storage:
    if (supabaseAdmin) {
      const base64Data = dataUrl.replace(/^data:[^;]+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const cleanName = `${Date.now()}-${(filename || 'upload').replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      const { data, error } = await supabaseAdmin.storage
        .from('portfolio-assets')
        .upload(cleanName, buffer, {
          contentType: mimeType,
          upsert: true,
        });

      if (!error && data) {
        const { data: publicData } = supabaseAdmin.storage
          .from('portfolio-assets')
          .getPublicUrl(cleanName);
        res.json({ url: publicData.publicUrl });
        return;
      }
    }

    // Fallback: return dataUrl directly for zero-dependency instant previews
    res.json({ url: dataUrl });
  } catch (err) {
    console.error('Upload handler error:', err);
    res.status(500).json({ error: 'Failed to process file upload.' });
  }
});

// ==============================================================================
// VITE CLIENT MIDDLEWARE / STATIC ASSETS
// ==============================================================================
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Sajjad Khan Portfolio Server is ready!`);
    console.log(`➜  Local:   http://localhost:${PORT}/`);
    console.log(`➜  Network: http://127.0.0.1:${PORT}/`);
    console.log(`➜  Admin:   http://localhost:${PORT}/admin\n`);
    console.log(`🔒 Supabase Configured: ${isSupabaseConfigured ? 'YES (Live Database)' : 'NO (Using Memory Fallback Store)'}\n`);
  });
}

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  startServer();
}

export default app;
