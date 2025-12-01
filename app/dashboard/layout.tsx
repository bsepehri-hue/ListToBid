import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function DashboardRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // All routes under /dashboard will use this layout
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
