import React from 'react';
import { ExternalLink, Github, ArrowRight, Eye, ShieldAlert, Sparkles } from 'lucide-react';
import { Project } from '../../data/initialData';
import { Section } from '../ui/FormElements';
import { Card, Badge, Button } from '../ui/Button';

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
  // Show featured projects on home (or first 4)
  const displayProjects = projects.filter((p) => p.featured || p.sort_order <= 4);

  return (
    <Section
      id="projects"
      eyebrow="Proven Client Work & Architecture"
      title="Featured Platforms & Production Systems"
      subtitle="Real-world applications engineered for real business constraints—handling authentication, payment receipts, offline workflows, and high transaction volumes."
    >
      <div className="space-y-12">
        {displayProjects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <Card
              key={project.id || project.slug}
              hoverEffect
              className="border-[var(--border-color)] bg-[var(--bg-surface)]/90 p-6 sm:p-8"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                {/* Visual / Screenshot Column */}
                <div
                  className={`lg:col-span-6 relative overflow-hidden rounded-xl border border-[var(--border-color)] group cursor-pointer ${
                    isEven ? '' : 'lg:col-start-7'
                  }`}
                  onClick={() => onSelectProject(project)}
                >
                  <div className="relative aspect-video w-full bg-[var(--bg-primary)] overflow-hidden">
                    {project.cover_image_url ? (
                      <img
                        src={project.cover_image_url}
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm font-mono text-[var(--text-muted)] bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-primary)]">
                        <span>[Platform Interface Preview]</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-3 py-1.5 rounded-lg bg-[var(--accent-color)] text-[var(--bg-primary)] text-xs font-semibold flex items-center gap-1 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      View Case Study
                    </span>
                  </div>
                </div>

                {/* Content Breakdown Column */}
                <div
                  className={`lg:col-span-6 space-y-4 ${
                    isEven ? '' : 'lg:col-start-1'
                  }`}
                >
                  {/* Category / Client Privacy Tag */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="accent">
                      {project.tech[0] || 'Full-Stack'}
                    </Badge>
                    {project.show_client_name ? (
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        Client: <strong className="text-[var(--text-primary)]">{project.client_name}</strong>
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-[var(--warn-color)]" />
                        Client Name Confidential
                      </span>
                    )}
                  </div>

                  {/* Title & Summary */}
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-2xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Problem vs. What I Built Accordion */}
                  <div className="space-y-2 text-xs bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-color)]">
                    <div>
                      <span className="text-[var(--text-muted)] font-mono font-semibold uppercase tracking-wider block mb-0.5">
                        The Challenge:
                      </span>
                      <p className="text-[var(--text-muted)] line-clamp-2">{project.problem}</p>
                    </div>
                    <div className="pt-2 border-t border-[var(--border-color)]">
                      <span className="text-[var(--accent-color)] font-mono font-semibold uppercase tracking-wider block mb-0.5">
                        What I Built:
                      </span>
                      <p className="text-[var(--text-primary)] line-clamp-2">{project.solution}</p>
                    </div>
                    {project.result && (
                      <div className="pt-2 border-t border-[var(--border-color)]">
                        <span className="text-[var(--blue-accent)] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 mb-0.5">
                          <Sparkles className="w-3 h-3" />
                          Measurable Outcome:
                        </span>
                        <p className="text-[var(--border-muted)]">{project.result}</p>
                      </div>
                    )}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] text-xs font-mono text-[var(--text-muted)] border border-[var(--border-glow)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onSelectProject(project)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[var(--bg-primary)]" />}
                    >
                      Case Study
                    </Button>

                    {project.live_url && (
                      <a
                        href={project.live_url.includes('[') ? undefined : project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                          project.live_url.includes('[')
                            ? 'border-[var(--border-glow)] text-[var(--text-muted)] cursor-not-allowed'
                            : 'border-[var(--border-glow)] text-[var(--text-primary)] hover:border-[var(--accent-color)]/50 hover:text-[var(--accent-color)]'
                        }`}
                        title={project.live_url.includes('[') ? 'Live demo link placeholder' : 'Open live platform'}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Site</span>
                      </a>
                    )}

                    {project.repo_url && (
                      <a
                        href={project.repo_url.includes('[') ? undefined : project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                          project.repo_url.includes('[')
                            ? 'border-[var(--border-glow)] text-[var(--text-muted)] cursor-not-allowed'
                            : 'border-[var(--border-glow)] text-[var(--text-primary)] hover:border-[var(--accent-color)]/50 hover:text-[var(--accent-color)]'
                        }`}
                        title={project.repo_url.includes('[') ? 'GitHub repository placeholder' : 'View source on GitHub'}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* View All Projects Link */}
      <div className="mt-12 text-center">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => onNavigate('/work')}
          rightIcon={<ArrowRight className="w-4 h-4 text-[var(--accent-color)]" />}
        >
          View All Projects & Architecture Archive
        </Button>
      </div>
    </Section>
  );
};
