import { useEffect, useState } from "react";
import { Sidebar } from "./components/organisms/Sidebar";
import { ModernHeader } from "./components/organisms/ModernHeader";
import { AccountsOverview } from "./components/organisms/AccountsOverview";
import { TransactionsTable } from "./components/organisms/TransactionsTable";
import { InvestmentsPage } from "./components/organisms/InvestmentsPage";
import { UsersPage } from "./components/organisms/UsersPage";
import { ChatWindow } from "./components/organisms/ChatWindow";
import { LoginPage } from "./components/organisms/LoginPage";
import { FloatingChat } from "./components/organisms/FloatingChat";
import { PreferencesModal } from "./components/organisms/PreferencesModal";
import { HelpModal } from "./components/organisms/HelpModal";
import { NotificationsModal } from "./components/organisms/NotificationsModal";
import { Minimize2, Sparkles } from "lucide-react";
import type { ChatMessage } from "./types";
import {
  MOCK_ACCOUNTS,
  MOCK_TRANSACTIONS,
  MOCK_INVESTMENTS,
  MOCK_NOTIFICATIONS,
  MOCK_USERS,
} from "./data/mockData";
import { processUserQuery } from "./services/chatEngine";

const pageTitles: Record<string, { title: string; description: string }> = {
  home: {
    title: "Seu dinheiro, em perspectiva",
    description:
      "Acompanhe suas contas e encontre mais equilíbrio no dia a dia.",
  },
  transactions: {
    title: "Suas transações",
    description: "Entenda de onde vem e para onde vai o seu dinheiro.",
  },
  investments: {
    title: "Seus investimentos",
    description: "Uma visão clara do seu patrimônio e da sua carteira.",
  },
  chat: {
    title: "Seu assistente financeiro",
    description: "Mais clareza para cuidar do que importa.",
  },
  users: {
    title: "Perfis e acessos",
    description: "Conheça as pessoas vinculadas à sua conta.",
  },
};
function readPreference(key: string, fallback: boolean) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value === "true";
  } catch {
    return fallback;
  }
}
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() =>
    readPreference("petrofinance-sidebar", true),
  );
  const [activeTab, setActiveTab] = useState("home");
  const [showBRL, setShowBRL] = useState(() =>
    readPreference("petrofinance-brl", true),
  );
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [today] = useState(() =>
    new Date().toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  );
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      sender: "assistant",
      content:
        "Olá, **Guilherme**! Vamos cuidar das suas finanças?\n\nPosso ajudar você a entender seus **saldos**, organizar seus **gastos** e conhecer seus **investimentos**. Escolha uma sugestão abaixo ou me conte o que precisa.",
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  useEffect(() => {
    try {
      localStorage.setItem("petrofinance-sidebar", String(isSidebarExpanded));
      localStorage.setItem("petrofinance-brl", String(showBRL));
    } catch {
      /* Storage may be unavailable. */
    }
  }, [isSidebarExpanded, showBRL]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsConfigOpen(false);
        setIsHelpOpen(false);
        setIsNotificationsOpen(false);
        setIsFloatingChatOpen(false);
      }
      if (event.key === "Tab") {
        const dialog = document.querySelector('[role="dialog"]');
        const controls = dialog?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input:not(:disabled), a[href], [tabindex="0"]',
        );
        if (!controls?.length) return;
        const first = controls[0],
          last = controls[controls.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !dialog?.contains(document.activeElement))
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last ||
            !dialog?.contains(document.activeElement))
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    if (!(isConfigOpen || isHelpOpen || isNotificationsOpen)) return;
    const previous = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    document.querySelector<HTMLElement>('[role="dialog"] button')?.focus();
    return () => {
      document.body.style.overflow = previous;
      previousFocus?.focus();
    };
  }, [isConfigOpen, isHelpOpen, isNotificationsOpen]);
  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setIsFloatingChatOpen(false);
    window.scrollTo({ top: 0 });
  };
  const handleSendMessage = (text: string) => {
    if (isProcessing || !text.trim()) return;
    const timestamp = () =>
      new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        content: text,
        timestamp: timestamp(),
      },
    ]);
    setIsProcessing(true);
    setTimeout(() => {
      const response = processUserQuery(text, 5.85);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          sender: "assistant",
          content: response.replyText,
          timestamp: timestamp(),
          toolCalls: response.toolCalls,
          dataPayload: response.dataPayload,
        },
      ]);
      setIsProcessing(false);
    }, 600);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setIsConfigOpen(false);
    setIsHelpOpen(false);
    setIsNotificationsOpen(false);
    setIsFloatingChatOpen(false);
  };
  if (!isAuthenticated)
    return (
      <LoginPage
        onLogin={() => {
          setIsAuthenticated(true);
          selectTab("home");
        }}
      />
    );
  return (
    <div
      className={`app-shell ${isSidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}
    >
      <a className="skip-link" href="#main-content">
        Ir para o conteúdo
      </a>
      <Sidebar
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        activeTab={activeTab}
        onSelectTab={selectTab}
        onLogout={logout}
      />
      <ModernHeader
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSettings={() => setIsConfigOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onLogout={logout}
        onOpenUserProfile={() => selectTab("users")}
        onSearch={(text) => {
          selectTab("chat");
          handleSendMessage(text);
        }}
      />
      <main
        id="main-content"
        className={`app-main ${activeTab === "chat" ? "chat-mode" : ""}`}
      >
        <div className="page-heading">
          <div>
            <p className="page-eyebrow">
              {activeTab === "home"
                ? "BEM-VINDO, GUILHERME"
                : "SEU ESPAÇO FINANCEIRO"}
            </p>
            <h1>{pageTitles[activeTab].title}</h1>
            <p>{pageTitles[activeTab].description}</p>
          </div>
          {activeTab === "chat" ? (
            <button
              className="secondary-button minimize-chat"
              onClick={() => {
                setActiveTab("home");
                setIsFloatingChatOpen(true);
              }}
              aria-label="Usar assistente em janela flutuante"
            >
              <Minimize2 size={17} />
              <span>Janela flutuante</span>
            </button>
          ) : (
            <span className="page-date">{today}</span>
          )}
        </div>
        {activeTab === "home" && (
          <AccountsOverview
            accounts={MOCK_ACCOUNTS}
            usdBrlRate={5.85}
            showBRL={showBRL}
          />
        )}
        {activeTab === "transactions" && (
          <TransactionsTable
            transactions={MOCK_TRANSACTIONS}
            usdBrlRate={5.85}
            showBRL={showBRL}
          />
        )}
        {activeTab === "investments" && (
          <InvestmentsPage
            portfolio={MOCK_INVESTMENTS}
            usdBrlRate={5.85}
            showBRL={showBRL}
            onAskAIAboutInvestments={() => {
              selectTab("chat");
              handleSendMessage(
                "Como está a composição da minha carteira de investimentos?",
              );
            }}
          />
        )}
        {activeTab === "users" && (
          <UsersPage
            users={MOCK_USERS.filter((user) => user.id !== "usr_bot_mcp")}
          />
        )}
        {activeTab === "chat" && (
          <div className="full-chat">
            <div className="chat-context">
              <Sparkles size={17} />
              <span>Uma conversa para simplificar suas finanças</span>
              <span className="chat-context-note">Dados ilustrativos</span>
            </div>
            <ChatWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              isProcessing={isProcessing}
              usdBrlRate={5.85}
            />
          </div>
        )}
      </main>
      {activeTab !== "chat" && (
        <FloatingChat
          isOpen={isFloatingChatOpen}
          onToggleOpen={() => setIsFloatingChatOpen(!isFloatingChatOpen)}
          onExpandToFullPage={() => selectTab("chat")}
          messages={messages}
          onSendMessage={handleSendMessage}
          isProcessing={isProcessing}
          usdBrlRate={5.85}
        />
      )}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() =>
          setNotifications((prev) =>
            prev.map((notification) => ({ ...notification, read: true })),
          )
        }
      />
      {isConfigOpen && (
        <PreferencesModal
          showBRL={showBRL}
          onToggleBRL={() => setShowBRL(!showBRL)}
          onClose={() => setIsConfigOpen(false)}
        />
      )}
      {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}
    </div>
  );
}
export default App;
