"use client";

import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "@/lib/firebase"; // adjust if your path differs
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "@wagmi/connectors";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/hooks/useTheme";
import { useMobileWallet } from "@/hooks/useMobileWallet";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

export default function TopNav() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  // Firebase auth state
  const { user, handleLogout } = useFirebaseAuth();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  }

  const { isDark, setIsDark } = useTheme();

  // UI states
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
const [userMenuOpen, setUserMenuOpen] = useState(false);
const [notifOpen, setNotifOpen] = useState(false);
const [searchFocused, setSearchFocused] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [hasUnread, setHasUnread] = useState(true);
const [searchFocused, setSearchFocused] = useState(false);
const [notifications, setNotifications] = useState([]);
const { isOnline, lastSeen } = useOnlineStatus();
const { scrollY, isScrollingDown, isAtTop } = usePageScroll();
const { isVisible } = useTabVisibility();

  // Active link helper
  const pathname = usePathname();
  function isActive(path: string) {
    return pathname === path;
  }

<div className="l2b-flex l2b-items-center l2b-gap-2">
  <span
    className={`
      l2b-w-2 l2b-h-2 l2b-rounded-full
      ${isOnline ? "l2b-bg-emerald-500" : "l2b-bg-gray-500"}
    `}
  />
  <span className="l2b-text-xs l2b-text-muted">
    {isOnline ? "Online" : `Last seen ${lastSeen?.toLocaleTimeString()}`}
  </span>
</div>


className={!isAtTop ? "l2b-shadow-md" : ""}
style={{ opacity: isScrollingDown ? 0.5 : 1 }}



 // Close dropdowns on outside click
useEffect(() => {
  function close() {
    setWalletOpen(false);
    setUserMenuOpen(false);
    setNotifOpen(false);
  }
  window.addEventListener("click", close);
  return () => window.removeEventListener("click", close);
}, []);

// Detect scroll for transparent → solid nav
useEffect(() => {
  function handleScroll() {
    setScrolled(window.scrollY > 20);
  }
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
   <nav
  className={`
    l2b-nav
    l2b-flex-between
    l2b-items-center
    l2b-sticky
    l2b-top-0
    ${isScrollingDown ? "l2b-h-12" :                                   "l2b-h-16"}
    l2b-z-50
    l2b-backdrop-blur
    l2b-transition-all
    l2b-duration-300
    ${scrolled
      ? "l2b-bg-surface l2b-shadow l2b-py-2"
      : "l2b-bg-transparent l2b-shadow-none l2b-py-4"
    }
    l2b-px-6
  `}
>

      {/* LEFT SIDE */}
      <div className="l2b-flex l2b-items-center l2b-gap-6 l2b-hidden md:l2b-flex">
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
<form
  onSubmit={handleSearch}
  className={`
    l2b-relative
    l2b-transition-all
    l2b-duration-300
    l2b-rounded-full
    l2b-bg-surface
    l2b-border
    l2b-border-transparent
    ${searchFocused ? 
      "l2b-flex-[2] l2b-scale-105 l2b-shadow-lg l2b-border-primary" : 
      "l2b-flex-1 l2b-scale-100 l2b-shadow-none"
    }
    l2b-mx-6
  `}
>
  <span className="l2b-absolute l2b-left-4 l2b-top-1/2 -translate-y-1/2 l2b-text-muted pointer-events-none">


    🔍
  </span>

  <input
    type="text"
    name="search"
    placeholder="Search storefronts, auctions, categories…"
    onFocus={() => setSearchFocused(true)}
    onBlur={() => setSearchFocused(false)}
    className="
      l2b-input
      w-full
      l2b-pl-10
      l2b-rounded-full
      l2b-transition-all
      l2b-duration-300
      focus:l2b-ring-2
      focus:l2b-ring-primary
    "
  />
</form>

      {/* RIGHT SIDE */}
      <div className="l2b-flex l2b-items-center l2b-gap-4 relative">

        {/* Sell Button (desktop only) */}
        <Link
          href="/portal/dashboard/storefronts/new"
          className="l2b-btn l2b-btn-amber l2b-hidden md:l2b-inline-flex"
        >
          Sell
        </Link>

        {/* Wallet */}
        {!isConnected ? (
          <button onClick={() => connect()} className="l2b-btn l2b-btn-primary">
            Connect Wallet
          </button>
        ) : (
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {/* Wallet Dropdown Trigger */}
            <button
              onClick={() => setWalletOpen(!walletOpen)}
              className="l2b-btn l2b-btn-muted"
            >
              {address?.slice(0, 6)}…{address?.slice(-4)}
            </button>

            {/* Wallet Dropdown */}
            {walletOpen && (
              <div className="l2b-absolute l2b-right-0 l2b-mt-2 l2b-bg-surface l2b-shadow l2b-rounded l2b-p-4 l2b-flex l2b-flex-col l2b-gap-3 l2b-z-50">
                <div className="l2b-text-sm l2b-text-muted">{address}</div>

                <button
                  onClick={() => navigator.clipboard.writeText(address || "")}
                  className="l2b-btn l2b-btn-muted"
                >
                  Copy Address
                </button>

                <button
                  onClick={() => disconnect()}
                  className="l2b-btn l2b-btn-critical"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        )}



        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(true)}
          className="l2b-btn-icon l2b-md-hidden"
          title="Open menu"
        >
          <span className="l2b-text-xl">☰</span>
        </button>

        {/* Auth */}
        const user = useAuthUser();

{/* Notifications */}
<div className="relative" onClick={(e) => e.stopPropagation()}>
  <button
    onClick={() => setNotifOpen(!notifOpen)}
    className="l2b-btn-icon relative"
    title="Notifications"
  >
    🔔

    {hasUnread && (
      <span
        className="
          l2b-absolute
          l2b-top-0
          l2b-right-0
          l2b-w-2
          l2b-h-2
          l2b-bg-amber-500
          l2b-rounded-full
          l2b-ring-2
          l2b-ring-surface
          l2b-animate-pulse
        "
      />
    )}
  </button>

  {notifOpen && (
    <div className="l2b-absolute l2b-right-0 l2b-mt-2 l2b-bg-surface l2b-shadow l2b-rounded l2b-p-4 l2b-w-64 l2b-flex l2b-flex-col l2b-gap-3 l2b-z-50">

      {/* ▼ Real notifications go here ▼ */}
      {notifications.length === 0 && (
        <div className="l2b-text-sm l2b-text-muted">
          No notifications yet
        </div>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          className="
            l2b-bg-surface-2
            l2b-rounded-lg
            l2b-p-3
            ${!isAtTop ?                 				      "l2b-shadow" : 									"l2b-shadow-none"}
            l2b-border
            l2b-border-surface-3
          "
        >
          <div className="l2b-text-sm l2b-font-medium">{n.title}</div>
          <div className="l2b-text-xs l2b-text-muted">{n.message}</div>
        </div>
      ))}
      {/* ▲ End notifications ▲ */}

    </div>
  )}
</div>



        {/* Theme Toggle */}
<button
  onClick={() => setIsDark(!isDark)}
  className="l2b-btn-icon"
  title="Switch theme"
>
  {isDark ? <Sun className="l2b-text-warning" /> : <Moon className="l2b-text-primary" />}
</button>

        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="l2b-fixed l2b-inset-0 l2b-bg-black/40 l2b-z-50" onClick={() => setMobileOpen(false)}>
          <div
            className="l2b-absolute l2b-top-0 l2b-right-0 l2b-w-64 l2b-h-full l2b-bg-surface l2b-shadow l2b-p-6 l2b-flex l2b-flex-col l2b-gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileOpen(false)}

              className="l2b-btn-icon l2b-self-end"
              title="Close menu"
            >
              ✕
            </button>

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

            {/* Sell Button */}
            <Link
              href="/portal/dashboard/storefronts/new"
              className="l2b-btn l2b-btn-amber"
            >
              Sell
            </Link>

            {/* Auth */}
{!user ? (
  <Link href="/portal/login" className="l2b-btn l2b-btn-primary">
    Login
  </Link>
) : (
  <div className="relative" onClick={(e) => e.stopPropagation()}>
    <button
      onClick={() => setUserMenuOpen(!userMenuOpen)}
      className="l2b-btn l2b-btn-muted"
    >
      Account
    </button>

    {userMenuOpen && (
      <div className="l2b-absolute l2b-right-0 l2b-mt-2 l2b-bg-surface l2b-shadow l2b-rounded l2b-p-4 l2b-flex l2b-flex-col l2b-gap-3 l2b-z-50">
        <Link href="/portal/dashboard" className="l2b-nav-link">
          Dashboard
        </Link>

        <Link href="/portal/settings" className="l2b-nav-link">
          Settings
        </Link>

        <button
          onClick={handleLogout}
          className="l2b-btn l2b-btn-critical"
        >
          Logout
        </button>
      </div>
    )}
  </div>
)}
            {/* Wallet */}
{!isConnected ? (
  <button onClick={() => connect()} className="l2b-btn l2b-btn-primary">
    Connect Wallet
  </button>
) : (
  <div className="relative" onClick={(e) => e.stopPropagation()}>
    {/* Wallet Dropdown Trigger */}
    <button
      onClick={() => setWalletOpen(!walletOpen)}
      className="l2b-btn l2b-btn-muted"
    >
      {address?.slice(0, 6)}…{address?.slice(-4)}
    </button>

    {/* Wallet Dropdown */}
    {walletOpen && (
      <div className="l2b-absolute l2b-right-0 l2b-mt-2 l2b-bg-surface l2b-shadow l2b-rounded l2b-p-4 l2b-flex l2b-flex-col l2b-gap-3 l2b-z-50">
        <div className="l2b-text-sm l2b-text-muted">{address}</div>

        <button
          onClick={() => navigator.clipboard.writeText(address || "")}
          className="l2b-btn l2b-btn-muted"
        >
          Copy Address
        </button>

        <button
          onClick={() => disconnect()}
          className="l2b-btn l2b-btn-critical"
        >
          Disconnect
        </button>
      </div>
    )}
  </div>
)}