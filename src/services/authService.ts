import { auth, FIREBASE_PROJECT_ID } from './firebase';
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';

const AUTH_STORAGE_KEY = 'erukneh_demo_admin_auth_v1';

export interface AdminUser {
  email: string;
  name: string;
  role: 'Administrator' | 'Editor';
  token: string;
  isFirebaseUser?: boolean;
}

export const authService = {
  getCurrentUser(): AdminUser | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return null;
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  async login(email: string, pass: string): Promise<boolean> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // 1. Try Firebase Authentication
    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
      if (userCredential.user) {
        const user: AdminUser = {
          email: userCredential.user.email || cleanEmail,
          name: userCredential.user.displayName || 'Erukneh Ademe (Firebase Admin)',
          role: 'Administrator',
          token: await userCredential.user.getIdToken(),
          isFirebaseUser: true
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        return true;
      }
    } catch (err: any) {
      console.warn('Firebase Auth notice (checking local demo fallback):', err.message);
    }

    // 2. Demo Administrator credentials fallback
    if (
      (cleanEmail === 'admin@demo.eruknehademe.com' || cleanEmail === 'admin' || cleanEmail === 'erukneh@eruknehademe.com') &&
      (cleanPass === 'admin2026' || cleanPass === 'admin' || cleanPass === 'demo')
    ) {
      const user: AdminUser = {
        email: cleanEmail,
        name: 'Erukneh Ademe (Admin)',
        role: 'Administrator',
        token: 'auth-token-' + Date.now(),
        isFirebaseUser: false
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return true;
    }

    return false;
  },

  loginAsDemoAdmin(): void {
    const user: AdminUser = {
      email: 'admin@demo.eruknehademe.com',
      name: 'Demonstration Administrator',
      role: 'Administrator',
      token: 'demo-token-' + Date.now(),
      isFirebaseUser: false
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  },

  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    try {
      await firebaseSignOut(auth);
    } catch {
      // ignore
    }
  },

  initAuthListener(callback: (user: AdminUser | null) => void): () => void {
    return onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const user: AdminUser = {
          email: fbUser.email || 'admin@demo.eruknehademe.com',
          name: fbUser.displayName || 'Firebase Authenticated Admin',
          role: 'Administrator',
          token: fbUser.uid,
          isFirebaseUser: true
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        callback(user);
      } else {
        callback(this.getCurrentUser());
      }
    });
  }
};
