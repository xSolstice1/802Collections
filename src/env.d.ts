/// <reference types="vite/client" />

/**
 * Environment Variables Type Declarations
 * 
 * This file extends Vite's ImportMeta interface to include
 * type definitions for our custom environment variables.
 */
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_ERROR_REPORTING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}