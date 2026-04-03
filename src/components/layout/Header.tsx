import { NavLink } from 'react-router-dom';
import { Menu, Home, Github } from 'lucide-react';
import { useApps } from '@store/useAppStore';
import { appRegistry } from '@core/registry/appRegistry';

interface HeaderProps {
  onMenuClick: () => void;
}

/**
 * Header Component
 * 
 * Minimalistic top navigation bar with quick links and mobile menu toggle.
 * Synced with sidebar to show all apps.
 */
export const Header = ({ onMenuClick }: HeaderProps) => {
  const storeApps = useApps();
  const apps = storeApps.length > 0 ? storeApps : appRegistry.getEnabled();
  
  // Get all non-dashboard apps for the nav
  const navApps = apps.filter(app => app.id !== 'dashboard');

  return (
    <header className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-black-700 bg-black/50 backdrop-blur-sm">
      {/* Left: Mobile menu toggle + Nav Links */}
      <div className="flex items-center gap-2">
        {/* Mobile menu toggle (hidden on desktop) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-black-400 hover:text-black-200 hover:bg-black-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
              ${isActive 
                ? 'bg-802/15 text-802' 
                : 'text-black-400 hover:text-black-200 hover:bg-black-800'
              }`
            }
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
          
          {navApps.map(app => (
            <NavLink
              key={app.id}
              to={app.route}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
                ${isActive 
                  ? 'bg-802/15 text-802' 
                  : 'text-black-400 hover:text-black-200 hover:bg-black-800'
                }`
              }
            >
              {/* Icon - visible on mobile, hidden on desktop (sidebar shows name) */}
              <span className="w-4 h-4 sm:hidden">{app.icon}</span>
              {/* Full name - visible on desktop */}
              <span className="hidden sm:inline">{app.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right: External Links */}
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/xSolstice1/802Collections"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-black-400 hover:text-black-200 hover:bg-black-800 transition-colors"
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
};