import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '../../data/initialData';

interface HeroSectionProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings, onNavigate }) => {
  const seededHeadline =
    'I build fast, high-converting websites and platforms for coaches, consultants, course creators and small businesses.';
  const seededSubheadline =
    'From student portals with verified enrollment to automated booking funnels and client dashboards. Engineered for speed, clean architecture, and measurable client results.';
  const headline = settings.hero_headline === seededHeadline
    ? 'Turning ideas into powerful digital experiences.'
    : settings.hero_headline || 'Turning ideas into powerful digital experiences.';
  const subheadline = settings.hero_subheadline === seededSubheadline
    ? 'I build modern, responsive websites and web applications that help businesses establish their online presence, connect with customers, and grow.'
    : settings.hero_subheadline || 'I build modern, responsive websites and web applications that help businesses establish their online presence, connect with customers, and grow.';

  const viewWork = () => {
    const projects = document.getElementById('projects');
    if (projects) projects.scrollIntoView({ behavior: 'smooth' });
    else onNavigate('/work');
  };

  const contact = () => {
    const section = document.getElementById('contact');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    else onNavigate('/contact');
  };

  return (
    <section className="hero-editorial">
      <div className="editorial-container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">Independent developer · Peshawar, Pakistan</p>
          <h1 className="hero-title">{headline}</h1>
          <p className="hero-description">{subheadline}</p>
          <div className="hero-actions">
            <button type="button" className="editorial-button" onClick={viewWork}>
              View my work <ArrowDown size={15} aria-hidden="true" />
            </button>
            <button type="button" className="editorial-button editorial-button-secondary" onClick={contact}>
              Let’s work together <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>
          <div className="hero-availability">
            <span
              className={settings.availability_open ? 'availability-dot' : 'availability-dot is-closed'}
              aria-hidden="true"
            />
            <span>{settings.availability_text}</span>
          </div>
        </div>

        <div className="hero-art" aria-label="A small preview of my approach to building for the web">
          <div className="hero-art-index">
            <span>BUILD / 001</span>
            <span>Thoughtful by design</span>
          </div>
          <div className="hero-code" aria-hidden="true">
            <div className="hero-code-line"><span className="hero-code-number">01</span><span><span className="hero-code-key">const</span> approach = {'{'}</span></div>
            <div className="hero-code-line hero-code-indent"><span className="hero-code-number">02</span><span>people: <span className="hero-code-value">'first'</span>,</span></div>
            <div className="hero-code-line hero-code-indent"><span className="hero-code-number">03</span><span>purpose: <span className="hero-code-value">'clear'</span>,</span></div>
            <div className="hero-code-line hero-code-indent"><span className="hero-code-number">04</span><span>details: <span className="hero-code-value">'considered'</span></span></div>
            <div className="hero-code-line"><span className="hero-code-number">05</span><span>{'}'}<span className="hero-code-cursor" /></span></div>
          </div>
          <div className="hero-art-caption">
            <strong>Design with intent.</strong>
            <span>Then build it to last.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
