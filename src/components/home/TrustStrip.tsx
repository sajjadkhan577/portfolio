import React from 'react';
import { Quote, ShieldCheck } from 'lucide-react';
import { Testimonial } from '../../data/initialData';

interface TrustStripProps {
  testimonial?: Testimonial;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ testimonial }) => {
  const techStack = [
    { name: 'PHP', category: 'Backend' },
    { name: 'MySQL', category: 'Database' },
    { name: 'JavaScript', category: 'Language' },
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express', category: 'Server' },
    { name: 'MongoDB', category: 'NoSQL' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Bootstrap', category: 'UI' },
    { name: 'Git', category: 'DevOps' },
  ];

  return (
    <div className="w-full bg-[var(--bg-strip)] border-y border-[var(--border-color)] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Technologies Grid */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] shrink-0">
            Core Technologies:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className="px-3 py-1 rounded-lg bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent-color)]/40 hover:text-[var(--accent-color)] transition-colors"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Client Verification Snippet */}
        {testimonial && (
          <div className="pt-4 border-t border-[var(--border-color)]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2.5 italic">
              <Quote className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
              <span>{testimonial.quote}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 font-medium text-[var(--text-primary)]">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-color)]" />
              <span>{testimonial.author_name}</span>
              <span className="text-xs text-[var(--text-muted)]">({testimonial.author_role})</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
