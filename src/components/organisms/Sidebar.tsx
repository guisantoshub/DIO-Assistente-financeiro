import React from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  ArrowLeftRight, 
  TrendingUp, 
  Users, 
  GitBranch, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Bot
} from 'lucide-react';

export interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  onToggle,
  activeTab,
  onSelectTab,
  onLogout
}) => {
  const menuItems = [
    {
      id: 'home',
      label: 'Visão Geral (Home)',
      icon: <LayoutDashboard className="w-5 h-5" />,
      badge: null
    },
    {
      id: 'chat',
      label: 'Assistente Chat (IA)',
      icon: <Bot className="w-5 h-5" />,
      badge: 'MCP'
    },
    {
      id: 'transactions',
      label: 'Transações & 3 Padrões',
      icon: <ArrowLeftRight className="w-5 h-5" />,
      badge: 'Plaid'
    },
    {
      id: 'investments',
      label: 'Investimentos',
      icon: <TrendingUp className="w-5 h-5" />,
      badge: 'Moderado'
    },
    {
      id: 'users',
      label: 'Usuários & Perfis',
      icon: <Users className="w-5 h-5" />,
      badge: null
    },
    {
      id: 'architecture',
      label: 'Caminhos & Respostas',
      icon: <GitBranch className="w-5 h-5" />,
      badge: null
    },
    {
      id: 'config',
      label: 'Configurações MCP',
      icon: <Settings className="w-5 h-5" />,
      badge: null
    }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between select-none shadow-xs ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      {/* Top Header & Logo */}
      <div>
        <div
          className={`h-16 border-b border-slate-200 flex items-center transition-all ${
            isExpanded ? 'justify-between px-4' : 'justify-center px-2'
          }`}
        >
          {isExpanded ? (
            <>
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-[#004d40] text-white flex items-center justify-center shadow-xs shrink-0 transition-transform hover:scale-105">
                  <Building2 className="w-5 h-5 text-teal-200" />
                </div>
                <div className="truncate">
                  <span className="font-bold text-slate-900 font-heading text-base tracking-tight block">
                    PetroFinance <span className="text-[#004d40]">AI</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Open Finance & MCP
                  </span>
                </div>
              </div>

              {/* Collapse Button */}
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                title="Recolher Menu Lateral"
                aria-label="Recolher Menu Lateral"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </>
          ) : (
            /* Collapsed Logo Box (Centered, never squished or clipped) */
            <button
              onClick={onToggle}
              className="w-10 h-10 rounded-xl bg-[#004d40] text-white flex items-center justify-center shadow-xs transition-all hover:scale-105 hover:bg-[#003830] cursor-pointer group"
              title="Clique para Expandir o Menu Lateral"
              aria-label="Expandir Menu Lateral"
            >
              <Building2 className="w-5 h-5 text-teal-200 group-hover:hidden transition-all" />
              <ChevronRight className="w-5 h-5 text-teal-200 hidden group-hover:block transition-all" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 mt-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-[#004d40] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                } ${!isExpanded ? 'justify-center' : ''}`}
                title={!isExpanded ? item.label : undefined}
              >
                <span className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'}`}>
                  {item.icon}
                </span>

                {isExpanded && (
                  <span className="truncate flex-1 text-left">
                    {item.label}
                  </span>
                )}

                {isExpanded && item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: MCP Health & Logout */}
      <div className="p-3 border-t border-slate-200 space-y-2">
        {isExpanded && (
          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-[11px] text-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate font-medium">MCP Online (Pluggy & Plaid)</span>
          </div>
        )}

        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer ${
            !isExpanded ? 'justify-center' : ''
          }`}
          title="Sair da Plataforma"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {isExpanded && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
};
