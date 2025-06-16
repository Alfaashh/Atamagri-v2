// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push, serverTimestamp } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCth-ISWmEUVHg_z8D1D4DspnbpZPGyHIw",
  authDomain: "atamagri-6f83e.firebaseapp.com",
  databaseURL: "https://atamagri-6f83e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "atamagri-6f83e",
  storageBucket: "atamagri-6f83e.firebasestorage.app",
  messagingSenderId: "147371984172",
  appId: "1:147371984172:web:ce36c6724bddc7aa4d9889",
  measurementId: "G-GN8GS9NRLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// Helper functions
export const dbRef = ref;
export const dbOnValue = onValue;
export const dbSet = set;
export const dbPush = push;
export const dbServerTimestamp = serverTimestamp;
