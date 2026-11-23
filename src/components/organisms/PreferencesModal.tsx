import { useState } from "react";
import { Settings, X, Check } from "lucide-react";
interface PreferencesModalProps {
  showBRL: boolean;
  onToggleBRL: () => void;
  onClose: () => void;
}
export function PreferencesModal({
  showBRL,
  onToggleBRL,
  onClose,
}: PreferencesModalProps) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="preference-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preferences-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dialog-heading">
          <span className="soft-icon">
            <Settings size={20} />
          </span>
          <div>
            <h2 id="preferences-title">Configurações</h2>
            <p>Deixe a plataforma do seu jeito.</p>
          </div>
          <button
            className="icon-button"
            aria-label="Fechar configurações"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <div className="preference-row">
          <div>
            <h3>Conversão em reais</h3>
            <p>Exibir também os valores em BRL nas contas e no extrato.</p>
          </div>
          <button
            role="switch"
            aria-checked={showBRL}
            aria-label="Exibir conversão em reais"
            className={`toggle-switch ${showBRL ? "is-on" : ""}`}
            onClick={() => {
              onToggleBRL();
              setSaved(true);
            }}
          >
            <span />
          </button>
        </div>
        <div className="preference-note">
          <h3>Cotação de referência</h3>
          <p>US$ 1 = R$ 5,85. Valor ilustrativo usado nesta demonstração.</p>
        </div>
        {saved && (
          <p className="saved-note" role="status">
            <Check size={16} />
            Preferência salva neste navegador.
          </p>
        )}
        <button className="primary-button" onClick={onClose}>
          Concluir
        </button>
      </section>
    </div>
  );
}
