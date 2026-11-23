import { Wallet, PieChart, CreditCard, TrendingUp } from "lucide-react";
interface QuickPromptsProps {
  onSelectPrompt: (promptText: string) => void;
  disabled?: boolean;
}
const prompts = [
  {
    label: "Meu saldo",
    text: "Qual é o meu saldo atual em todas as contas?",
    icon: Wallet,
  },
  {
    label: "Meus gastos",
    text: "Como meus gastos estão distribuídos?",
    icon: PieChart,
  },
  {
    label: "Minha fatura",
    text: "Como funciona a fatura do meu cartão?",
    icon: CreditCard,
  },
  {
    label: "Investimentos",
    text: "Como está minha carteira de investimentos?",
    icon: TrendingUp,
  },
];
export function QuickPrompts({ onSelectPrompt, disabled }: QuickPromptsProps) {
  return (
    <div className="quick-prompts" aria-label="Sugestões de perguntas">
      {prompts.map(({ label, text, icon: Icon }) => (
        <button
          key={label}
          disabled={disabled}
          onClick={() => onSelectPrompt(text)}
        >
          <Icon size={15} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
