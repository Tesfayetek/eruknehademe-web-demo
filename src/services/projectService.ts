import { Project } from '../types/project';
import { INITIAL_PROJECTS } from '../data/initialProjects';
import { db, FIREBASE_PROJECT_ID } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  onSnapshot 
} from 'firebase/firestore';

const STORAGE_KEY = 'erukneh_demo_portal_projects_v1';
const EVENT_NAME = 'erukneh_projects_updated';
const STATUS_EVENT_NAME = 'erukneh_firebase_status_updated';

export type FirebaseConnectionState = 'connecting' | 'connected' | 'fallback_local' | 'error';

let currentFirebaseStatus: FirebaseConnectionState = 'connecting';
let unsubscribeFirestore: (() => void) | null = null;

export const projectService = {
  getFirebaseStatus(): FirebaseConnectionState {
    return currentFirebaseStatus;
  },

  getFirebaseProjectId(): string {
    return FIREBASE_PROJECT_ID;
  },

  getProjects(): Project[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Project[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.sort((a, b) => a.order - b.order);
        }
      }
    } catch (e) {
      console.warn('Failed to parse projects from localStorage', e);
    }
    // Default to INITIAL_PROJECTS
    this.saveAllLocal(INITIAL_PROJECTS);
    return [...INITIAL_PROJECTS].sort((a, b) => a.order - b.order);
  },

  getProjectBySlug(slug: string): Project | undefined {
    const projects = this.getProjects();
    const cleanSlug = slug.toLowerCase().replace(/^\/+/, '');
    return projects.find(
      (p) => p.slug.toLowerCase() === cleanSlug || p.id.toLowerCase() === cleanSlug
    );
  },

  getProjectById(id: string): Project | undefined {
    return this.getProjects().find((p) => p.id === id);
  },

  saveAllLocal(projects: Project[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: projects }));
    } catch (e) {
      console.error('Failed to save projects to localStorage', e);
    }
  },

  setFirebaseStatus(status: FirebaseConnectionState): void {
    currentFirebaseStatus = status;
    window.dispatchEvent(new CustomEvent(STATUS_EVENT_NAME, { detail: status }));
  },

  /**
   * Initializes Firestore sync.
   * If Firestore is empty, seeds it with initial projects.
   */
  initFirestoreSync(): () => void {
    try {
      this.setFirebaseStatus('connecting');
      const projectsCol = collection(db, 'projects');

      // Set up real-time listener
      unsubscribeFirestore = onSnapshot(
        projectsCol,
        (snapshot) => {
          if (!snapshot.empty) {
            const remoteProjects: Project[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data() as Project;
              remoteProjects.push({ ...data, id: docSnap.id });
            });
            remoteProjects.sort((a, b) => (a.order || 0) - (b.order || 0));
            this.saveAllLocal(remoteProjects);
            this.setFirebaseStatus('connected');
          } else {
            // First time connection: Seed initial sample projects to Firestore
            this.seedFirestore(INITIAL_PROJECTS);
            this.setFirebaseStatus('connected');
          }
        },
        (error) => {
          console.warn('Firestore onSnapshot notice (falling back gracefully to local storage):', error.message);
          this.setFirebaseStatus('fallback_local');
        }
      );
    } catch (err) {
      console.warn('Firestore initialization fallback:', err);
      this.setFirebaseStatus('fallback_local');
    }

    return () => {
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  },

  async seedFirestore(items: Project[]): Promise<void> {
    try {
      for (const item of items) {
        await setDoc(doc(db, 'projects', item.id), item);
      }
    } catch (e) {
      console.warn('Could not seed Firestore (using local storage):', e);
    }
  },

  async saveProject(project: Project): Promise<void> {
    const projects = this.getProjects();
    const existingIndex = projects.findIndex((p) => p.id === project.id);
    let targetProject: Project;

    if (existingIndex >= 0) {
      targetProject = { ...project };
      projects[existingIndex] = targetProject;
    } else {
      const maxOrder = projects.reduce((max, p) => Math.max(max, p.order || 0), 0);
      targetProject = {
        ...project,
        order: project.order ?? maxOrder + 1,
        createdAt: project.createdAt || new Date().toISOString().split('T')[0]
      };
      projects.push(targetProject);
    }

    // Save locally first for instant UX
    this.saveAllLocal(projects);

    // Sync to Firestore
    try {
      await setDoc(doc(db, 'projects', targetProject.id), targetProject);
      this.setFirebaseStatus('connected');
    } catch (e) {
      console.warn('Firestore write warning (saved locally):', e);
    }
  },

  async deleteProject(id: string): Promise<void> {
    const projects = this.getProjects().filter((p) => p.id !== id);
    this.saveAllLocal(projects);

    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (e) {
      console.warn('Firestore delete warning (deleted locally):', e);
    }
  },

  async reorderProject(id: string, direction: 'up' | 'down'): Promise<void> {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index < 0) return;

    if (direction === 'up' && index > 0) {
      const temp = projects[index].order;
      projects[index].order = projects[index - 1].order;
      projects[index - 1].order = temp;
    } else if (direction === 'down' && index < projects.length - 1) {
      const temp = projects[index].order;
      projects[index].order = projects[index + 1].order;
      projects[index + 1].order = temp;
    }
    this.saveAllLocal(projects);

    // Sync changed orders to Firestore
    try {
      await setDoc(doc(db, 'projects', projects[index].id), projects[index]);
      const neighborIdx = direction === 'up' ? index - 1 : index + 1;
      if (projects[neighborIdx]) {
        await setDoc(doc(db, 'projects', projects[neighborIdx].id), projects[neighborIdx]);
      }
    } catch (e) {
      console.warn('Firestore reorder warning (reordered locally):', e);
    }
  },

  async resetToDefaults(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
    this.saveAllLocal(INITIAL_PROJECTS);
    await this.seedFirestore(INITIAL_PROJECTS);
  },

  subscribe(callback: (projects: Project[]) => void): () => void {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<Project[]>;
      callback(customEvent.detail || this.getProjects());
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  },

  subscribeStatus(callback: (status: FirebaseConnectionState) => void): () => void {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<FirebaseConnectionState>;
      callback(customEvent.detail || currentFirebaseStatus);
    };
    window.addEventListener(STATUS_EVENT_NAME, handler);
    return () => window.removeEventListener(STATUS_EVENT_NAME, handler);
  }
};
