import React from 'react';
import { ArrowUpRight, Github, Linkedin, MapPin } from 'lucide-react';
import { SiteSettings } from '../../data/initialData';

interface AboutSectionProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings, onNavigate }) => (
  <section id="about" className="editorial-section">
    <div className="editorial-container about-grid">
      <figure className="about-photo">
        <img
          src="/assets/images/profile%20image.jpeg"
          alt="Sajjad Khan, full-stack web developer"
          loading="lazy"
          decoding="async"
        />
        <figcaption className="about-photo-caption">
          <span>Sajjad Khan</span>
          <span><MapPin size={11} aria-hidden="true" /> Peshawar, PK</span>
        </figcaption>
      </figure>

      <div className="about-copy">
        <p className="section-kicker">A little about me</p>
        <h2>I like making useful things work beautifully.</h2>
        <p>
          I’m Sajjad, a full-stack web developer who enjoys turning real-world needs into
          thoughtful digital products. I work across the experience people see and the
          systems that support it—from responsive interfaces to APIs and databases.
        </p>
        <p>
          My approach is collaborative and practical: understand the problem first, keep
          communication clear, and make deliberate choices that leave a product easier
          to use and maintain.
        </p>

        <div className="about-principles">
          <div>
            <h3>Start with the people</h3>
            <p>Useful software begins with a clear picture of who needs it and why.</p>
          </div>
          <div>
            <h3>Care about the details</h3>
            <p>Good structure, responsive layouts, and accessible interactions belong together.</p>
          </div>
        </div>

        <div className="about-links">
          <button type="button" className="editorial-button" onClick={() => onNavigate('/contact')}>
            Get in touch <ArrowUpRight size={14} aria-hidden="true" />
          </button>
          {settings.github_url && (
            <a href={settings.github_url} target="_blank" rel="noopener noreferrer">
              <Github size={14} aria-hidden="true" /> GitHub
            </a>
          )}
          {settings.linkedin_url && (
            <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer">
              <Linkedin size={14} aria-hidden="true" /> LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  </section>
);
