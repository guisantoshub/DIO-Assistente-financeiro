import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage as ChatMessageType } from '../../types';
import { Avatar } from '../atoms/Avatar';
import { Button } from '../atoms/Button';
import { MCPCallBadge } from '../molecules/MCPCallBadge';
import { QuickPrompts } from '../molecules/QuickPrompts';
import { ContextualAccountsWidget } from '../molecules/ContextualAccountsWidget';
import { ContextualPatternsWidget } from '../molecules/ContextualPatternsWidget';
import { ContextualExplanationWidget } from '../molecules/ContextualExplanationWidget';
import { Send, AlertTriangle, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface ChatWindowProps {
  messages: ChatMessageType[];
  onSendMessage: (text: string) => void;
  isProcessing: boolean;
  usdBrlRate?: number;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  isProcessing,
  usdBrlRate = 5.85
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleSelectQuickPrompt = (prompt: string) => {
    if (isProcessing) return;
    onSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Sandbox Alert Banner */}
      <div className="bg-amber-50/80 border-b border-amber-200/70 px-4 py-2 flex items-center justify-between text-xs text-amber-800">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Ambiente Sandbox de Demonstração:</strong> Os dados bancários apresentados são simulados via Plaid Sandbox e documentação Pluggy. Nenhuma credencial real é exposta.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 font-medium text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>MCP Conectado</span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-slate-50/50 to-white">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start group`}
            >
              <Avatar
                type={msg.sender}
                size="md"
                className="shrink-0 mt-0.5"
              />

              <div className={`flex flex-col max-w-[90%] sm:max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-slate-600">
                    {isUser ? 'Você' : 'PetroFinance AI'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3.5 shadow-2xs w-full ${
                    isUser
                      ? 'bg-[#004d40] text-white rounded-tr-none max-w-fit ml-auto'
                      : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-none shadow-xs'
                  }`}
                >
                  {isUser ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="space-y-3">
                      {/* MCP Tool Calls Inspector */}
                      {msg.toolCalls && msg.toolCalls.length > 0 && (
                        <div>
                          {msg.toolCalls.map((tc) => (
                            <MCPCallBadge key={tc.id} toolCall={tc} />
                          ))}
                        </div>
                      )}

                      {/* Contextual Rich Payload Widgets */}
                      {msg.dataPayload?.type === 'accounts' && (
                        <ContextualAccountsWidget
                          accounts={msg.dataPayload.data}
                          usdBrlRate={usdBrlRate}
                        />
                      )}

                      {msg.dataPayload?.type === 'patterns' && (
                        <ContextualPatternsWidget
                          data={msg.dataPayload.data}
                          usdBrlRate={usdBrlRate}
                        />
                      )}

                      {msg.dataPayload?.type === 'mcp_explanation' && (
                        <ContextualExplanationWidget
                          topic={msg.dataPayload.data.topic}
                          usdBrlRate={usdBrlRate}
                        />
                      )}

                      {/* Clean Markdown Typography */}
                      <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed prose-headings:font-heading prose-headings:tracking-tight prose-a:text-[#004d40] prose-code:bg-slate-100 prose-code:text-[#004d40] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-blockquote:border-l-[#004d40] prose-blockquote:bg-[#e0f2f1]/30 prose-blockquote:py-1 prose-blockquote:px-3 prose-blockquote:rounded-r-lg prose-table:text-xs prose-th:bg-slate-50 prose-th:p-2 prose-td:p-2">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex gap-3.5 items-start">
            <Avatar type="assistant" size="md" />
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs flex items-center gap-2.5">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#004d40] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-[#004d40] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-[#004d40] animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </span>
              <span className="text-xs font-mono text-slate-500">
                Executando chamada MCP e formatando dados contextuais...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Footer Area: Quick Prompts & Input Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <QuickPrompts
          onSelectPrompt={handleSelectQuickPrompt}
          disabled={isProcessing}
        />

        <form onSubmit={handleSubmit} className="relative flex items-center mt-2.5">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ex: 'Qual é o meu saldo?', 'Explique meus gastos por padrão', 'O que é um Item?'..."
            disabled={isProcessing}
            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-4 pr-24 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004d40] focus:border-transparent transition-all shadow-2xs"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <Button
              type="submit"
              size="sm"
              variant="primary"
              disabled={!inputValue.trim() || isProcessing}
              iconRight={<Send className="w-3.5 h-3.5" />}
              className="rounded-lg"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
