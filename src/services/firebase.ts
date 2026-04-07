/**
 * Firebase Configuration
 * 
 * Initialize Firebase app and Firestore database
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from environment or direct config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCgwUVCfIgpsYZJCLPWZiTi5jAoCdFbAgU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "collection-a7a10.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "collection-a7a10",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "collection-a7a10.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "998088577925",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:998088577925:web:8e735ad92100266afa2aec"
};

// Initialize Firebase (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
export default db;