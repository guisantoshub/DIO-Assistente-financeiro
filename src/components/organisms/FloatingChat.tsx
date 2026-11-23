import { Bot, Maximize2, X } from "lucide-react";
import { ChatWindow, type ChatWindowProps } from "./ChatWindow";
interface FloatingChatProps extends ChatWindowProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  onExpandToFullPage: () => void;
}
export function FloatingChat({
  isOpen,
  onToggleOpen,
  onExpandToFullPage,
  ...chatProps
}: FloatingChatProps) {
  if (!isOpen)
    return (
      <button
        className="assistant-fab"
        onClick={onToggleOpen}
        aria-label="Abrir assistente financeiro"
      >
        <Bot size={21} />
        <span>Fale com o assistente</span>
      </button>
    );
  return (
    <section
      className="floating-chat"
      aria-label="Assistente em janela flutuante"
    >
      <div className="floating-heading">
        <Bot size={21} />
        <div>
          <strong>Seu assistente</strong>
          <span>Vamos simplificar suas finanças</span>
        </div>
        <button
          aria-label="Expandir assistente"
          onClick={onExpandToFullPage}
          title="Expandir assistente"
        >
          <Maximize2 size={18} />
        </button>
        <button
          aria-label="Fechar assistente"
          onClick={onToggleOpen}
          title="Fechar assistente"
        >
          <X size={20} />
        </button>
      </div>
      <ChatWindow {...chatProps} />
    </section>
  );
}
