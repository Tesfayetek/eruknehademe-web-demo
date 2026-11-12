import React from 'react';
import { Layout, Server, Database, Smartphone, ShieldCheck, Cloud, Cpu, Terminal } from 'lucide-react';

export const TechnologyMatrix: React.FC = () => {
  const stacks = [
    {
      category: 'Frontend & User Experience',
      icon: Layout,
      skills: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Next.js', 'Vite', 'Figma Design Tokens', 'Motion Animations', 'WCAG 2.1 AA Accessibility']
    },
    {
      category: 'Backend & APIs',
      icon: Server,
      skills: ['Node.js', 'Express', 'REST Architecture', 'GraphQL', 'Authentication Handshakes', 'Microservice Gateways', 'Rate Limiting & CORS']
    },
    {
      category: 'Databases & Storage',
      icon: Database,
      skills: ['PostgreSQL', 'Cloud SQL', 'Firestore & Firebase', 'Redis Caching', 'FIFO Ledgers', 'Drizzle ORM', 'Schema Migrations']
    },
    {
      category: 'Mobile & Cloud Infrastructure',
      icon: Cloud,
      skills: ['Responsive Mobile PWAs', 'Docker Containers', 'Cloud Run & Serverless', 'CI/CD Pipelines', 'Reverse Proxy & SSL', 'Domain DNS Management']
    }
  ];

  return (
    <section id="technology" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="mb-10">
        <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
          TECHNICAL COMPETENCY MATRIX
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Engineering Expertise & Modern Software Architecture
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Erukneh Ademe combines rigorous software architecture with responsive frontend craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stacks.map((stack, idx) => {
          const Icon = stack.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-sm mb-3">{stack.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {stack.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-[11px] text-slate-300 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
