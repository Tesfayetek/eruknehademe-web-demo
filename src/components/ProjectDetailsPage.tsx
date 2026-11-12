import React from 'react';
import { Project } from '../types/project';
import { ArrowLeft, Play, ExternalLink, ShieldCheck, CheckCircle2, KeyRound, Cpu, Layers } from 'lucide-react';

interface ProjectDetailsPageProps {
  project: Project;
  onBack: () => void;
  onLaunchDemo: (project: Project) => void;
}

export const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({
  project,
  onBack,
  onLaunchDemo
}) => {
  return (
    <div className="py-12 px-6 max-w-7xl mx-auto space-y-10">
      {/* Back Button & Direct Route */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Demonstrations</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span>Direct URL:</span>
          <span className="text-cyan-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
            https://demo.eruknehademe.com/{project.slug}
          </span>
        </div>
      </div>

      {/* Main Header Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Metadata & Overview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-cyan-400 font-semibold">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>Status: <strong className="text-slate-200">{project.projectStatus}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Created {project.createdAt}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.name}
            </h1>
            <p className="text-base text-cyan-400 font-medium">
              {project.tagline}
            </p>
          </div>

          <div className="text-sm text-slate-300 leading-relaxed space-y-3">
            <p>{project.detailedDescription || project.description}</p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onLaunchDemo(project)}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-950"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Launch Live Demonstration</span>
            </button>

            {project.previewUrl && (
              <a
                href={project.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                <span>External Access</span>
              </a>
            )}
          </div>

          {/* Demo Sandbox Credentials if available */}
          {project.demoCredentials && project.demoCredentials.length > 0 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <KeyRound className="w-4 h-4 text-cyan-400" />
                <span>Sample Demonstration Accounts (Zero Real PII)</span>
              </div>
              <p className="text-xs text-slate-400">
                You may test with these pre-seeded sandbox accounts or utilize the single-click prototype launch:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.demoCredentials.map((cred, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-xs space-y-1">
                    <div className="font-semibold text-cyan-400">{cred.role}</div>
                    <div className="text-slate-300 font-mono text-[11px] truncate">User: {cred.username}</div>
                    <div className="text-slate-400 font-mono text-[11px]">Pass: {cred.pinOrPassword}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Hero Screenshot & Quick Specs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl relative group">
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Preview Engine:</span>
              <span className="text-cyan-400 font-mono font-semibold uppercase">{project.previewType} Prototype</span>
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          {project.specifications && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                System Specifications
              </h3>
              <div className="divide-y divide-slate-800/80 text-xs">
                {Object.entries(project.specifications).map(([key, val]) => (
                  <div key={key} className="py-2 flex justify-between gap-4">
                    <span className="text-slate-400">{key}</span>
                    <span className="text-slate-200 font-medium text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Key Features & Technology Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-slate-800">
        {/* Features List */}
        <div className="md:col-span-7 space-y-4">
          <h2 className="text-xl font-bold text-white">Demonstration Feature Scope</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.features.map((feature, i) => (
              <div key={i} className="p-3 bg-slate-900/70 border border-slate-800/80 rounded-lg flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 leading-normal">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="md:col-span-5 space-y-4">
          <h2 className="text-xl font-bold text-white">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="p-4 bg-slate-900/40 border border-slate-800/60 rounded-xl text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Independent Deployment Architecture</span>
            </div>
            <p>
              This prototype runs as a decoupled demonstration service. It maintains zero connection to production business databases or live customer systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
