import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Search } from 'lucide-react';
import { Project } from '../../data/initialData';
import { getProjectPreviewAlt, getProjectPreviewNote, getProjectPreviewSrc, getProjectSortOrder, hasProjectPreview, isPublicUrl } from '../../data/projectPresentation';
import { DesktopProjectFeature } from './DesktopProjectFeature';

interface WorkPageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigate: (path: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ projects, onSelectProject, onNavigate }) => {
  const [filterTech, setFilterTech] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const publishedProjects = projects
    .filter((project) => project.published && hasProjectPreview(project))
    .sort((a, b) => getProjectSortOrder(a) - getProjectSortOrder(b));
  const allTechs = Array.from(new Set(publishedProjects.flatMap((project) => project.tech)));
  const query = searchQuery.trim().toLowerCase();
  const filteredProjects = publishedProjects.filter((project) => {
    const matchesTech = filterTech === 'all' || project.tech.includes(filterTech);
    const matchesQuery = !query ||
      project.title.toLowerCase().includes(query) ||
      project.summary.toLowerCase().includes(query) ||
      project.tech.some((tech) => tech.toLowerCase().includes(query));
    return matchesTech && matchesQuery;
  });

  return (
    <div className="editorial-section">
      <div className="editorial-container">
        <div className="section-heading">
          <p className="section-kicker">Selected work</p>
          <h1 className="section-title">Projects, in context.</h1>
          <p className="section-description">
            A selection of digital products, the needs behind them, and the technology used.
          </p>
        </div>

        <div className="work-toolbar">
          <button type="button" className="work-back" onClick={() => onNavigate('/')}>
            <ArrowLeft size={14} aria-hidden="true" /> Back to the portfolio
          </button>
          <label className="work-search">
            <Search size={15} aria-hidden="true" />
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              placeholder="Search projects or technologies"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="work-filters" aria-label="Filter projects by technology">
          <button
            type="button"
            className={filterTech === 'all' ? 'work-filter is-active' : 'work-filter'}
            onClick={() => setFilterTech('all')}
          >
            All projects <span>{publishedProjects.length}</span>
          </button>
          {allTechs.map((tech) => (
            <button
              type="button"
              key={tech}
              className={filterTech === tech ? 'work-filter is-active' : 'work-filter'}
              aria-pressed={filterTech === tech}
              onClick={() => setFilterTech(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="project-list">
            {filteredProjects.map((project, index) => {
              const previewSrc = getProjectPreviewSrc(project);
              if (project.slug === 'petrol-pump-management-system') {
                return (
                  <DesktopProjectFeature
                    key={project.id || project.slug}
                    project={project}
                    number={index + 1}
                    onSelectProject={onSelectProject}
                  />
                );
              }
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
                        <img src={previewSrc} alt={getProjectPreviewAlt(project)} loading="lazy" decoding="async" />
                        {getProjectPreviewNote(project) && (
                          <span className="project-preview-note">{getProjectPreviewNote(project)}</span>
                        )}
                      </>
                    ) : (
                      <span className="project-preview-empty">
                        <span><ArrowRight size={24} aria-hidden="true" /><span>Project preview not provided</span></span>
                      </span>
                    )}
                  </button>
                  <div className="project-copy">
                    <span className="project-number">PROJECT / {String(index + 1).padStart(2, '0')}</span>
                    <h2 className="project-title">{project.title}</h2>
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
                      {isPublicUrl(project.live_url) && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          Live site <ExternalLink size={13} aria-hidden="true" />
                        </a>
                      )}
                      {isPublicUrl(project.repo_url) && (
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
        ) : (
          <p className="work-empty">No projects match that search. Try another term or technology.</p>
        )}
      </div>
    </div>
  );
};
