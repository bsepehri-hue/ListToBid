"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/lib/firebase";

export function StewardLinks() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="mt-12 text-center space-x-4">
      {!user ? (
        <a
          href="/portal/login"
          className="inline-block px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition"
        >
          Steward Signup / Login
        </a>
      ) : (
        <a
          href="/portal/dashboard"
          className="inline-block px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition"
        >
          Go to Dashboard
        </a>
      )}
    </div>
  );
}