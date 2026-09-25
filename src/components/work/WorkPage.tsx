import React, { useState } from 'react';
import { ArrowLeft, Search, ExternalLink, Github, Eye, Sparkles } from 'lucide-react';
import { Project } from '../../data/initialData';
import { Section } from '../ui/FormElements';
import { Card, Badge, Button } from '../ui/Button';

interface WorkPageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigate: (path: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  projects,
  onSelectProject,
  onNavigate,
}) => {
  const [filterTech, setFilterTech] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allTechs = Array.from(new Set(projects.flatMap((p) => p.tech)));

  const filteredProjects = projects.filter((p) => {
    const matchesTech = filterTech === 'all' || p.tech.includes(filterTech);
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTech && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <Section
        id="all-work"
        eyebrow="Architecture & Case Studies"
        title="All Projects & Platform Systems"
        subtitle="Explore full-stack platforms, client LMS deployments, offline PWAs, and e-commerce applications built for speed and reliability."
      >
        {/* Navigation & Filter Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('/')}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Home
            </Button>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects or stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#111827] text-sm text-[#f8fafc] border border-[#1e293b] rounded-xl focus:outline-none focus:border-[#00e599]"
              />
            </div>
          </div>

          {/* Tech Pills */}
          <div className="flex items-center gap-1.5 flex-wrap pt-2">
            <button
              onClick={() => setFilterTech('all')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                filterTech === 'all'
                  ? 'bg-[#00e599] text-[#0a0e17] font-bold'
                  : 'bg-[#111827] text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e293b]'
              }`}
            >
              All Stacks ({projects.length})
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setFilterTech(tech)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  filterTech === tech
                    ? 'bg-[#00e599] text-[#0a0e17] font-bold'
                    : 'bg-[#111827] text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e293b]'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id || project.slug}
              hoverEffect
              className="flex flex-col justify-between border-[#1e293b] bg-[#111827]/90 p-5 group"
            >
              <div className="space-y-4">
                {/* Cover Image */}
                <div
                  className="relative aspect-video rounded-xl overflow-hidden bg-[#0a0e17] border border-[#1e293b] cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  {project.cover_image_url ? (
                    <img
                      src={project.cover_image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#64748b]">
                      [Platform Preview]
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge variant={project.featured ? 'accent' : 'neutral'}>
                      {project.featured ? 'Featured' : 'Production'}
                    </Badge>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-lg font-bold text-[#f8fafc] hover:text-[#00e599] transition-colors cursor-pointer line-clamp-1"
                  >
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#94a3b8] line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-[#1e293b] text-[11px] font-mono text-[#94a3b8] border border-[#334155]"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-2 py-0.5 rounded bg-[#1e293b] text-[11px] font-mono text-[#64748b]">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 mt-4 border-t border-[#1e293b] flex items-center justify-between">
                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#00e599] hover:underline cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.live_url && (
                    <a
                      href={project.live_url.includes('[') ? undefined : project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-[#94a3b8] hover:text-[#00e599] hover:bg-[#1e293b]"
                      title="Live link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.repo_url && (
                    <a
                      href={project.repo_url.includes('[') ? undefined : project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-[#94a3b8] hover:text-[#00e599] hover:bg-[#1e293b]"
                      title="GitHub code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
};
