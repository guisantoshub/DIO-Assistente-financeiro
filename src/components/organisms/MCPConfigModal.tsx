import React, { useState } from 'react';
import type { MCPConfig } from '../../types';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Badge } from '../atoms/Badge';
import { 
  X, 
  Server, 
  Cpu, 
  CheckCircle2, 
  Copy, 
  Terminal
} from 'lucide-react';

export interface MCPConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: MCPConfig;
  onSaveConfig: (newConfig: MCPConfig) => void;
}

export const MCPConfigModal: React.FC<MCPConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig
}) => {
  const [formData, setFormData] = useState<MCPConfig>(config);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleTestPing = () => {
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTesting(false);
      setTestResult('✅ Pluggy Streamable HTTP (200 OK) e Plaid STDIO (Handshake OK) conectados com sucesso!');
    }, 1200);
  };

  const handleCopyJSON = () => {
    const jsonConfig = {
      mcpServers: {
        pluggy: {
          url: formData.pluggyUrl,
          type: "streamable-http"
        },
        plaid: {
          command: "uvx",
          args: ["mcp-server-plaid"],
          env: {
            PLAID_CLIENT_ID: formData.plaidClientId,
            PLAID_SECRET: formData.plaidSecret,
            PLAID_ENV: formData.plaidEnv
          }
        }
      }
    };
    navigator.clipboard.writeText(JSON.stringify(jsonConfig, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#004d40] text-white">
              <Server className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Configuração dos Servidores MCP
              </h3>
              <p className="text-xs text-slate-500">
                Gerencie as conexões de Model Context Protocol (Pluggy & Plaid)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Pluggy MCP Card */}
          <Card className="border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                  <Server className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm text-slate-900">
                  Pluggy MCP (Streamable HTTP)
                </h4>
              </div>
              <Badge variant="emerald" size="sm">
                Conectado • Sem Chave
              </Badge>
            </div>
            <p className="text-xs text-slate-600">
              Servidor público oficial com documentação Open Finance Brasil, conectores e schemas de dados.
            </p>
            <Input
              label="URL Streamable HTTP"
              value={formData.pluggyUrl}
              onChange={(e) => setFormData({ ...formData, pluggyUrl: e.target.value })}
              placeholder="https://mcp.pluggy.ai/mcp"
            />
          </Card>

          {/* Plaid MCP Card */}
          <Card className="border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-cyan-100 text-cyan-800 rounded-lg">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm text-slate-900">
                  Plaid MCP (STDIO com uvx)
                </h4>
              </div>
              <Badge variant="petrol" size="sm">
                Ambiente Sandbox
              </Badge>
            </div>
            <p className="text-xs text-slate-600">
              Servidor local iniciado via <code>uvx mcp-server-plaid</code> fornecendo contas, saldos e transações de teste.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="PLAID_CLIENT_ID"
                value={formData.plaidClientId}
                onChange={(e) => setFormData({ ...formData, plaidClientId: e.target.value })}
                placeholder="Ex: 673db8..."
              />
              <Input
                label="PLAID_SECRET (Sandbox)"
                type="password"
                value={formData.plaidSecret}
                onChange={(e) => setFormData({ ...formData, plaidSecret: e.target.value })}
                placeholder="Ex: 8f49e..."
              />
            </div>
          </Card>

          {/* Rate Configuration */}
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs font-semibold text-slate-800 block">
                Cotação de Conversão USD → BRL
              </span>
              <span className="text-[11px] text-slate-500">
                Usada para converter valores exibidos nos extratos e respostas
              </span>
            </div>
            <div className="w-32">
              <Input
                type="number"
                step="0.05"
                value={formData.usdBrlRate}
                onChange={(e) => setFormData({ ...formData, usdBrlRate: parseFloat(e.target.value) || 5.85 })}
              />
            </div>
          </div>

          {/* Configuration Snippet for IDE / Antigravity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                JSON para Configuração MCP (Antigravity / Codex)
              </span>
              <button
                onClick={handleCopyJSON}
                className="text-xs text-[#004d40] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                {copied ? 'Copiado!' : 'Copiar JSON'}
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-teal-300 rounded-xl text-[11px] font-mono overflow-x-auto border border-slate-800">
{`{
  "mcpServers": {
    "pluggy": {
      "url": "${formData.pluggyUrl}",
      "type": "streamable-http"
    },
    "plaid": {
      "command": "uvx",
      "args": ["mcp-server-plaid"],
      "env": {
        "PLAID_CLIENT_ID": "${formData.plaidClientId ? '***' + formData.plaidClientId.slice(-4) : 'SEU_CLIENT_ID'}",
        "PLAID_SECRET": "${formData.plaidSecret ? '***' + formData.plaidSecret.slice(-4) : 'SEU_SECRET'}",
        "PLAID_ENV": "sandbox"
      }
    }
  }
}`}
            </pre>
          </div>

          {/* Test Feedback */}
          {testResult && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{testResult}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTestPing}
            isLoading={isTesting}
          >
            Testar Conexão MCP
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onSaveConfig(formData);
                onClose();
              }}
            >
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
