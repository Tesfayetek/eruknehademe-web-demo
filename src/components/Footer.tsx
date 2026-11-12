import React from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, filter?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">Erukneh Ademe</span>
              <span className="text-[11px] font-mono text-cyan-400">· Digital Solutions Showcase</span>
            </div>
            <p className="text-slate-400 italic text-xs">
              "Building Digital Solutions Through Innovation."
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <button onClick={() => onNavigate('home')} className="hover:text-cyan-400 transition-colors">
              Home
            </button>
            <button onClick={() => onNavigate('catalog', 'Website Projects')} className="hover:text-cyan-400 transition-colors">
              Websites
            </button>
            <button onClick={() => onNavigate('catalog', 'Web Applications')} className="hover:text-cyan-400 transition-colors">
              Web Apps
            </button>
            <button onClick={() => onNavigate('catalog', 'Mobile Applications')} className="hover:text-cyan-400 transition-colors">
              Mobile Apps
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors">
              About
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors">
              Contact
            </button>
            <button onClick={() => onNavigate('admin')} className="text-cyan-400 hover:underline">
              Administrator Portal
            </button>
          </div>
        </div>

        {/* Security & Subdomain Notice */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Erukneh Ademe. All rights reserved.</p>
            <p>
              Hosted at <code className="text-slate-400">demo.eruknehademe.com</code> — Every demonstration is a prototype running in isolated sandbox mode. Main apex website <code className="text-slate-400">eruknehademe.com</code> remains unaffected.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition-colors shrink-0"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
