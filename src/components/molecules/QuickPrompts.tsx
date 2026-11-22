import React from 'react';
import { Sparkles, DollarSign, PieChart, HelpCircle, ShieldAlert } from 'lucide-react';

export interface QuickPromptsProps {
  onSelectPrompt: (promptText: string) => void;
  disabled?: boolean;
}

export const QuickPrompts: React.FC<QuickPromptsProps> = ({
  onSelectPrompt,
  disabled = false
}) => {
  const prompts = [
    {
      id: 'balance',
      text: 'Qual é o meu saldo atual em todas as contas?',
      label: 'Saldo Geral',
      icon: <DollarSign className="w-3.5 h-3.5 text-[#004d40]" />
    },
    {
      id: 'patterns',
      text: 'Explique meus gastos recentes divididos nos 3 padrões de consumo.',
      label: '3 Padrões de Gasto',
      icon: <PieChart className="w-3.5 h-3.5 text-emerald-600" />
    },
    {
      id: 'card-debt',
      text: 'Por que o saldo do meu cartão de crédito aparece como dívida?',
      label: 'Mecânica do Cartão',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
    },
    {
      id: 'pluggy-item',
      text: 'O que é um "Item" na Pluggy e como funciona no Open Finance Brasil?',
      label: 'Conceito de Item (Pluggy)',
      icon: <Sparkles className="w-3.5 h-3.5 text-teal-600" />
    },
    {
      id: 'plaid-signs',
      text: 'Como funciona a convenção de sinais (+/-) nas transações da Plaid?',
      label: 'Sinais na Plaid',
      icon: <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
    }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 pb-1">
      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
        Perguntas Rápidas:
      </span>
      {prompts.map((p) => (
        <button
          key={p.id}
          disabled={disabled}
          onClick={() => onSelectPrompt(p.text)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-[#e0f2f1] text-slate-700 hover:text-[#004d40] border border-slate-200 hover:border-[#004d40]/30 transition-all shadow-2xs disabled:opacity-50 cursor-pointer active:scale-95"
        >
          {p.icon}
          <span>{p.label}</span>
        </button>
      ))}
    </div>
  );
};
