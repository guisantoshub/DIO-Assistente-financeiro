import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'petrol' | 'emerald' | 'amber' | 'rose' | 'slate' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'petrol',
  size = 'md',
  className = '',
  icon
}) => {
  const variantStyles = {
    petrol: 'bg-[#004d40]/10 text-[#004d40] border-[#004d40]/20 font-medium',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 font-medium',
    rose: 'bg-rose-50 text-rose-700 border-rose-200 font-medium',
    slate: 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
    outline: 'border-slate-300 text-slate-600 bg-transparent'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded-full',
    md: 'text-xs px-2.5 py-1 rounded-full'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
