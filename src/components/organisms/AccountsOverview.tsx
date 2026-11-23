import {
  Landmark,
  CreditCard,
  PiggyBank,
  Coins,
  Info,
  Wallet,
} from "lucide-react";
import type { Account } from "../../types";
interface AccountsOverviewProps {
  accounts: Account[];
  usdBrlRate: number;
  showBRL: boolean;
}
export function AccountsOverview({
  accounts,
  usdBrlRate,
  showBRL,
}: AccountsOverviewProps) {
  const usd = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  const brl = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value * usdBrlRate);
  const deposits = accounts
    .filter((account) => account.type === "depository")
    .reduce((sum, account) => sum + account.currentBalance, 0);
  const card = accounts.find((account) => account.type === "credit");
  const savings = accounts
    .filter((account) => account.subtype === "savings")
    .reduce((sum, account) => sum + account.currentBalance, 0);
  const metrics = [
    {
      label: "Saldo em contas",
      value: usd(deposits),
      footnote: showBRL ? `≈ ${brl(deposits)}` : "Soma das contas de depósito",
      icon: Wallet,
      emphasis: true,
    },
    {
      label: "Fatura do cartão",
      value: usd(card?.currentBalance ?? 0),
      footnote: showBRL
        ? `≈ ${brl(card?.currentBalance ?? 0)}`
        : "Valor da fatura em aberto",
      icon: CreditCard,
    },
    {
      label: "Sua reserva",
      value: usd(savings),
      footnote: showBRL ? `≈ ${brl(savings)}` : "Saldo da poupança",
      icon: PiggyBank,
    },
    {
      label: "Dólar de referência",
      value: `R$ ${usdBrlRate.toFixed(2).replace(".", ",")}`,
      footnote: "Equivalente a US$ 1,00",
      icon: Coins,
    },
  ];
  return (
    <div className="page-stack">
      <div className="metric-grid">
        {metrics.map(({ label, value, footnote, icon: Icon, emphasis }) => (
          <section
            key={label}
            className={`surface summary-card ${emphasis ? "emphasis" : ""}`}
          >
            <div className="summary-label">
              <span className="soft-icon">
                <Icon size={18} />
              </span>
              <span>{label}</span>
            </div>
            <p className="summary-value">{value}</p>
            <p className="summary-footnote">{footnote}</p>
          </section>
        ))}
      </div>
      <section>
        <div className="section-heading">
          <div>
            <h2>Suas contas</h2>
            <p>Os saldos que fazem parte do seu dia a dia.</p>
          </div>
          <span className="subtle-badge">{accounts.length} contas</span>
        </div>
        <div className="account-grid">
          {accounts.map((account) => {
            const isCredit = account.type === "credit";
            const Icon = isCredit
              ? CreditCard
              : account.subtype === "savings"
                ? PiggyBank
                : account.subtype === "money market"
                  ? Coins
                  : Landmark;
            return (
              <article key={account.id} className="surface">
                <div className="account-top">
                  <span className="soft-icon">
                    <Icon size={19} />
                  </span>
                  <div>
                    <h3>{account.name}</h3>
                    <p>
                      {account.institutionName} · final {account.mask}
                    </p>
                  </div>
                  <span className="subtle-badge">
                    {isCredit ? "Cartão" : "Conta"}
                  </span>
                </div>
                <p className="account-amount">
                  {usd(account.currentBalance)}
                  <small>USD</small>
                </p>
                {showBRL && (
                  <p className="account-conversion">
                    ≈ {brl(account.currentBalance)}
                  </p>
                )}
                <div className="account-bottom">
                  <span>
                    {isCredit ? "Limite disponível" : "Disponível para saque"}
                  </span>
                  <strong>
                    {usd(account.availableBalance ?? account.currentBalance)}
                  </strong>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <aside className="insight-note">
        <Info size={19} />
        <div>
          <strong>Seu saldo e sua fatura têm papéis diferentes</strong>O saldo
          das contas é o dinheiro que você tem. A fatura é o valor das compras
          que ainda precisa pagar e não faz parte desse saldo.
        </div>
      </aside>
    </div>
  );
}
