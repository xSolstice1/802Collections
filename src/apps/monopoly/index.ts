/**
 * Monopoly Module Exports
 * 
 * Central export file for the Razer-themed Monopoly game module
 */

// Main App Component
export { default as MonopolyApp } from './MonopolyApp';
export type { MonopolyConfig } from './MonopolyApp';

// Types
export * from './types';

// Data
export * from './data/board';

// Store
export { useMonopolyStore } from './store/gameStore';

// Hooks
export {
  useMonopolyGame,
  useMonopolyPlayer,
  useMonopolyProperty,
  useMonopolyRoom,
} from './hooks/useMonopolyGame';

// Sound
export { MonopolySoundEngine, monopolySoundEngine } from './sound/MonopolySound';
export type { SoundType } from './sound/MonopolySound';

// Components
export { default as Board } from './components/Board/Board';
export { default as BoardTile } from './components/Board/BoardTile';
export { default as LobbyScreen } from './components/screens/LobbyScreen';
export { default as GameScreen } from './components/screens/GameScreen';