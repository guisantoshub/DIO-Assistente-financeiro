import { Building2, Wallet, PieChart, Bot } from "lucide-react";
export function LoginPage({ onLogin }: { onLogin: () => void }) {
  return (
    <main className="login-page">
      <section className="login-story">
        <div className="login-brand">
          <Building2 size={24} />
          PetroFinance
        </div>
        <div>
          <p>MAIS CLAREZA. MAIS EQUILÍBRIO.</p>
          <h1>
            Um novo olhar
            <br />
            para suas finanças.
          </h1>
          <span>
            Contas, investimentos e respostas simples.
            <br />
            Tudo em um lugar pensado para você.
          </span>
          <div className="login-features">
            <span>
              <Wallet size={18} />
              Suas contas
            </span>
            <span>
              <PieChart size={18} />
              Seus investimentos
            </span>
            <span>
              <Bot size={18} />
              Seu assistente
            </span>
          </div>
        </div>
        <small>Seu dinheiro, mais claro.</small>
      </section>
      <section className="login-access">
        <div>
          <span className="subtle-badge">Demonstração</span>
          <h2>Que bom ter você aqui.</h2>
          <p>
            Explore uma forma mais simples de acompanhar sua vida financeira.
          </p>
          <button className="primary-button" onClick={onLogin}>
            Entrar na plataforma
          </button>
          <small>
            Esta experiência utiliza dados ilustrativos.
            <br />
            Nenhuma senha ou conta bancária real é necessária.
          </small>
        </div>
      </section>
    </main>
  );
}
