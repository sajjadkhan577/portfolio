-- Seed Data for Sajjad Khan's Portfolio Platform
-- Contains exact facts with clearly marked placeholders

-- 1. Site Settings Initial Row
INSERT INTO public.site_settings (
    id,
    hero_headline,
    hero_subheadline,
    availability_text,
    availability_open,
    contact_email,
    whatsapp,
    booking_url,
    linkedin_url,
    github_url,
    fiverr_url,
    resume_url,
    seo_title,
    seo_description
) VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'I build fast, high-converting websites and platforms for coaches, consultants, course creators and small businesses.',
    'From student portals with verified enrollment to automated booking funnels and client dashboards. Engineered for speed, clean architecture, and measurable client results.',
    'Available for new projects • Worldwide Remote (Peshawar, PK)',
    true,
    'sajjad2003khan@gmail.com',
    '+923157088560',
    '[Calendly / Cal.com link, or leave blank]',
    'https://www.linkedin.com/in/sajjad-khan-dev/',
    'https://github.com/sajjadkhan577',
    '[your public Fiverr profile link]',
    '',
    'Sajjad Khan - Full-Stack Web Developer',
    'Custom web platforms and high-converting systems for coaches, consultants, course creators, and businesses.'
) ON CONFLICT (id) DO UPDATE SET
    hero_headline = EXCLUDED.hero_headline,
    hero_subheadline = EXCLUDED.hero_subheadline,
    availability_text = EXCLUDED.availability_text,
    availability_open = EXCLUDED.availability_open,
    contact_email = EXCLUDED.contact_email,
    whatsapp = EXCLUDED.whatsapp,
    booking_url = EXCLUDED.booking_url,
    linkedin_url = EXCLUDED.linkedin_url,
    github_url = EXCLUDED.github_url,
    fiverr_url = EXCLUDED.fiverr_url;

-- 2. Services Initial Data
INSERT INTO public.services (title, description, icon, sort_order, published) VALUES
(
    'Coach & Consultant Websites',
    'High-converting websites with seamless calendar booking (Cal.com / Calendly), lead capture funnels, automated follow-ups, and mobile-optimized speed.',
    'Calendar',
    1,
    true
),
(
    'Online Course Platforms (LMS)',
    'Custom student registration and login, course dashboards, enrollment pipelines, payment submission and manual/automated verification, scholarship forms, and instructor panels.',
    'GraduationCap',
    2,
    true
),
(
    'Client Portals & Admin Dashboards',
    'Secure multi-role dashboards (Admin, Staff, Client), actionable business metrics, file exchanges, customer management, and tailored workflow automation.',
    'LayoutDashboard',
    3,
    true
),
(
    'E-Commerce & Business Websites',
    'Blazing fast digital storefronts, customized product catalogs, frictionless cart and checkout flows, and automated inventory sync built to maximize conversion.',
    'ShoppingBag',
    4,
    true
),
(
    'Bug Fixes, Upgrades & Maintenance',
    'Deep code refactoring (PHP, Node.js, JavaScript), database performance tuning (MySQL, MongoDB), security hardening, and Core Web Vitals speed optimization.',
    'Wrench',
    5,
    true
)
ON CONFLICT DO NOTHING;

-- 3. Projects Initial Data
INSERT INTO public.projects (
    title,
    slug,
    summary,
    problem,
    solution,
    result,
    tech,
    cover_image_url,
    gallery,
    live_url,
    repo_url,
    client_name,
    show_client_name,
    featured,
    sort_order,
    published
) VALUES
(
    'Online Course Platform',
    'online-course-platform',
    'Full-featured education platform with paid course enrollment, student portal, and payment verification.',
    'The client needed a custom, scalable learning management system without exorbitant monthly SaaS fees. They required gated student access, a streamlined course curriculum player, multi-tiered enrollment, manual and automated payment verification, and scholarship workflows.',
    'Engineered a secure, custom LMS from the ground up featuring authenticated student portals, course progress trackers, payment receipt submission and verification queue, scholarship application forms, and an intuitive administrative backend for course creation.',
    '[Client operational outcome placeholder - e.g. eliminated third-party SaaS fees, successfully enrolled active student cohorts, and reduced manual payment verification time]',
    ARRAY['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS', 'Bootstrap'],
    '/src/assets/images/project_course_platform_1790246238322.jpg',
    ARRAY['/src/assets/images/project_course_platform_1790246238322.jpg'],
    '[link]',
    '',
    '[Client, online education]',
    false,
    true,
    1,
    true
),
(
    'ReValueHub',
    'revaluehub',
    'Community-driven resource sharing and charitable donation management platform.',
    'Communities and non-profits lacked a transparent, unified digital ecosystem to list surplus goods, coordinate pickups, and connect donors directly with vetted recipients in need.',
    'Architected a full-stack platform featuring categorized item listings, donation request lifecycles, real-time status updates, and interactive community moderation tools.',
    'Empowered local community members to divert reusable goods from landfills and streamline resource allocation to verified recipients.',
    ARRAY['Node.js', 'Express', 'MongoDB', 'JavaScript', 'Tailwind CSS'],
    '/src/assets/images/developer_headshot_1790246217182.jpg',
    ARRAY['/src/assets/images/developer_headshot_1790246217182.jpg'],
    '[Live link placeholder]',
    'https://github.com/sajjadkhan577/ReValueHub',
    'Open Community Initiative',
    true,
    true,
    2,
    true
),
(
    'The Gastronomic Editorial',
    'the-gastronomic-editorial',
    'Immersive restaurant web app with curated seasonal menus and online table reservation flow.',
    'High-end dining venues often use generic PDF menus and slow templates that fail to reflect culinary craftsmanship or capture reservation inquiries directly.',
    'Built an editorial-grade culinary web app with interactive seasonal course menus, wine pairing notes, high-definition visual storytelling, and a streamlined dining reservation request system.',
    'Delivered an elevated digital presence that increased direct booking inquiries and reduced dependency on third-party aggregator commissions.',
    ARRAY['JavaScript', 'React', 'CSS Grid', 'Tailwind CSS'],
    '/src/assets/images/project_course_platform_1790246238322.jpg',
    ARRAY['/src/assets/images/project_course_platform_1790246238322.jpg'],
    '[live link]',
    '[repo link]',
    'The Gastronomic Editorial',
    true,
    true,
    3,
    true
),
(
    'ExpenseFlow',
    'expenseflow',
    'Offline-capable Progressive Web App for frictionless expense tracking and budget analytics.',
    'Users need a lightning-fast expense tracking tool that works reliably on any device without native app store installation friction or data lag during spotty connectivity.',
    'Engineered an offline-first Progressive Web App (PWA) with Service Worker caching, instantaneous transaction entry, categorical spending breakdowns, and interactive financial charts.',
    'Achieved a 99 Lighthouse performance score and full offline accessibility for users managing daily budgets on the move.',
    ARRAY['PWA', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    '/src/assets/images/developer_headshot_1790246217182.jpg',
    ARRAY['/src/assets/images/developer_headshot_1790246217182.jpg'],
    '[Live link placeholder]',
    'https://github.com/sajjadkhan577/ExpenseFlow',
    'Personal Finance App',
    true,
    true,
    4,
    true
),
(
    'TechNova Store',
    'technova-store',
    'High-performance e-commerce frontend with instant search, filtering, and responsive cart management.',
    'Traditional e-commerce templates frequently experience layout shifts and slow filter reactions, degrading user experience and lowering conversion rates.',
    'Developed a responsive e-commerce storefront with client-side state management, real-time product filtering, rapid cart updates, and mobile-first checkout ergonomics.',
    'Provided sub-second product navigation and a seamless shopping cart experience across mobile and desktop devices.',
    ARRAY['React', 'JavaScript', 'Tailwind CSS', 'Git'],
    '/src/assets/images/project_course_platform_1790246238322.jpg',
    ARRAY['/src/assets/images/project_course_platform_1790246238322.jpg'],
    '[Live link placeholder]',
    'https://github.com/sajjadkhan577/technova-store',
    'TechNova Electronics',
    true,
    false,
    5,
    true
)
ON CONFLICT (slug) DO NOTHING;

-- 4. Testimonials Initial Data
INSERT INTO public.testimonials (
    author_name,
    author_role,
    quote,
    avatar_url,
    sort_order,
    published
) VALUES (
    '[name/title, or "Client, online education"]',
    'Online Education Platform Founder',
    '"[paste the client''s words]"',
    '',
    1,
    true
)
ON CONFLICT DO NOTHING;

-- 5. FAQs Initial Data
INSERT INTO public.faqs (question, answer, sort_order, published) VALUES
(
    'What kind of clients do you typically work with?',
    'I specialize in working with coaches, consultants, course creators, and small-business owners who need fast, reliable web platforms—such as automated booking funnels, custom online course portals (LMS), client dashboards, and e-commerce stores.',
    1,
    true
),
(
    'How do we communicate across time zones?',
    'I work remotely from Peshawar, Pakistan (UTC+5) with clients worldwide across North America, Europe, the Middle East, and Asia. I maintain transparent asynchronous communication via Slack, WhatsApp, or email, with scheduled video calls via Google Meet or Zoom at times convenient for your time zone.',
    2,
    true
),
(
    'Can you work with my existing tech stack or server?',
    'Yes! I have extensive experience with PHP, MySQL, Node.js, Express, MongoDB, and React, as well as standard hosting environments (cPanel, Apache/Nginx VPS, DigitalOcean, Supabase, Cloudflare, etc.). I can enhance your current site or build a modern platform from scratch.',
    3,
    true
),
(
    'What is your project payment structure?',
    'For fixed-scope projects, I typically operate on clear milestones: a 30% deposit upon kickoff, 40% midway upon review of the interactive staging environment, and 30% upon final quality sign-off and production deployment.',
    4,
    true
),
(
    'Will I be able to manage my content and courses myself?',
    'Absolutely. Every platform I build includes an intuitive admin dashboard tailored to your workflow, along with a custom recorded video walkthrough showing you and your team exactly how to manage courses, students, bookings, or products.',
    5,
    true
),
(
    'How do you ensure my website loads fast?',
    'Speed is baked into the foundation. I write clean semantic HTML, minimize client bundle weight, optimize database queries, utilize responsive compressed image assets, and configure intelligent caching to target 90+ Lighthouse scores.',
    6,
    true
)
ON CONFLICT DO NOTHING;
