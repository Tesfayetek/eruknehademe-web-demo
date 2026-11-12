import React, { useState } from 'react';
import { AlertCircle, ShieldCheck, X } from 'lucide-react';

export const SecurityBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Demo notice" className="bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 border-b border-cyan-800/40 text-slate-200 text-xs py-2 px-4 select-none relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold shrink-0">
            DEMO PROTOTYPE
          </span>
          <p className="truncate text-slate-300 text-xs">
            <strong className="text-white font-medium">NOT FOR PRODUCTION USE</strong> — All systems run on simulated mock data with zero real financial or employee transactions.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sandbox Isolated</span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            title="Dismiss Notice"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
