import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
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

  const navLinks = [
    { label: 'Work', href: '#projects', path: '/work' },
    { label: 'Services', href: '#services', path: '/' },
    { label: 'Process', href: '#process', path: '/' },
    { label: 'About', href: '#about', path: '/' },
    { label: 'FAQ', href: '#faq', path: '/' },
    { label: 'Contact', href: '#contact', path: '/contact' },
  ];

  const handleLinkClick = (link: { label: string; href: string; path: string }) => {
    setIsMobileMenuOpen(false);
    if (currentPath === '/' && link.href.startsWith('#')) {
      const el = document.querySelector(link.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onNavigate(link.path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-color)]/80 bg-[var(--bg-primary)]/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--bg-surface-elevated)] to-[var(--bg-primary)] border border-[var(--border-glow)] flex items-center justify-center font-bold text-[var(--accent-color)] group-hover:border-[var(--accent-color)]/60 transition-colors">
              SK
            </div>
            <div>
              <span className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent-color)] transition-colors">
                Sajjad Khan
              </span>
              <span className="hidden sm:block text-[11px] font-mono text-[var(--text-muted)] -mt-0.5">
                Full-Stack Web Developer
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className="px-3.5 py-1.5 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]/60 rounded-lg transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle dark/light theme"
              className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] border border-transparent hover:border-[var(--border-glow)] transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Primary CTA */}
            <button
              onClick={() => {
                if (currentPath === '/') {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onNavigate('/contact');
                }
              }}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--bg-primary)] bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] rounded-xl shadow-md shadow-[var(--accent-color)]/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Book a Call
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border-color)] space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded-xl transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-[var(--border-color)]">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('/contact');
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-[var(--bg-primary)] bg-[var(--accent-color)] rounded-xl"
              >
                Book a Free Strategy Call
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};