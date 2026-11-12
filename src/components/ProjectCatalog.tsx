import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types/project';
import { Search, Filter, ArrowUpRight, Play, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface ProjectCatalogProps {
  projects: Project[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onSelectProject: (slug: string) => void;
  onLaunchDemo: (project: Project) => void;
}

export const ProjectCatalog: React.FC<ProjectCatalogProps> = ({
  projects,
  selectedCategory,
  onCategoryChange,
  onSelectProject,
  onLaunchDemo
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'order' | 'name' | 'newest'>('order');

  const categories: (ProjectCategory | 'All')[] = [
    'All',
    'Website Projects',
    'Web Applications',
    'Mobile Applications',
    'UI/UX Designs'
  ];

  // Filtering
  const filteredProjects = projects.filter((project) => {
    if (!project.isPublished) return false;
    const matchCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchStatus = statusFilter === 'All' || project.projectStatus === statusFilter;
    const matchSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchStatus && matchSearch;
  });

  // Sorting
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'newest') return (b.createdAt || '').localeCompare(a.createdAt || '');
    return a.order - b.order;
  });

  return (
    <section id="projects-catalog" className="py-16 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
            PROJECT ARCHIVE & DEMONSTRATION CATALOGUE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Featured Prototypes & Independent Systems
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Select any system to inspect technical specifications, review architecture, or launch a live simulated preview.
          </p>
        </div>

        {/* Status & Sort Controls */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Development">In Development</option>
              <option value="Prototype">Prototype</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="order">Featured Order</option>
              <option value="name">Alphabetical</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, keyword, tech..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {sortedProjects.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 rounded-xl border border-slate-800">
          <p className="text-slate-400 text-sm">No prototypes match your search or filter criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              onCategoryChange('All');
              setStatusFilter('All');
            }}
            className="mt-3 px-4 py-2 bg-slate-800 text-xs text-cyan-400 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {sortedProjects.map((project) => (
            <article
              key={project.id}
              className="bg-slate-900/60 border border-slate-800/90 rounded-2xl overflow-hidden flex flex-col hover:border-slate-700 transition-all duration-300 group shadow-lg"
            >
              {/* Thumbnail Container */}
              <div
                className="aspect-[16/9] w-full bg-slate-950 relative overflow-hidden cursor-pointer"
                onClick={() => onSelectProject(project.slug)}
              >
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Graceful fallback
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Direct Slug Badge overlay */}
                <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-sm border border-slate-800 px-2.5 py-1 rounded text-[11px] font-mono text-cyan-400">
                  /{project.slug}
                </div>

                <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-sm border border-slate-800 px-2.5 py-1 rounded text-[11px] font-mono text-slate-300">
                  {project.projectStatus}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <span className="text-cyan-400 font-medium">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.techStack.slice(0, 3).join(', ')}</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectProject(project.slug)}
                    className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{project.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Features Bullet List */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                    {project.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className="text-cyan-400 font-bold shrink-0 mt-0.5">›</span>
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800/80">
                  <button
                    onClick={() => onSelectProject(project.slug)}
                    className="text-xs text-slate-300 hover:text-white font-medium hover:underline transition-colors"
                  >
                    Specifications & Details
                  </button>

                  <button
                    onClick={() => onLaunchDemo(project)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Live Demo</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
