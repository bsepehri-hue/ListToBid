"use client";

import Sidebar from "@/app/components/layout/Sidebar";
import ClientTopNavWrapper from "@/app/components/ui/ClientTopNavWrapper";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <Sidebar userId="demo-user" />

      <div className="flex-1 flex flex-col">
        <ClientTopNavWrapper />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

