import { NavLink } from 'react-router-dom';
import { 
  X,
  Grid3X3,
  Box
} from 'lucide-react';
import type { AppDefinition } from '@model/index';

interface SidebarProps {
  apps: AppDefinition[];
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Sidebar Component
 * 
 * Responsive navigation sidebar with app launcher functionality.
 * Collapsed by default on mobile, expanded on desktop.
 */
export const Sidebar = ({ apps, isOpen, onClose }: SidebarProps) => {
  // Filter apps based on search (could add search later)
  const filteredApps = apps.filter(app => app.enabled);

  // Close sidebar when navigating (for mobile)
  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          flex flex-col bg-black border-r border-black-700
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 lg:translate-x-0 lg:w-0 lg:overflow-hidden'}
        `}
      >
        {/* Header with close button (mobile only) */}
        <div className="flex items-center justify-between p-4 border-b border-black-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-802 flex items-center justify-center">
              <Box className="w-5 h-5 text-black" />
            </div>
            <span className="font-semibold text-black-100 text-sm">802Collections</span>
          </div>
          {/* Close button - only visible on mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-black-400 hover:text-black-200 hover:bg-black-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Apps List */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <p className="text-xs font-medium text-black-500 uppercase tracking-wider mb-2">
            Apps ({filteredApps.length})
          </p>
          <nav className="space-y-1">
            {filteredApps.map(app => (
              <NavLink
                key={app.id}
                to={app.route}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-802/15 text-802 border border-802/30' 
                    : 'text-black-400 hover:text-black-200 hover:bg-black-800'
                  }`
                }
              >
                <span className="flex-shrink-0 w-5 h-5">{app.icon}</span>
                <span className="truncate">{app.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer - only visible on mobile */}
        <div className="border-t border-black-700 p-4 lg:hidden">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-black-400 hover:text-black-200 hover:bg-black-800 transition-colors"
          >
            <Grid3X3 className="w-4 h-4" />
            Close
          </button>
        </div>
      </aside>
    </>
  );
};