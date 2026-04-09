/**
 * Game Screen Component
 *
 * Main game board screen with real-time multiplayer sync,
 * turn-based actions, event log, and notification toasts
 */

import React, { useMemo, useEffect } from 'react';
import {
  Dice6,
  Home,
  Building2,
  Check,
  Volume2,
  VolumeX,
  Music,
  Clock,
  Unlock,
  RotateCw,
} from 'lucide-react';
import Board from '../Board/Board';
import { useMonopolyGame } from '../../hooks/useMonopolyGame';
import { useMonopolyStore } from '../../store/gameStore';
import { subscribeToGameState } from '../../services/firebaseMonopoly';
import type { GameState } from '../../types';

interface GameScreenProps {
  onGameEnd?: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameEnd }) => {
  const {
    room,
    currentUserId,
    gameState,
    myPlayer,
    mySpace,
    currentTurnPlayer,
    isMyTurn,
    canBuyProperty,
    myProperties,
    monopolies,
    notification,
    handleRollDice,
    handleBuyProperty,
    handleUpgradeProperty,
    canUpgradeProperty,
    handleEndTurn,
    handlePayJailFine,
    handleRollDiceInJail,
    toggleSound,
    toggleMusic,
    soundEnabled,
    musicEnabled,
    playSound,
  } = useMonopolyGame();

  // ============================================================================
  // Firebase Real-time Sync
  // ============================================================================

  useEffect(() => {
    if (!room?.id) return;

    const unsub = subscribeToGameState(room.id, (remoteState) => {
      if (!remoteState) return;

      const local = useMonopolyStore.getState();
      const myId = local.currentUserId;

      // Sanitize Firebase data (Firebase drops null values and empty arrays)
      const sanitized: GameState = {
        ...remoteState,
        playerOrder: remoteState.playerOrder || [],
        events: remoteState.events || [],
        board: remoteState.board || local.gameState?.board || [],
        players: Object.fromEntries(
          Object.entries(remoteState.players || {}).map(([id, p]) => [
            id,
            { ...(p as any), properties: (p as any).properties || [] },
          ])
        ),
        // Firebase drops null owner fields — restore them so === null checks work
        properties: Object.fromEntries(
          Object.entries((remoteState.properties || {}) as Record<string, any>).map(([id, p]) => [
            id,
            { ...p, owner: p.owner ?? null, mortgaged: p.mortgaged ?? false, upgrades: p.upgrades ?? 0 },
          ])
        ),
      };

      // Always sync if local game isn't in playing state yet (initial load)
      if (!local.gameState || local.gameState.phase !== 'playing') {
        useMonopolyStore.setState({ gameState: sanitized });
        return;
      }

      // Always sync if the turn changed (so the new active player gets the update)
      const remoteTurnPlayer = (sanitized.playerOrder)[sanitized.currentPlayerIndex];
      const localTurnIndex = local.gameState.currentPlayerIndex;
      if (localTurnIndex !== sanitized.currentPlayerIndex) {
        useMonopolyStore.setState({ gameState: sanitized });
        return;
      }

      // Don't overwrite if it's our turn and turn hasn't changed — we are the authority
      if (remoteTurnPlayer === myId) return;

      useMonopolyStore.setState({ gameState: sanitized });
    });

    return () => unsub();
  }, [room?.id]);

  // ============================================================================
  // Game End Detection
  // ============================================================================

  useEffect(() => {
    if (gameState?.phase === 'finished' && onGameEnd) {
      playSound('game_end');
      setTimeout(onGameEnd, 5000);
    }
  }, [gameState?.phase, onGameEnd, playSound]);

  // ============================================================================
  // Derived State
  // ============================================================================

  const playerPositions = useMemo(() => {
    if (!gameState) return {};
    const positions: Record<string, { position: number; color: string; name: string }> = {};
    Object.values(gameState.players).forEach((player) => {
      if (!player.isBankrupt) {
        positions[player.id] = {
          position: player.position,
          color: player.color,
          name: player.name,
        };
      }
    });
    return positions;
  }, [gameState]);

  const currentProperty = useMemo(() => {
    if (!myPlayer || !gameState || !mySpace?.propertyId) return null;
    return gameState.properties[mySpace.propertyId];
  }, [myPlayer, gameState, mySpace]);

  const currentTurnPlayerId = gameState?.playerOrder?.[gameState?.currentPlayerIndex || 0];

  const recentEvents = useMemo(() => {
    return (gameState?.events || []).slice(0, 8);
  }, [gameState?.events]);

  // Can we upgrade the property we just landed on?
  const canUpgradeLanded = useMemo(() => {
    if (!currentProperty || !myPlayer) return false;
    if (currentProperty.owner !== myPlayer.id) return false;
    return canUpgradeProperty(currentProperty.id);
  }, [currentProperty, myPlayer, canUpgradeProperty]);

  // ============================================================================
  // Helpers
  // ============================================================================

  const getUpgradeLabel = (upgrades: number) => {
    if (upgrades >= 5) return 'Hotel';
    if (upgrades === 0) return 'Undeveloped';
    return `${upgrades} House${upgrades > 1 ? 's' : ''}`;
  };

  // ============================================================================
  // Finished Screen
  // ============================================================================

  if (gameState?.phase === 'finished') {
    const winner = gameState.winnerId ? gameState.players[gameState.winnerId] : null;

    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h1
            className="text-4xl font-bold text-[#44D62C] mb-4"
            style={{ textShadow: '0 0 30px rgba(68,214,44,0.5)' }}
          >
            Game Over!
          </h1>
          {winner && (
            <div className="mb-6">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-black"
                style={{ backgroundColor: winner.color }}
              >
                {winner.name.charAt(0).toUpperCase()}
              </div>
              <p className="text-xl text-white">{winner.name} wins!</p>
              <p className="text-gray-400">Final Balance: ${winner.balance}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================================
  // Main Game UI
  // ============================================================================

  return (
    <div className="min-h-[600px] flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900/80 border-b border-[#44D62C]/20">
        <div className="flex items-center gap-4">
          <span className="text-[#44D62C] font-bold">CORPORATE MONOPOLY</span>
          <span className="text-gray-500 text-sm">|</span>
          <span className="text-gray-400 text-sm">{room?.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-gray-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-500" />
            )}
          </button>
          <button
            onClick={toggleMusic}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title={musicEnabled ? 'Mute music' : 'Unmute music'}
          >
            <Music className={`w-5 h-5 ${musicEnabled ? 'text-gray-400' : 'text-gray-500 opacity-50'}`} />
          </button>
        </div>
      </div>

      {/* Turn Banner */}
      <div
        className={`px-4 py-3 text-center font-bold text-lg ${
          isMyTurn
            ? 'bg-[#44D62C]/20 text-[#44D62C]'
            : 'bg-gray-800/50 text-gray-400'
        }`}
      >
        {isMyTurn ? (
          myPlayer?.inJail
            ? "YOUR TURN — You're in HQ Jail!"
            : gameState?.doublesExtraRoll
              ? 'DOUBLES! Roll again!'
              : gameState?.turnPhase === 'rolling'
                ? 'YOUR TURN — Roll the dice!'
                : 'YOUR TURN — Take your action'
        ) : (
          `${currentTurnPlayer?.name || 'Opponent'}'s turn...`
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Players */}
        <div className="w-full lg:w-64 p-4 border-r border-gray-800 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Players
          </h3>

          <div className="space-y-2">
            {Object.values(gameState?.players || {}).map((player) => {
              const isSelf = player.id === currentUserId;
              const isTheirTurn = player.id === currentTurnPlayerId;

              return (
                <div
                  key={player.id}
                  className={`p-3 rounded-lg border transition-all ${
                    player.isBankrupt
                      ? 'bg-red-900/20 border-red-900/30 opacity-50'
                      : isTheirTurn
                        ? 'bg-[#44D62C]/10 border-[#44D62C]/50'
                        : isSelf
                          ? 'bg-gray-800 border-gray-600'
                          : 'bg-gray-900/50 border-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black"
                      style={{ backgroundColor: player.color }}
                    >
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={`text-sm font-medium ${isSelf ? 'text-white' : 'text-gray-300'}`}>
                      {player.name}
                      {isSelf ? ' (You)' : ''}
                    </span>
                    {isTheirTurn && !player.isBankrupt && (
                      <span className="ml-auto text-[#44D62C] text-xs">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Playing
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#44D62C] font-mono">${player.balance}</span>
                    <span className="text-gray-500">
                      {player.isBankrupt
                        ? 'Bankrupt'
                        : player.inJail
                          ? 'In Jail'
                          : `${(player.properties || []).length} props`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* My Properties */}
          {myProperties.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                My Properties
              </h3>
              <div className="space-y-2">
                {myProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-2 bg-gray-900/50 rounded-lg border border-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-4 rounded-sm"
                        style={{ backgroundColor: prop.color }}
                      />
                      <span className="text-sm text-gray-300 truncate flex-1">
                        {prop.name}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getUpgradeLabel(prop.upgrades)}
                      {prop.type === 'property' && ` · $${prop.upgradeCost}/house`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monopolies */}
          {monopolies.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Monopolies
              </h3>
              <div className="flex flex-wrap gap-2">
                {monopolies.map((color) => (
                  <div
                    key={color}
                    className="px-2 py-1 rounded text-xs font-medium text-black"
                    style={{ backgroundColor: color }}
                  >
                    Monopoly!
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center - Board */}
        <div className="flex-1 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-[700px]">
            <Board playerPositions={playerPositions} selectedSpace={null} />
          </div>
        </div>

        {/* Right Panel - Actions & Events */}
        <div className="w-full lg:w-72 p-4 border-l border-gray-800 overflow-y-auto">
          {/* My Status */}
          {myPlayer && (
            <div className="mb-4 p-4 bg-gray-900/80 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-black"
                  style={{ backgroundColor: myPlayer.color }}
                >
                  {myPlayer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-white">{myPlayer.name}</p>
                  <p className="text-xs text-gray-400">
                    {myPlayer.power?.icon} {myPlayer.power?.name}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-black/30 p-2 rounded">
                  <p className="text-gray-500 text-xs">Balance</p>
                  <p className="text-[#44D62C] font-mono font-bold">${myPlayer.balance}</p>
                </div>
                <div className="bg-black/30 p-2 rounded">
                  <p className="text-gray-500 text-xs">Position</p>
                  <p className="text-white font-mono text-xs">
                    {mySpace?.name || `#${myPlayer.position}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Dice Display */}
          {gameState?.dice && (
            <div className="mb-4 p-4 bg-gray-900/80 rounded-lg border border-gray-700 text-center">
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
                  <span className="text-2xl font-bold text-[#44D62C]">
                    {gameState.dice.die1}
                  </span>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
                  <span className="text-2xl font-bold text-[#44D62C]">
                    {gameState.dice.die2}
                  </span>
                </div>
              </div>
              <p className="text-lg font-bold text-white mt-2">
                Total: {gameState.dice.total}
              </p>
              {gameState.dice.isDoubles && (
                <p className="text-sm text-yellow-400">Doubles!</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 mb-4">
            {/* Roll Dice (normal) */}
            {isMyTurn && gameState?.turnPhase === 'rolling' && !myPlayer?.inJail && (
              <button
                onClick={handleRollDice}
                className="w-full flex items-center justify-center gap-2 bg-[#44D62C] hover:bg-[#3bc428] text-black font-bold py-3 px-4 rounded-lg transition-all duration-200"
              >
                <Dice6 className="w-5 h-5" />
                Roll Dice
              </button>
            )}

            {/* Jail Actions */}
            {isMyTurn && myPlayer?.inJail && (
              <>
                <button
                  onClick={handleRollDiceInJail}
                  className="w-full flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
                >
                  <Dice6 className="w-5 h-5" />
                  Roll for Doubles ({myPlayer.jailTurns}/3 attempts)
                </button>
                <button
                  onClick={handlePayJailFine}
                  className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
                >
                  <Unlock className="w-5 h-5" />
                  Pay Fine (${room?.settings.jailFines || 50})
                </button>
              </>
            )}

            {/* Buy Property */}
            {canBuyProperty && currentProperty && (
              <button
                onClick={handleBuyProperty}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                Buy {currentProperty.name} (${currentProperty.price})
              </button>
            )}

            {/* Build House/Hotel — only when landing on own property with monopoly */}
            {isMyTurn && gameState?.turnPhase === 'action' && canUpgradeLanded && currentProperty && (
              <button
                onClick={() => handleUpgradeProperty(currentProperty.id)}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
              >
                <Building2 className="w-5 h-5" />
                {currentProperty.upgrades >= 4
                  ? `Build Hotel on ${currentProperty.name} ($${currentProperty.upgradeCost})`
                  : `Build House on ${currentProperty.name} ($${currentProperty.upgradeCost})`}
              </button>
            )}

            {/* End Turn / Roll Again */}
            {isMyTurn && gameState?.turnPhase === 'action' && !myPlayer?.inJail && (
              <button
                onClick={handleEndTurn}
                className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-lg transition-all duration-200 ${
                  gameState.doublesExtraRoll
                    ? 'bg-[#44D62C] hover:bg-[#3bc428] text-black'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {gameState.doublesExtraRoll ? (
                  <>
                    <RotateCw className="w-5 h-5" />
                    Roll Again (Doubles!)
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    End Turn
                  </>
                )}
              </button>
            )}

            {/* Waiting for other player */}
            {!isMyTurn && (
              <div className="text-center py-4 text-gray-400">
                <p className="text-sm">
                  Waiting for {currentTurnPlayer?.name || 'opponent'}...
                </p>
              </div>
            )}
          </div>

          {/* Event Log */}
          {recentEvents.length > 0 && (
            <div className="border-t border-gray-800 pt-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Event Log
              </h3>
              <div className="space-y-2 max-h-[250px] overflow-y-auto">
                {recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="text-xs text-gray-400 p-2 bg-black/30 rounded"
                  >
                    {event.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg font-medium text-sm ${
              notification.type === 'success'
                ? 'bg-green-600 text-white'
                : notification.type === 'error'
                  ? 'bg-red-600 text-white'
                  : 'bg-blue-600 text-white'
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
