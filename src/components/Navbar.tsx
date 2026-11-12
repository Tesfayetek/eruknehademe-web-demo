import React, { useState } from 'react';
import { Menu, X, Shield, Lock, Layers } from 'lucide-react';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string, filter?: string) => void;
  isAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, onNavigate, isAuthenticated }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: string, filter?: string) => {
    onNavigate(view, filter);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNav('home')}
          className="text-left group flex items-center gap-2.5 whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            EA
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            Erukneh Ademe
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNav('home')}
            className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'home' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('catalog', 'Website Projects')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Website Projects
          </button>
          <button
            onClick={() => handleNav('catalog', 'Web Applications')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Web Applications
          </button>
          <button
            onClick={() => handleNav('catalog', 'Mobile Applications')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            Mobile Applications
          </button>
          <button
            onClick={() => handleNav('catalog', 'UI/UX Designs')}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            UI/UX Designs
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'about' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNav('contact')}
            className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'contact' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNav('admin')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-950"
          >
            {isAuthenticated ? (
              <>
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Access</span>
              </>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-4 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNav('home')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('catalog', 'Website Projects')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Website Projects
            </button>
            <button
              onClick={() => handleNav('catalog', 'Web Applications')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Web Applications
            </button>
            <button
              onClick={() => handleNav('catalog', 'Mobile Applications')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Mobile Applications
            </button>
            <button
              onClick={() => handleNav('catalog', 'UI/UX Designs')}
              className="text-left py-2 hover:text-cyan-400"
            >
              UI/UX Designs
            </button>
            <button
              onClick={() => handleNav('about')}
              className="text-left py-2 hover:text-cyan-400"
            >
              About Erukneh Ademe
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="text-left py-2 hover:text-cyan-400"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
