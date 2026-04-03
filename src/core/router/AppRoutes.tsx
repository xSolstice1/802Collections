import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import type { AppDefinition } from '@model/index';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { MainLayout } from '@components/layout/MainLayout';

/**
 * AppRoutes Component
 * 
 * Centralized routing system that:
 * - Uses React Router for navigation
 * - Implements lazy loading for each app module
 * - Provides error boundaries and loading states
 * - Supports dynamic app registration
 */

interface AppRoutesProps {
  apps: AppDefinition[];
}

/**
 * Lazy App Component Wrapper
 * Wraps each lazy-loaded app with error boundary and suspense
 */
const LazyApp = ({ app }: { app: AppDefinition }) => {
  const AppComponent = app.component;
  
  return (
    <ErrorBoundary appName={app.name}>
      <Suspense fallback={<LoadingSpinner message={`Loading ${app.name}...`} />}>
        <AppComponent />
      </Suspense>
    </ErrorBoundary>
  );
};

/**
 * Home/Dashboard Route Component
 * Displays when user visits the root path
 */
const Home = lazy(() => import('@apps/home/HomeApp'));

export const AppRoutes = ({ apps }: AppRoutesProps) => {
  // Filter to only enabled apps
  const enabledApps = apps.filter(app => app.enabled);

  return (
    <HashRouter>
      <Routes>
        {/* Main layout wrapper */}
        <Route path="/" element={<MainLayout apps={enabledApps} />}>
          {/* Home/Dashboard route */}
          <Route
            index
            element={
              <ErrorBoundary appName="Home">
                <Suspense fallback={<LoadingSpinner message="Loading dashboard..." />}>
                  <Home />
                </Suspense>
              </ErrorBoundary>
            }
          />

          {/* Dynamic app routes */}
          {enabledApps.map(app => (
            <Route
              key={app.id}
              path={app.route.replace(/^\//, '')}
              element={<LazyApp app={app} />}
            />
          ))}

          {/* Catch-all: show home for unknown routes */}
          <Route path="*" element={<Home />} />
        </Route>

        {/* Standalone routes (outside main layout if needed) */}
        {/* Add any standalone pages here */}
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
