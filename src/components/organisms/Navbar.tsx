import React from 'react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { 
  Building2, 
  Settings, 
  GitBranch, 
  DollarSign
} from 'lucide-react';

export interface NavbarProps {
  activeTab: 'chat' | 'accounts' | 'transactions';
  onSelectTab: (tab: 'chat' | 'accounts' | 'transactions') => void;
  onOpenConfig: () => void;
  onOpenArchitecture: () => void;
  showBRL: boolean;
  onToggleBRL: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenConfig,
  onOpenArchitecture,
  showBRL,
  onToggleBRL
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#004d40] text-white flex items-center justify-center shadow-xs">
            <Building2 className="w-5 h-5 text-teal-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 tracking-tight font-heading text-lg">
                PetroFinance <span className="text-[#004d40]">AI</span>
              </span>
              <Badge variant="petrol" size="sm">
                MCP Assist
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Open Finance Brasil & Sandbox Plaid
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => onSelectTab('chat')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-white text-[#004d40] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Assistente Chat
          </button>
          <button
            onClick={() => onSelectTab('accounts')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'accounts'
                ? 'bg-white text-[#004d40] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contas & Saldos
          </button>
          <button
            onClick={() => onSelectTab('transactions')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'transactions'
                ? 'bg-white text-[#004d40] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Transações & 3 Padrões
          </button>
        </nav>

        {/* Actions & MCP Controls */}
        <div className="flex items-center gap-2">
          {/* Currency Toggle */}
          <button
            onClick={onToggleBRL}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              showBRL
                ? 'bg-[#e0f2f1] text-[#004d40] border-[#004d40]/30'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Alternar exibição de conversão em Reais"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>{showBRL ? 'Exibindo em R$' : 'Apenas USD'}</span>
          </button>

          {/* Architecture / Path Button */}
          <Button
            variant="outline"
            size="sm"
            iconLeft={<GitBranch className="w-3.5 h-3.5 text-[#004d40]" />}
            onClick={onOpenArchitecture}
            className="hidden sm:inline-flex"
          >
            Caminho da Resposta
          </Button>

          {/* MCP Config Button */}
          <Button
            variant="secondary"
            size="sm"
            iconLeft={<Settings className="w-3.5 h-3.5" />}
            onClick={onOpenConfig}
          >
            Configurar MCP
          </Button>
        </div>
      </div>
    </header>
  );
};
