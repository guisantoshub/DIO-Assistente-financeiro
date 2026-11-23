import type { Account } from "../../types";
import { Landmark, CreditCard } from "lucide-react";
export function ContextualAccountsWidget({
  accounts,
  usdBrlRate = 5.85,
}: {
  accounts: Account[];
  usdBrlRate?: number;
}) {
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
  return (
    <div className="chat-account-list">
      {accounts.map((account) => (
        <div key={account.id} className="chat-account-row">
          {account.type === "credit" ? (
            <CreditCard size={17} />
          ) : (
            <Landmark size={17} />
          )}
          <div>
            <strong>{account.name}</strong>
            <span>
              {account.type === "credit"
                ? "Fatura em aberto"
                : `Final ${account.mask}`}
            </span>
          </div>
          <div>
            <strong>{usd(account.currentBalance)}</strong>
            <span>≈ {brl(account.currentBalance)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
