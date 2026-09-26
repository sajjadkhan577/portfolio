import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-[var(--bg-primary)] font-semibold shadow-lg shadow-[var(--accent-color)]/20 hover:shadow-[var(--accent-color)]/30 border border-[var(--accent-color)]',
    secondary:
      'bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-dark)] text-[var(--text-primary)] border border-[var(--border-glow)]',
    outline:
      'bg-transparent hover:bg-[var(--bg-surface-elevated)]/50 text-[var(--text-primary)] border border-[var(--border-glow)] hover:border-[var(--accent-color)]/50',
    ghost:
      'bg-transparent hover:bg-[var(--bg-surface-elevated)]/50 text-[var(--text-muted)] hover:text-[var(--text-primary)]',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white font-medium border border-rose-500',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { hoverEffect?: boolean }> = ({
  children,
  className = '',
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 transition-all duration-300 ${
        hoverEffect
          ? 'hover:border-[var(--border-glow)] hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: 'accent' | 'neutral' | 'success' | 'warning' | 'error';
  className?: string;
}> = ({ children, variant = 'neutral', className = '' }) => {
  const styles = {
    accent: 'bg-[var(--accent-color)]/10 text-[var(--accent-color)] border-[var(--accent-color)]/30',
    neutral: 'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border-[var(--border-glow)]',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border font-mono tracking-wide ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
