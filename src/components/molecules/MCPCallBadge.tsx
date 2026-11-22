import React, { useState } from 'react';
import type { MCPToolCall } from '../../types';
import { ChevronDown, ChevronUp, Cpu, Server, ExternalLink } from 'lucide-react';

export interface MCPCallBadgeProps {
  toolCall: MCPToolCall;
}

export const MCPCallBadge: React.FC<MCPCallBadgeProps> = ({ toolCall }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isPluggy = toolCall.server === 'pluggy';

  return (
    <div className="my-2.5 rounded-xl border border-slate-200 bg-slate-900 text-slate-200 overflow-hidden text-xs shadow-xs transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2 hover:bg-slate-800 transition-colors cursor-pointer text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded-md ${isPluggy ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
            {isPluggy ? <Server className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
          </div>
          <span className="font-mono font-semibold text-slate-100">
            {toolCall.toolName}
          </span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
            isPluggy ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
          }`}>
            {toolCall.server === 'pluggy' ? 'Pluggy HTTP' : 'Plaid STDIO'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
          <span>{toolCall.latencyMs}ms</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-3.5 py-2.5 border-t border-slate-800 bg-slate-950/80 font-mono text-[11px] space-y-2">
          <div>
            <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Parâmetros (Tool Input):</span>
            <pre className="text-teal-300 overflow-x-auto p-1.5 bg-slate-900 rounded border border-slate-800 mt-1">
              {JSON.stringify(toolCall.parameters, null, 2)}
            </pre>
          </div>
          <div>
            <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Resultado MCP (Tool Output):</span>
            <div className="text-slate-300 bg-slate-900 p-2 rounded border border-slate-800 mt-1">
              {toolCall.resultSummary}
            </div>
          </div>
          {toolCall.endpointUrl && (
            <div className="flex items-center gap-1 text-[10px] text-slate-400 pt-1">
              <ExternalLink className="w-3 h-3 text-slate-500" />
              <span>Endpoint: {toolCall.endpointUrl}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
