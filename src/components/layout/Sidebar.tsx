import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Box
} from 'lucide-react';
import type { AppDefinition } from '@model/index';
import { useAppStore } from '@store/useAppStore';

interface SidebarProps {
  apps: AppDefinition[];
}

/**
 * Sidebar Component
 * 
 * Minimal navigation sidebar with app launcher functionality.
 * Supports search and collapsible state.
 */
export const Sidebar = ({ apps }: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();

  // Filter apps based on search
  const filteredApps = apps.filter(app => {
    if (!searchQuery) return app.enabled;
    return app.enabled && (
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <aside 
      className={`
        flex flex-col bg-black border-r border-black-700
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Logo / Brand */}
      <div className="flex items-center justify-between p-4 border-b border-black-700">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-802 flex items-center justify-center">
              <Box className="w-5 h-5 text-black" />
            </div>
            <span className="font-semibold text-black-100 text-sm">802Collections</span>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-802 flex items-center justify-center mx-auto">
            <Box className="w-5 h-5 text-black" />
          </div>
        )}
      </div>

      {/* Search */}
      {!sidebarCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black-500" />
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 text-sm"
            />
          </div>
        </div>
      )}

      {/* Apps List */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {!sidebarCollapsed && (
          <p className="text-xs font-medium text-black-500 uppercase tracking-wider mb-2">
            Apps ({filteredApps.length})
          </p>
        )}
        <nav className="space-y-1">
          {filteredApps.map(app => (
            <NavLink
              key={app.id}
              to={app.route}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
                ${isActive 
                  ? 'bg-802/15 text-802 border border-802/30' 
                  : 'text-black-400 hover:text-black-200 hover:bg-black-800'
                }
                ${sidebarCollapsed ? 'justify-center' : ''}
                `
              }
              title={sidebarCollapsed ? app.name : undefined}
            >
              <span className="flex-shrink-0 w-5 h-5">{app.icon}</span>
              {!sidebarCollapsed && (
                <span className="truncate">{app.name}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Collapse Toggle */}
      <div className="border-t border-black-700 p-4">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-black-500 hover:text-black-200 hover:bg-black-800 transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
};