"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "@wagmi/connectors";
import { Sun, Moon } from "lucide-react"; // ✅ add icons

export default function TopNav() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  // Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Wallet state
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
  const { disconnect } = useDisconnect();

  // Logout handler
  async function handleLogout() {
    await signOut(auth);
    window.location.href = "/portal/login";
  }

  // Universal search handler
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  }

  // Theme state
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDark(storedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex items-center justify-between transition-colors duration-500 ease-in-out">
      {/* Left side: brand + links */}
      <div className="flex items-center space-x-6">
        <Link href="/marketplace" className="text-lg font-bold text-teal-700 dark:text-teal-400">
          ListToBid
        </Link>
        <Link href="/marketplace" className="text-gray-700 dark:text-gray-200 hover:text-teal-600">
          Marketplace
        </Link>
        <Link href="/marketplace#auction" className="text-gray-700 dark:text-gray-200 hover:text-teal-600">
          Auctions
        </Link>
        {user && (
          <Link href="/portal/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-teal-600">
            Dashboard
          </Link>
        )}
      </div>

      {/* Center: universal search bar */}
      <form onSubmit={handleSearch} className="flex-1 mx-6">
        <input
          type="text"
          name="search"
          placeholder="Search storefronts, auctions, categories..."
          className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-500 ease-in-out"
        />
      </form>

      {/* Right side: wallet + auth + theme toggle */}
      <div className="flex items-center space-x-4">
        {/* Wallet connect */}
        {!isConnected ? (
          <button
            onClick={() => connect()}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Connect Wallet
          </button>
        ) : (
          <button
            onClick={() => disconnect()}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-500 ease-in-out"
          >
            {address?.slice(0, 6)}…{address?.slice(-4)}
          </button>
        )}

        {/* Auth */}
        {!user ? (
          <Link
            href="/portal/login"
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}

        {/* Theme toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-500 ease-in-out"
          title="Switch theme"
        >
          {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-500" />}
        </button>
      </div>
    </nav>
  );
}