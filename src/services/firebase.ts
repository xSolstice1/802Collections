/**
 * Firebase Configuration
 * 
 * Initialize Firebase app, Firestore database, and Realtime Database
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Firebase configuration from environment variables
// Note: Firebase config values are public and safe to expose in client-side code
// Security is handled by Firestore Security Rules, not by hiding these values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

// Initialize Realtime Database
// The Realtime Database URL is derived from the project ID
const rtdb = getDatabase(app, 'https://collection-a7a10-default-rtdb.asia-southeast1.firebasedatabase.app');

export { app, db, rtdb };
export default db;
