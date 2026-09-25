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
    <footer className="w-full bg-[#0a0e17] border-t border-[#1e293b] pt-16 pb-12 text-[#94a3b8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1e293b]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1e293b] border border-[#334155] flex items-center justify-center font-bold text-[#00e599] text-sm">
                SK
              </div>
              <span className="font-display font-bold text-lg text-[#f8fafc]">
                Sajjad Khan
              </span>
            </div>
            <p className="text-sm text-[#94a3b8] max-w-md leading-relaxed">
              Full-Stack Web Developer building high-performance websites, custom student portals, automated lead booking engines, and scalable web platforms for coaches, consultants, course creators, and businesses worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00e599] pt-1">
              <span className="w-2 h-2 rounded-full bg-[#00e599] animate-pulse"></span>
              {settings.availability_text}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#f8fafc] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/work')}
                  className="hover:text-[#00e599] transition-colors cursor-pointer text-left block"
                >
                  Featured Projects
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="hover:text-[#00e599] transition-colors cursor-pointer text-left block"
                >
                  Services & Pricing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/process')}
                  className="hover:text-[#00e599] transition-colors cursor-pointer text-left block"
                >
                  Client Process (4 Steps)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/faq')}
                  className="hover:text-[#00e599] transition-colors cursor-pointer text-left block"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-[#00e599] transition-colors cursor-pointer text-left block"
                >
                  Book a Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#f8fafc] mb-4">
              Direct Channels
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="flex items-center gap-2 hover:text-[#00e599] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#00e599]" />
                  <span>{settings.contact_email}</span>
                </a>
              </li>
              {settings.linkedin_url && (
                <li>
                  <a
                    href={settings.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#00e599] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#00e599]" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3 text-[#64748b]" />
                  </a>
                </li>
              )}
              {settings.github_url && (
                <li>
                  <a
                    href={settings.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#00e599] transition-colors"
                  >
                    <Github className="w-4 h-4 text-[#00e599]" />
                    <span>GitHub Profile</span>
                    <ExternalLink className="w-3 h-3 text-[#64748b]" />
                  </a>
                </li>
              )}
              {settings.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#00e599] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-[#00e599]" />
                    <span>WhatsApp: {settings.whatsapp}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <p>© {new Date().getFullYear()} Sajjad Khan. All rights reserved. Peshawar, Pakistan • Worldwide Remote.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono">Built with Clean TypeScript & 90+ Speed</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#1e293b] hover:bg-[#273549] text-[#94a3b8] hover:text-[#f8fafc] border border-[#334155] transition-colors flex items-center gap-1 cursor-pointer"
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
