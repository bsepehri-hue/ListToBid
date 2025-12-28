"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import NotificationBell from "@/components/NotificationBell";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* Sidebar (collapsible) */}
      {sidebarOpen && (
        <aside className="w-64 border-r bg-white hidden md:block">
          <Sidebar />
        </aside>
      )}

      {/* Mobile Sidebar */}
      {!sidebarOpen && (
        <aside className="w-64 border-r bg-white fixed inset-y-0 left-0 z-50 md:hidden">
          <Sidebar />
        </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* ⭐ Top Header Bar */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-6">
          
          {/* Left side: Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded hover:bg-gray-100"
          >
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Right side actions */}
          <div className="flex items-center gap-6">

            {/* Notification Bell */}
            <NotificationBell />

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-gray-300" />
                <span className="hidden md:block font-medium text-gray-800">Account</span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                >
                  Settings
                </Link>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                >
                  Logout
                </button>
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