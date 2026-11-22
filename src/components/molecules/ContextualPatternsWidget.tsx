import React from 'react';
import type { Transaction } from '../../types';
import { Repeat, Utensils, ShoppingBag, Info } from 'lucide-react';

export interface ContextualPatternsWidgetProps {
  data: {
    subTotal: number;
    foodTotal: number;
    retailTotal: number;
    transactions: Transaction[];
  };
  usdBrlRate?: number;
}

export const ContextualPatternsWidget: React.FC<ContextualPatternsWidgetProps> = ({
  data,
  usdBrlRate = 5.85
}) => {
  const { subTotal, foodTotal, retailTotal, transactions } = data;
  const grandTotal = subTotal + foodTotal + retailTotal;

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(val);
  };

  const formatBRL = (valUSD: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valUSD * usdBrlRate);
  };

  const patterns = [
    {
      id: 'sub',
      title: '1. Assinaturas Recorrentes',
      icon: <Repeat className="w-4 h-4 text-[#004d40]" />,
      amount: subTotal,
      color: 'bg-[#004d40]',
      badgeColor: 'bg-[#e0f2f1] text-[#004d40]',
      items: transactions.filter(t => t.spendingPattern === 'assinaturas_recorrentes'),
      desc: 'Cobranças automáticas mensais (Streaming, Cloud & Softwares)'
    },
    {
      id: 'food',
      title: '2. Alimentação & Delivery',
      icon: <Utensils className="w-4 h-4 text-amber-700" />,
      amount: foodTotal,
      color: 'bg-amber-600',
      badgeColor: 'bg-amber-100 text-amber-800',
      items: transactions.filter(t => t.spendingPattern === 'alimentacao_restaurantes'),
      desc: 'Despesas rotineiras com refeições, cafeterias e mercado'
    },
    {
      id: 'retail',
      title: '3. Varejo, Lojas & Mobilidade',
      icon: <ShoppingBag className="w-4 h-4 text-indigo-700" />,
      amount: retailTotal,
      color: 'bg-indigo-600',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      items: transactions.filter(t => t.spendingPattern === 'varejo_viagens'),
      desc: 'Compras de eletrônicos, farmácia e corridas de transporte'
    }
  ];

  return (
    <div className="my-3 space-y-3 font-sans">
      
      {/* 3 Categories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {patterns.map((p) => {
          const percentage = grandTotal > 0 ? Math.round((p.amount / grandTotal) * 100) : 0;

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between hover:border-[#004d40]/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-100">
                      {p.icon}
                    </div>
                    <span className="font-semibold text-xs text-slate-800">
                      {p.title}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.badgeColor}`}>
                    {percentage}%
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 mb-3">{p.desc}</p>

                <div className="mb-3">
                  <div className="text-lg font-bold text-slate-900 tracking-tight">
                    {formatUSD(p.amount)}
                  </div>
                  <div className="text-[11px] font-medium text-teal-800">
                    ≈ {formatBRL(p.amount)} (R$)
                  </div>
                </div>

                {/* Mini Transactions Pills */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {p.items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between text-[11px] text-slate-600">
                      <span className="truncate max-w-[130px] font-medium">{it.name}</span>
                      <span className="font-mono text-slate-800 font-semibold">{formatUSD(it.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className={`h-full rounded-full ${p.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Plaid Sign Convention Card */}
      <div className="bg-slate-900 text-slate-200 p-3.5 rounded-2xl flex items-start gap-3 text-xs border border-slate-800">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-white">Regra de Sinais Contábeis da Plaid:</span> Na Plaid API, 
          <span className="text-rose-400 font-semibold"> valores positivos (+amount)</span> representam <strong>saídas/débitos</strong> (compras no cartão e débitos em conta). 
          <span className="text-emerald-400 font-semibold"> Valores negativos (-amount)</span> representam <strong>entradas</strong> (como o salário da TechCorp de -$2,500.00).
        </div>
      </div>
    </div>
  );
};
