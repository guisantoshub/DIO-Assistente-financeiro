import React from 'react';
import type { Account } from '../../types';
import { AccountCard } from '../molecules/AccountCard';
import { MetricCard } from '../molecules/MetricCard';
import { Card } from '../atoms/Card';
import { Landmark, ShieldAlert, PiggyBank, CreditCard, Info } from 'lucide-react';

export interface AccountsOverviewProps {
  accounts: Account[];
  usdBrlRate: number;
  showBRL: boolean;
}

export const AccountsOverview: React.FC<AccountsOverviewProps> = ({
  accounts,
  usdBrlRate,
  showBRL
}) => {
  const totalSavingsCheckingUSD = accounts
    .filter(a => a.type === 'depository')
    .reduce((acc, curr) => acc + curr.currentBalance, 0);

  const creditCardAccount = accounts.find(a => a.type === 'credit');
  const creditDebtUSD = creditCardAccount?.currentBalance || 0;

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

  return (
    <div className="max-w-7xl mx-auto py-2 space-y-6">
      
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Saldo Líquido em Contas"
          value={formatUSD(totalSavingsCheckingUSD)}
          subValue={showBRL ? `≈ ${formatBRL(totalSavingsCheckingUSD)} (R$)` : undefined}
          icon={<Landmark className="w-5 h-5" />}
        />
        <MetricCard
          title="Fatura do Cartão (Dívida)"
          value={formatUSD(creditDebtUSD)}
          subValue={showBRL ? `≈ ${formatBRL(creditDebtUSD)} (R$)` : undefined}
          icon={<CreditCard className="w-5 h-5 text-amber-600" />}
          className="border-amber-200/80 bg-amber-50/20"
        />
        <MetricCard
          title="Poupança & Reserva"
          value={formatUSD(23631.98)}
          subValue={showBRL ? `≈ ${formatBRL(23631.98)} (R$)` : undefined}
          icon={<PiggyBank className="w-5 h-5 text-emerald-600" />}
        />
        <MetricCard
          title="Taxa Câmbio Oficial"
          value={`US$ 1 = R$ ${usdBrlRate.toFixed(2)}`}
          subValue="Cotação declarada para conversão"
          icon={<Info className="w-5 h-5 text-teal-600" />}
        />
      </div>

      {/* Credit Card Mechanic Explanation Card */}
      <Card className="bg-amber-50/60 border border-amber-200/80 p-5 rounded-2xl">
        <div className="flex items-start gap-3.5">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-amber-900">
              Conceito Fundamental Open Finance: Por que o saldo do cartão aparece como dívida?
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Diferente de contas de depósito (checking/savings) onde o saldo representa seus fundos ativos, no cartão de crédito o saldo atual 
              (<strong>{formatUSD(creditDebtUSD)}</strong>) reflete o <strong>passivo circulante</strong> acumulado no mês — ou seja, o valor que você deve pagar na data do vencimento. O valor disponível (<strong>{formatUSD(creditCardAccount?.availableBalance || 0)}</strong>) é o limite restante concedido pela instituição.
            </p>
          </div>
        </div>
      </Card>

      {/* Grid of Bank Accounts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Contas Integradas (Plaid Sandbox)</h3>
            <p className="text-xs text-slate-500">
              Contas sincronizadas pelo conector bancário fictício First Platypus Bank
            </p>
          </div>
          <span className="text-xs font-semibold text-[#004d40] bg-[#e0f2f1] px-2.5 py-1 rounded-full">
            4 Contas Conectadas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((acc) => (
            <AccountCard
              key={acc.id}
              account={acc}
              usdBrlRate={usdBrlRate}
              showBRL={showBRL}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
