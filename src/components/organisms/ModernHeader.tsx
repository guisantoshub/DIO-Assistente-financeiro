import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  HelpCircle,
  Settings,
  ChevronDown,
  LogOut,
  User,
  Building2,
} from "lucide-react";
import type { NotificationItem } from "../../types";
interface ModernHeaderProps {
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onLogout: () => void;
  onOpenUserProfile: () => void;
  onSearch: (value: string) => void;
}
export function ModernHeader({
  notifications,
  onOpenNotifications,
  onOpenSettings,
  onOpenHelp,
  onLogout,
  onOpenUserProfile,
  onSearch,
}: ModernHeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node))
        setIsUserMenuOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsUserMenuOpen(false);
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <header className="app-header">
      <div className="mobile-brand">
        <Building2 size={21} />
        <span>PetroFinance</span>
      </div>
      <form
        className="header-search"
        onSubmit={(event) => {
          event.preventDefault();
          if (search.trim()) {
            onSearch(search.trim());
            setSearch("");
          }
        }}
      >
        <Search size={17} />
        <input
          aria-label="Buscar na plataforma"
          placeholder="O que você procura?"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <kbd>Enter</kbd>
      </form>
      <div className="header-actions">
        <span className="demo-label">Demonstração</span>
        <button
          className="header-icon help-button"
          onClick={onOpenHelp}
          aria-label="Ajuda"
          title="Ajuda"
        >
          <HelpCircle size={19} />
        </button>
        <button
          className="header-icon"
          onClick={onOpenSettings}
          aria-label="Configurações"
          title="Configurações"
        >
          <Settings size={19} />
        </button>
        <button
          className="header-icon notification-button"
          onClick={onOpenNotifications}
          aria-label="Notificações"
          title="Notificações"
        >
          <Bell size={19} />
          {unreadCount > 0 && (
            <span className="notification-count">{unreadCount}</span>
          )}
        </button>
        <div className="user-menu" ref={menuRef}>
          <button
            className="user-trigger"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            aria-expanded={isUserMenuOpen}
            aria-label="Menu de Guilherme Santos"
          >
            <span className="user-avatar">GS</span>
            <span className="user-name">
              Guilherme Santos<small>Perfil moderado</small>
            </span>
            <ChevronDown size={15} className="user-chevron" />
          </button>
          {isUserMenuOpen && (
            <div className="user-dropdown">
              <p>Minha conta</p>
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onOpenUserProfile();
                }}
              >
                <User size={17} />
                Perfis e acessos
              </button>
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onLogout();
                }}
              >
                <LogOut size={17} />
                Sair da conta
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
