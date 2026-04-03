import { useEffect } from 'react';
import { AppRoutes } from '@core/router/AppRoutes';
import { initializeApps, getRegisteredApps } from '@apps/index';
import { useAppStore } from '@store/useAppStore';

// Initialize apps immediately (outside component)
// This ensures apps are registered before the first render
initializeApps();

/**
 * Main App Component
 * 
 * Entry point for the 802Collections application.
 * Initializes the app registry and sets up the routing system.
 */
function App() {
  const setApps = useAppStore(state => state.setApps);

  useEffect(() => {
    // Sync registered apps with Zustand store
    const apps = getRegisteredApps();
    setApps(apps);
  }, [setApps]);

  return <AppRoutes apps={getRegisteredApps()} />;
}

export default App;