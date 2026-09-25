# Sajjad Khan — Full-Stack Web Developer Portfolio & Platform

> High-performance personal portfolio website and client relationship management (CRM) platform engineered for **Sajjad Khan**, specializing in bespoke web platforms, automated booking funnels, and custom learning management systems (LMS) for coaches, consultants, course creators, and growing businesses.

[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-100%2F100-00e599?style=flat-square&logo=lighthouse)](https://sajjadkhan.dev)
[![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-100%2F100-00e599?style=flat-square)](https://sajjadkhan.dev)
[![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-100%2F100-00e599?style=flat-square)](https://sajjadkhan.dev)
[![Lighthouse SEO](https://img.shields.io/badge/SEO-100%2F100-00e599?style=flat-square)](https://sajjadkhan.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)

---

## 📸 Visual Previews & Screenshots

### Desktop Hero & Procedural 3D Terminal
```
+-----------------------------------------------------------------------------------------+
| [SK] Sajjad Khan • Peshawar & Worldwide Remote     [• AVAILABLE FOR NEW PROJECTS (Q2)]  |
|                                                                                         |
|  I build fast, high-converting websites        +-------------------------------------+  |
|  and platforms for coaches, consultants,       |  [ Three.js Interactive Terminal ]  |  |
|  course creators & small businesses.           |  • Procedural isometric workstation |  |
|                                                |  • Sinusoidal orbital data nodes    |  |
|  [ Book a Free Strategy Call ] [ View Work ]   |  • Capped DPR 1.5 & offscreen pause |  |
|                                                +-------------------------------------+  |
|  PHP • MySQL • React • Node.js • Express • MongoDB • Tailwind CSS • 90+ Speed Guarantee |
+-----------------------------------------------------------------------------------------+
```

### Full-Featured Administrative Control Center (`/admin`)
```
+-----------------------------------------------------------------------------------------+
| [SK] Portfolio Control Center                   [sajjad2003khan@gmail.com] [ Log Out ]  |
| [ Dashboard ] [ Leads & CRM ] [ Projects & Work ] [ Content ] [ Settings ] [ Audit ]   |
|                                                                                         |
| Pipeline Metrics:  [ 5 New Inquiries ]  [ $14,200 Active Pipeline ]  [ 3 Overdue Dates] |
| Lead Record:       • Jane Doe (Course Creator) • Budget: $2,500 - $5,000                |
|                    • Follow-up: 2026-09-28 • Status: [Proposal Sent]                    |
|                    • Actions: [Update Status] [Log Notes] [Export Leads to CSV]         |
+-----------------------------------------------------------------------------------------+
```

---

## ✨ Key Architectural Features

### 1. High-Performance Frontend
- **Design System:** Custom obsidian dark-first palette (`#0a0e17` deep slate, `#111827` card surface, `#00e599` electric emerald) with fluid light mode toggle.
- **Typography Scale:** Plus Jakarta Sans for impactful display headings, Inter for high-legibility copy, and JetBrains Mono for code badges and timestamps.
- **Procedural 3D Hero Hub:** Procedural Three.js workstation featuring orbiting code nodes. Automatically falls back to a lightweight CSS/SVG schematic on mobile devices (`<768px`) or when `prefers-reduced-motion` is detected.
- **Case Study Modal & Routing:** Deep-linkable project case studies (`/work/:slug`) with problem, solution, architecture breakdown, live demo links, and client confidentiality toggles.
- **Resilient Fallback:** Automatically operates in hybrid mode with instant in-memory data if Supabase keys are not present.

### 2. Dual-Path Lead Generation & Contact Funnel
- **Direct Scheduling:** One-click integration with Calendly / Cal.com for booking discovery calls.
- **Inquiry Engine:** Project category dropdown, budget tier selection, and comprehensive requirement text areas.
- **Multi-Layered Spam Defense:** Zero-overhead honeypot trap, sliding-window IP rate limiting, and optional Cloudflare Turnstile CAPTCHA.
- **Automated Dispatch:** Form submissions trigger email alerts via Resend or SMTP Nodemailer.
- **Privacy Guarantee:** Strict client data confidentiality pledge displayed directly under the inquiry form.

### 3. Production SEO & Discoverability
- **Dynamic Meta Tags:** Per-page `<title>`, `<meta name="description">`, and canonical URL synchronization.
- **OpenGraph & Twitter Cards:** Default 1200x630px social banner generated and linked (`/og-image.png`).
- **Dynamic XML Sitemap:** Server endpoint (`/sitemap.xml`) dynamically queries all published case studies from the database.
- **Robots Directives:** `/robots.txt` route permitting search crawlers while protecting `/admin` and private endpoints.
- **Schema.org Structured Data:** Valid JSON-LD graph defining `Person` and `ProfessionalService` entities for rich Google search snippets.

### 4. Admin Control Center (`/admin`)
- **Protected Authentication:** Secured via email allow-list check (`sajjad2003khan@gmail.com`) and signed HMAC-SHA256 session tokens.
- **Leads & Pipeline CRM:** Filter inquiries by status (`new`, `contacted`, `proposal_sent`, `won`, `lost`), track deal values, highlight overdue follow-up dates, record private client discussion notes, and download 1-click CSV reports.
- **Project CMS:** Create, edit, and delete projects with auto slug generation, live demo URLs, confidentiality toggles, and client-side HTML5 Canvas image compression (<500 KB WebP).
- **Global Settings & Content:** Modify hero headlines, availability badge status, booking URLs, WhatsApp number, services, testimonials, and FAQs on the fly.
- **Security Audit Trail:** Immutable log of all administrative actions with timestamp, admin email, and client IP.

### 5. Production Reliability & Monitoring
- **Error Boundary:** Top-level React error boundary catches unexpected runtime errors and presents friendly recovery actions.
- **Custom 404 Page:** Themed missing-route screen with return navigation.
- **Vercel Analytics & Speed Insights:** Cleanly integrated behind an optional environment variable flag (`VITE_ENABLE_VERCEL_ANALYTICS="true"`).

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript |
| **Build & Tooling** | Vite 8, Rollup Manual Chunks, TSX |
| **Styling & Icons** | Tailwind CSS v4, Lucide React |
| **Motion & 3D** | Three.js (Procedural Canvas), Motion |
| **Backend & API** | Node.js, Express, Zod Validation |
| **Database & Auth** | Supabase (PostgreSQL with Row-Level Security) / Memory fallback |
| **Email Delivery** | Resend API or SMTP via Nodemailer |
| **Security** | Helmet-style CSP, X-Frame-Options, Rate Limiting, Honeypot |

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- Node.js `20.x` or later
- npm `10.x` or later

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/sajjadkhan577/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### 3. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env
```
*(Review the Environment Variables table below to customize your credentials).*

### 4. Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### 5. Run Quality & Security Audits
```bash
# Typecheck codebase
npm run lint

# Run security test suite (contact validation, honeypot, rate limiting, auth)
npm test

# Run Lighthouse & Core Web Vitals audit
npx tsx scripts/audit-lighthouse.ts

# Production build check
npm run build
```

---

## 🔐 Environment Variables

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Local web server port | `3000` |
| `NODE_ENV` | Application environment mode | `development` or `production` |
| `APP_URL` | Canonical public URL used for SEO & sitemaps | `https://sajjadkhan.dev` |
| `SUPABASE_URL` | Supabase project endpoint | `https://your-project.supabase.co` |
| `SUPABASE_ANON_KEY` | Public Supabase anonymous client key | `eyJhbG...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only secret service role key (Never expose in browser) | `eyJhbG...` |
| `ADMIN_EMAIL` | Authorized administrator email address | `sajjad2003khan@gmail.com` |
| `ADMIN_PASSWORD` | Password for accessing the `/admin` portal | Secure password string |
| `ADMIN_SESSION_SECRET` | Secret key for signing HMAC-SHA256 session tokens | 32+ character random string |
| `EMAIL_PROVIDER` | Notification transport (`console`, `resend`, `nodemailer`) | `console` (dev) / `resend` (prod) |
| `RESEND_API_KEY` | Resend API token for instant lead notifications | `re_123456789` |
| `NOTIFICATION_TO_EMAIL` | Destination inbox for client lead notifications | `sajjad2003khan@gmail.com` |
| `NOTIFICATION_FROM_EMAIL` | Verified sender email address | `onboarding@resend.dev` |
| `SMTP_HOST` | Custom SMTP host (if using nodemailer) | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username | `sajjad2003khan@gmail.com` |
| `SMTP_PASS` | SMTP application password | `xxxx xxxx xxxx xxxx` |
| `ENABLE_TURNSTILE` | Toggle Cloudflare Turnstile anti-bot verification | `false` |
| `VITE_ENABLE_VERCEL_ANALYTICS` | Toggle Vercel Analytics and Speed Insights | `false` |

---

## 🗄️ Database Setup (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** tab in your Supabase dashboard.
3. Paste the contents of `supabase/migrations/20260924_initial_schema.sql` and click **Run**.
4. The script provisions:
   - All database tables with UUID primary keys and timestamps.
   - Row-Level Security (RLS) policies allowing public read of published content while restricting write access to the verified admin.
   - The default administrator record in `admin_users`.
   - Seed data for projects, services, testimonials, and site settings.
5. In **Storage**, create a public bucket named `portfolio-assets` for project screenshots and image attachments.

---

## 📄 License & Attribution
Designed and built for **Sajjad Khan**. Code licensed under the [Apache 2.0 License](LICENSE).
