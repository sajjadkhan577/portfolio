import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
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
  SiteSettings,
  Testimonial,
} from '../data/initialData';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// Check if valid live Supabase credentials are configured
export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  !SUPABASE_URL.includes('your-project-id') &&
  SUPABASE_SERVICE_ROLE_KEY &&
  !SUPABASE_SERVICE_ROLE_KEY.includes('your-supabase')
);

// Admin-level Supabase client (Bypasses RLS for server-validated actions & audit)
export const supabaseAdmin: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    })
  : null;

// Public-level Supabase client (Adheres strictly to RLS)
export const supabasePublic: SupabaseClient | null = (isSupabaseConfigured && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL!, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    })
  : null;

/**
 * High-reliability in-memory fallback store
 * Guarantees that the portfolio works smoothly even before Supabase credentials are wired.
 */
class MemoryDatabase {
  public siteSettings: SiteSettings = { ...initialSiteSettings };
  public services: Service[] = [...initialServices];
  public projects: Project[] = [...initialProjects];
  public testimonials: Testimonial[] = [...initialTestimonials];
  public faqs: FAQ[] = [...initialFAQs];
  public messages: MessageLead[] = [
    {
      id: 'demo-msg-1',
      name: 'Sarah Jenkins',
      email: 'sarah@apexcoaching.io',
      project_type: 'Coach & Consultant Websites',
      budget: '$3,000 - $5,000',
      message: 'Hi Sajjad, looking to redesign my executive coaching funnel with automated Calendly booking and email lead capture.',
      status: 'new',
      notes: 'Initial outreach from LinkedIn. High intent.',
      deal_value: 3500,
      follow_up_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'demo-msg-2',
      name: 'Marcus Vance',
      email: 'marcus@academyhub.net',
      project_type: 'Online Course Platforms (LMS)',
      budget: '$5,000+',
      message: 'Need a custom LMS built on PHP/MySQL with student portal and manual bank transfer receipt verification for our cohorts.',
      status: 'proposal_sent',
      notes: 'Sent formal proposal on Tuesday. Awaiting cohort budget sign-off.',
      deal_value: 5200,
      follow_up_date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Overdue for demo demonstration
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
  public auditLogs: Array<{
    id: string;
    user_email: string;
    action: string;
    entity: string;
    entity_id?: string;
    details: Record<string, unknown>;
    created_at: string;
  }> = [
    {
      id: 'audit-init-1',
      user_email: 'sajjad2003khan@gmail.com',
      action: 'SYSTEM_INITIALIZE',
      entity: 'database',
      details: { status: 'Platform operational with verified data schema' },
      created_at: new Date().toISOString(),
    },
  ];
}

export const memoryDb = new MemoryDatabase();
