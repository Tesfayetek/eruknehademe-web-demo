// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCFwKDvQ3sFa-vO2SN4fcgCHH5C8LkjNzA",
  authDomain: "xerotic-datum-xn50x.firebaseapp.com",
  projectId: "xerotic-datum-xn50x",
  storageBucket: "xerotic-datum-xn50x.firebasestorage.app",
  messagingSenderId: "753927949427",
  appId: "1:753927949427:web:2b8f99d414f733617e2e06"
};

// Initialize Firebase safely (avoid multi-instance collision)
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore & Auth
export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);

export const FIREBASE_PROJECT_ID = firebaseConfig.projectId;
