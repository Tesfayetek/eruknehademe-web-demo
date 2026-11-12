import React from 'react';
import { Terminal, Shield, Award, CheckCircle, Code, Briefcase } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Bio & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
              DEVELOPER PROFILE
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              About Erukneh Ademe
            </h2>
            <p className="text-sm text-cyan-400 font-medium mt-1">
              Full-Stack Software Engineer & Digital Solutions Architect
            </p>
          </div>

          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
            <p>
              I am a dedicated software engineer specializing in scalable web systems, enterprise ERP modules, and touch-first mobile solutions. My approach focuses on bridging complex institutional business workflows with clean, resilient user interfaces.
            </p>
            <p>
              This demonstration portal at <strong className="text-white">demo.eruknehademe.com</strong> was established to exhibit working, testable prototypes of software systems—such as the <strong className="text-cyan-300">Ethiore HRMS</strong> platform, the <strong className="text-cyan-300">FIFO Inventory Management</strong> engine, and corporate digital experiences.
            </p>
            <p>
              Every demonstration on this portal is deployed in an isolated sandbox environment using simulated datasets. This provides stakeholders, clients, and technical evaluators with hands-on insight into functionality while strictly preserving privacy, security, and data integrity.
            </p>
          </div>

          {/* Core Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-2 font-semibold text-white text-xs mb-1">
                <Code className="w-4 h-4 text-cyan-400" />
                <span>Deterministic Code Quality</span>
              </div>
              <p className="text-[11px] text-slate-400">Strict TypeScript typing, modular component boundaries, and zero-compromise error handling.</p>
            </div>
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-2 font-semibold text-white text-xs mb-1">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Sandbox Security First</span>
              </div>
              <p className="text-[11px] text-slate-400">Total isolation between public demonstration sandboxes and real production business data.</p>
            </div>
          </div>
        </div>

        {/* Right: Key Facts & Identity Card */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">
            Showcase Overview
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Branding:</span>
              <span className="text-white font-medium">Erukneh Ademe</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Portal Domain:</span>
              <span className="text-cyan-400 font-mono">demo.eruknehademe.com</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Main Apex Website:</span>
              <span className="text-slate-300 font-mono">eruknehademe.com</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Slogan:</span>
              <span className="text-slate-200 italic font-serif">"Building Digital Solutions Through Innovation."</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Location:</span>
              <span className="text-slate-200">Addis Ababa, Ethiopia · Global Remote</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Deployment Status:</span>
              <span className="text-emerald-400 font-mono font-medium">Ready for Subdomain Routing</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <strong>Subdomain Isolation Guarantee:</strong> Deployments to <code className="text-cyan-300">demo.eruknehademe.com</code> operate completely independently from the main <code className="text-slate-300">eruknehademe.com</code> domain.
          </div>
        </div>
      </div>
    </section>
  );
};
