import React, { useState } from 'react';
import { Sidebar } from './components/organisms/Sidebar';
import { ModernHeader } from './components/organisms/ModernHeader';
import { AccountsOverview } from './components/organisms/AccountsOverview';
import { TransactionsTable } from './components/organisms/TransactionsTable';
import { InvestmentsPage } from './components/organisms/InvestmentsPage';
import { UsersPage } from './components/organisms/UsersPage';
import { LoginPage } from './components/organisms/LoginPage';
import { FloatingChat } from './components/organisms/FloatingChat';
import { MCPConfigModal } from './components/organisms/MCPConfigModal';
import { ArchitectureDrawer } from './components/organisms/ArchitectureDrawer';
import { NotificationsModal } from './components/organisms/NotificationsModal';
import type { ChatMessage, MCPConfig, NotificationItem } from './types';
import { 
  MOCK_ACCOUNTS, 
  MOCK_TRANSACTIONS, 
  MOCK_INVESTMENTS, 
  MOCK_NOTIFICATIONS, 
  MOCK_USERS 
} from './data/mockData';
import { processUserQuery } from './services/chatEngine';

export const App: React.FC = () => {
  // Authentication & Layout state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showBRL, setShowBRL] = useState<boolean>(true);

  // Modals & Floating Drawer states
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState<boolean>(true);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // MCP Configuration state
  const [mcpConfig, setMcpConfig] = useState<MCPConfig>({
    pluggyUrl: 'https://mcp.pluggy.ai/mcp',
    pluggyStatus: 'connected',
    plaidClientId: 'sandbox_client_id_demo',
    plaidSecret: 'sandbox_secret_demo',
    plaidEnv: 'sandbox',
    plaidStatus: 'connected',
    usdBrlRate: 5.85
  });

  // Chat conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_initial_1',
      sender: 'assistant',
      content: `Olá, **Guilherme**! Sou seu **Assistente Financeiro Inteligente**.

Estou conectado via **MCP** à **Pluggy** (Open Finance Brasil) e à **Plaid** (Sandbox de Contas e Investimentos).

Como posso te ajudar hoje? Posso detalhar seus saldos, investimentos de perfil moderado, ou analisar o extrato das suas contas.`,
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
    }, 600);
  };

  const handleAskAIAboutInvestments = () => {
    setIsFloatingChatOpen(true);
    handleSendMessage('Explique a estratégia da minha carteira de perfil moderado e a rentabilidade acumulada.');
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

  // If logged out, render the Login Page
  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      
      {/* Collapsible Sidebar */}
      <Sidebar
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'architecture') {
            setIsArchitectureOpen(true);
          } else if (tab === 'config') {
            setIsConfigOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarExpanded ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Modern Header */}
        <ModernHeader
          isSidebarExpanded={isSidebarExpanded}
          showBRL={showBRL}
          onToggleBRL={() => setShowBRL(!showBRL)}
          notifications={notifications}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSettings={() => setIsConfigOpen(true)}
          onOpenHelp={() => setIsArchitectureOpen(true)}
          onLogout={() => setIsAuthenticated(false)}
          onOpenUserProfile={() => setActiveTab('users')}
        />

        {/* Content Views */}
        <main className="flex-1 pt-20 pb-12">
          {activeTab === 'home' && (
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

          {activeTab === 'investments' && (
            <InvestmentsPage
              portfolio={MOCK_INVESTMENTS}
              usdBrlRate={mcpConfig.usdBrlRate}
              showBRL={showBRL}
              onAskAIAboutInvestments={handleAskAIAboutInvestments}
            />
          )}

          {activeTab === 'users' && (
            <UsersPage users={MOCK_USERS} />
          )}
        </main>
      </div>

      {/* Floating & Maximizable Assistant Chat */}
      <FloatingChat
        isOpen={isFloatingChatOpen}
        onToggleOpen={() => setIsFloatingChatOpen(!isFloatingChatOpen)}
        messages={messages}
        onSendMessage={handleSendMessage}
        isProcessing={isProcessing}
        usdBrlRate={mcpConfig.usdBrlRate}
      />

      {/* Modals & Drawers */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
      />

      <MCPConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={mcpConfig}
        onSaveConfig={setMcpConfig}
      />

      <ArchitectureDrawer
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
      />
    </div>
  );
};

export default App;
