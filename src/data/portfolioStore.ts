import {
  Project,
  Service,
  Testimonial,
  FAQ,
  SiteSettings,
  initialProjects,
  initialServices,
  initialTestimonials,
  initialFAQs,
  initialSettings,
} from './initialData';

const STORAGE_KEYS = {
  SERVICES: 'portfolio_custom_services',
  FAQS: 'portfolio_custom_faqs',
  TESTIMONIALS: 'portfolio_custom_testimonials',
  PROJECTS: 'portfolio_custom_projects',
  SETTINGS: 'portfolio_custom_settings',
} as const;

export const portfolioStore = {
  getServices(): Service[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading stored services:', e);
    }
    return initialServices;
  },

  saveServices(services: Service[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
      window.dispatchEvent(
        new CustomEvent('portfolio_services_updated', { detail: services })
      );
    } catch (e) {
      console.error('Error saving services to localStorage:', e);
    }
  },

  getFaqs(): FAQ[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAQS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading stored FAQs:', e);
    }
    return initialFAQs;
  },

  saveFaqs(faqs: FAQ[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
      window.dispatchEvent(
        new CustomEvent('portfolio_faqs_updated', { detail: faqs })
      );
    } catch (e) {
      console.error('Error saving FAQs to localStorage:', e);
    }
  },

  getTestimonials(): Testimonial[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading stored testimonials:', e);
    }
    return initialTestimonials;
  },

  saveTestimonials(testimonials: Testimonial[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
      window.dispatchEvent(
        new CustomEvent('portfolio_testimonials_updated', { detail: testimonials })
      );
    } catch (e) {
      console.error('Error saving testimonials to localStorage:', e);
    }
  },

  getProjects(): Project[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error reading stored projects:', e);
    }
    return initialProjects;
  },

  saveProjects(projects: Project[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      window.dispatchEvent(
        new CustomEvent('portfolio_projects_updated', { detail: projects })
      );
    } catch (e) {
      console.error('Error saving projects to localStorage:', e);
    }
  },

  getSettings(): SiteSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === 'object' && parsed.hero_headline) {
          return { ...initialSettings, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Error reading stored settings:', e);
    }
    return initialSettings;
  },

  saveSettings(settings: SiteSettings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      window.dispatchEvent(
        new CustomEvent('portfolio_settings_updated', { detail: settings })
      );
    } catch (e) {
      console.error('Error saving settings to localStorage:', e);
    }
  },
};