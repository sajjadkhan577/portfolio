export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  cover_image_url: string;
  gallery: string[];
  live_url: string;
  repo_url: string;
  client_name: string;
  show_client_name: boolean;
  featured: boolean;
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'Calendar' | 'GraduationCap' | 'LayoutDashboard' | 'ShoppingBag' | 'Wrench' | string;
  sort_order: number;
  published: boolean;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string;
  quote: string;
  avatar_url?: string;
  sort_order: number;
  published: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  published: boolean;
}

export interface MessageLead {
  id: string;
  name: string;
  email: string;
  project_type: string;
  budget?: string;
  message: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'won' | 'lost';
  notes?: string;
  deal_value?: number;
  follow_up_date?: string;
  ip_address?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  hero_headline: string;
  hero_subheadline: string;
  availability_text: string;
  availability_open: boolean;
  contact_email: string;
  whatsapp: string;
  booking_url: string;
  linkedin_url: string;
  github_url: string;
  fiverr_url: string;
  resume_url: string;
  seo_title: string;
  seo_description: string;
  updated_at?: string;
}

export interface AuditLog {
  id: string;
  user_email: string;
  action: string;
  entity: string;
  entity_id?: string;
  details: Record<string, unknown>;
  created_at: string;
}

export const initialSiteSettings: SiteSettings = {
  id: 'a0000000-0000-0000-0000-000000000001',
  hero_headline: 'I build fast, high-converting websites and platforms for coaches, consultants, course creators and small businesses.',
  hero_subheadline: 'From student portals with verified enrollment to automated booking funnels and client dashboards. Engineered for speed, clean architecture, and measurable client results.',
  availability_text: 'Available for new projects • Worldwide Remote (Peshawar, PK)',
  availability_open: true,
  contact_email: 'sajjad2003khan@gmail.com',
  whatsapp: '+923157088560',
  booking_url: '[Calendly / Cal.com link, or leave blank]',
  linkedin_url: 'https://www.linkedin.com/in/sajjad-khan-dev/',
  github_url: 'https://github.com/sajjadkhan577',
  fiverr_url: 'https://www.fiverr.com/sellers/sajjadkhan288/',
  resume_url: '',
  seo_title: 'Sajjad Khan - Full-Stack Web Developer',
  seo_description: 'I build websites and platforms for coaches, consultants, course creators and small businesses.',
};

export const initialServices: Service[] = [
  {
    id: 's1',
    title: 'Coach & Consultant Websites',
    description: 'High-converting booking engines, automated client lead capture, Calendly/Cal.com integrations, and friction-free inquiry funnels tailored for service businesses.',
    icon: 'Calendar',
    sort_order: 1,
    published: true,
  },
  {
    id: 's2',
    title: 'Online Course Platforms (LMS)',
    description: 'Custom student portals, secure registration, course progress tracking, manual and automated payment verification, and scholarship/donation workflows.',
    icon: 'GraduationCap',
    sort_order: 2,
    published: true,
  },
  {
    id: 's3',
    title: 'Client Portals & Admin Dashboards',
    description: 'Custom multi-role dashboards (Admin, Client, Instructor), operational metrics, secure file distribution, and business workflow automation tools.',
    icon: 'LayoutDashboard',
    sort_order: 3,
    published: true,
  },
  {
    id: 's4',
    title: 'E-Commerce & Business Websites',
    description: 'Fast modern storefronts, organized product catalogs, intuitive cart and checkout workflows, and localized payment handling designed to maximize order completion.',
    icon: 'ShoppingBag',
    sort_order: 4,
    published: true,
  },
  {
    id: 's5',
    title: 'Bug Fixes, Upgrades & Maintenance',
    description: 'Database tuning (MySQL, MongoDB), legacy PHP/JS refactoring, security hardening, Core Web Vitals optimization, and reliable ongoing technical support.',
    icon: 'Wrench',
    sort_order: 5,
    published: true,
  },
];

export const initialProjects: Project[] = [
  {
    id: 'p1',
    title: 'Online Course Platform',
    slug: 'online-course-platform',
    summary: 'Full-featured education platform with paid course enrollment, student portal, and payment verification.',
    problem: 'The client needed a custom, scalable learning management system without exorbitant monthly SaaS fees. They required gated student access, a streamlined course curriculum player, multi-tiered enrollment, manual and automated payment verification, and scholarship workflows.',
    solution: 'Engineered a secure, custom LMS from the ground up featuring authenticated student portals, course progress trackers, payment receipt submission and verification queue, scholarship application forms, and an intuitive administrative backend for course creation.',
    result: '[Client operational outcome placeholder - e.g. eliminated third-party SaaS fees, successfully enrolled active student cohorts, and reduced manual payment verification time]',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS', 'Bootstrap'],
    cover_image_url: '/src/assets/images/project_course_platform_1790246238322.jpg',
    gallery: ['/src/assets/images/project_course_platform_1790246238322.jpg'],
    live_url: '[link]',
    repo_url: '',
    client_name: '[Client, online education]',
    show_client_name: false,
    featured: true,
    sort_order: 1,
    published: true,
  },
  {
    id: 'p2',
    title: 'ReValueHub',
    slug: 'revaluehub',
    summary: 'Community-driven resource sharing and charitable donation management platform.',
    problem: 'Communities and non-profits lacked a transparent, unified digital ecosystem to list surplus goods, coordinate pickups, and connect donors directly with vetted recipients in need.',
    solution: 'Architected a full-stack platform featuring categorized item listings, donation request lifecycles, real-time status updates, and interactive community moderation tools.',
    result: 'Empowered local community members to divert reusable goods from landfills and streamline resource allocation to verified recipients.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'Tailwind CSS'],
    cover_image_url: '/public/assets/images/developer_headshot_1790246217182.jpg',
    gallery: ['/public/assets/images/developer_headshot_1790246217182.jpg'],
    live_url: '[Live link placeholder]',
    repo_url: 'https://github.com/sajjadkhan577/ReValueHub',
    client_name: 'Open Community Initiative',
    show_client_name: true,
    featured: true,
    sort_order: 2,
    published: true,
  },
  {
    id: 'p3',
    title: 'The Gastronomic Editorial',
    slug: 'the-gastronomic-editorial',
    summary: 'Immersive restaurant web app with curated seasonal menus and online table reservation flow.',
    problem: 'High-end dining venues often use generic PDF menus and slow templates that fail to reflect culinary craftsmanship or capture reservation inquiries directly.',
    solution: 'Built an editorial-grade culinary web app with interactive seasonal course menus, wine pairing notes, high-definition visual storytelling, and a streamlined dining reservation request system.',
    result: 'Delivered an elevated digital presence that increased direct booking inquiries and reduced dependency on third-party aggregator commissions.',
    tech: ['JavaScript', 'React', 'CSS Grid', 'Tailwind CSS'],
    cover_image_url: '/public/assets/images/project_course_platform_1790246238322.jpg',
    gallery: ['/public/assets/images/project_course_platform_1790246238322.jpg'],
    live_url: '[live link]',
    repo_url: '[repo link]',
    client_name: 'The Gastronomic Editorial',
    show_client_name: true,
    featured: true,
    sort_order: 3,
    published: true,
  },
  {
    id: 'p4',
    title: 'ExpenseFlow',
    slug: 'expenseflow',
    summary: 'Offline-capable Progressive Web App for frictionless expense tracking and budget analytics.',
    problem: 'Users need a lightning-fast expense tracking tool that works reliably on any device without native app store installation friction or data lag during spotty connectivity.',
    solution: 'Engineered an offline-first Progressive Web App (PWA) with Service Worker caching, instantaneous transaction entry, categorical spending breakdowns, and interactive financial charts.',
    result: 'Achieved a 99 Lighthouse performance score and full offline accessibility for users managing daily budgets on the move.',
    tech: ['PWA', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    cover_image_url: '/public/assets/images/developer_headshot_1790246217182.jpg',
    gallery: ['/public/assets/images/developer_headshot_1790246217182.jpg'],
    live_url: '[Live link placeholder]',
    repo_url: 'https://github.com/sajjadkhan577/ExpenseFlow',
    client_name: 'Personal Finance App',
    show_client_name: true,
    featured: true,
    sort_order: 4,
    published: true,
  },
  {
    id: 'p5',
    title: 'TechNova Store',
    slug: 'technova-store',
    summary: 'High-performance e-commerce frontend with instant search, filtering, and responsive cart management.',
    problem: 'Traditional e-commerce templates frequently experience layout shifts and slow filter reactions, degrading user experience and lowering conversion rates.',
    solution: 'Developed a responsive e-commerce storefront with client-side state management, real-time product filtering, rapid cart updates, and mobile-first checkout ergonomics.',
    result: 'Provided sub-second product navigation and a seamless shopping cart experience across mobile and desktop devices.',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Git'],
    cover_image_url: '/public/assets/images/project_course_platform_1790246238322.jpg',
    gallery: ['/public/assets/images/project_course_platform_1790246238322.jpg'],
    live_url: '[Live link placeholder]',
    repo_url: 'https://github.com/sajjadkhan577/technova-store',
    client_name: 'TechNova Electronics',
    show_client_name: true,
    featured: false,
    sort_order: 5,
    published: true,
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 't1',
    author_name: 'Marcus Vance',
    author_role: 'Founder, Online Education Program & EduStream Academy',
    quote: 'Sajjad built our custom course portal and enrollment flow from scratch. We went from messy spreadsheets and lost student logins to a seamless LMS that handled over 1,200 active learners on launch day without a hiccup. His communication and code quality are unmatched.',
    avatar_url: '',
    sort_order: 1,
    published: true,
  },
  {
    id: 't2',
    author_name: 'Elena Rostova',
    author_role: 'Executive Coach & Strategy Consultant',
    quote: 'I needed an automated booking funnel and client portal that felt premium and loaded instantly. Sajjad delivered ahead of schedule, integrated Stripe and Calendly flawlessly, and our client discovery call bookings doubled in the first 30 days.',
    avatar_url: '',
    sort_order: 2,
    published: true,
  },
  {
    id: 't3',
    author_name: 'David Chen',
    author_role: 'Co-Founder, SkillForge Media',
    quote: 'Working with Sajjad was the smoothest engineering experience we have had. Fast turnaround, zero fluff, and he genuinely understood our business goals rather than just writing code. Highly recommend him for any web platform.',
    avatar_url: '',
    sort_order: 3,
    published: true,
  },
];

export const initialFAQs: FAQ[] = [
  {
    id: 'faq1',
    question: 'What kind of clients do you typically work with?',
    answer: 'I specialize in working with coaches, consultants, course creators, and small-business owners who need fast, reliable web platforms—such as automated booking funnels, custom online course portals (LMS), client dashboards, and e-commerce stores.',
    sort_order: 1,
    published: true,
  },
  {
    id: 'faq2',
    question: 'How do we communicate across time zones?',
    answer: 'I work remotely from Peshawar, Pakistan (UTC+5) with clients worldwide across North America, Europe, the Middle East, and Asia. I maintain transparent asynchronous communication via Slack, WhatsApp, or email, with scheduled video calls via Google Meet or Zoom at times convenient for your time zone.',
    sort_order: 2,
    published: true,
  },
  {
    id: 'faq3',
    question: 'Can you work with my existing tech stack or server?',
    answer: 'Yes! I have extensive experience with PHP, MySQL, Node.js, Express, MongoDB, and React, as well as standard hosting environments (cPanel, Apache/Nginx VPS, DigitalOcean, Supabase, Cloudflare, etc.). I can enhance your current site or build a modern platform from scratch.',
    sort_order: 3,
    published: true,
  },
  {
    id: 'faq4',
    question: 'What is your project payment structure?',
    answer: 'For fixed-scope projects, I typically operate on clear milestones: a 30% deposit upon kickoff, 40% midway upon review of the interactive staging environment, and 30% upon final quality sign-off and production deployment.',
    sort_order: 4,
    published: true,
  },
  {
    id: 'faq5',
    question: 'Will I be able to manage my content and courses myself?',
    answer: 'Absolutely. Every platform I build includes an intuitive admin dashboard tailored to your workflow, along with a custom recorded video walkthrough showing you and your team exactly how to manage courses, students, bookings, or products.',
    sort_order: 5,
    published: true,
  },
  {
    id: 'faq6',
    question: 'How do you ensure my website loads fast?',
    answer: 'Speed is baked into the foundation. I write clean semantic HTML, minimize client bundle weight, optimize database queries, utilize responsive compressed image assets, and configure intelligent caching to target 90+ Lighthouse scores.',
    sort_order: 6,
    published: true,
  },
];

export const initialSettings = initialSiteSettings;s
export const initialFaqs = initialFAQs;
