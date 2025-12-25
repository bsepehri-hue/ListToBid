"use client";

// app/lib/firebase.ts
// Stub Firebase client setup

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "stub-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "stub-auth-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "stub-project-id",
};

export const storage = getStorage(app);
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);