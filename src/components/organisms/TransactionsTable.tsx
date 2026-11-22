import React, { useState } from 'react';
import type { Transaction, SpendingPatternType } from '../../types';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Repeat, 
  Utensils, 
  ShoppingBag, 
  CircleDollarSign,
  Info
} from 'lucide-react';

export interface TransactionsTableProps {
  transactions: Transaction[];
  usdBrlRate: number;
  showBRL: boolean;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  usdBrlRate,
  showBRL
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | SpendingPatternType>('all');

  const filteredTransactions = selectedFilter === 'all'
    ? transactions
    : transactions.filter(t => t.spendingPattern === selectedFilter);

  const getPatternBadge = (pattern: SpendingPatternType) => {
    switch (pattern) {
      case 'assinaturas_recorrentes':
        return (
          <Badge variant="petrol" size="sm" icon={<Repeat className="w-3 h-3" />}>
            Assinaturas
          </Badge>
        );
      case 'alimentacao_restaurantes':
        return (
          <Badge variant="amber" size="sm" icon={<Utensils className="w-3 h-3" />}>
            Alimentação
          </Badge>
        );
      case 'varejo_viagens':
        return (
          <Badge variant="slate" size="sm" icon={<ShoppingBag className="w-3 h-3" />}>
            Varejo & Serviços
          </Badge>
        );
      case 'rendimentos_credito':
        return (
          <Badge variant="emerald" size="sm" icon={<CircleDollarSign className="w-3 h-3" />}>
            Rendimento / Entrada
          </Badge>
        );
    }
  };

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(val));
  };

  const formatBRL = (valUSD: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Math.abs(valUSD) * usdBrlRate);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Plaid Sign Rule Callout */}
      <Card className="bg-[#e0f2f1]/40 border border-[#004d40]/20 p-4 rounded-2xl flex items-start gap-3">
        <Info className="w-5 h-5 text-[#004d40] shrink-0 mt-0.5" />
        <div className="text-xs text-[#003830] leading-relaxed">
          <strong>Regra Oficial de Sinais da Plaid:</strong> Na Plaid API, 
          <span className="text-rose-700 font-semibold"> valores positivos (+) são SAÍDAS</span> (débito, compras no cartão ou na conta), e 
          <span className="text-emerald-700 font-semibold"> valores negativos (-) são ENTRADAS</span> (salário, estornos, depósitos). O assistente converte e sinaliza para clareza visual.
        </div>
      </Card>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            selectedFilter === 'all'
              ? 'bg-[#004d40] text-white border-[#004d40]'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Todas ({transactions.length})
        </button>
        <button
          onClick={() => setSelectedFilter('assinaturas_recorrentes')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            selectedFilter === 'assinaturas_recorrentes'
              ? 'bg-[#004d40] text-white border-[#004d40]'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Padrão 1: Assinaturas Recorrentes
        </button>
        <button
          onClick={() => setSelectedFilter('alimentacao_restaurantes')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            selectedFilter === 'alimentacao_restaurantes'
              ? 'bg-[#004d40] text-white border-[#004d40]'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Padrão 2: Alimentação & Delivery
        </button>
        <button
          onClick={() => setSelectedFilter('varejo_viagens')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            selectedFilter === 'varejo_viagens'
              ? 'bg-[#004d40] text-white border-[#004d40]'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Padrão 3: Varejo & Mobilidade
        </button>
      </div>

      {/* Transactions Table Card */}
      <Card className="p-0 overflow-hidden border border-slate-200/90 rounded-2xl shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Estabelecimento / Descrição</th>
                <th className="py-3.5 px-4">Padrão de Gasto</th>
                <th className="py-3.5 px-4">Canal</th>
                <th className="py-3.5 px-4">Data</th>
                <th className="py-3.5 px-4 text-right">Valor Plaid (USD)</th>
                {showBRL && <th className="py-3.5 px-4 text-right">Em Reais (R$)</th>}
                <th className="py-3.5 px-4 text-center">Tipo de Fluxo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => {
                const isExpense = tx.amount > 0; // Plaid convention: positive = debit/outflow

                return (
                  <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 text-sm">{tx.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {tx.category.join(' • ')}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {getPatternBadge(tx.spendingPattern)}
                    </td>
                    <td className="py-3.5 px-4 capitalize text-slate-600">
                      {tx.paymentChannel}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(tx.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold">
                      <span className={isExpense ? 'text-slate-900' : 'text-emerald-700'}>
                        {isExpense ? `+${formatUSD(tx.amount)}` : `-${formatUSD(tx.amount)}`}
                      </span>
                    </td>
                    {showBRL && (
                      <td className="py-3.5 px-4 text-right font-mono text-teal-700 font-medium whitespace-nowrap">
                        {formatBRL(tx.amount)}
                      </td>
                    )}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                        isExpense 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {isExpense ? (
                          <>
                            <ArrowUpRight className="w-3 h-3 text-rose-600" />
                            <span>Saída (Débito)</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownLeft className="w-3 h-3 text-emerald-600" />
                            <span>Entrada (Crédito)</span>
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
