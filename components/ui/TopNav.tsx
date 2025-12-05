"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "@/lib/firebase";

// Wallet connection (wagmi example — works with MetaMask, Brave, etc.)
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "@wagmi/connectors";

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

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left side: brand + links */}
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

      {/* Center: universal search bar */}
      <form onSubmit={handleSearch} className="flex-1 mx-6">
        <input
          type="text"
          name="search"
          placeholder="Search storefronts, auctions, categories..."
          className="w-full border rounded px-3 py-2"
        />
      </form>

      {/* Right side: wallet + auth */}
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
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
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
      </div>
    </nav>
  );
}