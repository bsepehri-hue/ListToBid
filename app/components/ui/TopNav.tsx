"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function TopNav() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link href="/marketplace" className="text-lg font-bold text-teal-700">
          ListToBid
        </Link>
        <Link href="/marketplace" className="text-gray-700 hover:text-teal-600">
          Marketplace
        </Link>
        <Link href="/marketplace#auction" className="text-gray-700 hover:text-teal-600">
          Auctions
        </Link>
        {user && (
          <Link href="/portal/dashboard" className="text-gray-700 hover:text-teal-600">
            Dashboard
          </Link>
        )}
      </div>
      <div>
        {!user ? (
          <Link
            href="/portal/login"
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Login
          </Link>
        ) : (
          <span className="text-gray-600">Hi, {user.displayName || user.email}</span>
        )}
      </div>
    </nav>
  );
}