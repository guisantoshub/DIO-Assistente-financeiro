import { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "../../types";
import { Bot, Send, User } from "lucide-react";
import { QuickPrompts } from "../molecules/QuickPrompts";
import { ContextualAccountsWidget } from "../molecules/ContextualAccountsWidget";
import { ContextualPatternsWidget } from "../molecules/ContextualPatternsWidget";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isProcessing: boolean;
  usdBrlRate?: number;
}
export function ChatWindow({
  messages,
  onSendMessage,
  isProcessing,
  usdBrlRate = 5.85,
}: ChatWindowProps) {
  const [input, setInput] = useState("");
  const streamRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stream = streamRef.current;
    if (stream) stream.scrollTo({ top: stream.scrollHeight, behavior: "auto" });
  }, [messages, isProcessing]);
  return (
    <div className="chat-window">
      <div
        className="chat-stream"
        ref={streamRef}
        role="log"
        aria-label="Conversa com o assistente"
        aria-live="polite"
        aria-relevant="additions text"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${message.sender === "user" ? "from-user" : ""}`}
          >
            <span className="message-avatar">
              {message.sender === "user" ? (
                <User size={17} />
              ) : (
                <Bot size={19} />
              )}
            </span>
            <div className="message-body">
              <div className="message-meta">
                <strong>
                  {message.sender === "user" ? "Você" : "PetroFinance AI"}
                </strong>
                <time>{message.timestamp}</time>
              </div>
              <div className="message-bubble">
                <div className="message-markdown">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
                {message.dataPayload?.type === "accounts" && (
                  <ContextualAccountsWidget
                    accounts={message.dataPayload.data}
                    usdBrlRate={usdBrlRate}
                  />
                )}
                {message.dataPayload?.type === "patterns" && (
                  <ContextualPatternsWidget
                    data={message.dataPayload.data}
                    usdBrlRate={usdBrlRate}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="chat-processing" role="status">
            <Bot size={18} />
            <span>
              Analisando sua pergunta<span className="typing-dots">...</span>
            </span>
          </div>
        )}
      </div>
      <div className="chat-composer">
        <QuickPrompts disabled={isProcessing} onSelectPrompt={onSendMessage} />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (input.trim() && !isProcessing) {
              onSendMessage(input.trim());
              setInput("");
            }
          }}
        >
          <input
            aria-label="Mensagem para o assistente"
            placeholder="Pergunte sobre suas finanças..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={4000}
            disabled={isProcessing}
          />
          <button
            type="submit"
            aria-label="Enviar mensagem"
            disabled={!input.trim() || isProcessing}
          >
            <Send size={18} />
            <span>Enviar</span>
          </button>
        </form>
        <p className="chat-disclaimer">
          Respostas com base nos dados desta demonstração.
        </p>
      </div>
    </div>
  );
}
