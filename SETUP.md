# 🚀 Setup Guide: Sajjad Khan's Portfolio & Management Platform

This guide outlines the exact, step-by-step setup to connect this platform to Supabase (PostgreSQL, Auth, Storage, Row Level Security) and configure the backend server.

---

## 1. Supabase Project Setup

1. Go to [https://supabase.com](https://supabase.com) and create a free account or sign in.
2. Click **"New Project"**.
3. Choose a project name (e.g., `sajjad-khan-portfolio`), set a secure database password, and select your preferred region (e.g., Singapore, Frankfurt, or US East).
4. Wait 1–2 minutes for the database cluster to finish provisioning.

---

## 2. Execute SQL Database Migration

1. In your Supabase dashboard, navigate to the **SQL Editor** tab in the left sidebar.
2. Click **"New Query"**.
3. Copy the entire contents of `supabase/migrations/20260924_initial_schema.sql` from this codebase.
4. Paste it into the SQL Editor and click **"Run"** (Ctrl/Cmd + Enter).
5. Verify that all 8 tables and functions are created:
   - `admin_users`
   - `projects`
   - `services`
   - `testimonials`
   - `faqs`
   - `messages`
   - `site_settings`
   - `audit_logs`
   - `portfolio-assets` (Storage bucket)
   - Function `public.is_admin()` and triggers for `updated_at`.

---

## 3. Seed Existing Facts & Initial Content

You can seed the initial data in one of two ways:

### Option A: Via Supabase SQL Editor (Fastest)
1. Open the **SQL Editor** in Supabase.
2. Copy and paste the contents of `supabase/seed.sql`.
3. Click **"Run"**. All default services, real projects with placeholders, FAQs, and site settings will be populated.

### Option B: Via Command Line Script
1. Ensure your `.env` file contains your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
2. Run:
   ```bash
   npx tsx scripts/seed.ts
   ```

---

## 4. Configure Environment Variables

Create a `.env` file in the root directory (based on `.env.example`):

```bash
# Supabase Dashboard > Project Settings > API
SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_ANON_KEY="your-anon-public-key"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"

# Server-only (Never exposed to browser)
SUPABASE_SERVICE_ROLE_KEY="your-service-role-secret-key"

# Admin Authentication
ADMIN_EMAIL="sajjad2003khan@gmail.com"
ADMIN_PASSWORD="ChooseYourSecurePassword123!"
ADMIN_SESSION_SECRET="super-secret-random-32-char-key"

# Email Provider for Contact Inquiries ('console' for testing, or 'nodemailer' / 'resend')
EMAIL_PROVIDER="console"
```

---

## 5. Admin Authentication & RBAC

1. The SQL migration automatically adds `sajjad2003khan@gmail.com` to the `admin_users` allow-list.
2. In Supabase Dashboard > **Authentication** > **Users**, you can also invite or register `sajjad2003khan@gmail.com` with a password.
3. Access the Admin Panel at:
   ```
   http://localhost:3000/admin
   ```
4. Enter your admin email and password. The server validates your session against the `admin_users` database allow-list and issues a secure, signed HTTP cookie/token.
5. All actions performed in the admin panel are logged in the `audit_logs` table.

---

## 6. Storage Bucket Permissions

The migration sets up the `portfolio-assets` bucket:
- **Public Read**: Anyone can view uploaded project screenshots and headshots.
- **Admin Write/Delete**: Restricted exclusively via the `is_admin()` RLS policy.
- Maximum recommended upload size is 5 MB with image resizing performed in the browser before upload.

---

## 7. Running Tests

Run the test suite to verify contact form validation, rate-limiting, and admin security protection:

```bash
npx tsx scripts/test-api.ts
```

This verifies:
- ✅ Zod schema rejection of malformed emails & missing fields
- ✅ Honeypot bot trap detection
- ✅ IP-based rate limiting
- ✅ Admin endpoint authorization barrier (401/403 for unauthorized requests)
- ✅ Audit logging persistence

---

## 8. Development & Deployment

- Start local development server:
  ```bash
  npm run dev
  ```
- Build for production:
  ```bash
  npm run build
  ```
- Start production server:
  ```bash
  npm start
  ```
