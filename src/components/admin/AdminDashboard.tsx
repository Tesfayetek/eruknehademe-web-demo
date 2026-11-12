import React, { useState } from 'react';
import { Project, ProjectCategory, ProjectStatus, PreviewType } from '../../types/project';
import { projectService } from '../../services/projectService';
import { authService, AdminUser } from '../../services/authService';
import { 
  Plus, Edit, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Star, 
  Check, X, RefreshCw, LogOut, Lock, Shield, Server, Globe, Key, FileCode, CheckCircle2 
} from 'lucide-react';

interface AdminDashboardProps {
  projects: Project[];
  currentUser: AdminUser | null;
  onLoginSuccess: () => void;
  onLogout: () => void;
  onViewProject: (slug: string) => void;
  onBackToPortal: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  projects,
  currentUser,
  onLoginSuccess,
  onLogout,
  onViewProject,
  onBackToPortal
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'deployment' | 'security'>('projects');

  // Login form state
  const [emailInput, setEmailInput] = useState('admin@demo.eruknehademe.com');
  const [passwordInput, setPasswordInput] = useState('admin2026');
  const [loginError, setLoginError] = useState('');

  // Project Modal state (Add / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  // Form fields for modal
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formCategory, setFormCategory] = useState<ProjectCategory>('Web Applications');
  const [formStatus, setFormStatus] = useState<ProjectStatus>('Prototype');
  const [formPreviewType, setFormPreviewType] = useState<PreviewType>('internal');
  const [formPreviewUrl, setFormPreviewUrl] = useState('');
  const [formThumbnail, setFormThumbnail] = useState('/src/assets/images/hero_tech_workspace_1794468183248.jpg');
  const [formDescription, setFormDescription] = useState('');
  const [formDetailedDescription, setFormDetailedDescription] = useState('');
  const [formTechStack, setFormTechStack] = useState('React, TypeScript, Tailwind CSS');
  const [formFeatures, setFormFeatures] = useState('Feature 1\nFeature 2\nFeature 3');
  const [formIsPublished, setFormIsPublished] = useState(true);
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await authService.login(emailInput, passwordInput);
    if (ok) {
      setLoginError('');
      onLoginSuccess();
    } else {
      setLoginError('Invalid credentials. You may use the pre-filled demo administrator access.');
    }
  };

  const handleDemoLogin = () => {
    authService.loginAsDemoAdmin();
    setLoginError('');
    onLoginSuccess();
  };

  // Open Modal for Create
  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormName('');
    setFormSlug('');
    setFormTagline('');
    setFormCategory('Web Applications');
    setFormStatus('Prototype');
    setFormPreviewType('internal');
    setFormPreviewUrl('https://demo.eruknehademe.com/new-project');
    setFormThumbnail('/src/assets/images/hero_tech_workspace_1794468183248.jpg');
    setFormDescription('');
    setFormDetailedDescription('');
    setFormTechStack('React, TypeScript, Tailwind CSS, Node.js');
    setFormFeatures('Interactive dashboard\nRole-based access\nSimulated reporting');
    setFormIsPublished(true);
    setFormIsFeatured(false);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (proj: Project) => {
    setEditingProject(proj);
    setFormName(proj.name);
    setFormSlug(proj.slug);
    setFormTagline(proj.tagline || '');
    setFormCategory(proj.category);
    setFormStatus(proj.projectStatus);
    setFormPreviewType(proj.previewType);
    setFormPreviewUrl(proj.previewUrl || '');
    setFormThumbnail(proj.thumbnail || '/src/assets/images/hero_tech_workspace_1794468183248.jpg');
    setFormDescription(proj.description);
    setFormDetailedDescription(proj.detailedDescription || proj.description);
    setFormTechStack(proj.techStack.join(', '));
    setFormFeatures(proj.features.join('\n'));
    setFormIsPublished(proj.isPublished);
    setFormIsFeatured(proj.isFeatured);
    setIsModalOpen(true);
  };

  // Save Project
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSlug.trim()) {
      alert('Please provide a project name and slug.');
      return;
    }

    const cleanSlug = formSlug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');
    const techArray = formTechStack.split(',').map(s => s.trim()).filter(Boolean);
    const featuresArray = formFeatures.split('\n').map(s => s.trim()).filter(Boolean);

    const updated: Project = {
      id: editingProject?.id || `proj-${Date.now()}`,
      name: formName.trim(),
      slug: cleanSlug,
      tagline: formTagline.trim() || 'Modern digital prototype',
      description: formDescription.trim(),
      detailedDescription: formDetailedDescription.trim() || formDescription.trim(),
      category: formCategory,
      thumbnail: formThumbnail,
      screenshots: editingProject?.screenshots || [formThumbnail],
      techStack: techArray.length ? techArray : ['React', 'TypeScript'],
      features: featuresArray.length ? featuresArray : ['System demonstration feature'],
      previewType: formPreviewType,
      previewUrl: formPreviewUrl.trim(),
      projectStatus: formStatus,
      isPublished: formIsPublished,
      isFeatured: formIsFeatured,
      order: editingProject?.order ?? (projects.length + 1),
      createdAt: editingProject?.createdAt || new Date().toISOString().split('T')[0],
      demoCredentials: editingProject?.demoCredentials,
      specifications: editingProject?.specifications || {
        'Environment': 'Isolated Demo Sandbox',
        'Persistence': 'Local Client State'
      }
    };

    projectService.saveProject(updated);
    setIsModalOpen(false);
  };

  // Delete Project
  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This action can be reversed by clicking "Reset to Initial Defaults".`)) {
      projectService.deleteProject(id);
    }
  };

  // Toggle Published
  const handleTogglePublished = (proj: Project) => {
    projectService.saveProject({
      ...proj,
      isPublished: !proj.isPublished
    });
  };

  // Toggle Featured
  const handleToggleFeatured = (proj: Project) => {
    projectService.saveProject({
      ...proj,
      isFeatured: !proj.isFeatured
    });
  };

  // Reorder
  const handleReorder = (id: string, dir: 'up' | 'down') => {
    projectService.reorderProject(id, dir);
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    if (confirm('Reset catalogue to initial sample projects (Ethiore HRMS, Inventory Management, Corporate Website, Mobile App)?')) {
      projectService.resetToDefaults();
    }
  };

  // If NOT authenticated, render Login Screen
  if (!currentUser) {
    return (
      <div className="py-16 px-6 max-w-md mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Administrator Access</h2>
            <p className="text-xs text-slate-400">
              Manage digital solutions, project catalogue, slugs, and demonstration metadata.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-lg">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Administrator Email</label>
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Access Passcode</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 space-y-3">
            <div className="text-[11px] text-slate-500 text-center">
              Demonstration Mode: Instant evaluator access
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-800/60 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Key className="w-3.5 h-3.5" />
              <span>One-Click Demo Administrator Login</span>
            </button>

            <button
              type="button"
              onClick={onBackToPortal}
              className="w-full text-center text-xs text-slate-400 hover:text-white pt-1"
            >
              ← Return to Public Showcase
            </button>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="py-10 px-6 max-w-7xl mx-auto space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>ADMINISTRATOR CONTROL PANEL</span>
            <span>·</span>
            <span>{currentUser.name}</span>
            <span>·</span>
            <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded text-[10px] inline-flex items-center gap-1 font-mono">
              <Server className="w-3 h-3 text-emerald-400" />
              Firebase SDK: {projectService.getFirebaseProjectId()}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Dynamic Project Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortal}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold border border-slate-800 transition-colors"
          >
            View Public Portal
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-red-300 rounded-lg text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2.5 font-semibold transition-colors border-b-2 ${
            activeTab === 'projects'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Projects Catalogue ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('deployment')}
          className={`px-4 py-2.5 font-semibold transition-colors border-b-2 ${
            activeTab === 'deployment'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Deployment Guide (demo.eruknehademe.com)
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 font-semibold transition-colors border-b-2 ${
            activeTab === 'security'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Security & Sandbox Isolation
        </button>
      </div>

      {/* TAB 1: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400">
                Add, edit, delete, publish, and reorder demonstration projects. Changes are immediately reactive across all views.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleResetDefaults}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-xs transition-colors"
                title="Restore default sample projects"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset to Defaults</span>
              </button>

              <button
                onClick={handleOpenCreate}
                className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>
          </div>

          {/* Projects Table */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono tracking-wider text-[11px]">
                  <tr>
                    <th className="px-4 py-3">Order</th>
                    <th className="px-4 py-3">Project / Slug</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Preview Type</th>
                    <th className="px-4 py-3">Published</th>
                    <th className="px-4 py-3">Featured</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {projects.map((proj, idx) => (
                    <tr key={proj.id} className="hover:bg-slate-900/80 transition-colors">
                      {/* Order Column */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 font-mono text-slate-400">
                          <span>{proj.order}</span>
                          <div className="flex flex-col">
                            <button
                              disabled={idx === 0}
                              onClick={() => handleReorder(proj.id, 'up')}
                              className="text-slate-400 hover:text-white disabled:opacity-20"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              disabled={idx === projects.length - 1}
                              onClick={() => handleReorder(proj.id, 'down')}
                              className="text-slate-400 hover:text-white disabled:opacity-20"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Project Name & Slug */}
                      <td className="px-4 py-3">
                        <div className="font-bold text-white text-sm">{proj.name}</div>
                        <div className="font-mono text-cyan-400 text-[11px]">/{proj.slug}</div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3 text-slate-300">{proj.category}</td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className="font-medium text-slate-200">{proj.projectStatus}</span>
                      </td>

                      {/* Preview Type */}
                      <td className="px-4 py-3 font-mono text-[11px] text-cyan-300 uppercase">
                        {proj.previewType}
                      </td>

                      {/* Published Toggle */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleTogglePublished(proj)}
                          className={`p-1.5 rounded transition-colors ${
                            proj.isPublished
                              ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800'
                              : 'text-slate-500 bg-slate-950 border border-slate-800'
                          }`}
                          title={proj.isPublished ? 'Published' : 'Draft / Unpublished'}
                        >
                          {proj.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </td>

                      {/* Featured Toggle */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleFeatured(proj)}
                          className={`p-1.5 rounded transition-colors ${
                            proj.isFeatured
                              ? 'text-amber-400 bg-amber-950/60 border border-amber-800'
                              : 'text-slate-500 bg-slate-950 border border-slate-800'
                          }`}
                          title={proj.isFeatured ? 'Featured' : 'Not Featured'}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </td>

                      {/* Action buttons */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onViewProject(proj.slug)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                            title="Preview Public Page"
                          >
                            <Globe className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(proj)}
                            className="p-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 rounded transition-colors"
                            title="Edit Project"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(proj.id, proj.name)}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-slate-800 rounded transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEPLOYMENT INSTRUCTIONS */}
      {activeTab === 'deployment' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Server className="w-5 h-5 text-cyan-400" />
              <span>Production Subdomain Deployment Guide: demo.eruknehademe.com</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This application is configured for deployment at the custom subdomain <strong className="text-cyan-300">https://demo.eruknehademe.com</strong> while ensuring the main apex domain <strong className="text-white">eruknehademe.com</strong> remains independent and unaffected.
            </p>

            {/* DNS Setup Card */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3 text-xs">
              <h4 className="font-semibold text-white">1. DNS Record Configuration (at Domain Registrar / DNS Provider)</h4>
              <p className="text-slate-400">Add a dedicated CNAME record pointing only the `demo` subdomain:</p>
              <div className="p-3 bg-slate-900 rounded font-mono text-[11px] space-y-1">
                <div><strong>Type:</strong> CNAME</div>
                <div><strong>Host / Name:</strong> demo</div>
                <div><strong>Target / Value:</strong> ghs.googlehosted.com (or Cloud Run / Vercel cname target)</div>
                <div><strong>TTL:</strong> 3600 (Automatic)</div>
              </div>
              <p className="text-[11px] text-emerald-400 font-mono">
                ✓ Crucial: Root records (@) for eruknehademe.com remain untouched.
              </p>
            </div>

            {/* SPA Routing & Direct URL Card */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3 text-xs">
              <h4 className="font-semibold text-white">2. SPA Direct Routing & Browser Refresh Configuration</h4>
              <p className="text-slate-400">
                To ensure direct links like <code className="text-cyan-300">demo.eruknehademe.com/ethiore-hrms</code> work without 404 errors on browser refresh, route all incoming traffic to `index.html`:
              </p>

              <div className="space-y-2">
                <div className="text-slate-300 font-semibold text-[11px]">For Firebase Hosting (`firebase.json`):</div>
                <pre className="p-3 bg-slate-900 rounded text-[11px] font-mono text-slate-300 overflow-x-auto">
{`{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}`}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="text-slate-300 font-semibold text-[11px]">For Nginx / Linux Server (`nginx.conf`):</div>
                <pre className="p-3 bg-slate-900 rounded text-[11px] font-mono text-slate-300 overflow-x-auto">
{`server {
    server_name demo.eruknehademe.com;
    root /var/www/demo-eruknehademe/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}`}
                </pre>
              </div>
            </div>

            {/* Build Command */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs space-y-2">
              <h4 className="font-semibold text-white">3. Production Build Command</h4>
              <p className="text-slate-400">Run the standard Vite production bundle:</p>
              <pre className="p-2.5 bg-slate-900 rounded font-mono text-cyan-300 text-xs">
                npm run build
              </pre>
              <p className="text-[11px] text-slate-500">
                Output artifacts are bundled in the `/dist` folder ready for static CDN deployment.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SECURITY & SANBOX */}
      {activeTab === 'security' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 text-xs">
            <h3 className="font-bold text-white text-base">Mandatory Demo Security Governance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Isolated Client-Side Sandbox</span>
                </div>
                <p className="text-slate-400">
                  Every demonstration system operates with dummy sample records. No connection to live banking APIs, payment processors, or production company ERP databases.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Zero PII Exposure</span>
                </div>
                <p className="text-slate-400">
                  Employee names, payroll numbers, and inventory valuations are entirely fictitious. Demonstrations strictly follow privacy compliance benchmarks.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Iframe Sandbox Sandboxing</span>
                </div>
                <p className="text-slate-400">
                  Embedded prototypes apply strict sandbox restrictions (<code className="text-cyan-300">allow-scripts allow-forms</code>) preventing unauthorized access or top-level navigation hijack.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulated External Services</span>
                </div>
                <p className="text-slate-400">
                  Contact messages, payslip downloads, and financial transfers simulate actions in memory without invoking external email servers or payment gateways.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2 md:col-span-2">
                <div className="font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Server className="w-4 h-4" />
                  <span>Configured Firebase SDK & Services</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-1">
                  <div>Project ID: <span className="text-white">xerotic-datum-xn50x</span></div>
                  <div>Auth Domain: <span className="text-white">xerotic-datum-xn50x.firebaseapp.com</span></div>
                  <div>Storage Bucket: <span className="text-white">xerotic-datum-xn50x.firebasestorage.app</span></div>
                  <div>App ID: <span className="text-white">1:753927949427:web:2b8f99d414f733617e2e06</span></div>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Firestore synchronization is connected to the <code className="text-cyan-300">projects</code> collection for persistent multi-device catalog management.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {editingProject ? 'Edit Demonstration Project' : 'Add New Project Entry'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Project Name *</label>
                  <input
                    required
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Ethiore HRMS"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Unique Project Slug *</label>
                  <input
                    required
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="e.g. ethiore-hrms"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Tagline</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="e.g. Enterprise Human Resource & Payroll Simulation System"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ProjectCategory)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
                  >
                    <option value="Website Projects">Website Projects</option>
                    <option value="Web Applications">Web Applications</option>
                    <option value="Mobile Applications">Mobile Applications</option>
                    <option value="UI/UX Designs">UI/UX Designs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Project Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as ProjectStatus)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
                  >
                    <option value="Prototype">Prototype</option>
                    <option value="In Development">In Development</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Preview Type</label>
                  <select
                    value={formPreviewType}
                    onChange={(e) => setFormPreviewType(e.target.value as PreviewType)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200"
                  >
                    <option value="internal">Internal Prototype</option>
                    <option value="iframe">Embedded Iframe</option>
                    <option value="external">External Window</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Preview URL</label>
                <input
                  type="text"
                  value={formPreviewUrl}
                  onChange={(e) => setFormPreviewUrl(e.target.value)}
                  placeholder="https://demo.eruknehademe.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Thumbnail / Screenshot Path</label>
                <input
                  type="text"
                  value={formThumbnail}
                  onChange={(e) => setFormThumbnail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
                <div className="mt-1 flex gap-2 text-[10px] text-slate-400">
                  <span>Quick Presets:</span>
                  <button
                    type="button"
                    onClick={() => setFormThumbnail('/src/assets/images/ethiore_hrms_mockup_1794468184989.jpg')}
                    className="text-cyan-400 hover:underline"
                  >
                    HRMS
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormThumbnail('/src/assets/images/inventory_system_mockup_1794468185822.jpg')}
                    className="text-cyan-400 hover:underline"
                  >
                    Inventory
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormThumbnail('/src/assets/images/corporate_web_mockup_1794468185286.jpg')}
                    className="text-cyan-400 hover:underline"
                  >
                    Corporate
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormThumbnail('/src/assets/images/mobile_app_mockup_1794468185597.jpg')}
                    className="text-cyan-400 hover:underline"
                  >
                    Mobile
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Short Description</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Concise overview displayed on cards..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Detailed Architecture Description</label>
                <textarea
                  rows={3}
                  value={formDetailedDescription}
                  onChange={(e) => setFormDetailedDescription(e.target.value)}
                  placeholder="Comprehensive technical breakdown shown on details page..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    value={formTechStack}
                    onChange={(e) => setFormTechStack(e.target.value)}
                    placeholder="React, TypeScript, Tailwind CSS, PostgreSQL"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Key Features (one per line)</label>
                  <textarea
                    rows={3}
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    placeholder="Employee directory\nLeave workflow\nPayroll calculation"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsPublished}
                    onChange={(e) => setFormIsPublished(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                  />
                  <span className="text-slate-300 font-medium">Publish to public catalogue</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
                  />
                  <span className="text-slate-300 font-medium">Mark as Featured on Homepage</span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg shadow-sm"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
