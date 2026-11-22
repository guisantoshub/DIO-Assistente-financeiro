import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Settings, 
  DollarSign, 
  ChevronDown, 
  LogOut, 
  User, 
  ShieldCheck
} from 'lucide-react';
import type { NotificationItem } from '../../types';

export interface ModernHeaderProps {
  isSidebarExpanded: boolean;
  showBRL: boolean;
  onToggleBRL: () => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onLogout: () => void;
  onOpenUserProfile: () => void;
}

export const ModernHeader: React.FC<ModernHeaderProps> = ({
  isSidebarExpanded,
  showBRL,
  onToggleBRL,
  notifications,
  onOpenNotifications,
  onOpenSettings,
  onOpenHelp,
  onLogout,
  onOpenUserProfile
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-300 flex items-center justify-between px-4 sm:px-6 ${
        isSidebarExpanded ? 'left-64' : 'left-20'
      }`}
    >
      {/* Left: Search input */}
      <div className="flex-1 max-w-md relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar contas, transações, investimentos ou MCP..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004d40] focus:border-transparent transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 ml-4">
        
        {/* Currency Switcher */}
        <button
          onClick={onToggleBRL}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            showBRL
              ? 'bg-[#e0f2f1] text-[#004d40] border-[#004d40]/30 shadow-2xs'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
          title="Alternar moeda entre Dólar (USD) e Reais (BRL)"
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{showBRL ? 'Cotação: R$ 5,85' : 'USD'}</span>
        </button>

        {/* Help Button */}
        <button
          onClick={onOpenHelp}
          className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          title="Ver o Caminho da Resposta (Arquitetura MCP)"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          title="Configuração dos Servidores MCP (Pluggy & Plaid)"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          title="Notificações e Avisos Bancários"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* User Pill with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-xl hover:bg-slate-100 transition-all cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
              GS
            </div>
            <div className="hidden md:block">
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                Guilherme Santos
              </span>
              <span className="text-[10px] text-slate-500 block leading-tight truncate max-w-[130px]">
                guilherme.santos@dio.demo
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-900 block">Perfil do Investidor</span>
                <span className="text-[11px] text-[#004d40] font-medium flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Perfil Moderado (Bradesco)
                </span>
              </div>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onOpenUserProfile();
                }}
                className="w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Gerenciar Perfis & Usuários</span>
              </button>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onOpenSettings();
                }}
                className="w-full px-3 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Configurar Servidores MCP</span>
              </button>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onLogout();
                }}
                className="w-full px-3 py-2 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair da Plataforma</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
