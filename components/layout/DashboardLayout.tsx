import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard flex min-h-screen">
      {/* Sidebar - fixed on the left */}
      <Sidebar />

      {/* Main content area */}
      {/* Margin-left (pl-64) matches the sidebar width to push main content over */}
      <div className="dashboard-main flex-1 flex flex-col ml-64"> 
        
        {/* Header - sticky on top */}
        <Header />

        {/* Content area */}
        <main className="content flex-1 p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};
