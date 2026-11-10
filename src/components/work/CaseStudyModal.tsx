import React from 'react';
import { ArrowLeft, ExternalLink, Github, X } from 'lucide-react';
import { Project } from '../../data/initialData';
import { getProjectCaseStudyDetails, getProjectPreviewAlt, getProjectPreviewSrc, isPublicUrl } from '../../data/projectPresentation';
import { Button } from '../ui/Button';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;
  const previewSrc = getProjectPreviewSrc(project);
  const caseStudyDetails = getProjectCaseStudyDetails(project);
  const galleryImages = project.gallery
    .filter((image) => image && image !== project.cover_image_url)
    .filter((image) => image.startsWith('/assets/images/'));

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="relative w-full max-w-4xl bg-[var(--bg-primary)] border border-[var(--border-color)] max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        <header className="sticky top-0 z-10 bg-[var(--bg-primary)] px-5 sm:px-7 py-4 border-b border-[var(--border-color)] flex items-center justify-between">
          <span className="text-xs font-mono text-[var(--text-muted)]">PROJECT / {project.slug}</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            aria-label="Close case study"
          >
            <X size={19} />
          </button>
        </header>

        <div className="overflow-y-auto p-5 sm:p-8 space-y-7">
          <div>
            <h2 id="case-study-title" className="text-3xl sm:text-5xl text-[var(--text-primary)] tracking-tight">
              {project.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {project.summary}
            </p>
          </div>

          <div className="relative aspect-video w-full overflow-hidden border border-[var(--border-color)] bg-[var(--bg-strip)]">
            {previewSrc ? (
              <img src={previewSrc} alt={getProjectPreviewAlt(project)} className="w-full h-full object-cover object-top" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[var(--text-muted)]">
                Project preview not provided
              </div>
            )}
          </div>

          {caseStudyDetails && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--text-muted)]">
                <span>{caseStudyDetails.category}</span>
                <span>Role: {caseStudyDetails.role}</span>
                {caseStudyDetails.context && <span>{caseStudyDetails.context}</span>}
              </div>
              <div className="border-t border-[var(--border-color)] pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Key features</p>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-[var(--text-primary)]">
                  {caseStudyDetails.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </div>
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {galleryImages.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt={`${project.title} interface showing ${image.includes('fuel-performance') ? 'fuel performance and stock' : 'recent station register activity'}.`}
                      className="w-full border border-[var(--border-color)]"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {isPublicUrl(project.live_url) && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--text-primary)] hover:text-[var(--accent-color)]">
                <ExternalLink size={15} aria-hidden="true" /> Visit live site
              </a>
            )}
            {isPublicUrl(project.repo_url) && (
              <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--text-primary)] hover:text-[var(--accent-color)]">
                <Github size={15} aria-hidden="true" /> View source
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {project.problem && (
              <div className="border-t border-[var(--border-color)] pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">The challenge</p>
                <p className="mt-2 text-sm text-[var(--text-primary)] leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="border-t border-[var(--border-color)] pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">My contribution</p>
                <p className="mt-2 text-sm text-[var(--text-primary)] leading-relaxed">{project.solution}</p>
              </div>
            )}
          </div>

          {project.tech.length > 0 && (
            <div className="border-t border-[var(--border-color)] pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Technologies</p>
              <div className="flex flex-wrap gap-3 mt-3">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs font-mono text-[var(--text-primary)]">{tech}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer className="px-5 sm:px-7 py-4 border-t border-[var(--border-color)]">
          <Button variant="ghost" size="sm" onClick={onClose} leftIcon={<ArrowLeft size={15} />}>
            Back to the portfolio
          </Button>
        </footer>
      </section>
    </div>
  );
};
