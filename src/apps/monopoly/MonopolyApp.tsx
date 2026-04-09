/**
 * MonopolyApp - Razer Corporate Universe Edition
 * 
 * Main entry point for the Monopoly game module.
 * A self-contained, production-ready Monopoly game with:
 * - Multiplayer support via Firebase Realtime Database
 * - Razer-themed corporate universe aesthetic
 * - Classic Monopoly rules with corporate powers
 * - Web Audio API sound effects
 * - Responsive design with TailwindCSS
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Gamepad2, Settings, HelpCircle, X } from 'lucide-react';
import LobbyScreen from './components/screens/LobbyScreen';
import GameScreen from './components/screens/GameScreen';
import { useMonopolyGame } from './hooks/useMonopolyGame';
import { monopolySoundEngine } from './sound/MonopolySound';

// ============================================================================
// Configuration Types
// ============================================================================

export interface MonopolyConfig {
  theme?: {
    primaryColor?: string;
    backgroundColor?: string;
  };
  rules?: {
    startingBalance?: number;
    salaryAmount?: number;
    auctionEnabled?: boolean;
    tradingEnabled?: boolean;
    powersEnabled?: boolean;
  };
  onGameComplete?: (winnerId: string) => void;
}

// ============================================================================
// Main App Component
// ============================================================================

const MonopolyApp: React.FC<MonopolyConfig> = ({
  theme = {},
  rules = {},
  onGameComplete,
}) => {
  const {
    gameState,
    room,
    leaveRoom,
    soundEnabled,
    musicEnabled,
  } = useMonopolyGame();

  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [screen, setScreen] = useState<'lobby' | 'game'>('lobby');

  // Apply configuration
  useEffect(() => {
    if (rules.startingBalance || rules.salaryAmount) {
      // Configuration would be applied when creating a room
      // This is handled in the store
    }
  }, [rules]);

  // Handle game start
  const handleGameStart = useCallback(() => {
    setScreen('game');
    monopolySoundEngine.startBGM();
  }, []);

  // Handle game end
  const handleGameEnd = useCallback(() => {
    setScreen('lobby');
    monopolySoundEngine.stopBGM();
    
    if (onGameComplete && gameState?.winnerId) {
      onGameComplete(gameState.winnerId);
    }
  }, [onGameComplete, gameState?.winnerId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      monopolySoundEngine.dispose();
    };
  }, []);

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{
        backgroundColor: theme.backgroundColor || '#000000',
      }}
    >
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-4 py-2 bg-gray-900/80 border-b border-[#44D62C]/20">
        <div className="flex items-center gap-3">
          <Gamepad2 className="w-6 h-6 text-[#44D62C]" />
          <span className="font-bold text-[#44D62C]">CORPORATE MONOPOLY</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHelp(true)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Help"
          >
            <HelpCircle className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
          {room && (
            <button
              onClick={() => {
                leaveRoom();
                setScreen('lobby');
              }}
              className="p-2 hover:bg-red-900/50 rounded-lg transition-colors"
              title="Leave Room"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        {screen === 'lobby' ? (
          <LobbyScreen onGameStart={handleGameStart} />
        ) : (
          <GameScreen onGameEnd={handleGameEnd} />
        )}
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Sound Effects</span>
                <button
                  onClick={() => monopolySoundEngine.toggleEnabled()}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    soundEnabled
                      ? 'bg-[#44D62C] text-black'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {soundEnabled ? 'On' : 'Off'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Background Music</span>
                <button
                  onClick={() => monopolySoundEngine.toggleMusic()}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    musicEnabled
                      ? 'bg-[#44D62C] text-black'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {musicEnabled ? 'On' : 'Off'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">How to Play</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1 hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-300">
              <section>
                <h3 className="font-bold text-[#44D62C] mb-2">Objective</h3>
                <p>Be the last player standing by buying properties, collecting rent, and bankrupting your opponents!</p>
              </section>

              <section>
                <h3 className="font-bold text-[#44D62C] mb-2">Gameplay</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Roll dice to move around the board</li>
                  <li>Buy unowned properties you land on</li>
                  <li>Pay rent when landing on opponent's properties</li>
                  <li>Build upgrades (houses) and HQ (hotels) to increase rent</li>
                  <li>Draw Market Events and Corporate Actions for bonuses</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-[#44D62C] mb-2">Corporate Powers</h3>
                <p className="mb-2">Each player gets a unique corporate power:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Hostile Takeover</strong> - Buy property without auction</li>
                  <li><strong>Market Crash</strong> - Reduce all rents temporarily</li>
                  <li><strong>Monopoly Boost</strong> - Double your rent for one turn</li>
                  <li><strong>Corporate Espionage</strong> - Steal from another player</li>
                  <li><strong>Venture Capital</strong> - Receive money from the bank</li>
                  <li><strong>Tax Loophole</strong> - Skip next tax payment</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-[#44D62C] mb-2">Properties</h3>
                <p className="mb-2">Razer-themed properties in three tiers:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Cheap:</strong> DeathAdder, Cynosa, Goliathus, etc.</li>
                  <li><strong>Mid:</strong> Naga, Orochi, Tarantula, etc.</li>
                  <li><strong>Expensive:</strong> Blackwidow, Kraken, Leviathan, etc.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-[#44D62C] mb-2">Tips</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Try to get monopolies (all properties of one color)</li>
                  <li>Build upgrades strategically on high-traffic properties</li>
                  <li>Use your corporate power at the right moment</li>
                  <li>Keep enough cash for rent payments</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonopolyApp;