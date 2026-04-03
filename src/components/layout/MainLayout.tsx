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
 * Provides a sidebar navigation and main content area.
 */
export const MainLayout = ({ apps }: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar apps={apps} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};