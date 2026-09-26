import React from 'react';
import { Quote, ShieldCheck, Star } from 'lucide-react';
import { Testimonial } from '../../data/initialData';
import { Section } from '../ui/FormElements';
import { Card } from '../ui/Button';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <Section
      id="testimonials"
      eyebrow="Client Endorsement"
      title="Trusted by Creators & Founders"
      subtitle="Authentic feedback from educators and founders who rely on high-performing platforms to run their businesses."
    >
      <div
        className={
          testimonials.length === 1
            ? 'max-w-4xl mx-auto'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'
        }
      >
        {testimonials.map((t, idx) => (
          <Card
            key={t.id || idx}
            hoverEffect
            className="border-[var(--border-color)] bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-primary)] p-7 sm:p-8 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-4 right-6 text-[var(--bg-surface-elevated)] pointer-events-none">
              <Quote className="w-16 h-16 opacity-20" />
            </div>

            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-[11px] font-mono text-[var(--text-muted)] ml-2">Verified Collaboration</span>
              </div>

              <blockquote className="text-sm sm:text-base text-[var(--text-primary)] font-normal leading-relaxed italic mb-8 relative z-10">
                "{t.quote.replace(/^["']|["']$/g, '')}"
              </blockquote>
            </div>

            <div className="flex items-center gap-3.5 pt-5 border-t border-[var(--border-color)]">
              <div className="w-11 h-11 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--accent-color)]/40 flex items-center justify-center font-bold text-[var(--accent-color)] text-sm shrink-0">
                {t.author_name.charAt(0) === '[' ? 'C' : t.author_name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-[var(--text-primary)] truncate">
                    {t.author_name}
                  </h4>
                  <span title="Verified Client" className="shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[var(--accent-color)]" />
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] truncate">
                  {t.author_role}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};
