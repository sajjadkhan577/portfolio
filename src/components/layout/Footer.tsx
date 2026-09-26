import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { SiteSettings } from '../../data/initialData';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[var(--bg-primary)] border-t border-[var(--border-color)] pt-16 pb-12 text-[var(--text-muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[var(--border-color)]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-glow)] flex items-center justify-center font-bold text-[var(--accent-color)] text-sm">
                SK
              </div>
              <span className="font-display font-bold text-lg text-[var(--text-primary)]">
                Sajjad Khan
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
              Full-Stack Web Developer building high-performance websites, custom student portals, automated lead booking engines, and scalable web platforms for coaches, consultants, course creators, and businesses worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-color)] pt-1">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-pulse"></span>
              {settings.availability_text}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/work')}
                  className="hover:text-[var(--accent-color)] transition-colors cursor-pointer text-left block"
                >
                  Featured Projects
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="hover:text-[var(--accent-color)] transition-colors cursor-pointer text-left block"
                >
                  Services & Pricing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/process')}
                  className="hover:text-[var(--accent-color)] transition-colors cursor-pointer text-left block"
                >
                  Client Process (4 Steps)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/faq')}
                  className="hover:text-[var(--accent-color)] transition-colors cursor-pointer text-left block"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-[var(--accent-color)] transition-colors cursor-pointer text-left block"
                >
                  Book a Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-4">
              Direct Channels
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="flex items-center gap-2 hover:text-[var(--accent-color)] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[var(--accent-color)]" />
                  <span>{settings.contact_email}</span>
                </a>
              </li>
              {settings.linkedin_url && (
                <li>
                  <a
                    href={settings.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[var(--accent-color)] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[var(--accent-color)]" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                  </a>
                </li>
              )}
              {settings.github_url && (
                <li>
                  <a
                    href={settings.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[var(--accent-color)] transition-colors"
                  >
                    <Github className="w-4 h-4 text-[var(--accent-color)]" />
                    <span>GitHub Profile</span>
                    <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                  </a>
                </li>
              )}
              {settings.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[var(--accent-color)] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-[var(--accent-color)]" />
                    <span>WhatsApp: {settings.whatsapp}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} Sajjad Khan. All rights reserved. Peshawar, Pakistan • Worldwide Remote.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono">Built with Clean TypeScript & 90+ Speed</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-dark)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-glow)] transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
