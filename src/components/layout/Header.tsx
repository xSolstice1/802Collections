import { Menu } from 'lucide-react';
import { useApps } from '@store/useAppStore';
import { appRegistry } from '@core/registry/appRegistry';
import { SlidingNavbar } from './SlidingNavbar';

interface HeaderProps {
  onMenuClick: () => void;
}

/**
 * Header Component
 * 
 * Responsive top navigation bar with:
 * - Sliding/drawer navbar for infinite scalability
 * - Mobile menu toggle
 */
export const Header = ({ onMenuClick }: HeaderProps) => {
  const storeApps = useApps();
  const apps = storeApps.length > 0 ? storeApps : appRegistry.getEnabled();

  return (
    <header className="flex items-center gap-4 px-4 lg:px-6 py-3 border-b border-black-700 bg-black/50 backdrop-blur-sm">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-black-400 hover:text-black-200 hover:bg-black-800 transition-colors flex-shrink-0"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sliding Navbar - takes remaining space */}
      <div className="flex-1 min-w-0">
        <SlidingNavbar apps={apps} />
      </div>
    </header>
  );
};