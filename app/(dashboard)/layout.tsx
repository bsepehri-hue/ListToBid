"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import NotificationBell from "@/components/NotificationBell";
import Link from "next/link";
import TopLoader from "@/app/components/TopLoader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50"} min-h-screen flex`}>

      <TopLoader />   {/* ⭐ Insert it right here */}

      {/* ...rest of your layout */}

  

      {/* Sidebar (desktop) */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } hidden md:block border-r bg-white dark:bg-gray-800 transition-all duration-300 overflow-hidden`}
      >
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 border-r bg-white dark:bg-gray-800 fixed inset-y-0 left-0 z-50 md:hidden animate-slide-in">
          <Sidebar />
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* ⭐ Header */}
        <header className="h-16 border-b bg-white dark:bg-gray-800 flex items-center justify-between px-6">

          {/* Left side: Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Right side actions */}
          <div className="flex items-center gap-6">
            <NotificationBell />

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.02 6.36l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>

            {/* Profile */}
            <div className="relative group">
              <button className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold">
                  B
                </div>
              </button>

              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
                <Link href="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">Profile</Link>
                <Link href="/dashboard/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">Settings</Link>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">Logout</button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}