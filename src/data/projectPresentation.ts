import { Project } from './initialData';

export interface ProjectCaseStudyDetails {
  category: string;
  role: string;
  features: string[];
  context?: string;
}

const projectCaseStudyDetails: Record<string, ProjectCaseStudyDetails> = {
  'petrol-pump-management-system': {
    category: 'Desktop business management software',
    role: 'Software developer',
    context: 'Windows desktop installer · Offline-first · Local SQLite database',
    features: [
      'Daily fuel sales, closing, meter readings, and nozzle operations',
      'HSD, PMG, and XTRON fuel purchases, sales, and stock',
      'Customer credit, collections, and receivables',
      'Expenses, accounting, commission, and mobile oil sales',
      'Safety duty records, reports, and printable registers',
    ],
  },
};

const localProjectPreviews: Record<string, string> = {
  'online-course-platform': '/assets/images/online-course-platform-mockup.webp',
  revaluehub: '/assets/images/revaluehub-discovery-feed.webp',
  expenseflow: '/assets/images/expenseflow-dashboard.webp',
  'technova-store': '/assets/images/technova-storefront.webp',
  'petrol-pump-management-system': '/assets/images/ppms-dashboard.webp',
};

export const isPublicUrl = (value: string) => {
  if (!value || value.includes('[')) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

export const getProjectPreviewSrc = (project: Project) => {
  const source = project.cover_image_url?.trim() || '';
  const normalized = source.toLowerCase();
  if (!source || source.includes('[') || normalized.includes('profile image') || normalized.includes('developer_headshot')) {
    return localProjectPreviews[project.slug] || '';
  }
  if (normalized.includes('project_course_platform')) {
    if (!project.title.toLowerCase().includes('course')) return '';
    return localProjectPreviews[project.slug] || '';
  } else if (normalized.includes('/src/assets/')) {
    return localProjectPreviews[project.slug] || '';
  }
  return source;
};

export const getProjectPreviewAlt = (project: Project) => {
  switch (project.slug) {
    case 'petrol-pump-management-system':
      return 'PPMS desktop dashboard showing fuel sales, HSD, PMG and XTRON stock, expenses, and station operations.';
    case 'revaluehub':
      return 'ReValueHub discovery feed with category filters and example community listings.';
    case 'expenseflow':
      return 'ExpenseFlow dashboard displaying the project’s bundled sample transactions, category breakdown, and recent activity.';
    case 'technova-store':
      return 'TechNova storefront home page showing its navigation, shop headline, and product categories.';
    case 'online-course-platform':
      return 'Clearly labeled interface mockup illustrating the course platform student portal; not an application screenshot.';
    default:
      return `${project.title} project preview`;
  }
};

export const getProjectPreviewNote = (project: Project) => {
  if (project.slug === 'revaluehub') return 'Example listings';
  if (project.slug === 'expenseflow') return 'Demo transactions';
  return '';
};

export const getProjectCaseStudyDetails = (project: Project) =>
  projectCaseStudyDetails[project.slug];

export const getProjectSortOrder = (project: Project) =>
  project.slug === 'petrol-pump-management-system' ? 0 : project.sort_order;

export const hasProjectPreview = (project: Project) => Boolean(getProjectPreviewSrc(project));
