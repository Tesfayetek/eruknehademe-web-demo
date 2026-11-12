import React, { useState } from 'react';
import { Project } from '../types/project';
import { Monitor, Tablet, Smartphone, Maximize2, Minimize2, X, ExternalLink, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { HRMSPrototype } from './prototypes/HRMSPrototype';
import { InventoryPrototype } from './prototypes/InventoryPrototype';
import { CorporatePrototype } from './prototypes/CorporatePrototype';
import { MobilePrototype } from './prototypes/MobilePrototype';

interface LiveDemoViewerProps {
  project: Project;
  onClose: () => void;
}

export const LiveDemoViewer: React.FC<LiveDemoViewerProps> = ({ project, onClose }) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Render appropriate interactive prototype or iframe
  const renderInteractiveContent = () => {
    if (project.slug === 'ethiore-hrms') {
      return <HRMSPrototype />;
    }
    if (project.slug === 'inventory') {
      return <InventoryPrototype />;
    }
    if (project.slug === 'corporate') {
      return <CorporatePrototype />;
    }
    if (project.slug === 'mobile-app') {
      return <MobilePrototype />;
    }

    // Default internal fallback or iframe
    if (project.previewType === 'iframe' && project.previewUrl && !iframeError) {
      return (
        <div className="w-full h-[700px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative">
          <iframe
            src={project.previewUrl}
            title={project.name}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms"
            onError={() => setIframeError(true)}
          />
        </div>
      );
    }

    // Fallback sandbox preview for custom added projects
    return (
      <div className="p-8 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-4 max-w-2xl mx-auto my-12">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center font-bold text-lg">
          {project.name.slice(0, 2).toUpperCase()}
        </div>
        <h3 className="text-xl font-bold text-white">{project.name} (Custom Prototype)</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">{project.detailedDescription || project.description}</p>
        
        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-left text-xs space-y-2">
          <div className="font-semibold text-slate-200">Demonstration Scope:</div>
          <ul className="list-disc list-inside text-slate-400 space-y-1">
            {project.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        {project.previewUrl && (
          <a
            href={project.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-semibold"
          >
            <span>Open External URL</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col">
      {/* Top Demo Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex items-center justify-between gap-4 select-none">
        {/* Left: Project title & Demo Banner */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
            title="Back to portal"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">{project.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/80 uppercase font-semibold">
                DEMO PROTOTYPE – NOT FOR PRODUCTION USE
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Direct Route: https://demo.eruknehademe.com/{project.slug}
            </div>
          </div>
        </div>

        {/* Center: Viewport Switcher */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              viewport === 'desktop' ? 'bg-cyan-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              viewport === 'tablet' ? 'bg-cyan-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet (768px)</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              viewport === 'mobile' ? 'bg-cyan-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (390px)</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {project.previewUrl && (
            <a
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>External Window</span>
            </a>
          )}

          <button
            onClick={toggleFullscreen}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>

      {/* Main Preview Canvas */}
      <div className="flex-1 bg-slate-950 overflow-y-auto p-4 md:p-8 flex items-start justify-center">
        <div
          className={`transition-all duration-300 w-full ${
            viewport === 'desktop'
              ? 'max-w-6xl'
              : viewport === 'tablet'
              ? 'max-w-[768px]'
              : 'max-w-[420px]'
          }`}
        >
          {renderInteractiveContent()}
        </div>
      </div>
    </div>
  );
};
