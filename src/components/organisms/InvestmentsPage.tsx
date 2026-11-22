import React from 'react';
import type { InvestmentPortfolio } from '../../types';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { 
  TrendingUp, 
  PieChart, 
  Percent, 
  Sparkles
} from 'lucide-react';

export interface InvestmentsPageProps {
  portfolio: InvestmentPortfolio;
  usdBrlRate: number;
  showBRL: boolean;
  onAskAIAboutInvestments: () => void;
}

export const InvestmentsPage: React.FC<InvestmentsPageProps> = ({
  portfolio,
  showBRL,
  onAskAIAboutInvestments
}) => {
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(val);
  };

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(val);
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Baixo':
        return <Badge variant="emerald" size="sm">Baixo Risco</Badge>;
      case 'Médio':
        return <Badge variant="amber" size="sm">Médio Risco</Badge>;
      case 'Alto':
        return <Badge variant="rose" size="sm">Alto Risco</Badge>;
      default:
        return <Badge variant="slate" size="sm">{risk}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner & Profile Overview */}
      <div className="bg-gradient-to-r from-[#004d40] to-[#00796b] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-teal-100 text-xs font-semibold backdrop-blur-xs">
                Suitability Bradesco
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-400 text-slate-900 text-xs font-bold">
                Perfil Moderado
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">
              Carteira de Investimentos
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              Estratégia balanceada com foco em <strong>preservação de patrimônio</strong> e <strong>rendimento real</strong> acima da inflação, combinando Renda Fixa pós-fixada, títulos IPCA+, proventos de FIIs e dividendos.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-right min-w-[220px]">
            <span className="text-xs text-teal-200 font-semibold uppercase tracking-wider block">
              Patrimônio Alocado
            </span>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              {showBRL ? formatBRL(portfolio.totalValueBRL) : formatUSD(portfolio.totalValueUSD)}
            </div>
            <div className="text-xs text-teal-200 mt-1 font-medium">
              {showBRL ? `≈ ${formatUSD(portfolio.totalValueUSD)} (USD)` : `≈ ${formatBRL(portfolio.totalValueBRL)} (BRL)`}
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="text-teal-200">Rentabilidade 12M:</span>
              <span className="font-bold text-emerald-300">+{portfolio.returnLast12Months}% ({portfolio.benchmarkPct}% CDI)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#e0f2f1] text-[#004d40] flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Rendimento 12 Meses</span>
            <span className="text-xl font-bold text-slate-900 tracking-tight">+{portfolio.returnLast12Months}%</span>
            <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">Superando a Selic</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Classes de Ativos</span>
            <span className="text-xl font-bold text-slate-900 tracking-tight">5 Segmentos</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Diversificação defensiva</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Benchmark Médio</span>
            <span className="text-xl font-bold text-slate-900 tracking-tight">122% do CDI</span>
            <span className="text-[11px] text-amber-800 font-semibold block mt-0.5">Ganhos reais constantes</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Análise com IA</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={onAskAIAboutInvestments}
              className="mt-1 text-xs py-1 px-2.5 h-auto"
            >
              Consultar Assistente
            </Button>
          </div>
        </Card>
      </div>

      {/* Allocation Visual Bar */}
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Alocação de Ativos por Estratégia</h3>
            <p className="text-xs text-slate-500">Distribuição recomendada para o perfil Moderado</p>
          </div>
          <span className="text-xs font-semibold text-[#004d40] bg-[#e0f2f1] px-3 py-1 rounded-full">
            100% Alocado
          </span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex shadow-2xs">
          <div style={{ width: '35%' }} className="bg-[#004d40]" title="Renda Fixa Pós (35%)"></div>
          <div style={{ width: '25%' }} className="bg-teal-500" title="Renda Fixa Inflação (25%)"></div>
          <div style={{ width: '20%' }} className="bg-emerald-500" title="Fundos Imobiliários (20%)"></div>
          <div style={{ width: '15%' }} className="bg-amber-500" title="Ações & Dividendos (15%)"></div>
          <div style={{ width: '5%' }} className="bg-indigo-500" title="Internacional USD (5%)"></div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#004d40] shrink-0"></span>
            <div>
              <span className="text-slate-700 font-semibold block">35% Pós-Fixado</span>
              <span className="text-[10px] text-slate-400">CDB Bradesco</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-teal-500 shrink-0"></span>
            <div>
              <span className="text-slate-700 font-semibold block">25% Inflação</span>
              <span className="text-[10px] text-slate-400">Tesouro IPCA+</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-500 shrink-0"></span>
            <div>
              <span className="text-slate-700 font-semibold block">20% Imobiliário</span>
              <span className="text-[10px] text-slate-400">FIIs Proventos</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-500 shrink-0"></span>
            <div>
              <span className="text-slate-700 font-semibold block">15% Dividendos</span>
              <span className="text-[10px] text-slate-400">Ações Brasil</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-indigo-500 shrink-0"></span>
            <div>
              <span className="text-slate-700 font-semibold block">5% Dólar (USD)</span>
              <span className="text-[10px] text-slate-400">Plaid CD</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Asset Holdings Table */}
      <Card className="p-0 overflow-hidden border border-slate-200/90 rounded-2xl shadow-2xs">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Detalhamento dos Ativos</h4>
            <p className="text-xs text-slate-500">Posição consolidada e indexadores de rendimento</p>
          </div>
          <Badge variant="petrol" size="sm">
            5 Posições Ativas
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/60 text-slate-600 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Ativo / Aplicação</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Instituição</th>
                <th className="py-3 px-4">Rentabilidade Alvo</th>
                <th className="py-3 px-4 text-center">Risco</th>
                <th className="py-3 px-4 text-right">Alocação</th>
                <th className="py-3 px-4 text-right">Valor em Reais</th>
                <th className="py-3 px-4 text-right">Valor em Dólar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {portfolio.assets.map((ast) => (
                <tr key={ast.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 text-xs block">{ast.name}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{ast.category}</td>
                  <td className="py-3 px-4 text-slate-500">{ast.institution}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-[#004d40]">{ast.expectedReturn}</td>
                  <td className="py-3 px-4 text-center">{getRiskBadge(ast.riskLevel)}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-800">{ast.allocationPct}%</td>
                  <td className="py-3 px-4 text-right font-mono font-semibold text-slate-900">{formatBRL(ast.valueBRL)}</td>
                  <td className="py-3 px-4 text-right font-mono text-teal-800 font-medium">{formatUSD(ast.valueUSD)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
