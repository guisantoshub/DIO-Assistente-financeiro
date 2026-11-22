import React from 'react';
import type { Account } from '../../types';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { Landmark, CreditCard, PiggyBank, Coins, AlertCircle } from 'lucide-react';

export interface AccountCardProps {
  account: Account;
  usdBrlRate?: number;
  showBRL?: boolean;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  usdBrlRate = 5.85,
  showBRL = true
}) => {
  const isCredit = account.type === 'credit';

  const getIcon = () => {
    switch (account.subtype) {
      case 'credit card':
        return <CreditCard className="w-5 h-5 text-amber-600" />;
      case 'savings':
        return <PiggyBank className="w-5 h-5 text-emerald-600" />;
      case 'money market':
        return <Coins className="w-5 h-5 text-teal-600" />;
      default:
        return <Landmark className="w-5 h-5 text-[#004d40]" />;
    }
  };

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(val);
  };

  const formatBRL = (valUSD: number) => {
    const valBRL = valUSD * usdBrlRate;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valBRL);
  };

  return (
    <Card className="flex flex-col justify-between border-slate-200/90 hover:border-[#004d40]/40 transition-all duration-200 group">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#e0f2f1] transition-colors">
              {getIcon()}
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-800 leading-tight">
                {account.name}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {account.institutionName} • Final {account.mask}
              </p>
            </div>
          </div>
          <Badge
            variant={isCredit ? 'amber' : 'petrol'}
            size="sm"
          >
            {isCredit ? 'Fatura Cartão' : 'Ativo'}
          </Badge>
        </div>

        <div className="mt-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            {isCredit ? 'Fatura Atual (Dívida)' : 'Saldo Atual'}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-2xl font-bold tracking-tight ${isCredit ? 'text-amber-700' : 'text-slate-900'}`}>
              {formatUSD(account.currentBalance)}
            </span>
            <span className="text-xs font-medium text-slate-400">USD</span>
          </div>

          {showBRL && (
            <div className="text-xs font-medium text-teal-700 mt-1 flex items-center gap-1.5">
              <span>≈ {formatBRL(account.currentBalance)}</span>
              <span className="text-[10px] text-slate-400">(Cotação R$ {usdBrlRate.toFixed(2)})</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        {isCredit ? (
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1 text-amber-700 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Passivo / Saldo a pagar</span>
            </div>
            <span className="text-slate-500">
              Limite restante: {formatUSD(account.availableBalance || 0)}
            </span>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            <span>Disponível p/ saque</span>
            <span className="font-semibold text-slate-700">
              {formatUSD(account.availableBalance ?? account.currentBalance)}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};
