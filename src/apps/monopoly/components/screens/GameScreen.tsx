/**
 * Game Screen Component
 * 
 * Main game board screen with player HUD and action panel
 */

import React, { useMemo } from 'react';
import {
  Dice6,
  Home,
  TrendingUp,
  Zap,
  Users,
  Clock,
  Volume2,
  VolumeX,
  Music,
  Building2,
  DollarSign,
  AlertCircle,
  Check,
} from 'lucide-react';
import Board from '../Board/Board';
import { useMonopolyGame } from '../../hooks/useMonopolyGame';
import { monopolySoundEngine } from '../../sound/MonopolySound';

interface GameScreenProps {
  onGameEnd?: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameEnd }) => {
  const {
    room,
    currentUserId,
    gameState,
    currentPlayer,
    activePlayers,
    playerCount,
    isMyTurn,
    canRollDice,
    canBuyProperty,
    myProperties,
    monopolies,
    handleRollDice,
    handleBuyProperty,
    handleEndTurn,
    toggleSound,
    toggleMusic,
    soundEnabled,
    musicEnabled,
    playSound,
    setNotification,
  } = useMonopolyGame();

  // Check if game is finished
  React.useEffect(() => {
    if (gameState?.phase === 'finished' && onGameEnd) {
      playSound('game_end');
      setTimeout(onGameEnd, 3000);
    }
  }, [gameState?.phase, onGameEnd, playSound]);

  // Player positions for board display
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

  // Current space info
  const currentSpace = useMemo(() => {
    if (!currentPlayer || !gameState) return null;
    return gameState.board[currentPlayer.position];
  }, [currentPlayer, gameState]);

  // Property at current position
  const currentProperty = useMemo(() => {
    if (!currentPlayer || !gameState || !currentSpace?.propertyId) return null;
    return gameState.properties[currentSpace.propertyId];
  }, [currentPlayer, gameState, currentSpace]);

  // Format time
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  // Turn timer
  const turnElapsed = useMemo(() => {
    if (!gameState?.turnStartTime) return '0:00';
    return formatTime(Date.now() - gameState.turnStartTime);
  }, [gameState?.turnStartTime]);

  // Get upgrade label
  const getUpgradeLabel = (upgrades: number) => {
    if (upgrades >= 5) return 'HQ';
    if (upgrades === 0) return 'No upgrades';
    return `${upgrades} upgrade${upgrades > 1 ? 's' : ''}`;
  };

  if (gameState?.phase === 'finished') {
    const winner = gameState.winnerId ? gameState.players[gameState.winnerId] : null;
    
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-[#44D62C] mb-4" style={{ textShadow: '0 0 30px rgba(68,214,44,0.5)' }}>
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
              <p className="text-gray-400">Total Value: ${gameState.players[gameState.winnerId!]?.balance || 0}</p>
            </div>
          )}
          <button
            onClick={() => playSound('click')}
            className="bg-[#44D62C] hover:bg-[#3bc428] text-black font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Return to Lobby
          </button>
        </div>
      </div>
    );
  }

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
            {musicEnabled ? (
              <Music className="w-5 h-5 text-gray-400" />
            ) : (
              <Music className="w-5 h-5 text-gray-500 opacity-50" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Player Info */}
        <div className="w-full lg:w-64 p-4 border-r border-gray-800 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Players
          </h3>
          
          <div className="space-y-2">
            {activePlayers.map((player, index) => {
              const isCurrent = player.id === currentUserId;
              const isCurrentTurn = gameState && activePlayers[gameState.currentPlayerIndex]?.id === player.id;
              
              return (
                <div
                  key={player.id}
                  className={`p-3 rounded-lg border transition-all ${
                    isCurrentTurn
                      ? 'bg-[#44D62C]/10 border-[#44D62C]/50'
                      : isCurrent
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
                    <span className={`text-sm font-medium ${isCurrent ? 'text-white' : 'text-gray-300'}`}>
                      {player.name}
                    </span>
                    {isCurrentTurn && (
                      <span className="ml-auto text-[#44D62C] text-xs">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Playing
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#44D62C] font-mono">${player.balance}</span>
                    <span className="text-gray-500">{player.properties.length} properties</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* My Properties */}
          {currentPlayer && myProperties.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                My Properties
              </h3>
              <div className="space-y-2">
                {myProperties.slice(0, 5).map((prop) => (
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
                    </div>
                  </div>
                ))}
                {myProperties.length > 5 && (
                  <p className="text-xs text-gray-500 text-center">
                    +{myProperties.length - 5} more
                  </p>
                )}
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
            <Board
              playerPositions={playerPositions}
              selectedSpace={null}
            />
          </div>
        </div>

        {/* Right Panel - Actions */}
        <div className="w-full lg:w-72 p-4 border-l border-gray-800 overflow-y-auto">
          {/* Current Player Info */}
          {currentPlayer && (
            <div className="mb-6 p-4 bg-gray-900/80 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-black"
                  style={{ backgroundColor: currentPlayer.color }}
                >
                  {currentPlayer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-white">{currentPlayer.name}</p>
                  <p className="text-xs text-gray-400">
                    {currentPlayer.power?.icon} {currentPlayer.power?.name}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-black/30 p-2 rounded">
                  <p className="text-gray-500 text-xs">Balance</p>
                  <p className="text-[#44D62C] font-mono font-bold">
                    ${currentPlayer.balance}
                  </p>
                </div>
                <div className="bg-black/30 p-2 rounded">
                  <p className="text-gray-500 text-xs">Position</p>
                  <p className="text-white font-mono">
                    {currentSpace?.name || currentPlayer.position}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Dice Display */}
          {gameState?.dice && (
            <div className="mb-6 p-4 bg-gray-900/80 rounded-lg border border-gray-700 text-center">
              <p className="text-sm text-gray-400 mb-2">Dice Roll</p>
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
          <div className="space-y-3">
            {isMyTurn && gameState?.turnPhase === 'rolling' && !currentPlayer?.inJail && (
              <button
                onClick={handleRollDice}
                disabled={!canRollDice}
                className="w-full flex items-center justify-center gap-2 bg-[#44D62C] hover:bg-[#3bc428] disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-3 px-4 rounded-lg transition-all duration-200"
              >
                <Dice6 className="w-5 h-5" />
                Roll Dice
              </button>
            )}

            {canBuyProperty && currentProperty && (
              <button
                onClick={handleBuyProperty}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                Buy {currentProperty.name} (${currentProperty.price})
              </button>
            )}

            {isMyTurn && gameState?.turnPhase === 'action' && !canBuyProperty && (
              <button
                onClick={handleEndTurn}
                className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
              >
                <Check className="w-5 h-5" />
                End Turn
              </button>
            )}

            {currentPlayer?.inJail && isMyTurn && (
              <button
                onClick={() => {
                  playSound('click');
                  setNotification({ message: 'Jail feature coming soon!', type: 'info' });
                }}
                className="w-full flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
              >
                <AlertCircle className="w-5 h-5" />
                Pay Fine (${50})
              </button>
            )}

            {!isMyTurn && (
              <div className="text-center py-4 text-gray-400">
                <p>Waiting for {activePlayers[gameState?.currentPlayerIndex || 0]?.name}...</p>
              </div>
            )}
          </div>

          {/* Turn Timer */}
          {gameState && (
            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Turn {gameState.currentPlayerIndex + 1}</span>
                <span className="font-mono">{turnElapsed}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;