import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Repeat,
  Utensils,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import type { Transaction, SpendingPatternType } from "../../types";
interface TransactionsTableProps {
  transactions: Transaction[];
  usdBrlRate: number;
  showBRL: boolean;
}
const filters: { id: "all" | SpendingPatternType; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "assinaturas_recorrentes", label: "Assinaturas" },
  { id: "alimentacao_restaurantes", label: "Alimentação" },
  { id: "varejo_viagens", label: "Compras e mobilidade" },
  { id: "rendimentos_credito", label: "Entradas" },
];
const labels: Record<SpendingPatternType, string> = {
  assinaturas_recorrentes: "Assinaturas",
  alimentacao_restaurantes: "Alimentação",
  varejo_viagens: "Compras e mobilidade",
  rendimentos_credito: "Rendimentos",
};
export function TransactionsTable({
  transactions,
  usdBrlRate,
  showBRL,
}: TransactionsTableProps) {
  const [filter, setFilter] = useState<"all" | SpendingPatternType>("all");
  const filtered =
    filter === "all"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.spendingPattern === filter,
        );
  const currency = (value: number, code = "USD") =>
    new Intl.NumberFormat(code === "BRL" ? "pt-BR" : "en-US", {
      style: "currency",
      currency: code,
    }).format(Math.abs(value));
  const income = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
  const expenses = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  return (
    <div className="page-stack">
      <div className="transaction-summary">
        <section className="surface">
          <span className="soft-icon">
            <ArrowDownLeft size={19} />
          </span>
          <div>
            <p>Entradas do período</p>
            <strong>{currency(income)}</strong>
          </div>
        </section>
        <section className="surface">
          <span className="soft-icon">
            <ArrowUpRight size={19} />
          </span>
          <div>
            <p>Saídas do período</p>
            <strong>{currency(expenses)}</strong>
          </div>
        </section>
      </div>
      <section className="surface transaction-surface">
        <div className="section-heading">
          <div>
            <h2>Extrato de movimentações</h2>
            <p>Consulte suas últimas entradas e saídas.</p>
          </div>
          <span className="subtle-badge">{filtered.length} movimentações</span>
        </div>
        <div className="transaction-filters" aria-label="Filtrar transações">
          {filters.map((item) => (
            <button
              key={item.id}
              aria-pressed={filter === item.id}
              className={filter === item.id ? "is-active" : ""}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="transaction-list">
          {filtered.map((transaction) => {
            const isExpense = transaction.amount > 0;
            const Icon =
              transaction.spendingPattern === "assinaturas_recorrentes"
                ? Repeat
                : transaction.spendingPattern === "alimentacao_restaurantes"
                  ? Utensils
                  : isExpense
                    ? ShoppingBag
                    : Wallet;
            return (
              <article className="transaction-row" key={transaction.id}>
                <span className="soft-icon">
                  <Icon size={18} />
                </span>
                <div className="transaction-description">
                  <h3>{transaction.name}</h3>
                  <p>
                    {labels[transaction.spendingPattern]}
                    <span>
                      {" "}
                      ·{" "}
                      {new Date(
                        transaction.date + "T00:00:00",
                      ).toLocaleDateString("pt-BR")}
                    </span>
                  </p>
                </div>
                <span className={`flow-badge ${isExpense ? "" : "income"}`}>
                  {isExpense ? "Saída" : "Entrada"}
                </span>
                <div
                  className={`transaction-amount ${isExpense ? "" : "income"}`}
                >
                  <strong>
                    {isExpense ? "−" : "+"}
                    {currency(transaction.amount)}
                  </strong>
                  {showBRL && (
                    <span>
                      ≈ {currency(transaction.amount * usdBrlRate, "BRL")}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
