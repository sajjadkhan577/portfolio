import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5"
          >
            {label}
            {props.required && <span className="text-[var(--accent-color)] ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3.5 py-2.5 bg-[var(--bg-primary)] text-[var(--text-primary)] border ${
            error ? 'border-rose-500 focus:border-rose-400' : 'border-[var(--border-color)] focus:border-[var(--accent-color)]'
          } rounded-xl text-sm transition-colors duration-200 placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 ${
            error ? 'focus:ring-rose-500' : 'focus:ring-[var(--accent-color)]'
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-[var(--text-muted)]">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const textareaId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5"
          >
            {label}
            {props.required && <span className="text-[var(--accent-color)] ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full px-3.5 py-2.5 bg-[var(--bg-primary)] text-[var(--text-primary)] border ${
            error ? 'border-rose-500 focus:border-rose-400' : 'border-[var(--border-color)] focus:border-[var(--accent-color)]'
          } rounded-xl text-sm transition-colors duration-200 placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 ${
            error ? 'focus:ring-rose-500' : 'focus:ring-[var(--accent-color)]'
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-[var(--text-muted)]">{helperText}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...props }, ref) => {
    const selectId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5"
          >
            {label}
            {props.required && <span className="text-[var(--accent-color)] ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full px-3.5 py-2.5 bg-[var(--bg-primary)] text-[var(--text-primary)] border ${
            error ? 'border-rose-500 focus:border-rose-400' : 'border-[var(--border-color)] focus:border-[var(--accent-color)]'
          } rounded-xl text-sm transition-colors duration-200 focus:outline-none focus:ring-1 ${
            error ? 'focus:ring-rose-500' : 'focus:ring-[var(--accent-color)]'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

export const Section: React.FC<{
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}> = ({ id, eyebrow, title, subtitle, children, className = '', containerClassName = '' }) => {
  return (
    <section id={id} className={`scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-24 relative ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {(eyebrow || title || subtitle) && (
          <div className="max-w-3xl mb-12 sm:mb-16">
            {eyebrow && (
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)]"></span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-color)]">
                  {eyebrow}
                </span>
              </div>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
