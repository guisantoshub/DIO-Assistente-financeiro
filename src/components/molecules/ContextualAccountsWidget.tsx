import React from 'react';
import type { Account } from '../../types';
import { Landmark, CreditCard, PiggyBank, Coins, AlertCircle, ShieldCheck } from 'lucide-react';

export interface ContextualAccountsWidgetProps {
  accounts: Account[];
  usdBrlRate?: number;
}

export const ContextualAccountsWidget: React.FC<ContextualAccountsWidgetProps> = ({
  accounts,
  usdBrlRate = 5.85
}) => {
  const totalDepositoryUSD = accounts
    .filter(a => a.type === 'depository')
    .reduce((acc, curr) => acc + curr.currentBalance, 0);

  const creditCard = accounts.find(a => a.type === 'credit');
  const creditDebtUSD = creditCard?.currentBalance || 0;

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

  const getAccountIcon = (subtype: string) => {
    switch (subtype) {
      case 'credit card':
        return <CreditCard className="w-4 h-4 text-amber-600" />;
      case 'savings':
        return <PiggyBank className="w-4 h-4 text-emerald-600" />;
      case 'money market':
        return <Coins className="w-4 h-4 text-teal-600" />;
      default:
        return <Landmark className="w-4 h-4 text-[#004d40]" />;
    }
  };

  return (
    <div className="my-3 rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
      
      {/* Header Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/70 border-b border-slate-200/70">
        <div className="p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Total em Depósito Disponível
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                {formatUSD(totalDepositoryUSD)}
              </span>
              <span className="text-xs font-semibold text-[#004d40] bg-[#e0f2f1] px-2 py-0.5 rounded-full">
                ≈ {formatBRL(totalDepositoryUSD)}
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
          </div>
        </div>

        <div className="p-3.5 flex items-center justify-between bg-amber-50/30">
          <div>
            <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
              Fatura Atual do Cartão (Dívida)
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-bold text-amber-900 tracking-tight">
                {formatUSD(creditDebtUSD)}
              </span>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                ≈ {formatBRL(creditDebtUSD)}
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-amber-700" />
          </div>
        </div>
      </div>

      {/* Styled Interactive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/70 text-slate-600 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3.5">Conta</th>
              <th className="py-2.5 px-3">Tipo</th>
              <th className="py-2.5 px-3 text-right">Saldo (USD)</th>
              <th className="py-2.5 px-3 text-right">Em Reais (R$)</th>
              <th className="py-2.5 px-3.5 text-center">Situação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans">
            {accounts.map((acc) => {
              const isCredit = acc.type === 'credit';

              return (
                <tr key={acc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3.5 font-medium text-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        {getAccountIcon(acc.subtype)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-xs">{acc.name}</div>
                        <div className="text-[10px] text-slate-400">Final •••• {acc.mask}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-600 capitalize">
                    {acc.subtype === 'credit card' ? 'Cartão Crédito' : acc.subtype}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold">
                    <span className={isCredit ? 'text-amber-800' : 'text-slate-900'}>
                      {formatUSD(acc.currentBalance)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-teal-800">
                    {formatBRL(acc.currentBalance)}
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    {isCredit ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                        <AlertCircle className="w-3 h-3 text-amber-700" />
                        Fatura a Pagar
                      </span>
                    ) : acc.subtype === 'savings' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Reserva
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#e0f2f1] text-[#004d40] border border-[#004d40]/20">
                        Disponível
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info Pill */}
      <div className="px-3.5 py-2.5 bg-slate-50/80 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Sincronizado via Plaid Sandbox • Cotação: US$ 1 = R$ {usdBrlRate.toFixed(2)}</span>
        </div>
        <span className="text-amber-800 font-medium">
          *No cartão de crédito, o saldo representa a fatura aberta (passivo a pagar).
        </span>
      </div>
    </div>
  );
};
