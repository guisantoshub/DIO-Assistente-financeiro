import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'subtle' | 'petrol' | 'interactive';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-slate-200/80 shadow-xs',
    subtle: 'bg-slate-50/70 border border-slate-200/60',
    petrol: 'bg-[#004d40]/5 border border-[#004d40]/20',
    interactive: 'bg-white border border-slate-200 shadow-xs hover:border-[#004d40]/40 hover:shadow-md transition-all duration-200 cursor-pointer'
  };

  return (
    <div
      className={`rounded-2xl p-5 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
