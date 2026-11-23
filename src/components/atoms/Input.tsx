import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  iconLeft,
  iconRight,
  className = '',
  id,
  ...props
}, ref) => {
  const automaticId = React.useId();
  const generatedId = id || automaticId;

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={generatedId} className="text-xs font-semibold text-slate-700 tracking-wide">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {iconLeft && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
            {iconLeft}
          </div>
        )}
        <input
          ref={ref}
          id={generatedId}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#004d40] focus:border-transparent ${
            iconLeft ? 'pl-10' : ''
          } ${iconRight ? 'pr-10' : ''} ${
            error ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 hover:border-slate-400'
          } ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3.5 text-slate-400 flex items-center">
            {iconRight}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-rose-600 font-medium">{error}</span>}
      {!error && helperText && <span className="text-xs text-slate-500">{helperText}</span>}
    </div>
  );
});

Input.displayName = 'Input';
