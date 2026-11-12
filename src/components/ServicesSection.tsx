import React from 'react';
import { Monitor, Smartphone, Database, Palette, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onContactClick: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onContactClick }) => {
  const services = [
    {
      title: 'Custom Web Application Development',
      desc: 'Architecting high-frequency, responsive web platforms (like Ethiore HRMS and Inventory portals) with clean state management, modular REST APIs, and strict data validation.',
      icon: Monitor
    },
    {
      title: 'Enterprise Software Solutions & ERPs',
      desc: 'Developing specialized internal business workflows, role-based dashboards, automated payroll slip generation, and FIFO inventory ledger solutions.',
      icon: Database
    },
    {
      title: 'Mobile Application Prototypes & PWAs',
      desc: 'Designing touch-first mobile interfaces with fluid transitions, simulated biometric security, offline storage, and responsive cross-device viewports.',
      icon: Smartphone
    },
    {
      title: 'UI/UX Design Systems & Frontend Modernization',
      desc: 'Crafting coherent brand design languages, Figma token specifications, accessible color palettes (WCAG AA), and converting legacy monoliths to modern React apps.',
      icon: Palette
    }
  ];

  return (
    <section id="services" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
            DEVELOPMENT SERVICES
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Turnkey Digital Solutions & Engineering Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            From proof-of-concept prototypes to full-scale digital systems, built with precision and durability.
          </p>
        </div>

        <button
          onClick={onContactClick}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 hover:border-cyan-500/50 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 self-start md:self-auto"
        >
          <span>Discuss a Custom Solution</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/40 border border-slate-800/90 rounded-xl p-6 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{srv.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{srv.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
