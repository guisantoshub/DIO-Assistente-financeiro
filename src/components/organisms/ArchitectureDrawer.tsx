import React from 'react';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { 
  X, 
  Cpu, 
  Server, 
  MessageSquare, 
  Sparkles, 
  CheckCircle,
  Database
} from 'lucide-react';

export interface ArchitectureDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureDrawer: React.FC<ArchitectureDrawerProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: 'Pergunta do Usuário',
      badge: 'Linguagem Natural',
      desc: 'O cliente digita: "Qual é o meu saldo atual em todas as contas?"',
      detail: 'Entrada via chat no app do banco ou no e-commerce parceiro onde o cliente já se encontra.',
      icon: <MessageSquare className="w-4 h-4 text-slate-700" />
    },
    {
      step: 2,
      title: 'Roteamento e Seleção de Tool MCP',
      badge: 'IA & Context Protocol',
      desc: 'O Agente IA identifica a intenção e invoca a ferramenta MCP correspondente.',
      detail: 'Tool Call: `plaid_get_accounts({ include_balances: true })` disparada para o servidor MCP.',
      icon: <Cpu className="w-4 h-4 text-[#004d40]" />
    },
    {
      step: 3,
      title: 'Comunicação MCP (STDIO / HTTP)',
      badge: 'Camada de Transporte',
      desc: 'O protocolo MCP encaminha a instrução para o runtime do servidor.',
      detail: 'Plaid: Processo STDIO via uvx com variáveis de ambiente. Pluggy: Streamable HTTP via https://mcp.pluggy.ai/mcp.',
      icon: <Server className="w-4 h-4 text-cyan-700" />
    },
    {
      step: 4,
      title: 'Consulta ao Endpoint Bancário',
      badge: 'Endpoint Sandbox / API',
      desc: 'O servidor MCP consome a API da instituição e retorna os dados brutos.',
      detail: 'Endpoint: POST https://sandbox.plaid.com/accounts/balance/get com autenticação segura.',
      icon: <Database className="w-4 h-4 text-indigo-700" />
    },
    {
      step: 5,
      title: 'Síntese com IA e Regras de Negócio',
      badge: 'Processamento Semântico',
      desc: 'A IA formata os saldos, converte para BRL e aplica a regra contábil do cartão.',
      detail: 'Explica que o cartão de crédito de $410 é dívida/fatura a pagar e calcula o saldo líquido disponível.',
      icon: <Sparkles className="w-4 h-4 text-emerald-700" />
    },
    {
      step: 6,
      title: 'Resposta Renderizada no Chat',
      badge: 'Interface Atômica',
      desc: 'O cliente recebe uma resposta visual clara, segura e explicada em português.',
      detail: 'Tabela estruturada com valores em USD e R$, badges de inspeção MCP e dicas de saúde financeira.',
      icon: <CheckCircle className="w-4 h-4 text-teal-700" />
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white h-full max-w-xl w-full p-6 overflow-y-auto shadow-2xl border-l border-slate-200 flex flex-col justify-between">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900">
                O Caminho de uma Resposta
              </h3>
              <p className="text-xs text-slate-500">
                Da pergunta do usuário até o endpoint bancário via MCP
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Timeline */}
          <div className="mt-6 space-y-4">
            {steps.map((st, i) => (
              <div key={st.step} className="relative flex gap-3.5 items-start">
                {/* Step circle */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {st.step}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-slate-200 my-1"></div>
                  )}
                </div>

                {/* Step content */}
                <Card className="flex-1 p-3.5 rounded-xl border-slate-200 bg-slate-50/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-slate-900 flex items-center gap-1.5">
                      {st.icon}
                      {st.title}
                    </span>
                    <Badge variant="petrol" size="sm">
                      {st.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">{st.desc}</p>
                  <p className="text-[11px] text-slate-500 mt-1 font-mono">{st.detail}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            Conforme Guia Prático DIO Bradesco: O MCP desacopla o modelo da API proprietária, permitindo que qualquer assistente acesse dados com segurança padronizada.
          </p>
        </div>
      </div>
    </div>
  );
};
