import React, { useState } from 'react';
import { ArrowDownRight, Menu, Moon, Sun, X } from 'lucide-react';
import { SiteSettings } from '../../data/initialData';

interface NavbarProps {
  settings: SiteSettings;
  currentPath: string;
  onNavigate: (path: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  currentPath,
  onNavigate,
  theme,
  onToggleTheme,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { label: 'Selected work', href: '#projects', path: '/work' },
    { label: 'Services', href: '#services', path: '/services' },
    { label: 'About', href: '#about', path: '/about' },
  ];

  const handleLink = (href: string, path: string) => {
    setIsMobileMenuOpen(false);
    if (currentPath === '/' && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({}, '', href);
        return;
      }
    }
    onNavigate(path);
  };

  const handleContact = () => {
    setIsMobileMenuOpen(false);
    if (currentPath === '/') {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({}, '', '#contact');
      return;
    }
    onNavigate('/contact');
  };

  return (
    <header className="editorial-nav">
      <div className="editorial-nav-inner">
        <button
          type="button"
          className="editorial-brand"
          onClick={() => onNavigate('/')}
          aria-label="Sajjad Khan, home"
        >
          <span className="editorial-brand-mark" aria-hidden="true">SK</span>
          <span className="editorial-brand-copy">
            <strong>Sajjad Khan</strong>
            <span>Full-stack web developer</span>
          </span>
        </button>

        <nav className="editorial-nav-links" aria-label="Main navigation">
          {links.map((link) => (
            <button type="button" key={link.label} onClick={() => handleLink(link.href, link.path)}>
              {link.label}
            </button>
          ))}
          <button type="button" onClick={handleContact}>Contact</button>
        </nav>

        <div className="editorial-nav-actions">
          <button
            type="button"
            className="editorial-icon-button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button type="button" className="editorial-button" onClick={handleContact}>
            Start a project <ArrowDownRight size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="editorial-menu-button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="editorial-mobile-menu" aria-label="Mobile navigation">
          {links.map((link) => (
            <button type="button" key={link.label} onClick={() => handleLink(link.href, link.path)}>
              {link.label}
            </button>
          ))}
          <button type="button" onClick={handleContact}>Contact</button>
        </nav>
      )}
    </header>
  );
};
