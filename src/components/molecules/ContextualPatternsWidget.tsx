import { Repeat, Utensils, ShoppingBag } from "lucide-react";
import type { Transaction } from "../../types";
export function ContextualPatternsWidget({
  data,
  usdBrlRate = 5.85,
}: {
  data: {
    subTotal: number;
    foodTotal: number;
    retailTotal: number;
    transactions: Transaction[];
  };
  usdBrlRate?: number;
}) {
  const patterns = [
    { title: "Assinaturas", amount: data.subTotal, icon: Repeat },
    { title: "Alimentação e delivery", amount: data.foodTotal, icon: Utensils },
    {
      title: "Compras e mobilidade",
      amount: data.retailTotal,
      icon: ShoppingBag,
    },
  ];
  const total = patterns.reduce((sum, pattern) => sum + pattern.amount, 0);
  return (
    <div className="chat-pattern-list">
      {patterns.map(({ title, amount, icon: Icon }) => (
        <div key={title} className="chat-pattern-row">
          <Icon size={17} />
          <div>
            <strong>{title}</strong>
            <span>
              {total ? Math.round((amount / total) * 100) : 0}% dos gastos
            </span>
          </div>
          <div>
            <strong>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(amount * usdBrlRate)}
            </strong>
            <span>US$ {amount.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
