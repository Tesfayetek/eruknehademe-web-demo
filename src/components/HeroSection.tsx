import React from 'react';
import { ArrowRight, Play, Sparkles, Terminal, Code2, Cpu, ExternalLink } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onSelectProject: (slug: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onSelectProject }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-800/80 bg-gradient-to-b from-[#080e18] via-[#091322] to-[#080e18]">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono tracking-wide">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>DIGITAL SOLUTIONS SHOWCASE PORTAL</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">DEMO.ERUKNEHADEME.COM</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
                Building Digital Solutions Through Innovation.
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Explore an independent portfolio of interactive web applications, corporate systems, and mobile prototypes engineered by <strong className="text-white font-semibold">Erukneh Ademe</strong>. Tested in safe, isolated sandbox environments with real interactive workflows.
              </p>
            </div>

            {/* Quick Prototype Deep-Links */}
            <div className="pt-1">
              <div className="text-xs text-slate-400 mb-2">Featured Demonstrations:</div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => onSelectProject('ethiore-hrms')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-cyan-500/50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Ethiore HRMS</span>
                </button>
                <button
                  onClick={() => onSelectProject('inventory')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-cyan-500/50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Inventory Management</span>
                </button>
                <button
                  onClick={() => onSelectProject('corporate')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-cyan-500/50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Corporate Website</span>
                </button>
                <button
                  onClick={() => onSelectProject('mobile-app')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-cyan-500/50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Mobile Application</span>
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-950"
              >
                <span>Browse All Demonstrations</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectProject('ethiore-hrms')}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                <span>Launch Interactive HRMS</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5 flex items-center">
            <div className="w-full relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src="/src/assets/images/hero_tech_workspace_1794468183248.jpg"
                  alt="Erukneh Ademe Digital Engineering Workspace"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Styled graceful fallback container
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </div>

              {/* Overlay Badge Bar */}
              <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-semibold text-white">Full-Stack Solutions Architecture</div>
                  <div className="text-[11px] text-slate-400">Addis Ababa & Global Remote Systems</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-cyan-400">Sandbox Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width KPI Strip placed below hero split */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-300">
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">4+</div>
            <div className="text-xs text-slate-400 mt-1">Core Working Prototypes</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">100%</div>
            <div className="text-xs text-slate-400 mt-1">Simulated Sandbox Safety</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">3</div>
            <div className="text-xs text-slate-400 mt-1">Preview Modes (Internal, Iframe, Link)</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">0</div>
            <div className="text-xs text-slate-400 mt-1">Production Risk / No Real PII</div>
          </div>
        </div>
      </div>
    </section>
  );
};
