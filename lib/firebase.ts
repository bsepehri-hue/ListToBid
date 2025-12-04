// lib/firebase.ts
"use client";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJYKumffrnbNU_4F3ItEU3aHLe8UuGhbg",
  authDomain: "listtobid-9ede2.firebaseapp.com",
  projectId: "listtobid-9ede2",
  storageBucket: "listtobid-9ede2.appspot.com",
  messagingSenderId: "482806996303",
  appId: "1:482806996303:web:9093c9e0ca4c434a36f93a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ✅ Export Firestore and Auth so other files can import them
export const db = getFirestore(app);
export const auth = getAuth(app);

    