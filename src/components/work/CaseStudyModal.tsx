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
      <div className="relative w-full max-w-4xl bg-[#111827] border border-[#1e293b] rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-[#111827]/95 backdrop-blur-md px-6 py-4 border-b border-[#1e293b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="accent">Case Study</Badge>
            <span className="text-xs font-mono text-[#94a3b8]">/{project.slug}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] transition-colors cursor-pointer"
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
                <span className="text-xs font-mono text-[#00e599] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Client: {project.client_name}
                </span>
              ) : (
                <span className="text-xs font-mono text-[#f59e0b] flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Client Name Protected / Confidential
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc]">
              {project.title}
            </h2>
            <p className="mt-2 text-base text-[#94a3b8] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Screenshot Hero */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#1e293b] bg-[#0a0e17]">
            {project.cover_image_url ? (
              <img
                src={project.cover_image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm font-mono text-[#64748b]">
                [Platform Screenshot]
              </div>
            )}
          </div>

          {/* Action Links Bar */}
          <div className="flex items-center gap-3 flex-wrap p-4 rounded-xl bg-[#0a0e17] border border-[#1e293b]">
            {project.live_url && (
              <a
                href={project.live_url.includes('[') ? undefined : project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold ${
                  project.live_url.includes('[')
                    ? 'bg-[#1e293b] text-[#64748b] cursor-not-allowed'
                    : 'bg-[#00e599] text-[#0a0e17] hover:bg-[#00cc88]'
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
                    ? 'border-[#334155] text-[#64748b] cursor-not-allowed'
                    : 'border-[#334155] text-[#f8fafc] hover:border-[#00e599] hover:text-[#00e599]'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#0a0e17] border border-[#1e293b] space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-400">
                The Business Problem
              </span>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0a0e17] border border-[#1e293b] space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00e599]">
                What Sajjad Engineered
              </span>
              <p className="text-sm text-[#f8fafc] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Measurable Results */}
          {project.result && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#00e599]/10 via-[#111827] to-[#111827] border border-[#00e599]/30 space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00e599] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Measurable Impact & Client Result
              </span>
              <p className="text-sm sm:text-base text-[#f8fafc] font-medium leading-relaxed">
                {project.result}
              </p>
            </div>
          )}

          {/* Tech Stack Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748b]">
              Architectural Stack & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-[#1e293b] text-xs font-mono text-[#00e599] border border-[#334155]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0a0e17] border-t border-[#1e293b] flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onClose} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Portfolio
          </Button>
          <span className="text-xs font-mono text-[#64748b]">
            Architected by Sajjad Khan
          </span>
        </div>
      </div>
    </div>
  );
};
