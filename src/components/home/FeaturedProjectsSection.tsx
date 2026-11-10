import React from 'react';
import { ArrowDownRight, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Project } from '../../data/initialData';
import { getProjectPreviewAlt, getProjectPreviewNote, getProjectPreviewSrc, getProjectSortOrder, hasProjectPreview, isPublicUrl } from '../../data/projectPresentation';
import { DesktopProjectFeature } from '../work/DesktopProjectFeature';

interface FeaturedProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigate: (path: string) => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onNavigate,
}) => {
  const displayProjects = projects
    .filter((project) => project.published && (project.slug === 'petrol-pump-management-system' || project.featured || project.sort_order <= 4) && hasProjectPreview(project))
    .sort((a, b) => getProjectSortOrder(a) - getProjectSortOrder(b));
  const desktopFeature = displayProjects.find((project) => project.slug === 'petrol-pump-management-system');
  const standardProjects = displayProjects.filter((project) => project.slug !== 'petrol-pump-management-system');

  return (
    <section id="projects" className="editorial-section">
      <div className="editorial-container">
        <div className="section-heading">
          <p className="section-kicker">Selected work</p>
          <h2 className="section-title">A few things I’ve been building.</h2>
          <p className="section-description">
            A closer look at the problems, decisions, and technology behind selected projects.
          </p>
        </div>

        <div className="project-list">
          {desktopFeature && (
            <DesktopProjectFeature project={desktopFeature} number={1} onSelectProject={onSelectProject} />
          )}
          {standardProjects.map((project, index) => {
            const previewSrc = getProjectPreviewSrc(project);
            const hasLiveSite = isPublicUrl(project.live_url);
            const hasRepository = isPublicUrl(project.repo_url);
            return (
              <article className="project-row" key={project.id || project.slug}>
                <button
                  type="button"
                  className="project-preview"
                  onClick={() => onSelectProject(project)}
                  aria-label={`Open ${project.title} case study`}
                >
                  {previewSrc ? (
                    <>
                      <img
                        src={previewSrc}
                        alt={getProjectPreviewAlt(project)}
                        loading="lazy"
                        decoding="async"
                      />
                      {getProjectPreviewNote(project) && (
                        <span className="project-preview-note">{getProjectPreviewNote(project)}</span>
                      )}
                    </>
                  ) : (
                    <span className="project-preview-empty">
                      <span>
                        <ArrowDownRight size={25} aria-hidden="true" />
                        <span>Project preview not provided</span>
                      </span>
                    </span>
                  )}
                </button>

                <div className="project-copy">
                  <span className="project-number">PROJECT / {String(index + (desktopFeature ? 2 : 1)).padStart(2, '0')}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  {project.problem && (
                    <div className="project-detail">
                      <p className="project-detail-label">The challenge</p>
                      <p>{project.problem}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="project-detail">
                      <p className="project-detail-label">My contribution</p>
                      <p>{project.solution}</p>
                    </div>
                  )}
                  {project.tech.length > 0 && (
                    <div className="project-tech" aria-label="Technologies used">
                      {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
                    </div>
                  )}
                  <div className="project-actions">
                    <button type="button" onClick={() => onSelectProject(project)}>
                      Read the case study <ArrowRight size={14} aria-hidden="true" />
                    </button>
                    {hasLiveSite && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        Live site <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    )}
                    {hasRepository && (
                      <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                        Source code <Github size={13} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="project-all-link">
          <button type="button" className="editorial-button editorial-button-secondary" onClick={() => onNavigate('/work')}>
            Explore all projects <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
