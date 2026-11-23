import { useState } from "react";
import type { UserProfile } from "../../types";
import { ShieldCheck, Mail, X, User } from "lucide-react";
export function UsersPage({ users }: { users: UserProfile[] }) {
  const [selected, setSelected] = useState<UserProfile | null>(null);
  return (
    <div className="page-stack">
      <div className="profile-grid">
        {users.map((user) => (
          <article key={user.id} className="surface profile-card">
            <div className="profile-top">
              <span className="profile-avatar">
                {user.name
                  .split(" ")
                  .map((name) => name[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className="subtle-badge">{user.status}</span>
            </div>
            <h2>{user.name}</h2>
            <p className="profile-email">
              <Mail size={14} />
              {user.email}
            </p>
            <dl>
              <div>
                <dt>Acesso</dt>
                <dd>{user.role}</dd>
              </div>
              <div>
                <dt>Perfil de investidor</dt>
                <dd>{user.investorProfile}</dd>
              </div>
            </dl>
            <button
              className="secondary-button"
              onClick={() => setSelected(user)}
            >
              Ver perfil
            </button>
          </article>
        ))}
      </div>
      <aside className="insight-note">
        <ShieldCheck size={20} />
        <div>
          <strong>Você tem o controle dos seus dados</strong>Consulte e gerencie
          as permissões de compartilhamento diretamente no aplicativo da sua
          instituição financeira.
        </div>
      </aside>
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <section
            className="preference-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-title"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === "Escape") setSelected(null);
            }}
          >
            <div className="dialog-heading">
              <span className="soft-icon">
                <User size={20} />
              </span>
              <h2 id="profile-title">{selected.name}</h2>
              <button
                autoFocus
                className="icon-button"
                aria-label="Fechar perfil"
                onClick={() => setSelected(null)}
              >
                <X size={20} />
              </button>
            </div>
            <dl className="profile-details">
              <div>
                <dt>E-mail</dt>
                <dd>{selected.email}</dd>
              </div>
              <div>
                <dt>Documento</dt>
                <dd>{selected.documentMasked}</dd>
              </div>
              <div>
                <dt>Acesso</dt>
                <dd>{selected.role}</dd>
              </div>
              <div>
                <dt>Perfil de investidor</dt>
                <dd>{selected.investorProfile}</dd>
              </div>
            </dl>
            <button
              className="primary-button"
              onClick={() => setSelected(null)}
            >
              Concluir
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
