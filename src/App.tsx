/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useState } from 'react';
import {
  initialProjects,
  initialServices,
  initialTestimonials,
  initialFaqs,
  initialSettings,
  Project,
  Service,
  Testimonial,
  FAQ,
  SiteSettings,
} from './data/initialData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { TrustStrip } from './components/home/TrustStrip';
import { ServicesSection } from './components/home/ServicesSection';
import { FeaturedProjectsSection } from './components/home/FeaturedProjectsSection';
import { ProcessSection } from './components/home/ProcessSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { AboutSection } from './components/home/AboutSection';
import { FAQSection } from './components/home/FAQSection';
import { ContactSection } from './components/home/ContactSection';
import { WorkPage } from './components/work/WorkPage';
import { CaseStudyModal } from './components/work/CaseStudyModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { VercelAnalytics } from './components/analytics/VercelAnalytics';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('site_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Dynamic state loaded from backend API (with resilient instant fallback)
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);

  // Selected case study modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Admin session state
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('admin_token'));
  const [adminEmail, setAdminEmail] = useState<string>('sajjad2003khan@gmail.com');

  // Validate admin token with server (resilient against network hiccups and static deployments)
  useEffect(() => {
    if (!adminToken) return;

    let isMounted = true;
    const checkSession = async () => {
      try {
        const res = await fetch('/api/admin/session', {
          headers: { Authorization: `Bearer ${adminToken}` },
        });

        const contentType = res.headers.get('content-type') || '';

        // Only log out if the backend explicitly returned a 401 with authenticated: false
        if (res.status === 401 && contentType.includes('application/json')) {
          const data = await res.json().catch(() => null);
          if (data && data.authenticated === false) {
            if (isMounted) {
              localStorage.removeItem('admin_token');
              setAdminToken(null);
            }
            return;
          }
        }

        if (res.ok && contentType.includes('application/json')) {
          const data = await res.json().catch(() => null);
          if (isMounted && data?.user?.email) {
            setAdminEmail(data.user.email);
          }
        }
      } catch {
        // Network offline, Vercel static rewrites, etc. -> preserve active local session
      }
    };

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [adminToken]);

  // Handle browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      const hash = window.location.hash.replace('#', '');

      if (path === '/services' || hash === 'services') {
        setCurrentPath('/');
        setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100);
        return;
      }
      if (path === '/process' || hash === 'process') {
        setCurrentPath('/');
        setTimeout(() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' }), 100);
        return;
      }
      if (path === '/faq' || path === '/faqs' || hash === 'faq') {
        setCurrentPath('/');
        setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100);
        return;
      }
      if (path === '/about' || hash === 'about') {
        setCurrentPath('/');
        setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
        return;
      }

      setCurrentPath(path);

      if (hash) {
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }

      // Check if direct deep link to /work/:slug
      if (path.startsWith('/work/') && path.length > 6) {
        const slug = path.replace('/work/', '');
        const matched = projects.find((p) => p.slug === slug);
        if (matched) setSelectedProject(matched);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [projects]);

  // Deep link detection on initial load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const path = currentPath;

    if (path === '/services' || hash === 'services') {
      setCurrentPath('/');
      setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 150);
    } else if (path === '/process' || hash === 'process') {
      setCurrentPath('/');
      setTimeout(() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' }), 150);
    } else if (path === '/faq' || path === '/faqs' || hash === 'faq') {
      setCurrentPath('/');
      setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 150);
    } else if (path === '/about' || hash === 'about') {
      setCurrentPath('/');
      setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 150);
    } else if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 150);
    } else if (currentPath.startsWith('/work/') && currentPath.length > 6) {
      const slug = currentPath.replace('/work/', '');
      const matched = projects.find((p) => p.slug === slug);
      if (matched) setSelectedProject(matched);
    }
  }, [projects, currentPath]);

  const navigateTo = (targetPath: string) => {
    let cleanPath = targetPath;
    let targetHash = '';

    if (targetPath.includes('#')) {
      const parts = targetPath.split('#');
      cleanPath = parts[0] || '/';
      targetHash = parts[1];
    } else if (targetPath === '/services') {
      cleanPath = '/';
      targetHash = 'services';
    } else if (targetPath === '/process') {
      cleanPath = '/';
      targetHash = 'process';
    } else if (targetPath === '/faq' || targetPath === '/faqs') {
      cleanPath = '/';
      targetHash = 'faq';
    } else if (targetPath === '/about') {
      cleanPath = '/';
      targetHash = 'about';
    }

    const fullUrl = targetHash ? `${cleanPath}#${targetHash}` : cleanPath;
    window.history.pushState({}, '', fullUrl);
    setCurrentPath(cleanPath);

    if (targetHash) {
      setTimeout(() => {
        const el = document.getElementById(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Handle deep links to case studies
    if (cleanPath.startsWith('/work/') && cleanPath.length > 6) {
      const slug = cleanPath.replace('/work/', '');
      const matched = projects.find((p) => p.slug === slug);
      if (matched) {
        setSelectedProject(matched);
      }
    }
  };

  // Sync theme attribute to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('site_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Dynamic Per-Page SEO & Metadata Management
  useEffect(() => {
    const canonicalLink = document.getElementById('canonical-link') as HTMLLinkElement | null;
    const origin = window.location.origin;

    if (selectedProject) {
      document.title = `${selectedProject.title} — Architecture & Case Study | Sajjad Khan`;
      if (canonicalLink) canonicalLink.href = `${origin}/work/${selectedProject.slug}`;
    } else if (currentPath === '/work') {
      document.title = 'Client Work & Engineering Case Studies | Sajjad Khan';
      if (canonicalLink) canonicalLink.href = `${origin}/work`;
    } else if (currentPath === '/contact') {
      document.title = 'Book a Strategy Call or Inquire | Sajjad Khan';
      if (canonicalLink) canonicalLink.href = `${origin}/contact`;
    } else if (currentPath.startsWith('/admin')) {
      document.title = 'Portfolio Control Center — Admin';
      if (canonicalLink) canonicalLink.href = `${origin}/admin`;
    } else {
      document.title = settings.seo_title || 'Sajjad Khan - Full-Stack Web Developer | Websites & Platforms';
      if (canonicalLink) canonicalLink.href = `${origin}/`;
    }
  }, [currentPath, selectedProject, settings]);

  // Fetch dynamic content from API
  useEffect(() => {
    const loadContent = async () => {
      try {
        const [projRes, servRes, testRes, faqRes, setRes] = await Promise.all([
          fetch('/api/projects').catch(() => null),
          fetch('/api/services').catch(() => null),
          fetch('/api/testimonials').catch(() => null),
          fetch('/api/faqs').catch(() => null),
          fetch('/api/settings').catch(() => null),
        ]);

        const safeJson = async (res: Response | null) => {
          if (!res || !res.ok) return null;
          const contentType = res.headers.get('content-type') || '';
          if (!contentType.includes('application/json')) return null;
          return res.json().catch(() => null);
        };

        const projData = await safeJson(projRes);
        if (Array.isArray(projData) && projData.length > 0) setProjects(projData);

        const servData = await safeJson(servRes);
        if (Array.isArray(servData) && servData.length > 0) setServices(servData);

        const testData = await safeJson(testRes);
        if (Array.isArray(testData) && testData.length > 0) {
          const hasPlaceholders = testData.some(
            (t) =>
              t.quote?.includes('[paste') ||
              t.quote?.includes('[client') ||
              t.author_name?.includes('[name')
          );
          if (!hasPlaceholders) {
            setTestimonials(testData);
          }
        }

        const faqData = await safeJson(faqRes);
        if (Array.isArray(faqData) && faqData.length > 0) setFaqs(faqData);

        const setData = await safeJson(setRes);
        if (setData && setData.hero_headline) setSettings(setData);
      } catch (err) {
        console.warn('Backend sync note: Loaded initial state', err);
      }
    };

    loadContent();
  }, [currentPath]);

  // Admin Logout
  const handleAdminLogout = () => {
    localStorage.removeItem('admin_token');
    setAdminToken(null);
    navigateTo('/');
  };

  // Determine which page to render
  const isKnownRoute =
    currentPath === '/' ||
    currentPath === '/work' ||
    currentPath.startsWith('/work/') ||
    currentPath === '/contact' ||
    currentPath === '/services' ||
    currentPath === '/process' ||
    currentPath === '/faq' ||
    currentPath === '/faqs' ||
    currentPath === '/about' ||
    currentPath.startsWith('/admin');

  return (
    <ErrorBoundary>
      <VercelAnalytics />
      {currentPath.startsWith('/admin') ? (
        !adminToken ? (
          <AdminLogin
            onLoginSuccess={(token, user) => {
              setAdminToken(token);
              setAdminEmail(user.email);
            }}
            onBackToSite={() => navigateTo('/')}
          />
        ) : (
          <AdminLayout
            token={adminToken}
            adminEmail={adminEmail}
            onLogout={handleAdminLogout}
            onBackToSite={() => navigateTo('/')}
          />
        )
      ) : !isKnownRoute ? (
        <div className="min-h-screen flex flex-col bg-[#0a0e17] text-[#f8fafc]">
          <Navbar
            settings={settings}
            currentPath={currentPath}
            onNavigate={navigateTo}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
          <main className="flex-1">
            <NotFoundPage onNavigate={navigateTo} />
          </main>
          <Footer settings={settings} onNavigate={navigateTo} />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col bg-[#0a0e17] text-[#f8fafc] selection:bg-[#00e599]/30 selection:text-[#00e599]">
          {/* Global Navigation */}
          <Navbar
            settings={settings}
            currentPath={currentPath}
            onNavigate={navigateTo}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          {/* Main Content Router */}
          <main className="flex-1">
            {currentPath === '/work' || currentPath.startsWith('/work/') ? (
              <WorkPage
                projects={projects}
                onSelectProject={(p) => setSelectedProject(p)}
                onNavigate={navigateTo}
              />
            ) : currentPath === '/contact' ? (
              <div className="pt-12">
                <ContactSection
                  settings={settings}
                  preselectedService={preselectedService}
                />
              </div>
            ) : (
              <>
                {/* 1. Hero Section */}
                <HeroSection settings={settings} onNavigate={navigateTo} />

                {/* 2. Trust Strip (Tech + Verified Client Proof) */}
                <TrustStrip testimonial={testimonials[0]} />

                {/* 3. Services Section */}
                <ServicesSection
                  services={services}
                  onSelectService={(serviceTitle) => {
                    setPreselectedService(serviceTitle);
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                {/* 4. Featured Projects Section */}
                <FeaturedProjectsSection
                  projects={projects}
                  onSelectProject={(p) => setSelectedProject(p)}
                  onNavigate={navigateTo}
                />

                {/* 5. Process Section (4 Steps) */}
                <ProcessSection />

                {/* 6. Testimonials Section */}
                <TestimonialsSection testimonials={testimonials} />

                {/* 7. About Section */}
                <AboutSection settings={settings} onNavigate={navigateTo} />

                {/* 8. FAQ Section */}
                <FAQSection faqs={faqs} />

                {/* 9. Contact / Booking Section */}
                <ContactSection
                  settings={settings}
                  preselectedService={preselectedService}
                />
              </>
            )}
          </main>

          {/* Footer */}
          <Footer settings={settings} onNavigate={navigateTo} />

          {/* Case Study Modal */}
          <CaseStudyModal
            project={selectedProject}
            onClose={() => {
              setSelectedProject(null);
              if (currentPath.startsWith('/work/')) {
                navigateTo('/work');
              }
            }}
          />
        </div>
      )}
    </ErrorBoundary>
  );
}
