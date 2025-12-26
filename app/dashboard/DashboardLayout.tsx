"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ClientTopNavWrapper from "@/components/ui/ClientTopNavWrapper";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
          lg:translate-x-0 lg:static lg:shadow-none
        `}
      >
        <Sidebar userId="demo-user" />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top Navigation */}
        <div className="border-b bg-white">
          <ClientTopNavWrapper onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}