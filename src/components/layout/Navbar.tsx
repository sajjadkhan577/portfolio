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
    <header className="sticky top-0 z-50 w-full border-b border-[#1e293b]/80 bg-[#0a0e17]/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e293b] to-[#0a0e17] border border-[#334155] flex items-center justify-center font-bold text-[#00e599] group-hover:border-[#00e599]/60 transition-colors">
              SK
            </div>
            <div>
              <span className="font-display font-bold text-base sm:text-lg text-[#f8fafc] tracking-tight group-hover:text-[#00e599] transition-colors">
                Sajjad Khan
              </span>
              <span className="hidden sm:block text-[11px] font-mono text-[#94a3b8] -mt-0.5">
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
                className="px-3.5 py-1.5 text-sm font-medium text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b]/60 rounded-lg transition-colors cursor-pointer"
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
              className="p-2 rounded-xl text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] border border-transparent hover:border-[#334155] transition-colors cursor-pointer"
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
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#0a0e17] bg-[#00e599] hover:bg-[#00cc88] rounded-xl shadow-md shadow-[#00e599]/20 transition-all flex items-center gap-1.5 cursor-pointer"
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
              className="p-2 rounded-lg text-[#94a3b8] hover:text-[#f8fafc]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1e293b] space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] rounded-xl transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-[#1e293b]">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('/contact');
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-[#0a0e17] bg-[#00e599] rounded-xl"
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