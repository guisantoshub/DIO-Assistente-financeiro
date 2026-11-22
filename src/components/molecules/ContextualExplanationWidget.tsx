import React from 'react';
import { CreditCard, Landmark, ShieldCheck, Database, KeyRound, Server } from 'lucide-react';

export interface ContextualExplanationWidgetProps {
  topic: 'card_debt' | 'pluggy_item' | 'plaid_signs';
  usdBrlRate?: number;
}

export const ContextualExplanationWidget: React.FC<ContextualExplanationWidgetProps> = ({
  topic,
  usdBrlRate = 5.85
}) => {
  if (topic === 'card_debt') {
    return (
      <div className="my-3 bg-gradient-to-br from-amber-50/60 to-white border border-amber-200/90 rounded-2xl p-4.5 space-y-3 font-sans">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <CreditCard className="w-4 h-4 text-amber-700" />
          <span>Comparativo Contábil: Conta Corrente (Ativo) vs Cartão de Crédito (Passivo)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
            <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-emerald-700" />
              <span>Conta de Depósito (Checking / Savings)</span>
            </div>
            <p className="text-emerald-800 text-[11px] leading-relaxed">
              <strong>Natureza: Ativo Financeiro.</strong> É o dinheiro que pertence a você. Saldo de <strong>$110.00</strong> significa fundos prontos para saque ou transferência.
            </p>
          </div>

          <div className="p-3 bg-amber-50/80 border border-amber-300 rounded-xl space-y-1">
            <div className="font-semibold text-amber-900 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-amber-700" />
              <span>Cartão de Crédito (Plaid Diamond)</span>
            </div>
            <p className="text-amber-800 text-[11px] leading-relaxed">
              <strong>Natureza: Passivo / Dívida Aberta.</strong> É um empréstimo concedido pelo banco. Saldo de <strong>$410.00</strong> (≈ R$ {(410 * usdBrlRate).toFixed(2)}) representa o valor devido da fatura atual.
            </p>
          </div>
        </div>

        {/* Visual credit bar */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="font-semibold text-amber-800">Fatura Atual Utilizada: $410,00</span>
            <span className="font-semibold text-[#004d40]">Limite Disponível: $1.590,00</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
            <div className="bg-amber-500 h-full" style={{ width: '20.5%' }} title="20.5% utilizado"></div>
            <div className="bg-emerald-500 h-full" style={{ width: '79.5%' }} title="79.5% disponível"></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Teto Total do Limite Concedido: $2.000,00</span>
            <span>Uso de Crédito: 20,5%</span>
          </div>
        </div>
      </div>
    );
  }

  if (topic === 'pluggy_item') {
    return (
      <div className="my-3 bg-gradient-to-br from-[#e0f2f1]/50 to-white border border-[#004d40]/20 rounded-2xl p-4.5 space-y-3 font-sans">
        <div className="flex items-center gap-2 text-[#004d40] font-bold text-sm">
          <Server className="w-4 h-4 text-[#004d40]" />
          <span>Arquitetura de um "Item" no Open Finance Brasil (Pluggy MCP)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
            <KeyRound className="w-4 h-4 mx-auto text-slate-700 mb-1" />
            <div className="font-semibold text-slate-800 text-[11px]">1. Consentimento</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Autorização LGPD</div>
          </div>
          <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
            <Server className="w-4 h-4 mx-auto text-[#004d40] mb-1" />
            <div className="font-semibold text-slate-800 text-[11px]">2. Conector</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Bradesco, Itaú, etc.</div>
          </div>
          <div className="p-2.5 bg-[#e0f2f1] border border-[#004d40]/30 rounded-xl">
            <ShieldCheck className="w-4 h-4 mx-auto text-[#004d40] mb-1" />
            <div className="font-bold text-[#004d40] text-[11px]">3. Item Criado</div>
            <div className="text-[10px] text-[#004d40] mt-0.5">Sessão Tokenizada</div>
          </div>
          <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
            <Database className="w-4 h-4 mx-auto text-emerald-700 mb-1" />
            <div className="font-semibold text-slate-800 text-[11px]">4. Contas Agregadas</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Corrente, Poupança, Cartão</div>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
          Um <strong>Item</strong> na Pluggy é a entidade raiz que representa a conexão segura de um cliente com um banco brasileiro. O protocolo MCP (Streamable HTTP) permite ao modelo consultar essa documentação sem expor nenhuma senha.
        </p>
      </div>
    );
  }

  return null;
};
