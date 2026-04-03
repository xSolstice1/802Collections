import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { AppDefinition } from '@model/index';

interface MainLayoutProps {
  apps: AppDefinition[];
}

/**
 * MainLayout Component
 * 
 * The primary layout wrapper for the application.
 * Provides a responsive sidebar navigation and main content area.
 */
export const MainLayout = ({ apps }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show sidebar by default on desktop
  useEffect(() => {
    const checkDesktop = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        apps={apps} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with mobile menu toggle */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};