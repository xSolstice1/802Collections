import type { LazyExoticComponent, ReactNode } from 'react';

/**
 * App Registry Type
 * Defines the structure for each module/app in the 802Collections platform
 */
export interface AppDefinition {
  /** Unique identifier for the app */
  id: string;
  
  /** Display name for the app */
  name: string;
  
  /** Description of what the app does */
  description: string;
  
  /** Route path for the app (e.g., '/dashboard') */
  route: string;
  
  /** Icon component or SVG string for the app */
  icon: ReactNode;
  
  /** Lazy-loaded component for the app */
  component: LazyExoticComponent<() => React.JSX.Element>;
  
  /** Whether the app is enabled/visible in the launcher */
  enabled: boolean;
  
  /** Category for grouping apps in the launcher */
  category?: AppCategory;
  
  /** Optional: Version of the app */
  version?: string;
  
  /** Optional: Author/maintainer of the app */
  author?: string;
}

/** App categories for organizing the launcher */
export type AppCategory = 
  | 'dashboard' 
  | 'utilities' 
  | 'development' 
  | 'media' 
  | 'productivity'
  | 'settings'
  | 'other';

/**
 * Navigation Item Type
 * Used for sidebar navigation
 */
export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  route: string;
  badge?: number | string;
  isActive?: boolean;
}

/**
 * Theme Configuration Type
 */
export interface ThemeConfig {
  mode: 'dark' | 'light';
  primaryColor: string;
  accentColor: string;
}

/**
 * Layout Props Type
 */
export interface LayoutProps {
  children: ReactNode;
}

/**
 * Error Boundary Props
 */
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Loading State Props
 */
export interface LoadingProps {
  message?: string;
  variant?: 'spinner' | 'skeleton' | 'progress';
}

/**
 * API Response Type
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  timestamp: string;
}

/**
 * Generic Store State Type
 */
export interface StoreState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}