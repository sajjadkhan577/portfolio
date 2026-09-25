# DESIGN BRIEF: Sajjad Khan Portfolio & Client Platform

**Project**: Personal Portfolio & Client Acquisition Website  
**Role**: Sajjad Khan – Full-Stack Web Developer  
**Target Audience**: Coaches, consultants, course creators, and small-business owners seeking fast, custom web platforms and automated lead/booking engines.  
**Design Status**: Phase 1 – Architecture & Design Specification (Awaiting Client Approval)

---

## 1. Information Architecture & Sitemap

```
├── / (Home Page)
│    ├── #hero           (Direct Hook, Value Prop, Dual CTAs, 3D Architecture Hub)
│    ├── #trust          (Tech Stack Badges + Verified Client Proof Strip)
│    ├── #services       (5 Core Specialized Solutions with Deliverable Breakdown)
│    ├── #projects       (Featured Production Projects with Problem/Solution/Result)
│    ├── #process        (4-Step Frictionless Client Delivery Framework)
│    ├── #testimonials   (Social Proof & Verified Client Quotes)
│    ├── #about          (Bio, Peshawar-to-Worldwide Global Remote Standard, Fast-Loading Guarantee)
│    ├── #faq            (Common Client Objections, Pricing/Milestones, Tech Decisions)
│    └── #contact        (Dual Path: Booking Calendar Link + Validated Direct Inquiry Form)
│
├── /work (All Projects Archive)
│    └── Filterable grid by Category (EdTech, PWA, E-Commerce, Portals) & Tech (PHP/MySQL, React/Node)
│
├── /work/[slug] (Deep-Dive Case Study Template)
│    ├── Executive Summary & Metadata (Client name visibility toggle, Timeline, Role)
│    ├── The Client Problem (What was broken or missing)
│    ├── The Solution & Architecture (What Sajjad engineered)
│    ├── Key Features & Screenshots (Interactive walkthrough)
│    ├── Technical Implementation (Stack breakdown, security, database schema)
│    └── Business Results / Measurable Outcome
│
└── /contact (Optional Standalone Direct Link & Booking Redirect)
```

---

## 2. Section List for Home (Sequential Flow)

1. **Hero**: Immediate clarity above the fold. 
   - *Headline*: "I build fast, high-converting websites and platforms for coaches, course creators, and growing businesses."
   - *Subline*: "From custom student portals and automated booking funnels to scalable client dashboards. Engineered for speed, clean architecture, and measurable client results."
   - *CTAs*: Primary: `[Book a Free Strategy Call]` (Calendar anchor/link) | Secondary: `[Explore Client Work]` (`#projects` anchor).
   - *Visual*: Interactive 3D Procedural "Platform Architecture Engine" on the right (desktop) or below hero text (tablet/mobile).

2. **Trust Strip**:
   - *Tech Badges*: PHP, MySQL, JavaScript, React, Node.js, Express, MongoDB, Tailwind CSS, Bootstrap, Git.
   - *Social Proof Banner*: Verified client testimonial snippet: `"[paste the client's words]" — [name/title, or "Client, online education"]`.
   - *Availability Indicator*: Live pulsing green dot: `"Available for new projects • Worldwide Remote (Peshawar, PK timezone UTC+5)"`.

3. **Services (5 Tailored Client Offerings)**:
   - **01. Coach & Consultant Websites**: High-converting landing pages, seamless calendar booking integrations (Cal.com / Calendly), lead capture funnels, and automated email notifications.
   - **02. Online Course Platforms (LMS)**: Custom student authentication, course module dashboards, enrollment pipelines, payment submission/verification gateways, and scholarship workflows.
   - **03. Client Portals & Admin Dashboards**: Secure multi-role access (Admin/Instructor/Client), data reporting, CRM integration, and backend management tools.
   - **04. E-Commerce & Business Platforms**: Custom shopping experiences, product catalogs, cart & checkout, inventory dashboards, and localized payment verification.
   - **05. Bug Fixes, Upgrades & Performance Optimization**: Database tuning (MySQL/MongoDB), legacy code refactoring (PHP/JS), Core Web Vitals acceleration, and ongoing maintenance.

4. **Featured Projects**:
   - Production cards featuring real facts, problem/built/result breakdown, tech stack badges, live demo links, and GitHub repository links:
     1. **Online Course Platform (Client Project)**:
        - *Problem*: Client needed a full-fledged educational portal with student registration, paid access verification, and administrative controls without high SaaS subscription overhead.
        - *What Sajjad Built*: Custom full-stack LMS with student registration/login, course dashboard, enrollment tracking, manual/automated payment submission & verification, scholarship/donation workflows, and an intuitive admin panel.
        - *Tech*: PHP, MySQL, Tailwind CSS, JavaScript.
        - *Links*: Live: `[link]` | Client Name Display: `[Hidden per privacy setting / or Client, online education]`.
        - *Result*: `[Client operational outcome placeholder]`.
     2. **ReValueHub**:
        - *Problem*: Communities lack a streamlined, transparent digital ecosystem to share surplus resources and coordinate charitable donations.
        - *What Sajjad Built*: Resource sharing and donation platform connecting donors with recipients featuring real-time listings and donation workflows.
        - *Tech*: Full-Stack Web Application, Database, Responsive UI.
        - *Links*: GitHub: `https://github.com/sajjadkhan577/ReValueHub` | Live: `[Live link placeholder]`.
     3. **The Gastronomic Editorial**:
        - *Problem*: High-end dining establishments struggle to convey culinary storytelling and manage reservations through static generic templates.
        - *What Sajjad Built*: Refined restaurant web application with interactive seasonal menus, dining reservation flows, and immersive editorial layout.
        - *Tech*: JavaScript / Modern Front-end, CSS Grid/Tailwind.
        - *Links*: Repo: `[repo link]` | Live: `[live link]`.
     4. **ExpenseFlow**:
        - *Problem*: Users require a zero-friction, lightning-fast personal expense tracker that functions offline on both desktop and mobile without native app store friction.
        - *What Sajjad Built*: Progressive Web App (PWA) with instant transaction logging, category analytics, offline service worker support, and responsive charts.
        - *Tech*: PWA, JavaScript, Tailwind CSS.
        - *Links*: GitHub: `https://github.com/sajjadkhan577/ExpenseFlow` | Live: `[Live link placeholder]`.
     5. **TechNova Store**:
        - *Problem*: Tech e-commerce platforms often suffer from bloated load times, leading to cart drop-offs.
        - *What Sajjad Built*: Modern e-commerce front end with instant catalog filtering, dynamic cart state management, and streamlined checkout UI.
        - *Tech*: React, Tailwind CSS, Modern State Management.
        - *Links*: GitHub: `https://github.com/sajjadkhan577/technova-store` | Live: `[Live link placeholder]`.

5. **Process (4-Step Frictionless Delivery)**:
   - **Step 01: Discovery & Strategy**: We clarify your audience, business objectives, and exact platform requirements. No guesswork.
   - **Step 02: Architecture & Prototype**: Clear database schema (MySQL/MongoDB), clean UI wireframes, and approval on milestones before a line of code is written.
   - **Step 03: Agile Development & Demos**: Weekly milestone builds with live preview links. Fast, clean, well-commented code built for long-term scalability.
   - **Step 04: Testing, Launch & Handover**: Rigorous cross-browser testing, Core Web Vitals speed optimization, deployment, and a recorded video walkthrough for your team.

6. **Testimonials**:
   - Verified Client Proof section:
     - Quote: `"[paste the client's words]"`
     - Author: `[name/title, or "Client, online education"]`
     - Verified badge: `Client Verified • Online Education Platform`

7. **About Sajjad Khan**:
   - Full-Stack Web Developer based in Peshawar, Pakistan, working remotely with clients worldwide (Europe, North America, Middle East, Asia).
   - Philosophy: High speed is a feature, not an afterthought. Clients hire me because I eliminate technical friction—delivering robust backends (PHP, Node.js, MySQL, MongoDB) paired with modern, responsive frontends (React, Tailwind CSS).
   - Direct communication, strict adherence to deadlines, and post-launch maintenance reliability.

8. **Frequently Asked Questions (FAQ)**:
   - *How do we communicate across time zones?* (Clear async updates, scheduled video calls via Google Meet/Zoom, dedicated WhatsApp/Slack channel).
   - *Can you work with my existing hosting or backend?* (Yes, experienced with cPanel, VPS, cloud providers, PHP/MySQL stacks, and Node.js environments).
   - *What is your payment structure?* (Milestone-based: 30% upfront deposit, 40% midway upon live staging demo, 30% upon final sign-off and deployment).
   - *Will I be able to manage courses/content myself after launch?* (Yes, all platforms come with custom admin panels or simple content management workflows, plus recorded video guidance).
   - *How fast will my website load?* (Built to achieve sub-second load times and 90+ Lighthouse performance scores).

9. **Contact & Booking Section**:
   - Dual-action interface:
     - **Option A**: Direct Strategy Call Booking (`[Calendly / Cal.com link, or leave blank]`).
     - **Option B**: Direct Inquiry Form:
       - Name (required)
       - Email (required, email format validation)
       - Project Type (Dropdown: Coach/Consultant Website, Course Platform, Custom Portal, E-Commerce, Bug Fix / Maintenance, Other)
       - Estimated Budget (Dropdown: < $1,000, $1,000 - $3,000, $3,000 - $5,000, $5,000+)
       - Message (required, minimum 20 characters)
     - Direct Contact Badges:
       - Email: `sajjad2003khan@gmail.com`
       - WhatsApp: `[number with country code]`
       - LinkedIn: `https://www.linkedin.com/in/sajjad-khan-dev/`
       - GitHub: `https://github.com/sajjadkhan577`
       - Fiverr: `[your public Fiverr profile link]`
       - Location: Peshawar, Pakistan (Remote worldwide)

10. **Footer**:
    - Brand tagline, quick navigation anchors, direct social links, status indicator, copyright notice, and smooth "Back to top" button.

---

## 3. Visual Direction & Design Tokens

### Aesthetic Rationale
Dark-first obsidian slate foundation with a distinctive **Electric Signal Mint/Emerald (`#00E599`)** accent. Emerald conveys financial growth, verified systems, and high performance for coaches, course creators, and businesses, avoiding cliché overused purple gradients.

### Exact Hex Color System

| Token Name | Dark Mode (Default) | Light Mode (Secondary) | Role / Usage |
| :--- | :--- | :--- | :--- |
| `--color-bg` | `#0A0E17` | `#F8FAFC` | Main canvas background |
| `--color-surface` | `#111827` | `#FFFFFF` | Primary card & section surface |
| `--color-surface-elevated` | `#1E293B` | `#F1F5F9` | Elevated modals, dropdowns, hovered cards |
| `--color-border` | `#1E293B` | `#E2E8F0` | Subtle element borders & dividers |
| `--color-border-glow` | `#334155` | `#CBD5E1` | Interactive borders on focus/hover |
| `--color-text` | `#F8FAFC` | `#0F172A` | Primary typography (High contrast, AA/AAA) |
| `--color-text-muted` | `#94A3B8` | `#64748B` | Secondary descriptions, captions, labels |
| `--color-accent` | `#00E599` | `#059669` | High-converting primary CTA, metrics, active states |
| `--color-accent-hover` | `#00CC88` | `#047857` | Hovered CTA state |
| `--color-accent-subtle` | `rgba(0, 229, 153, 0.10)` | `rgba(5, 150, 105, 0.08)` | Badge background, code tags, glow backdrops |
| `--color-success` | `#10B981` | `#059669` | Form success, availability indicator |
| `--color-error` | `#F43F5E` | `#E11D48` | Form validation error alerts |

### Tailwind / CSS Variable Mapping
```css
:root {
  --background: #0a0e17;
  --surface: #111827;
  --surface-elevated: #1e293b;
  --border: #1e293b;
  --border-hover: #334155;
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --accent: #00e599;
  --accent-hover: #00cc88;
  --accent-subtle: rgba(0, 229, 153, 0.12);
}

[data-theme="light"] {
  --background: #f8fafc;
  --surface: #ffffff;
  --surface-elevated: #f1f5f9;
  --border: #e2e8f0;
  --border-hover: #cbd5e1;
  --text: #0f172a;
  --text-muted: #64748b;
  --accent: #059669;
  --accent-hover: #047857;
  --accent-subtle: rgba(5, 150, 105, 0.10);
}
```

---

## 4. Typography Hierarchy

- **Display Font**: `Syne` or `Plus Jakarta Sans` (Bold, 700 / ExtraBold, 800) for sharp, commanding titles that stand out to prospective clients.
- **Body Font**: `Inter` (Regular 400, Medium 500, SemiBold 600) with tabular numbers (`font-variant-numeric: tabular-nums`) for technical metrics and clean readability.
- **Monospace Font**: `JetBrains Mono` or `Fira Code` for code tags, endpoint indicators, and technical stack badges.

### Type Scale

| Level | Size (Desktop) | Size (Mobile) | Weight | Line Height | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | 3.5rem (56px) | 2.25rem (36px) | 800 | 1.1 | -0.03em | Above-the-fold value hook |
| **H1 / Page Title**| 2.5rem (40px) | 1.875rem (30px)| 700 | 1.2 | -0.025em| Section titles, Case study headers |
| **H2 / Card Title**| 1.5rem (24px) | 1.25rem (20px) | 600 | 1.3 | -0.015em| Service titles, Project headlines |
| **H3 / Subtitle**  | 1.125rem (18px)| 1.0rem (16px)  | 600 | 1.4 | -0.01em | Modal headers, Process step titles |
| **Body Large**     | 1.125rem (18px)| 1.0rem (16px)  | 400 | 1.6 | 0 | Hero lead paragraph, Bio summary |
| **Body Default**   | 0.9375rem (15px)| 0.875rem (14px)| 400/500 | 1.6 | 0 | Descriptions, FAQ answers, forms |
| **Caption / Meta** | 0.8125rem (13px)| 0.75rem (12px) | 500/600 | 1.4 | +0.02em | Stack badges, timestamps, tags |

---

## 5. Spacing, Radius, Shadow & Layout Rules

- **Base Unit**: 4px scale (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`).
- **Section Padding**:
  - Desktop: `py-24` (96px vertical)
  - Mobile: `py-16` (64px vertical)
- **Container Constraints**:
  - Standard Section: `max-w-7xl` (1280px) with `px-4 sm:px-6 lg:px-8`
  - Longform / Case Study: `max-w-4xl` (896px) for optimal line length (65–75 chars)
  - Hero Grid: 12-column grid (`lg:grid-cols-12` with 7 cols text, 5 cols 3D canvas)
- **Corner Radii**:
  - `rounded-md`: 8px (Form inputs, small badges)
  - `rounded-xl`: 14px (Cards, interactive buttons)
  - `rounded-2xl`: 20px (Featured project cards, modals, hero container)
  - `rounded-full`: 9999px (Pills, avatar borders, status indicators)
- **Shadows & Elevation**:
  - `shadow-card`: `0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--color-border)`
  - `shadow-glow`: `0 0 35px -5px rgba(0, 229, 153, 0.25)`

---

## 6. Motion & Interaction Principles

1. **Subtle & Purposeful**:
   - Scroll reveals use gentle opacity + translate-y (e.g., `y: 20 -> 0`, `opacity: 0 -> 1` over 0.5s with cubic-bezier easeOut).
   - No excessive spinning or gratuitous bouncing that distracts from the conversion goal.
2. **Interactive Affordance**:
   - Primary Buttons: Micro-magnetic hover pull or subtle 1.02x scale with emerald rim glow.
   - Project Cards: Subtle translateY(-4px) on desktop hover with border tint brightening from `--border` to `--accent`.
3. **Accessibility & Reduced Motion**:
   - Full CSS `@media (prefers-reduced-motion: reduce)` and Framer Motion `reducedMotion="user"` integration.
   - When reduced motion is detected, animations immediately resolve to static states with 0ms duration.

---

## 7. 3D Hero Concept: The "Architecture Hub"

- **Concept**: A floating, procedural 3D "Full-Stack System Hub" built directly with React Three Fiber primitives (no external GLTF files required):
  - A central isometric floating glass-metallic application viewport with responsive code brackets and glowing wireframe borders.
  - Three procedural orbiting satellite nodes:
    1. *Database Node* (Cylinder stack with emerald data rings – representing MySQL/MongoDB).
    2. *Interface Node* (Frosted glass tile with layout grids – representing React/Tailwind).
    3. *Server/API Node* (Hexagonal prism with pulsing connection lines – representing Node/PHP).
  - Floating ambient particle constellation emitting a soft emerald ambient radiance.
- **Micro-Interactions**:
  - Damped cursor reaction: Tilts smoothly (max ±12 degrees) relative to mouse coordinates via `THREE.MathUtils.lerp`.
  - Subtle breathing idle animation using continuous sine-wave oscillation.
  - Interactive click / pointer-over on satellites highlights the associated skill tags.
- **Strict Performance & Fallback Rules**:
  - **Zero Heavy Assets**: 100% procedural geometry (BoxGeometry, CylinderGeometry, BufferGeometry). Total download: **0 KB** 3D model footprint.
  - **Dynamic Loading**: Imported dynamically (`next/dynamic` with `ssr: false`).
  - **Static High-Fidelity Poster Fallback**: Displayed while loading and on devices where WebGL is unsupported.
  - **Resource Throttling**: Capped pixel ratio (`dpr={[1, 1.5]}`), rendering paused when viewport is scrolled out of view (`frameloop="demand"` or IntersectionObserver gate).
  - **Mobile Degradation**: Bypassed automatically on mobile screens (< 768px) and when `prefers-reduced-motion` is enabled, rendering the optimized static architectural schematic to ensure 95+ Lighthouse mobile performance.

---

## 8. Text Wireframes (Desktop vs. Mobile)

### Wireframe: Hero Section
```
DESKTOP (>= 1024px):
+---------------------------------------------------------------------------------------+
|  [Logo: Sajjad Khan]         [Work]  [Services]  [Process]  [About]   [Book Call (CTA)]|
+---------------------------------------------------------------------------------------+
|                                                           |                           |
|  [AVAILABLE FOR WORK - PESHAWAR (UTC+5)]                  |   [ 3D ARCHITECTURE HUB ] |
|                                                           |   - Floating Glass Canvas |
|  I build fast, high-converting websites                   |   - Orbiting DB & UI Nodes|
|  and platforms for coaches, consultants,                  |   - Procedural Emerald    |
|  and course creators.                                     |     Glow Particles        |
|                                                           |   - Mouse Tilt Physics    |
|  Custom portals, automated booking funnels, and           |                           |
|  scalable LMS architectures built for speed and growth.   |   (Zero external models)  |
|                                                           |                           |
|  [ Book a Free Strategy Call -> ]   [ View Projects ]     |                           |
|                                                           |                           |
|  • PHP / MySQL  • React / Node  • 90+ Lighthouse Speed    |                           |
+---------------------------------------------------------------------------------------+

MOBILE (360px - 767px):
+---------------------------------------------+
|  [Sajjad Khan]                        [ ☰ ] |
+---------------------------------------------+
|  [• Available - Remote Worldwide]           |
|                                             |
|  I build fast, high-converting              |
|  websites & platforms for                   |
|  coaches & course creators.                 |
|                                             |
|  Custom student portals & business engines  |
|  built with clean code and sub-second load. |
|                                             |
|  [ Book a Free Strategy Call -> ]           |
|  [ View Projects ]                          |
|                                             |
|  +---------------------------------------+  |
|  |  [ Optimized Procedural Schematic ]   |  |
|  |  (Static SVG/Canvas Fallback for      |  |
|  |   Max Battery & 90+ Mobile Speed)     |  |
|  +---------------------------------------+  |
+---------------------------------------------+
```

### Wireframe: Trust Strip & Proof
```
DESKTOP:
+---------------------------------------------------------------------------------------+
|  TECH STACK:  [PHP] [MySQL] [React] [Node.js] [Express] [MongoDB] [Tailwind] [Git]    |
|  -----------------------------------------------------------------------------------  |
|  " [paste the client's words] "  -- [name/title, or "Client, online education"]       |
+---------------------------------------------------------------------------------------+

MOBILE:
+---------------------------------------------+
|  TECH STACK:                                |
|  [PHP] [MySQL] [React] [Node.js] [MongoDB]  |
|  ------------------------------------------ |
|  " [paste the client's words] "             |
|  - [Client, online education] (Verified)    |
+---------------------------------------------+
```

### Wireframe: Services Section
```
DESKTOP (3-Column Grid):
+---------------------------------------------------------------------------------------+
|  SERVICES                                                                             |
|  Engineered solutions tailored to coaches, educators, and scaling businesses.         |
|                                                                                       |
|  +---------------------+  +---------------------+  +---------------------+            |
|  | 01. Coach & Consult |  | 02. Course Platforms|  | 03. Client Portals  |            |
|  | High-converting     |  | Paid courses, auth, |  | Multi-role admin    |            |
|  | funnels & booking   |  | payment verif, LMS  |  | dashboards, CRM &   |            |
|  | [View Details ->]   |  | [View Details ->]   |  | [View Details ->]   |            |
|  +---------------------+  +---------------------+  +---------------------+            |
|  +---------------------+  +---------------------+                                     |
|  | 04. E-Commerce      |  | 05. Bug Fixes & Perf|                                     |
|  | Fast custom stores, |  | Speed optimization, |                                     |
|  | cart & checkout     |  | DB tuning & updates |                                     |
|  | [View Details ->]   |  | [View Details ->]   |                                     |
|  +---------------------+  +---------------------+                                     |
+---------------------------------------------------------------------------------------+

MOBILE (Single Column Stack):
+---------------------------------------------+
|  SERVICES                                   |
|  What I build for clients:                  |
|                                             |
|  +---------------------------------------+  |
|  | 01. Coach & Consultant Websites       |  |
|  | Lead capture, automated bookings.     |  |
|  +---------------------------------------+  |
|  | 02. Online Course Platforms (LMS)     |  |
|  | Student logins, payments, enrollments.|  |
|  +---------------------------------------+  |
|  | 03. Client Portals & Dashboards       |  |
|  | Role-based access, management tools.  |  |
|  +---------------------------------------+  |
|  | 04. E-Commerce & Business Sites       |  |
|  +---------------------------------------+  |
|  | 05. Bug Fixes, Upgrades & Speed Boost |  |
|  +---------------------------------------+  |
+---------------------------------------------+
```

### Wireframe: Featured Projects
```
DESKTOP (Alternating 2-Column Showcase Cards):
+---------------------------------------------------------------------------------------+
|  FEATURED WORK                                                                        |
|  Production platforms solving real business challenges.                               |
|                                                                                       |
|  +-------------------------------------+-------------------------------------------+  |
|  | [ Screenshot / Platform Preview ]  | 01. Online Course Platform (Client Project)|  |
|  |                                     | The Problem: Missing student gate & verif |  |
|  |                                     | What I Built: Full PHP/MySQL LMS, portals |  |
|  |                                     | Result: [Client operational outcome]      |  |
|  |                                     | [PHP] [MySQL] [Tailwind] [JavaScript]     |  |
|  |                                     | [ Live Site [link] ] [ Case Study -> ]    |  |
|  +-------------------------------------+-------------------------------------------+  |
|  | 02. ReValueHub                      | [ Screenshot / Platform Preview ]         |  |
|  | The Problem: Fragmented donations   |                                           |  |
|  | What I Built: Resource share hub    |                                           |  |
|  | [ View Code (GitHub) ] [ Live Demo ]|                                           |  |
|  +-------------------------------------+-------------------------------------------+  |
|  | [ Grid of ExpenseFlow, Gastronomic Editorial, TechNova Store ]                    |  |
+---------------------------------------------------------------------------------------+

MOBILE (Card Stacks):
+---------------------------------------------+
|  FEATURED WORK                              |
|                                             |
|  +---------------------------------------+  |
|  | [ Project Screenshot ]                |  |
|  | 01. Online Course Platform            |  |
|  | What I built: Student registration,   |  |
|  | paid courses, payment verification.   |  |
|  | Tech: PHP, MySQL, JavaScript          |  |
|  | [ Live Link: [link] ]                 |  |
|  +---------------------------------------+  |
|  +---------------------------------------+  |
|  | [ Project Screenshot ]                |  |
|  | 02. ReValueHub                        |  |
|  | Resource sharing & donation system    |  |
|  | [ GitHub ] [ Live Demo ]              |  |
|  +---------------------------------------+  |
|  [ View All Projects Archive -> ]           |
+---------------------------------------------+
```

### Wireframe: Contact & Booking Section
```
DESKTOP:
+---------------------------------------------------------------------------------------+
|  LET'S BUILD YOUR PLATFORM                                                            |
|  Ready to start your project or need an estimate? Let's talk.                         |
|                                                                                       |
|  LEFT (Quick Connect & Booking):       | RIGHT (Direct Inquiry Form):                 |
|  - [ Book Strategy Call on Calendar ]  | Name:       [ __________________________ ]   |
|  - Email: sajjad2003khan@gmail.com     | Email:      [ __________________________ ]   |
|  - WhatsApp: [number with code]        | Service:    [ Select Service (Dropdown) v]   |
|  - LinkedIn: /in/sajjad-khan-dev       | Budget:     [ Select Budget (Dropdown)  v]   |
|  - GitHub:   /sajjadkhan577            | Message:    [ Tell me about your project ]   |
|  - Fiverr:   [Profile Link]            |             [                            ]   |
|  - Peshawar, PK (Remote Worldwide)     | [ Send Project Inquiry -> ]                  |
+---------------------------------------------------------------------------------------+

MOBILE:
+---------------------------------------------+
|  LET'S BUILD YOUR PLATFORM                  |
|  Direct booking or send a message:          |
|                                             |
|  [ Book a Call via Calendar -> ]            |
|                                             |
|  -- OR SEND AN INQUIRY --                   |
|  Name:    [ ______________________ ]        |
|  Email:   [ ______________________ ]        |
|  Service: [ Select Service       v ]        |
|  Budget:  [ Select Budget        v ]        |
|  Message: [ ______________________ ]        |
|  [ Send Inquiry -> ]                        |
|                                             |
|  Direct Links:                              |
|  [Email] [WhatsApp] [LinkedIn] [GitHub]     |
+---------------------------------------------+
```

---

## 9. Facts & Placeholder Audit

All provided user facts have been rigorously mapped without invented data:
- **Name**: Sajjad Khan
- **Role**: Full-Stack Web Developer
- **Tagline**: "I build websites and platforms for coaches, consultants, course creators and small businesses."
- **Location**: Peshawar, Pakistan (working remotely with clients worldwide)
- **Email**: `sajjad2003khan@gmail.com`
- **LinkedIn**: `https://www.linkedin.com/in/sajjad-khan-dev/`
- **GitHub**: `https://github.com/sajjadkhan577`
- **Tech Stack**: PHP, MySQL, JavaScript, React, Node.js, Express, MongoDB, Tailwind CSS, Bootstrap, Git
- **Fiverr**: `[your public Fiverr profile link]` *(clearly marked placeholder)*
- **WhatsApp**: `[number with country code]` *(clearly marked placeholder)*
- **Booking Link**: `[Calendly / Cal.com link, or leave blank]` *(clearly marked placeholder)*
- **Photo**: `/src/assets/images/developer_headshot_1790246217182.jpg` (or user's custom photo path)
- **Projects**:
  1. *Online course platform (client project)*: PHP + MySQL. Live: `[link]`. Client name shown: `[yes/no]` toggle supported in data model. Result: `[Client operational outcome placeholder]`.
  2. *ReValueHub*: `https://github.com/sajjadkhan577/ReValueHub`
  3. *The Gastronomic Editorial*: `[repo + live link]` *(clearly marked placeholders)*
  4. *ExpenseFlow*: `https://github.com/sajjadkhan577/ExpenseFlow`
  5. *TechNova Store*: `https://github.com/sajjadkhan577/technova-store`
- **Testimonial**: `"[paste the client's words]"`, `[name/title, or "Client, online education"]` *(clearly marked placeholder awaiting client's exact quote)*

---

*This concludes STEP 1: DESIGN BRIEF. Implementation (Step 2) will proceed once you review and approve this specification.*
