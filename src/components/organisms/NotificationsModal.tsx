import {
  X,
  Bell,
  CheckCheck,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { NotificationItem } from "../../types";
interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}
export function NotificationsModal({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}: NotificationsModalProps) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop notification-backdrop" onClick={onClose}>
      <section
        className="notification-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notifications-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dialog-heading">
          <span className="soft-icon">
            <Bell size={20} />
          </span>
          <div>
            <h2 id="notifications-title">Notificações</h2>
            <p>O que acontece com suas finanças.</p>
          </div>
          <button
            autoFocus
            className="icon-button"
            aria-label="Fechar notificações"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <div className="notification-summary">
          <span>
            {notifications.filter((notification) => !notification.read).length}{" "}
            não lidas
          </span>
          <button onClick={onMarkAllAsRead}>
            <CheckCheck size={16} />
            Marcar como lidas
          </button>
        </div>
        <div className="notification-list">
          {notifications.map((notification) => {
            const Icon =
              notification.type === "alert"
                ? AlertCircle
                : notification.type === "success"
                  ? CheckCircle2
                  : Info;
            return (
              <article
                key={notification.id}
                className={`notification-item ${notification.read ? "" : "unread"}`}
              >
                <Icon size={19} />
                <div>
                  <h3>{notification.title}</h3>
                  <p>{notification.description}</p>
                  <time>{notification.timestamp}</time>
                </div>
              </article>
            );
          })}
        </div>
        <p className="notification-footer">
          Avisos ilustrativos desta demonstração.
        </p>
      </section>
    </div>
  );
}
