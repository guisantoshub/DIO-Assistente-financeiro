import React, { useState } from 'react';
import { Navbar } from './components/organisms/Navbar';
import { ChatWindow } from './components/organisms/ChatWindow';
import { AccountsOverview } from './components/organisms/AccountsOverview';
import { TransactionsTable } from './components/organisms/TransactionsTable';
import { MCPConfigModal } from './components/organisms/MCPConfigModal';
import { ArchitectureDrawer } from './components/organisms/ArchitectureDrawer';
import type { ChatMessage, MCPConfig } from './types';
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS } from './data/mockData';
import { processUserQuery } from './services/chatEngine';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'accounts' | 'transactions'>('chat');
  const [showBRL, setShowBRL] = useState<boolean>(true);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [mcpConfig, setMcpConfig] = useState<MCPConfig>({
    pluggyUrl: 'https://mcp.pluggy.ai/mcp',
    pluggyStatus: 'connected',
    plaidClientId: 'sandbox_client_id_demo',
    plaidSecret: 'sandbox_secret_demo',
    plaidEnv: 'sandbox',
    plaidStatus: 'connected',
    usdBrlRate: 5.85
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_initial_1',
      sender: 'assistant',
      content: `Olá! Sou seu **Assistente Financeiro Inteligente**, desenvolvido para o Desafio DIO & Bradesco.

Estou conectado aos servidores **MCP (Model Context Protocol)** da **Pluggy** e da **Plaid**, levando o banco até onde você estiver.

Posso responder perguntas em português sobre:
- **Saldos e Contas:** Posição consolidada com conversão declarada em Reais (R$).
- **Transações e 3 Padrões de Gasto:** Assinaturas recorrentes, alimentação e varejo.
- **Cartão de Crédito:** Entenda por que o saldo do cartão aparece como dívida/passivo.
- **Open Finance Brasil:** O conceito de Item, conectores e consentimento na Pluggy.

Selecione uma das perguntas rápidas abaixo ou digite sua dúvida!`,
      timestamp: '10:00',
      toolCalls: [
        {
          id: 'tool_init_1',
          server: 'pluggy',
          toolName: 'pluggy_init_session',
          parameters: { url: 'https://mcp.pluggy.ai/mcp' },
          resultSummary: 'Servidor Streamable HTTP Pluggy conectado com sucesso (Open Finance Brasil Docs).',
          latencyMs: 25,
          timestamp: '10:00',
          endpointUrl: 'https://mcp.pluggy.ai/mcp'
        },
        {
          id: 'tool_init_2',
          server: 'plaid',
          toolName: 'plaid_get_accounts',
          parameters: { env: 'sandbox', client_id: 'sandbox_client_id_demo' },
          resultSummary: 'Sincronizadas 4 contas Sandbox: Checking ($110), Savings ($23.631,98), CD ($1.000) e Credit ($410).',
          latencyMs: 34,
          timestamp: '10:00',
          endpointUrl: 'https://sandbox.plaid.com/accounts/get'
        }
      ]
    }
  ]);

  const handleSendMessage = (text: string) => {
    const userTimestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: userTimestamp
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    // Simulate agent latency + tool call execution
    setTimeout(() => {
      const response = processUserQuery(text, mcpConfig.usdBrlRate);
      const assistantTimestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      const assistantMsg: ChatMessage = {
        id: `ast_${Date.now()}`,
        sender: 'assistant',
        content: response.replyText,
        timestamp: assistantTimestamp,
        toolCalls: response.toolCalls,
        dataPayload: response.dataPayload
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsProcessing(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenConfig={() => setIsConfigOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        showBRL={showBRL}
        onToggleBRL={() => setShowBRL(!showBRL)}
      />

      {/* Main Body */}
      <main className="flex-1 p-2 sm:p-4">
        {activeTab === 'chat' && (
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isProcessing={isProcessing}
          />
        )}

        {activeTab === 'accounts' && (
          <AccountsOverview
            accounts={MOCK_ACCOUNTS}
            usdBrlRate={mcpConfig.usdBrlRate}
            showBRL={showBRL}
          />
        )}

        {activeTab === 'transactions' && (
          <TransactionsTable
            transactions={MOCK_TRANSACTIONS}
            usdBrlRate={mcpConfig.usdBrlRate}
            showBRL={showBRL}
          />
        )}
      </main>

      {/* MCP Configuration Modal */}
      <MCPConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={mcpConfig}
        onSaveConfig={setMcpConfig}
      />

      {/* Architecture & Response Path Drawer */}
      <ArchitectureDrawer
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />
    </div>
  );
};

export default App;
