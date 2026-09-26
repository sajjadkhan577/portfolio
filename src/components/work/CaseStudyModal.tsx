import React from 'react';
import { X, ExternalLink, Github, Sparkles, ShieldCheck, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Project } from '../../data/initialData';
import { Badge, Button } from '../ui/Button';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-[var(--bg-surface)]/95 backdrop-blur-md px-6 py-4 border-b border-[var(--border-color)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="accent">Case Study</Badge>
            <span className="text-xs font-mono text-[var(--text-muted)]">/{project.slug}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Title & Metadata */}
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              {project.show_client_name ? (
                <span className="text-xs font-mono text-[var(--accent-color)] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Client: {project.client_name}
                </span>
              ) : (
                <span className="text-xs font-mono text-[var(--warn-color)] flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Client Name Protected / Confidential
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
              {project.title}
            </h2>
            <p className="mt-2 text-base text-[var(--text-muted)] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Screenshot Hero */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-primary)]">
            {project.cover_image_url ? (
              <img
                src={project.cover_image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm font-mono text-[var(--text-muted)]">
                [Platform Screenshot]
              </div>
            )}
          </div>

          {/* Action Links Bar */}
          <div className="flex items-center gap-3 flex-wrap p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
            {project.live_url && (
              <a
                href={project.live_url.includes('[') ? undefined : project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold ${
                  project.live_url.includes('[')
                    ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] cursor-not-allowed'
                    : 'bg-[var(--accent-color)] text-[var(--bg-primary)] hover:bg-[var(--accent-hover)]'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Live Platform ({project.live_url})</span>
              </a>
            )}

            {project.repo_url && (
              <a
                href={project.repo_url.includes('[') ? undefined : project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border ${
                  project.repo_url.includes('[')
                    ? 'border-[var(--border-glow)] text-[var(--text-muted)] cursor-not-allowed'
                    : 'border-[var(--border-glow)] text-[var(--text-primary)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
                The Business Problem
              </span>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-color)]">
                What Sajjad Engineered
              </span>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Measurable Results */}
          {project.result && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[var(--accent-color)]/10 via-[var(--bg-surface)] to-[var(--bg-surface)] border border-[var(--accent-color)]/30 space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-color)] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Measurable Impact & Client Result
              </span>
              <p className="text-sm sm:text-base text-[var(--text-primary)] font-medium leading-relaxed">
                {project.result}
              </p>
            </div>
          )}

          {/* Tech Stack Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Architectural Stack & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-[var(--bg-surface-elevated)] text-xs font-mono text-[var(--accent-color)] border border-[var(--border-glow)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[var(--bg-primary)] border-t border-[var(--border-color)] flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Portfolio
          </Button>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Architected by Sajjad Khan
          </span>
        </div>
      </div>
    </div>
  );
};
