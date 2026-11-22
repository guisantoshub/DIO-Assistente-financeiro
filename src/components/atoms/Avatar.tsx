import React from 'react';
import { Bot, User, Sparkles } from 'lucide-react';

export interface AvatarProps {
  type: 'assistant' | 'user' | 'system';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  type,
  size = 'md',
  className = ''
}) => {
  const sizeStyles = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base'
  };

  if (type === 'assistant') {
    return (
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#004d40] to-[#00796b] text-white shadow-xs ${sizeStyles[size]} ${className}`}
        aria-label="Assistente IA"
      >
        <Bot className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
        </span>
      </div>
    );
  }

  if (type === 'system') {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-slate-200 text-slate-700 ${sizeStyles[size]} ${className}`}
        aria-label="Sistema MCP"
      >
        <Sparkles className="w-4 h-4" />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-slate-800 text-white font-medium ${sizeStyles[size]} ${className}`}
      aria-label="Usuário"
    >
      <User className="w-4 h-4" />
    </div>
  );
};
