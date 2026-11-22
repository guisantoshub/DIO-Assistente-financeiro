import React from 'react';
import type { ChatMessage } from '../../types';
import { ChatWindow } from './ChatWindow';
import { Bot, Maximize2, X } from 'lucide-react';

export interface FloatingChatProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  onExpandToFullPage: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isProcessing: boolean;
  usdBrlRate: number;
}

export const FloatingChat: React.FC<FloatingChatProps> = ({
  isOpen,
  onToggleOpen,
  onExpandToFullPage,
  messages,
  onSendMessage,
  isProcessing,
  usdBrlRate
}) => {
  // When closed, render only the sleek floating FAB button
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={onToggleOpen}
          className="group relative flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-[#004d40] to-[#00796b] text-white rounded-full shadow-xl shadow-[#004d40]/35 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-teal-300/30"
          title="Abrir Assistente Financeiro IA (MCP)"
        >
          {/* Pulsing indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-400"></span>
          </span>

          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-teal-200" />
            <span className="font-bold text-xs tracking-wide">Assistente IA</span>
          </div>

          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium hidden sm:inline">
            MCP Online
          </span>
        </button>
      </div>
    );
  }

  // Floating dock widget
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 w-full max-w-[450px] h-[650px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-50 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200">
      
      {/* Floating Header */}
      <div className="h-14 bg-gradient-to-r from-[#004d40] to-[#00695c] text-white px-4 flex items-center justify-between shrink-0 rounded-t-3xl border-b border-teal-700/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
            <Bot className="w-4 h-4 text-teal-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs tracking-tight">PetroFinance AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <span className="text-[10px] text-teal-200 block">Plaid STDIO • Pluggy HTTP</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Expand to Full Page (opens as page with sidebar visible, exactly as requested) */}
          <button
            onClick={onExpandToFullPage}
            className="p-1.5 rounded-lg text-teal-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-medium"
            title="Abrir em tela inteira com menu lateral visível"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">Tela Cheia</span>
          </button>

          {/* Close / Minimize button */}
          <button
            onClick={onToggleOpen}
            className="p-1.5 rounded-lg text-teal-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Minimizar Chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Embedded Chat Window */}
      <div className="flex-1 overflow-hidden">
        <ChatWindow
          messages={messages}
          onSendMessage={onSendMessage}
          isProcessing={isProcessing}
          usdBrlRate={usdBrlRate}
        />
      </div>
    </div>
  );
};
