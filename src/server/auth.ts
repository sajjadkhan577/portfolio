import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { supabaseAdmin } from './db';

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'sajjad2003khan@gmail.com').replace(/['"]/g, '').trim();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'sajjad_admin_2026!').replace(/['"]/g, '').trim();
const SESSION_SECRET = (process.env.ADMIN_SESSION_SECRET || 'sajjad-khan-portfolio-secure-session-key-999').replace(/['"]/g, '').trim();

export interface AdminSession {
  email: string;
  issuedAt: number;
  expiresAt: number;
}

/**
 * Generate a signed session token: base64(payload).signature
 */
export function generateAdminSessionToken(email: string): string {
  const payload: AdminSession = {
    email: email.trim().toLowerCase(),
    issuedAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days validity
  };
  const json = JSON.stringify(payload);
  const encoded = Buffer.from(json).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encoded)
    .digest('base64url');
  return `${encoded}.${signature}`;
}

/**
 * Verify and decode session token
 */
export function verifyAdminSessionToken(token: string): AdminSession | null {
  try {
    if (!token || !token.includes('.')) return null;
    const [encoded, signature] = token.split('.');
    const expectedSig = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(encoded)
      .digest('base64url');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    const json = Buffer.from(encoded, 'base64url').toString('utf8');
    const session: AdminSession = JSON.parse(json);

    if (Date.now() > session.expiresAt) {
      return null;
    }

    // Verify against allowed admin email list (case-insensitive & trimmed)
    const sessionEmail = (session.email || '').trim().toLowerCase();
    const adminEmail = ADMIN_EMAIL.toLowerCase();

    if (sessionEmail !== adminEmail && sessionEmail !== 'sajjad2003khan@gmail.com') {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Express middleware to strictly require valid admin session
 */
export async function requireAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  const cookieHeader = req.headers.cookie;

  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (cookieHeader) {
    const match = cookieHeader.match(/admin_session=([^;]+)/);
    if (match) token = match[1].trim();
  }

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: Admin authentication token required.' });
    return;
  }

  const session = verifyAdminSessionToken(token);
  if (!session) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired admin session. Please log in again.' });
    return;
  }

  // Attach verified admin to request
  (req as Request & { adminUser?: AdminSession }).adminUser = session;
  next();
}

/**
 * Validate credentials against allow-list and password
 */
export async function authenticateAdmin(email: string, passwordAttempt: string): Promise<boolean> {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanAdmin = ADMIN_EMAIL.toLowerCase();

  // Allow primary admin email, configured email, or 'admin'
  const isEmailAllowed =
    cleanEmail === cleanAdmin ||
    cleanEmail === 'sajjad2003khan@gmail.com' ||
    cleanEmail === 'admin';

  if (!isEmailAllowed) {
    console.warn(`[Admin Login Failed] Unrecognized email: "${cleanEmail}" (Allowed: "${cleanAdmin}")`);
    return false;
  }

  // Passwords allowed: current env ADMIN_PASSWORD, default 'sajjad_admin_2026!', or 'change_this_to_a_secure_admin_password_123'
  const cleanAttempt = (passwordAttempt || '').replace(/['"]/g, '').trim();
  const validPasswords = Array.from(
    new Set([
      ADMIN_PASSWORD.replace(/['"]/g, '').trim(),
      'sajjad_admin_2026!',
      'change_this_to_a_secure_admin_password_123',
    ].filter(Boolean))
  );

  const matched = validPasswords.some((validPass) => cleanAttempt === validPass);

  if (!matched) {
    console.warn(`[Admin Login Failed] Password mismatch for ${cleanEmail}. Make sure you are using "sajjad_admin_2026!" or your .env ADMIN_PASSWORD.`);
    return false;
  }

  console.log(`[Admin Login Succeeded] Welcome Sajjad Khan (${cleanEmail})`);
  return true;
}
