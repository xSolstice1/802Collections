import type { AppDefinition } from '@model/index';
import type { AppCategory } from '@model/index';

/**
 * App Registry
 * Central system for registering and managing applications in 802Collections
 * 
 * This registry allows for dynamic app registration and provides
 * a single source of truth for all available applications.
 */

class AppRegistry {
  private apps: Map<string, AppDefinition> = new Map();
  private static instance: AppRegistry;

  private constructor() {}

  /**
   * Get the singleton instance of the AppRegistry
   */
  static getInstance(): AppRegistry {
    if (!AppRegistry.instance) {
      AppRegistry.instance = new AppRegistry();
    }
    return AppRegistry.instance;
  }

  /**
   * Register a new app in the registry
   * @param app - The app definition to register
   * @throws Error if an app with the same ID already exists
   */
  register(app: AppDefinition): void {
    if (this.apps.has(app.id)) {
      throw new Error(`App with ID "${app.id}" is already registered`);
    }
    this.apps.set(app.id, app);
    console.log(`[AppRegistry] Registered app: ${app.name} (${app.id})`);
  }

  /**
   * Register multiple apps at once
   * @param apps - Array of app definitions to register
   */
  registerMany(apps: AppDefinition[]): void {
    apps.forEach(app => this.register(app));
  }

  /**
   * Unregister an app by ID
   * @param appId - The ID of the app to unregister
   * @returns true if the app was unregistered, false if it didn't exist
   */
  unregister(appId: string): boolean {
    const result = this.apps.delete(appId);
    if (result) {
      console.log(`[AppRegistry] Unregistered app: ${appId}`);
    }
    return result;
  }

  /**
   * Get an app by its ID
   * @param appId - The ID of the app to retrieve
   * @returns The app definition or undefined if not found
   */
  getById(appId: string): AppDefinition | undefined {
    return this.apps.get(appId);
  }

  /**
   * Get an app by its route
   * @param route - The route path to look up
   * @returns The app definition or undefined if not found
   */
  getByRoute(route: string): AppDefinition | undefined {
    for (const app of this.apps.values()) {
      if (app.route === route) {
        return app;
      }
    }
    return undefined;
  }

  /**
   * Get all registered apps
   * @returns Array of all app definitions
   */
  getAll(): AppDefinition[] {
    return Array.from(this.apps.values());
  }

  /**
   * Get all enabled apps
   * @returns Array of enabled app definitions
   */
  getEnabled(): AppDefinition[] {
    return this.getAll().filter(app => app.enabled);
  }

  /**
   * Get apps by category
   * @param category - The category to filter by
   * @returns Array of apps in the specified category
   */
  getByCategory(category: AppCategory): AppDefinition[] {
    return this.getAll().filter(app => app.category === category);
  }

  /**
   * Check if an app exists
   * @param appId - The ID of the app to check
   * @returns true if the app exists
   */
  exists(appId: string): boolean {
    return this.apps.has(appId);
  }

  /**
   * Get the total count of registered apps
   */
  getCount(): number {
    return this.apps.size;
  }

  /**
   * Clear all registered apps
   */
  clear(): void {
    this.apps.clear();
    console.log('[AppRegistry] Cleared all apps');
  }

  /**
   * Export the registry as a plain object (useful for debugging)
   */
  export(): Record<string, AppDefinition> {
    const result: Record<string, AppDefinition> = {};
    this.apps.forEach((app, id) => {
      result[id] = app;
    });
    return result;
  }
}

// Export singleton instance
export const appRegistry = AppRegistry.getInstance();

// Export the class for testing purposes
export { AppRegistry };