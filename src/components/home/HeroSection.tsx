import React from 'react';
import { ArrowRight, CheckCircle2, Calendar, FolderGit2, Sparkles } from 'lucide-react';
import { SiteSettings } from '../../data/initialData';
import { Button } from '../ui/Button';
import { Hero3DCanvas } from '../hero/Hero3DCanvas';

interface HeroSectionProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings, onNavigate }) => {
  const handleBookCall = () => {
    if (settings.booking_url && !settings.booking_url.includes('[')) {
      window.open(settings.booking_url, '_blank');
    } else {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('/contact');
      }
    }
  };

  const handleViewWork = () => {
    const projectsEl = document.querySelector('#projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('/work');
    }
  };

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#00e599]/10 via-[#38bdf8]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Hook & Direct CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111827] border border-[#1e293b] text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e599] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e599]"></span>
              </span>
              <span className="text-[#f8fafc] font-medium">
                {settings.availability_text}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl/tight font-extrabold tracking-tight text-[#f8fafc]">
              I build websites and platforms for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e599] to-[#38bdf8]">
                coaches, consultants, course creators
              </span>{' '}
              and small businesses.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed max-w-2xl">
              {settings.hero_subheadline}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleBookCall}
                leftIcon={<Calendar className="w-4 h-4 text-[#0a0e17]" />}
                rightIcon={<ArrowRight className="w-4 h-4 text-[#0a0e17]" />}
              >
                Book a free call
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleViewWork}
                leftIcon={<FolderGit2 className="w-4 h-4 text-[#00e599]" />}
              >
                View my work
              </Button>
            </div>

            {/* Key Value Proof Metrics */}
            <div className="pt-4 border-t border-[#1e293b] grid grid-cols-3 gap-4 max-w-xl text-xs sm:text-sm font-mono text-[#94a3b8]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00e599] shrink-0" />
                <span>PHP + MySQL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00e599] shrink-0" />
                <span>React + Node.js</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#00e599] shrink-0" />
                <span>90+ Speed Target</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Architecture Hub */}
          <div className="lg:col-span-5 relative">
            <Hero3DCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};
