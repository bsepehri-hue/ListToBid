"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar"; // adjust if your path differs

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          {children}
        </div>
      </main>
    </div>
  );
}