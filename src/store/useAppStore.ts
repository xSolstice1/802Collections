import { create } from 'zustand';
import type { AppDefinition } from '@model/index';

/**
 * App Store (Zustand)
 * 
 * Centralized state management for the 802Collections platform.
 * Using Zustand for its simplicity, minimal boilerplate, and excellent TypeScript support.
 * 
 * Why Zustand over Redux Toolkit:
 * - Less boilerplate code
 * - Smaller bundle size
 * - Built-in TypeScript support
 * - Simpler API for this use case
 * - Easy to extend with middleware
 */

interface AppState {
  // Registered apps
  apps: AppDefinition[];
  
  // Currently active app ID
  activeAppId: string | null;
  
  // Sidebar state
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Search query for app filtering
  searchQuery: string;
  
  // Selected category filter
  categoryFilter: string | null;
  
  // Actions
  setApps: (apps: AppDefinition[]) => void;
  addApp: (app: AppDefinition) => void;
  removeApp: (appId: string) => void;
  setActiveApp: (appId: string | null) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string | null) => void;
  getFilteredApps: () => AppDefinition[];
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  apps: [],
  activeAppId: null,
  sidebarOpen: true,
  sidebarCollapsed: false,
  searchQuery: '',
  categoryFilter: null,

  // Actions
  setApps: (apps) => set({ apps }),

  addApp: (app) => set((state) => ({
    apps: [...state.apps, app]
  })),

  removeApp: (appId) => set((state) => ({
    apps: state.apps.filter(app => app.id !== appId)
  })),

  setActiveApp: (appId) => set({ activeAppId: appId }),

  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setCategoryFilter: (category) => set({ categoryFilter: category }),

  getFilteredApps: () => {
    const { apps, searchQuery, categoryFilter } = get();
    
    return apps.filter(app => {
      // Filter by search query
      const matchesSearch = !searchQuery || 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by category
      const matchesCategory = !categoryFilter || app.category === categoryFilter;
      
      return matchesSearch && matchesCategory && app.enabled;
    });
  }
}));

// Selector hooks for better performance
export const useApps = () => useAppStore(state => state.apps);
export const useActiveAppId = () => useAppStore(state => state.activeAppId);
export const useSidebarOpen = () => useAppStore(state => state.sidebarOpen);
export const useSidebarCollapsed = () => useAppStore(state => state.sidebarCollapsed);
export const useSearchQuery = () => useAppStore(state => state.searchQuery);
export const useCategoryFilter = () => useAppStore(state => state.categoryFilter);
export const useFilteredApps = () => useAppStore(state => state.getFilteredApps());

// Action hooks
export const useSetApps = () => useAppStore(state => state.setApps);
export const useAddApp = () => useAppStore(state => state.addApp);
export const useRemoveApp = () => useAppStore(state => state.removeApp);
export const useSetActiveApp = () => useAppStore(state => state.setActiveApp);
export const useToggleSidebar = () => useAppStore(state => state.toggleSidebar);
export const useSetSidebarCollapsed = () => useAppStore(state => state.setSidebarCollapsed);
export const useSetSearchQuery = () => useAppStore(state => state.setSearchQuery);
export const useSetCategoryFilter = () => useAppStore(state => state.setCategoryFilter);