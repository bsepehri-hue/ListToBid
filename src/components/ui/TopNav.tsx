"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "@wagmi/connectors";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/hooks/useTheme";

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

  async function handleLogout() {
    await signOut(auth);
    window.location.href = "/portal/login";
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  }

 const { isDark, setIsDark } = useTheme();

// ⭐ Add this right here
const pathname = usePathname();

function isActive(path: string) {
  return pathname === path;
}

  return (
    <nav className="l2b-nav l2b-flex-between l2b-items-center l2b-px-6 l2b-py-4 l2b-shadow l2b-bg-surface">
      
      {/* LEFT SIDE */}
     <div className="l2b-flex l2b-items-center l2b-gap-6">
  <Link
    href="/marketplace"
    className={isActive("/marketplace") ? "l2b-nav-link-active" : "l2b-nav-link"}
  >
    Marketplace
  </Link>

  <Link
    href="/auctions"
    className={isActive("/auctions") ? "l2b-nav-link-active" : "l2b-nav-link"}
  >
    Auctions
  </Link>

  {user && (
    <Link
      href="/portal/dashboard"
      className={isActive("/portal/dashboard") ? "l2b-nav-link-active" : "l2b-nav-link"}
    >
      Dashboard
    </Link>
  )}
</div>

      {/* CENTER: SEARCH */}
      <form onSubmit={handleSearch} className="l2b-flex-1 l2b-mx-6">
        <input
          type="text"
          name="search"
          placeholder="Search storefronts, auctions, categories..."
          className="l2b-input w-full"
        />
      </form>

      {/* RIGHT SIDE */}
      <div className="l2b-flex l2b-items-center l2b-gap-4">

        {/* Wallet */}
        {!isConnected ? (
          <button onClick={() => connect()} className="l2b-btn l2b-btn-primary">
            Connect Wallet
          </button>
        ) : (
          <button
            onClick={() => disconnect()}
            className="l2b-btn l2b-btn-muted"
          >
            {address?.slice(0, 6)}…{address?.slice(-4)}
          </button>
        )}

        {/* Auth */}
        {!user ? (
          <Link href="/portal/login" className="l2b-btn l2b-btn-primary">
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} className="l2b-btn l2b-btn-critical">
            Logout
          </button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="l2b-btn-icon"
          title="Switch theme"
        >
          {isDark ? <Sun className="l2b-text-warning" /> : <Moon className="l2b-text-primary" />}
        </button>
      </div>
    </nav>
  );
}