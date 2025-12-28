"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import NotificationBell from "@/components/NotificationBell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        
        {/* ⭐ Top Header Bar */}
        <header className="h-16 border-b bg-white flex items-center justify-end px-6">
          <div className="flex items-center gap-6">
            <NotificationBell />
            {/* Future: ProfileMenu, Settings, etc */}
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