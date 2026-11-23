import { X, HelpCircle } from "lucide-react";
export function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="preference-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dialog-heading">
          <span className="soft-icon">
            <HelpCircle size={20} />
          </span>
          <div>
            <h2 id="help-title">Como podemos ajudar?</h2>
            <p>Conheça o seu espaço financeiro.</p>
          </div>
          <button
            className="icon-button"
            aria-label="Fechar ajuda"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <div className="help-content">
          <h3>Tudo em um só lugar</h3>
          <p>
            Veja suas contas na visão geral, acompanhe entradas e saídas no
            extrato e conheça a composição dos seus investimentos.
          </p>
          <h3>Converse com o assistente</h3>
          <p>
            Pergunte sobre saldos, gastos ou a fatura do cartão. Você pode
            continuar a conversa em uma janela flutuante enquanto navega.
          </p>
          <h3>Sobre a demonstração</h3>
          <p>
            Os valores e os perfis são ilustrativos. A plataforma não movimenta
            dinheiro nem acessa contas bancárias reais.
          </p>
        </div>
        <button className="primary-button" onClick={onClose}>
          Entendi
        </button>
      </section>
    </div>
  );
}
