import React from 'react';
import { Card } from '../atoms/Card';

export interface MetricCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
  variant?: 'default' | 'petrol' | 'subtle';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subValue,
  icon,
  badge,
  variant = 'default',
  className = ''
}) => {
  return (
    <Card variant={variant} className={`flex flex-col gap-3 relative overflow-hidden ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="w-8 h-8 rounded-lg bg-[#004d40]/10 text-[#004d40] flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
        {subValue && (
          <p className="text-xs text-slate-500 mt-1 font-medium">{subValue}</p>
        )}
      </div>
      {badge && <div className="mt-1">{badge}</div>}
    </Card>
  );
};
