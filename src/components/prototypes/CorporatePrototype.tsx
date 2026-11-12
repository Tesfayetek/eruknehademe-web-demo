import React, { useState } from 'react';
import { Globe, Building, Shield, ChevronRight, Mail, Phone, MapPin, Award, ArrowUpRight } from 'lucide-react';

export const CorporatePrototype: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'services' | 'leadership' | 'news' | 'contact'>('home');
  const [inquirySent, setInquirySent] = useState(false);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col min-h-[640px]">
      {/* Simulation Browser Bar */}
      <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="px-3 py-1 bg-slate-900 rounded border border-slate-800 font-mono text-slate-400 text-[11px] flex items-center gap-2">
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>https://corporate.eruknehademe.com/{currentPage !== 'home' ? currentPage : ''}</span>
          </div>
        </div>
        <span className="text-[11px] text-cyan-400 font-mono">Simulated Enterprise Site</span>
      </div>

      {/* Corporate Site Top Nav */}
      <header className="bg-slate-950/95 border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="w-7 h-7 rounded bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center font-bold text-white text-xs">
            EA
          </div>
          <span className="font-bold text-white text-sm tracking-tight">ADEME HOLDINGS CORP</span>
        </div>

        <nav className="flex items-center gap-5 text-xs font-medium text-slate-300">
          <button
            onClick={() => setCurrentPage('home')}
            className={`hover:text-cyan-400 transition-colors ${currentPage === 'home' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage('about')}
            className={`hover:text-cyan-400 transition-colors ${currentPage === 'about' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            About
          </button>
          <button
            onClick={() => setCurrentPage('services')}
            className={`hover:text-cyan-400 transition-colors ${currentPage === 'services' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Services
          </button>
          <button
            onClick={() => setCurrentPage('leadership')}
            className={`hover:text-cyan-400 transition-colors ${currentPage === 'leadership' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            Leadership
          </button>
          <button
            onClick={() => setCurrentPage('news')}
            className={`hover:text-cyan-400 transition-colors ${currentPage === 'news' ? 'text-cyan-400 font-semibold' : ''}`}
          >
            News & Media
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className={`px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors ${currentPage === 'contact' ? 'ring-2 ring-cyan-400' : ''}`}
          >
            Contact
          </button>
        </nav>
      </header>

      {/* Corporate Site Body */}
      <div className="flex-1 bg-slate-900 overflow-y-auto p-6">
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 text-center space-y-4">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">Institutional Digital Leadership</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Architecting Sustainable Growth Across Global Emerging Markets
              </h1>
              <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
                Ademe Holdings brings world-class digital systems, strategic enterprise solutions, and technological infrastructure to cross-sector partners worldwide.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setCurrentPage('services')}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-semibold flex items-center gap-1.5"
                >
                  Our Core Capabilities
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentPage('leadership')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-semibold"
                >
                  Executive Management
                </button>
              </div>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-2">
                <Building className="w-6 h-6 text-cyan-400" />
                <h3 className="font-semibold text-white text-sm">Enterprise Engineering</h3>
                <p className="text-xs text-slate-400">High-reliability cloud architecture, distributed transaction systems, and compliant database models.</p>
              </div>
              <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-2">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h3 className="font-semibold text-white text-sm">Institutional Governance</h3>
                <p className="text-xs text-slate-400">Rigorous compliance protocols, ISO standard audits, and zero-trust authentication practices.</p>
              </div>
              <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-2">
                <Award className="w-6 h-6 text-cyan-400" />
                <h3 className="font-semibold text-white text-sm">Global Scale</h3>
                <p className="text-xs text-slate-400">Demonstrated delivery across banking, human resources, logistics, and supply infrastructure.</p>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT PAGE */}
        {currentPage === 'about' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-2">
              <span className="text-xs text-cyan-400 uppercase font-mono tracking-wider">About The Organization</span>
              <h2 className="text-xl font-bold text-white">Engineering Institutional Excellence</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Founded with a mission to bridge African technological potential with global engineering standards, Ademe Holdings architects turnkey digital systems that power enterprise productivity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded border border-slate-800">
                <div className="text-cyan-400 font-mono text-xl font-bold">14+</div>
                <div className="text-xs text-slate-400 mt-1">Enterprise Prototype Systems</div>
              </div>
              <div className="bg-slate-950 p-4 rounded border border-slate-800">
                <div className="text-cyan-400 font-mono text-xl font-bold">99.98%</div>
                <div className="text-xs text-slate-400 mt-1">Target Infrastructure Uptime</div>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES PAGE */}
        {currentPage === 'services' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <span className="text-xs text-cyan-400 uppercase font-mono tracking-wider">Our Services</span>
              <h2 className="text-xl font-bold text-white">Full-Spectrum Digital Capabilities</h2>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Custom ERP & Workflow Modernization', desc: 'Custom enterprise resource planning modules replacing legacy spreadsheets with cloud ledgers.' },
                { title: 'Mobile Ecosystems & Native Solutions', desc: 'Secure, high-frequency mobile interfaces for field agents, customers, and operations staff.' },
                { title: 'Cloud Infrastructure & API Gateways', desc: 'Fault-tolerant microservices, continuous integration pipelines, and hardened cloud deployment.' }
              ].map((s, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-white text-sm">{s.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400 shrink-0 ml-4" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEADERSHIP PAGE */}
        {currentPage === 'leadership' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <span className="text-xs text-cyan-400 uppercase font-mono tracking-wider">Executive Management</span>
              <h2 className="text-xl font-bold text-white">Board & Executive Profile</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded border border-slate-800">
                <div className="font-semibold text-white text-sm">Erukneh Ademe</div>
                <div className="text-xs text-cyan-400 font-medium">Founder & Chief Technology Architect</div>
                <p className="text-xs text-slate-400 mt-2">
                  Oversees engineering strategy, digital solutions architecture, and proprietary prototype development frameworks.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded border border-slate-800">
                <div className="font-semibold text-white text-sm">Hanna Tefera</div>
                <div className="text-xs text-cyan-400 font-medium">Head of Product Strategy & UX</div>
                <p className="text-xs text-slate-400 mt-2">
                  Leads cross-platform design systems, user ergonomics, and enterprise client research methodologies.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* NEWS PAGE */}
        {currentPage === 'news' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div>
              <span className="text-xs text-cyan-400 uppercase font-mono tracking-wider">Media & Announcements</span>
              <h2 className="text-xl font-bold text-white">Corporate Newsroom</h2>
            </div>

            <div className="space-y-3">
              {[
                { date: 'March 04, 2026', title: 'Ademe Holdings Launches Digital Projects Demonstration Portal', cat: 'Press Release' },
                { date: 'February 18, 2026', title: 'Ethiore HRMS Prototype Completes Pilot Usability Benchmarks', cat: 'Product Update' },
                { date: 'January 12, 2026', title: 'Quarterly Infrastructure & FIFO Warehouse Logistics Whitepaper Released', cat: 'Research' }
              ].map((news, i) => (
                <div key={i} className="p-4 bg-slate-950 rounded border border-slate-800">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span>{news.date}</span>
                    <span>·</span>
                    <span className="text-cyan-400">{news.cat}</span>
                  </div>
                  <h4 className="font-semibold text-white text-sm mt-1">{news.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div className="max-w-2xl mx-auto space-y-5">
            <div>
              <span className="text-xs text-cyan-400 uppercase font-mono tracking-wider">Engagement</span>
              <h2 className="text-xl font-bold text-white">Contact Corporate Headquarters</h2>
            </div>

            {inquirySent ? (
              <div className="p-6 bg-slate-950 rounded border border-emerald-800 text-center space-y-2">
                <div className="text-emerald-400 font-bold text-sm">Consultation Request Received (Sandbox)</div>
                <p className="text-xs text-slate-400">This is a prototype demonstration. Thank you for testing the corporate inquiry flow.</p>
                <button
                  onClick={() => setInquirySent(false)}
                  className="mt-3 px-3 py-1.5 bg-slate-800 text-xs rounded text-slate-200"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setInquirySent(true); }} className="bg-slate-950 p-5 rounded border border-slate-800 space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Organization Name</label>
                  <input required type="text" placeholder="e.g. Acme Global Logistics" className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Corporate Email</label>
                  <input required type="email" placeholder="executive@acmeglobal.com" className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Inquiry Scope</label>
                  <textarea rows={3} placeholder="Describe software requirement or prototype evaluation..." className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-white" />
                </div>
                <button type="submit" className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-semibold transition-colors">
                  Submit Corporate Inquiry
                </button>
              </form>
            )}

            <div className="grid grid-cols-3 gap-3 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>info@eruknehademe.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>+251 91 100 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
