import {
  Building2,
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  Users,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Bot,
} from "lucide-react";

const navigationItems = [
  {
    id: "home",
    label: "Visão geral",
    mobileLabel: "Início",
    icon: LayoutDashboard,
  },
  {
    id: "transactions",
    label: "Transações",
    mobileLabel: "Extrato",
    icon: ArrowLeftRight,
  },
  {
    id: "investments",
    label: "Investimentos",
    mobileLabel: "Investir",
    icon: TrendingUp,
  },
  { id: "chat", label: "Assistente IA", mobileLabel: "Assistente", icon: Bot },
  {
    id: "users",
    label: "Perfis e acessos",
    mobileLabel: "Perfis",
    icon: Users,
  },
];
interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
}
export function Sidebar({
  isExpanded,
  onToggle,
  activeTab,
  onSelectTab,
  onLogout,
}: SidebarProps) {
  return (
    <>
      <aside className="app-sidebar" aria-label="Menu lateral">
        <div className="sidebar-brand">
          <span className="brand-mark">
            <Building2 size={21} />
          </span>
          {isExpanded && (
            <span className="brand-name">
              PetroFinance<span>Seu dinheiro, mais claro.</span>
            </span>
          )}
        </div>
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Recolher menu" : "Expandir menu"}
          title={isExpanded ? "Recolher menu" : "Expandir menu"}
        >
          {isExpanded ? (
            <PanelLeftClose size={17} />
          ) : (
            <PanelLeftOpen size={17} />
          )}
          {isExpanded && <span>Recolher menu</span>}
        </button>
        {isExpanded && <p className="nav-caption">PRINCIPAL</p>}
        <nav className="sidebar-nav" aria-label="Navegação principal">
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onSelectTab(id)}
              className={`nav-item ${activeTab === id ? "is-active" : ""}`}
              aria-label={label}
              aria-current={activeTab === id ? "page" : undefined}
              title={!isExpanded ? label : undefined}
            >
              <Icon size={19} strokeWidth={1.8} />
              {isExpanded && <span>{label}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          {isExpanded && (
            <div className="sidebar-tip">
              <Bot size={21} />
              <strong>Uma visão mais simples</strong>
              <p>Entenda suas finanças com a ajuda do seu assistente.</p>
              <button onClick={() => onSelectTab("chat")}>
                Iniciar conversa
              </button>
            </div>
          )}
          <button
            className="nav-item logout-button"
            onClick={onLogout}
            aria-label="Sair"
            title="Sair"
          >
            <LogOut size={18} />
            {isExpanded && <span>Sair da conta</span>}
          </button>
        </div>
      </aside>
      <nav className="mobile-nav" aria-label="Navegação mobile">
        {navigationItems.map(({ id, mobileLabel, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelectTab(id)}
            className={activeTab === id ? "is-active" : ""}
            aria-label={label}
            aria-current={activeTab === id ? "page" : undefined}
          >
            <Icon size={20} />
            <span>{mobileLabel}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
