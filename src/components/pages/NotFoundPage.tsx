import React from 'react';
import { Compass, ArrowLeft, Home, FolderGit2, Calendar } from 'lucide-react';
import { Card, Button } from '../ui/Button';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[var(--bg-primary)] relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent-color)]/10 rounded-full blur-3xl pointer-events-none" />

      <Card className="w-full max-w-lg border-[var(--border-color)] bg-[var(--bg-surface)] p-8 text-center space-y-6 relative shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 text-[var(--accent-color)] flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-color)]">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
            Architecture Not Found
          </h1>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md mx-auto">
            The page, route, or case study you requested does not exist or may have been updated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('/')}
            leftIcon={<Home className="w-4 h-4 text-[var(--bg-primary)]" />}
          >
            Return to Homepage
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => onNavigate('/work')}
            leftIcon={<FolderGit2 className="w-4 h-4 text-[var(--accent-color)]" />}
          >
            Explore Projects
          </Button>
        </div>

        <div className="pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)] font-mono">
          <span>Looking to initiate a project? </span>
          <button
            onClick={() => onNavigate('/contact')}
            className="text-[var(--accent-color)] hover:underline cursor-pointer"
          >
            Contact Sajjad Directly →
          </button>
        </div>
      </Card>
    </div>
  );
};
