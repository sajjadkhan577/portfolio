-- Migration: 20260924_initial_schema.sql
-- Description: Core schema for Sajjad Khan's Portfolio and Client Management Platform
-- Supports: Projects, Services, Testimonials, FAQs, Messages (Leads), Site Settings, Audit Logs, and RLS

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Admin Users Table (Email allow-list for RBAC)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed primary admin email
INSERT INTO public.admin_users (email)
VALUES ('sajjad2003khan@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- Helper function to check if current caller is an authenticated admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        auth.role() = 'authenticated' AND
        (
            auth.jwt() ->> 'email' IN (SELECT email FROM public.admin_users)
            OR auth.jwt() ->> 'email' = 'sajjad2003khan@gmail.com'
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    result TEXT NOT NULL,
    tech TEXT[] NOT NULL DEFAULT '{}',
    cover_image_url TEXT,
    gallery TEXT[] DEFAULT '{}',
    live_url TEXT,
    repo_url TEXT,
    client_name TEXT,
    show_client_name BOOLEAN DEFAULT false NOT NULL,
    featured BOOLEAN DEFAULT false NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL,
    quote TEXT NOT NULL,
    avatar_url TEXT,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Messages (Leads) Table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    project_type TEXT NOT NULL,
    budget TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'contacted', 'proposal_sent', 'won', 'lost')),
    notes TEXT DEFAULT '',
    deal_value NUMERIC(10, 2) DEFAULT 0,
    follow_up_date DATE,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Site Settings Table (Single Row)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hero_headline TEXT NOT NULL,
    hero_subheadline TEXT NOT NULL,
    availability_text TEXT NOT NULL,
    availability_open BOOLEAN DEFAULT true NOT NULL,
    contact_email TEXT NOT NULL,
    whatsapp TEXT,
    booking_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    fiverr_url TEXT,
    resume_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Audit Logs Table (Admin traceability)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email TEXT NOT NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Automatic Updated_At Trigger Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER set_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER set_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER set_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER set_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER set_messages_updated_at BEFORE UPDATE ON public.messages FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER set_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- 11. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on every table
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- PROJECTS POLICIES
-- Public can view published projects
CREATE POLICY "Public can view published projects"
    ON public.projects FOR SELECT
    USING (published = true);

-- Admin can perform all operations on projects
CREATE POLICY "Admins have full access to projects"
    ON public.projects FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- SERVICES POLICIES
CREATE POLICY "Public can view published services"
    ON public.services FOR SELECT
    USING (published = true);

CREATE POLICY "Admins have full access to services"
    ON public.services FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- TESTIMONIALS POLICIES
CREATE POLICY "Public can view published testimonials"
    ON public.testimonials FOR SELECT
    USING (published = true);

CREATE POLICY "Admins have full access to testimonials"
    ON public.testimonials FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- FAQS POLICIES
CREATE POLICY "Public can view published faqs"
    ON public.faqs FOR SELECT
    USING (published = true);

CREATE POLICY "Admins have full access to faqs"
    ON public.faqs FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- SITE SETTINGS POLICIES
CREATE POLICY "Public can view site settings"
    ON public.site_settings FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admins can update site settings"
    ON public.site_settings FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- MESSAGES (LEADS) POLICIES
-- Public cannot read or write messages directly from client (all inserts go through server route with validation)
CREATE POLICY "Admins can view and manage messages"
    ON public.messages FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- AUDIT LOGS POLICIES
CREATE POLICY "Admins can view audit logs"
    ON public.audit_logs FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Admins can insert audit logs"
    ON public.audit_logs FOR INSERT
    WITH CHECK (public.is_admin());

-- 12. STORAGE BUCKET CONFIGURATION (portfolio-assets)
-- Create bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read assets from portfolio-assets
CREATE POLICY "Public read portfolio assets"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'portfolio-assets');

-- Authenticated admins can upload assets
CREATE POLICY "Admin upload portfolio assets"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'portfolio-assets' AND
        public.is_admin()
    );

-- Authenticated admins can delete assets
CREATE POLICY "Admin delete portfolio assets"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'portfolio-assets' AND
        public.is_admin()
    );
