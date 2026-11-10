import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Project } from '../../data/initialData';
import { getProjectCaseStudyDetails, getProjectPreviewAlt, getProjectPreviewSrc } from '../../data/projectPresentation';

interface DesktopProjectFeatureProps {
  project: Project;
  number: number;
  onSelectProject: (project: Project) => void;
}

export const DesktopProjectFeature: React.FC<DesktopProjectFeatureProps> = ({
  project,
  number,
  onSelectProject,
}) => {
  const details = getProjectCaseStudyDetails(project);
  const previewSrc = getProjectPreviewSrc(project);

  if (!details || !previewSrc) return null;

  return (
    <article className="project-desktop-feature">
      <div className="project-desktop-visual">
        <button
          type="button"
          className="project-desktop-image-button"
          onClick={() => onSelectProject(project)}
          aria-label={`Open ${project.title} case study`}
        >
          <img src={previewSrc} alt={getProjectPreviewAlt(project)} loading="eager" decoding="async" />
        </button>
        <p className="project-desktop-caption">Windows desktop software <span>·</span> Offline-first</p>
      </div>

      <div className="project-desktop-copy">
        <p className="project-desktop-kicker">PROJECT / {String(number).padStart(2, '0')} <span>·</span> {details.category}</p>
        <h2 className="project-desktop-title">{project.title}</h2>
        <p className="project-desktop-summary">{project.summary}</p>

        <div className="project-desktop-meta">
          <div>
            <p className="project-desktop-label">The problem</p>
            <p>{project.problem}</p>
          </div>
          <div>
            <p className="project-desktop-label">My role</p>
            <p>{details.role}</p>
          </div>
        </div>

        <ul className="project-desktop-features" aria-label="Key features">
          {details.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>

        <div className="project-desktop-footer">
          <div className="project-desktop-tech" aria-label="Technologies used">
            {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
          </div>
          <button type="button" onClick={() => onSelectProject(project)}>
            Project details <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};
