import { useNavigate } from 'react-router-dom';
import { Grid3X3 } from 'lucide-react';
import { useApps } from '@store/useAppStore';
import { appRegistry } from '@core/registry/appRegistry';

/**
 * Home App (Dashboard)
 * 
 * Simple app launcher - shows all available apps in a grid.
 */
const HomeApp = () => {
  const navigate = useNavigate();
  const storeApps = useApps();
  const apps = storeApps.length > 0 ? storeApps : appRegistry.getEnabled();

  // Exclude dashboard from the list
  const availableApps = apps.filter(app => app.id !== 'dashboard');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-black-100">All Apps</h1>
        <span className="text-sm text-black-500">{availableApps.length} apps</span>
      </div>

      {/* Apps Grid */}
      {availableApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {availableApps.map(app => (
            <button
              key={app.id}
              onClick={() => navigate(app.route)}
              className="card group text-left hover:border-802/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-black-700 flex items-center justify-center text-802 group-hover:bg-802/20 transition-colors flex-shrink-0">
                  <span className="w-7 h-7">{app.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-black-100 group-hover:text-802 transition-colors truncate">
                    {app.name}
                  </h3>
                  <p className="text-sm text-black-500 mt-1 line-clamp-2">
                    {app.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="card text-center py-16">
          <Grid3X3 className="w-12 h-12 text-black-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-black-300 mb-2">
            No Apps Available
          </h3>
          <p className="text-black-500 max-w-md mx-auto">
            Apps can be registered in the app registry.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomeApp;