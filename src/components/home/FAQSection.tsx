import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '../../data/initialData';
import { Section } from '../ui/FormElements';
import { Card } from '../ui/Button';

interface FAQSectionProps {
  faqs: FAQ[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <Section
      id="faq"
      eyebrow="Clear Answers"
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about working together, timelines, technology selection, and post-launch maintenance."
    >
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <Card
              key={faq.id || index}
              className="border-[var(--border-color)] bg-[var(--bg-surface)]/80 p-5 sm:p-6 transition-all"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-bold text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors">
                  {faq.question}
                </span>
                <span
                  className={`p-1.5 rounded-lg bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[var(--accent-color)]' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="pt-4 mt-4 border-t border-[var(--border-color)] text-sm text-[var(--text-muted)] leading-relaxed animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </Section>
  );
};
