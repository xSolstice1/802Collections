import { lazy } from 'react';
import { 
  LayoutDashboard, 
  FileJson,
  Utensils,
  Sparkles,
  FileText
} from 'lucide-react';
import { appRegistry } from '@core/registry/appRegistry';
import type { AppDefinition } from '@model/index';

/**
 * App Registry Configuration
 * 
 * This file registers all available applications in the 802Collections platform.
 * To add a new app:
 * 1. Create the app component in src/apps/[app-name]/[AppName]App.tsx
 * 2. Add the app definition to the apps array below
 * 3. The app will automatically appear in the sidebar and dashboard
 */

// Lazy load all apps for optimal performance
const HomeApp = lazy(() => import('@apps/home/HomeApp'));
const JsonFormatterApp = lazy(() => import('@apps/json-formatter/JsonFormatterApp'));
const WheelOfLunchApp = lazy(() => import('@apps/wheel-of-lunch/WheelOfLunchApp'));
const StickerMakerApp = lazy(() => import('@apps/sticker-maker/StickerMakerApp'));
const ResumeBuilderApp = lazy(() => import('@apps/resume-builder/ResumeBuilderApp'));

/**
 * Available Applications
 * 
 * Each app must have:
 * - id: Unique identifier
 * - name: Display name
 * - description: Short description
 * - route: URL path (e.g., '/json-formatter')
 * - icon: Icon component (from lucide-react or custom)
 * - component: Lazy-loaded React component
 * - enabled: Whether the app is visible
 * - category: Category for filtering (optional)
 */
const apps: AppDefinition[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'App launcher - browse all available apps',
    route: '/',
    icon: <LayoutDashboard className="w-5 h-5" />,
    component: HomeApp,
    enabled: true,
    category: 'dashboard',
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and minify JSON data',
    route: '/json-formatter',
    icon: <FileJson className="w-5 h-5" />,
    component: JsonFormatterApp,
    enabled: true,
    category: 'utilities',
  },
  {
    id: 'wheel-of-lunch',
    name: 'Wheel of Lunch',
    description: "Can't decide? Spin the wheel to choose!",
    route: '/wheel-of-lunch',
    icon: <Utensils className="w-5 h-5" />,
    component: WheelOfLunchApp,
    enabled: true,
    category: 'utilities',
  },
  {
    id: 'sticker-maker',
    name: 'Telegram Sticker Maker',
    description: 'Create perfect Telegram stickers from any image',
    route: '/sticker-maker',
    icon: <Sparkles className="w-5 h-5" />,
    component: StickerMakerApp,
    enabled: true,
    category: 'media',
  },
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    description: 'Create ATS-friendly resumes with multiple templates',
    route: '/resume-builder',
    icon: <FileText className="w-5 h-5" />,
    component: ResumeBuilderApp,
    enabled: true,
    category: 'productivity',
  },
];

/**
 * Initialize the App Registry
 * 
 * This function registers all apps with the central registry.
 * It should be called once during application initialization.
 */
export const initializeApps = (): void => {
  // Clear any existing registrations
  appRegistry.clear();
  
  // Register all apps
  appRegistry.registerMany(apps);
  
  console.log(`[AppInit] Registered ${apps.length} applications`);
};

/**
 * Get all registered apps
 * 
 * Utility function to retrieve all apps from the registry.
 */
export const getRegisteredApps = (): AppDefinition[] => {
  return appRegistry.getEnabled();
};

export { apps };
export default apps;