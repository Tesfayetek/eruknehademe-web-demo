import React, { useState, useEffect } from 'react';
import { Project, ProjectCategory } from './types/project';
import { projectService } from './services/projectService';
import { authService, AdminUser } from './services/authService';

import { SecurityBanner } from './components/SecurityBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectCatalog } from './components/ProjectCatalog';
import { TechnologyMatrix } from './components/TechnologyMatrix';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { ProjectDetailsPage } from './components/ProjectDetailsPage';
import { LiveDemoViewer } from './components/LiveDemoViewer';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  // Navigation state: 'home' | 'catalog' | 'about' | 'contact' | 'admin' | 'project-details'
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);

  // Live Demo Viewer modal state
  const [activeDemoProject, setActiveDemoProject] = useState<Project | null>(null);

  // Initialize and subscribe to project data and Firebase
  useEffect(() => {
    const loadedProjects = projectService.getProjects();
    setProjects(loadedProjects);
    setCurrentUser(authService.getCurrentUser());

    // 1. Subscribe to local project updates
    const unsubscribeLocal = projectService.subscribe((updatedProjects) => {
      setProjects(updatedProjects);
    });

    // 2. Initialize real-time Firebase Firestore synchronization
    const unsubscribeFirestore = projectService.initFirestoreSync();

    // 3. Initialize Firebase Auth listener
    const unsubscribeAuth = authService.initAuthListener((user) => {
      setCurrentUser(user);
    });

    // Handle initial route from URL
    const parseInitialRoute = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const pathname = window.location.pathname.replace(/^\//, '').toLowerCase();
      const route = hash || pathname;

      if (!route || route === 'home') {
        setCurrentView('home');
      } else if (route === 'admin') {
        setCurrentView('admin');
      } else if (route === 'about') {
        setCurrentView('about');
      } else if (route === 'contact') {
        setCurrentView('contact');
      } else if (route === 'websites') {
        setCurrentView('catalog');
        setSelectedCategory('Website Projects');
      } else if (route === 'web-apps') {
        setCurrentView('catalog');
        setSelectedCategory('Web Applications');
      } else if (route === 'mobile-apps') {
        setCurrentView('catalog');
        setSelectedCategory('Mobile Applications');
      } else if (route === 'ui-ux') {
        setCurrentView('catalog');
        setSelectedCategory('UI/UX Designs');
      } else {
        // Check if it matches a project slug
        const found = projectService.getProjectBySlug(route);
        if (found) {
          setActiveProjectSlug(found.slug);
          setCurrentView('project-details');
        } else {
          setCurrentView('home');
        }
      }
    };

    parseInitialRoute();

    // Listen to hashchange
    const handleHashChange = () => {
      parseInitialRoute();
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      unsubscribeLocal();
      unsubscribeFirestore();
      unsubscribeAuth();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Navigation dispatcher
  const handleNavigate = (view: string, filter?: string) => {
    if (view === 'home') {
      window.location.hash = '/';
      setCurrentView('home');
      setActiveProjectSlug(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'catalog') {
      if (filter) {
        setSelectedCategory(filter);
      }
      window.location.hash = '/#projects-catalog';
      setCurrentView('catalog');
      setActiveProjectSlug(null);
      setTimeout(() => {
        const el = document.getElementById('projects-catalog');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (view === 'about') {
      window.location.hash = '/about';
      setCurrentView('about');
      setActiveProjectSlug(null);
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (view === 'contact') {
      window.location.hash = '/contact';
      setCurrentView('contact');
      setActiveProjectSlug(null);
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (view === 'admin') {
      window.location.hash = '/admin';
      setCurrentView('admin');
      setActiveProjectSlug(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Select project to inspect details
  const handleSelectProject = (slug: string) => {
    setActiveProjectSlug(slug);
    setCurrentView('project-details');
    window.location.hash = `/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch live interactive demo viewer
  const handleLaunchDemo = (project: Project) => {
    setActiveDemoProject(project);
  };

  // Find active project for details view
  const currentProject = activeProjectSlug ? projectService.getProjectBySlug(activeProjectSlug) : null;

  return (
    <div className="min-h-screen bg-[#080e18] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. Visible Security Banner */}
      <SecurityBanner />

      {/* 2. Top Bar Navigation */}
      <Navbar
        activeView={currentView}
        onNavigate={handleNavigate}
        isAuthenticated={currentUser !== null}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* VIEW A: PROJECT DETAILS PAGE */}
        {currentView === 'project-details' && currentProject ? (
          <ProjectDetailsPage
            project={currentProject}
            onBack={() => handleNavigate('home')}
            onLaunchDemo={handleLaunchDemo}
          />
        ) : currentView === 'admin' ? (
          /* VIEW B: ADMINISTRATOR DASHBOARD */
          <AdminDashboard
            projects={projects}
            currentUser={currentUser}
            onLoginSuccess={() => setCurrentUser(authService.getCurrentUser())}
            onLogout={() => {
              authService.logout();
              setCurrentUser(null);
            }}
            onViewProject={handleSelectProject}
            onBackToPortal={() => handleNavigate('home')}
          />
        ) : (
          /* VIEW C: MAIN PORTAL HOMEPAGE & SECTIONS */
          <>
            {/* Hero Section */}
            <HeroSection
              onExploreClick={() => handleNavigate('catalog')}
              onSelectProject={handleSelectProject}
            />

            {/* Dynamic Project Catalog with Filters & Search */}
            <ProjectCatalog
              projects={projects}
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => setSelectedCategory(cat)}
              onSelectProject={handleSelectProject}
              onLaunchDemo={handleLaunchDemo}
            />

            {/* Technology Expertise Matrix */}
            <TechnologyMatrix />

            {/* Development Services */}
            <ServicesSection
              onContactClick={() => handleNavigate('contact')}
            />

            {/* About Erukneh Ademe */}
            <AboutSection />

            {/* Contact & Inquiries */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Full-Screen Live Demo Viewer Modal */}
      {activeDemoProject && (
        <LiveDemoViewer
          project={activeDemoProject}
          onClose={() => setActiveDemoProject(null)}
        />
      )}
    </div>
  );
}
