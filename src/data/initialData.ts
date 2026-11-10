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
  hero_headline: 'Turning ideas into powerful digital experiences.',
  hero_subheadline: 'I build modern, responsive websites and web applications that help businesses establish their online presence, connect with customers, and grow.',
  availability_text: 'Available for new projects • Worldwide Remote (Peshawar, PK)',
  availability_open: true,
  contact_email: 'sajjad2003khan@gmail.com',
  whatsapp: '+923157088560',
  booking_url: '[Calendly / Cal.com link, or leave blank]',
  linkedin_url: 'https://www.linkedin.com/in/sajjad-khan-dev/',
  github_url: 'https://github.com/sajjadkhan577',
  fiverr_url: 'https://www.fiverr.com/sellers/sajjadkhan288/',
  resume_url: '',
  seo_title: 'Sajjad Khan — Full-Stack Web Developer',
  seo_description: 'Thoughtful, responsive websites and web applications built to help businesses connect with their customers.',
};

export const initialServices: Service[] = [
  {
    id: 's1',
    title: 'Website Development',
    description: 'A clear, well-built website helps people understand what you offer and take the next step with confidence.',
    icon: 'LayoutDashboard',
    sort_order: 1,
    published: true,
  },
  {
    id: 's2',
    title: 'Full-Stack Web Applications',
    description: 'Purpose-built applications bring the interface, business logic, and data together around the way your work actually happens.',
    icon: 'LayoutDashboard',
    sort_order: 2,
    published: true,
  },
  {
    id: 's3',
    title: 'Responsive Website Design',
    description: 'Thoughtful layouts and interactions make your site easier to use across phones, tablets, and desktop screens.',
    icon: 'LayoutDashboard',
    sort_order: 3,
    published: true,
  },
  {
    id: 's4',
    title: 'Business Websites',
    description: 'A professional online presence gives customers a useful place to learn about your business, services, and how to reach you.',
    icon: 'ShoppingBag',
    sort_order: 4,
    published: true,
  },
  {
    id: 's5',
    title: 'API Integration',
    description: 'Connect your website to the services and data your team already uses, reducing repetitive work and disconnected customer experiences.',
    icon: 'Wrench',
    sort_order: 5,
    published: true,
  },
  {
    id: 's6',
    title: 'Website Maintenance and Optimization',
    description: 'Ongoing updates, fixes, and performance improvements help keep your site reliable as your business and content evolve.',
    icon: 'Wrench',
    sort_order: 6,
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
    result: '',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS', 'Bootstrap'],
    cover_image_url: '/assets/images/online-course-platform-mockup.webp',
    gallery: ['/assets/images/online-course-platform-mockup.webp'],
    live_url: '',
    repo_url: '',
    client_name: '',
    show_client_name: false,
    featured: true,
    sort_order: 1,
    published: true,
  },
  {
    id: 'p2',
    title: 'ReValueHub',
    slug: 'revaluehub',
    summary: 'Community reuse marketplace for listing, discovering, and requesting pre-owned items.',
    problem: 'Neighbors need a practical way to share usable items and coordinate requests within their community.',
    solution: 'Built a PHP and MySQL marketplace with item listings, category-based discovery, donation requests, donor approvals, and admin tools.',
    result: '',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS'],
    cover_image_url: '/assets/images/revaluehub-discovery-feed.webp',
    gallery: ['/assets/images/revaluehub-discovery-feed.webp'],
    live_url: '',
    repo_url: 'https://github.com/sajjadkhan577/ReValueHub',
    client_name: '',
    show_client_name: false,
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
    result: '',
    tech: ['JavaScript', 'React', 'CSS Grid', 'Tailwind CSS'],
    cover_image_url: '',
    gallery: [],
    live_url: '',
    repo_url: '',
    client_name: '',
    show_client_name: false,
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
    result: '',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Chart.js'],
    cover_image_url: '/assets/images/expenseflow-dashboard.webp',
    gallery: ['/assets/images/expenseflow-dashboard.webp'],
    live_url: '',
    repo_url: 'https://github.com/sajjadkhan577/ExpenseFlow',
    client_name: '',
    show_client_name: false,
    featured: true,
    sort_order: 4,
    published: true,
  },
  {
    id: 'p5',
    title: 'TechNova Store',
    slug: 'technova-store',
    summary: 'Responsive storefront with product categories, search, price filters, cart management, and checkout views.',
    problem: 'A storefront needs to make it easy to browse a catalog, refine results, and manage a cart through checkout.',
    solution: 'Built the shopping interface with client-side product data, category and price filtering, cart state, theme switching, and a checkout form.',
    result: '',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Font Awesome'],
    cover_image_url: '/assets/images/technova-storefront.webp',
    gallery: ['/assets/images/technova-storefront.webp'],
    live_url: '',
    repo_url: 'https://github.com/sajjadkhan577/technova-store',
    client_name: '',
    show_client_name: false,
    featured: false,
    sort_order: 5,
    published: true,
  },
  {
    id: 'ppms-portfolio',
    title: 'Petrol Pump Management System (PPMS)',
    slug: 'petrol-pump-management-system',
    summary: 'Offline-first Windows desktop software that brings daily fuel sales, stock, customer credit, and petrol station accounting into one place.',
    problem: 'Paper-based records make it harder to keep daily fuel sales, meter readings, stock, customer credit, and expenses organized together.',
    solution: 'Designed and developed a local-first desktop management system for daily station operations, fuel inventory, receivables, accounting, and printable business registers.',
    result: '',
    tech: ['React', 'TypeScript', 'Electron', 'Vite', 'SQLite'],
    cover_image_url: '/assets/images/ppms-dashboard.webp',
    gallery: ['/assets/images/ppms-dashboard.webp'],
    live_url: '',
    repo_url: '',
    client_name: '',
    show_client_name: false,
    featured: true,
    sort_order: 0,
    published: true,
  },
];

export const initialTestimonials: Testimonial[] = [];

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

export const initialSettings = initialSiteSettings;
export const initialFaqs = initialFAQs;
