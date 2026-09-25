import React from 'react';
import { MapPin, Globe, Zap, Cpu, Terminal, ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '../../data/initialData';
import { Section } from '../ui/FormElements';
import { Card, Button } from '../ui/Button';

interface AboutSectionProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings, onNavigate }) => {
  return (
    <Section
      id="about"
      eyebrow="Background & Work Ethics"
      title="Engineering Clean Code & Fast Execution"
      subtitle="Coaches and businesses hire me because I treat web development as an investment in business growth, not an expense."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Photo & Location Profile Card */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-[#1e293b] bg-[#111827] p-6 space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#334155] bg-[#0a0e17]">
              <img
                src="/src/assets/images/profile image.jpeg"
                alt="Sajjad Khan - Full-Stack Web Developer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-[#0a0e17]/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#1e293b] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#f8fafc]">Sajjad Khan</h4>
                  <p className="text-xs text-[#00e599] font-mono">Full-Stack Web Developer</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00e599] animate-pulse"></div>
              </div>
            </div>

            {/* Remote Work Standard */}
            <div className="space-y-3 text-xs font-mono text-[#94a3b8]">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0a0e17] border border-[#1e293b]">
                <MapPin className="w-4 h-4 text-[#00e599] shrink-0" />
                <span>Base: Peshawar, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0a0e17] border border-[#1e293b]">
                <Globe className="w-4 h-4 text-[#00e599] shrink-0" />
                <span>Working Remotely with Clients Worldwide (UTC+5)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0a0e17] border border-[#1e293b]">
                <Zap className="w-4 h-4 text-[#00e599] shrink-0" />
                <span>Sub-Second Response & Async Video Demos</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Narrative & Engineering Values */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4 text-base text-[#94a3b8] leading-relaxed">
            <p className="text-lg text-[#f8fafc] font-medium leading-relaxed">
              I specialize in engineering full-stack platforms for clients who need dependable systems: coaches scaling their calendar, course creators needing custom gated portals with verified payments, and founders building robust web applications.
            </p>
            <p>
              I work comfortably across both traditional, battle-tested server architectures (<strong className="text-[#f8fafc]">PHP + MySQL</strong>) and modern full-stack JavaScript ecosystems (<strong className="text-[#f8fafc]">React, Node.js, Express, MongoDB, Tailwind CSS</strong>).
            </p>
            <p>
              When a client works with me, they get direct access to the engineer doing the work—no account managers, no inflated junior agency billing, and no code obfuscation.
            </p>
          </div>

          {/* Core Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#111827] border border-[#1e293b] space-y-1.5">
              <div className="flex items-center gap-2 text-[#00e599]">
                <Zap className="w-4 h-4" />
                <h5 className="text-sm font-bold text-[#f8fafc]">Performance as a Feature</h5>
              </div>
              <p className="text-xs text-[#94a3b8]">
                Every millisecond of page load counts toward your conversion. I build sites targeting 90+ Lighthouse mobile speed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#111827] border border-[#1e293b] space-y-1.5">
              <div className="flex items-center gap-2 text-[#00e599]">
                <Cpu className="w-4 h-4" />
                <h5 className="text-sm font-bold text-[#f8fafc]">Zero SaaS Lock-in</h5>
              </div>
              <p className="text-xs text-[#94a3b8]">
                Why pay $300/month forever for cookie-cutter LMS platforms? You own your code, database, and customer relationships.
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 flex items-center gap-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('/contact')}
              rightIcon={<ArrowUpRight className="w-4 h-4 text-[#0a0e17]" />}
            >
              Start a Conversation
            </Button>
            <a
              href={settings.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#94a3b8] hover:text-[#00e599] transition-colors"
            >
              <Terminal className="w-4 h-4" />
              <span>Review GitHub Repositories</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};
