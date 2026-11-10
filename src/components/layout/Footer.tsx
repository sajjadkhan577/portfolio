import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { SiteSettings } from '../../data/initialData';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => (
  <footer className="editorial-footer">
    <div className="editorial-container editorial-footer-inner">
      <p>© {new Date().getFullYear()} Sajjad Khan · Full-stack web developer</p>
      <nav className="editorial-footer-links" aria-label="Footer navigation">
        <a href={`mailto:${settings.contact_email}`}>
          <Mail size={12} aria-hidden="true" /> Email
        </a>
        {settings.github_url && (
          <a href={settings.github_url} target="_blank" rel="noopener noreferrer">
            <Github size={12} aria-hidden="true" /> GitHub
          </a>
        )}
        {settings.linkedin_url && (
          <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer">
            <Linkedin size={12} aria-hidden="true" /> LinkedIn
          </a>
        )}
        <button type="button" onClick={() => onNavigate('/contact')}>Contact</button>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <ArrowUp size={12} aria-hidden="true" /> Top
        </button>
      </nav>
    </div>
  </footer>
);
