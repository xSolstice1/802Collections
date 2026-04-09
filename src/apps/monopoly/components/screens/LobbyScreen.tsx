/**
 * Lobby Screen Component
 * 
 * Room creation and joining interface for the Monopoly game
 */

import React, { useState, useEffect } from 'react';
import { Users, Play, Copy, Check, Sparkles, Gamepad2 } from 'lucide-react';
import { useMonopolyGame } from '../../hooks/useMonopolyGame';
import { getRoomByInviteCode, saveRoom, setPlayerInRoom, subscribeToGameState, subscribeToPlayers, subscribeToRoom, updateGameState, updateRoomStatus } from '../../services/firebaseMonopoly';
import { useMonopolyStore } from '../../store/gameStore';
import type { Player } from '../../types';

interface LobbyScreenProps {
  onGameStart?: () => void;
}

const LobbyScreen: React.FC<LobbyScreenProps> = ({ onGameStart }) => {
  const {
    room,
    currentUserId,
    gameState,
    playerCount,
    isHost,
    canStartGame,
    createRoom,
    joinRoom,
    startGame,
    setNotification,
    syncPlayers,
    playSound,
  } = useMonopolyGame();

  const [roomName, setRoomName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Subscribe to Firebase player updates when in a room
  useEffect(() => {
    if (!room) return;

    const unsubPlayers = subscribeToPlayers(room.id, (players) => {
      if (players.length > 0) {
        syncPlayers(players);
      }
    });

    // Subscribe to room status changes (so guests see when host starts the game)
    const unsubRoom = subscribeToRoom(room.id, (updatedRoom) => {
      if (updatedRoom?.status === 'playing' && onGameStart) {
        onGameStart();
      }
    });

    // Also subscribe to game state phase as fallback (in case room status update fails)
    const unsubGame = subscribeToGameState(room.id, (gameState) => {
      if (gameState?.phase === 'playing' && onGameStart) {
        onGameStart();
      }
    });

    return () => {
      unsubPlayers();
      unsubRoom();
      unsubGame();
    };
  }, [room?.id]);

  const writePlayerToFirebase = async (roomId: string, player: Player | null) => {
    if (!player) return;
    try {
      await setPlayerInRoom(roomId, player);
    } catch (err) {
      console.error('Failed to sync player to Firebase:', err);
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) {
      setError('Please enter a room name');
      return;
    }
    if (!playerName.trim()) {
      setError('Please enter your player name');
      return;
    }

    playSound('click');
    const newRoom = createRoom(roomName);
    const player = joinRoom(newRoom.id, playerName);

    // Update hostId to the actual player ID before saving to Firebase
    if (player) {
      newRoom.hostId = player.id;
    }

    // Persist room and player to Firebase
    try {
      await saveRoom(newRoom);
      await writePlayerToFirebase(newRoom.id, player);
    } catch (err) {
      console.error('Failed to save room to Firebase:', err);
      setNotification({ message: 'Room created locally, but others may not be able to join.', type: 'error' });
    }

    setNotification({ message: `Room "${roomName}" created!`, type: 'success' });
    setError('');
  };

  const [joining, setJoining] = useState(false);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) {
      setError('Please enter an invite code');
      return;
    }
    if (!playerName.trim()) {
      setError('Please enter your player name');
      return;
    }

    playSound('click');
    setJoining(true);
    setError('');

    try {
      // Look up the actual room from Firebase using the invite code
      const foundRoom = await getRoomByInviteCode(inviteCode);

      if (!foundRoom) {
        setError('Room not found. Check the invite code and try again.');
        setJoining(false);
        return;
      }

      // Join the room using the real room ID from Firebase
      const player = joinRoom(foundRoom.id, playerName, foundRoom);

      if (player) {
        await writePlayerToFirebase(foundRoom.id, player);
        setNotification({ message: `Joined room "${foundRoom.name}"!`, type: 'success' });
      } else {
        setError('Failed to join room. It may be full.');
      }
    } catch (err) {
      console.error('Failed to join room:', err);
      setError('Could not connect to server. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  const handleStartGame = async () => {
    if (!canStartGame || !room) return;

    playSound('game_start');
    const started = startGame();
    if (started) {
      // Write full game state to Firebase so guests receive initialized game data
      try {
        const freshState = useMonopolyStore.getState();
        if (freshState.gameState) {
          await updateGameState(room.id, freshState.gameState);
        }
      } catch (err) {
        console.error('Failed to sync game state:', err);
      }

      // Update room status separately so it runs even if gameState write fails
      try {
        await updateRoomStatus(room.id, 'playing');
      } catch (err) {
        console.error('Failed to sync room status:', err);
      }

      onGameStart?.();
    }
  };

  const copyInviteCode = () => {
    if (room?.inviteCode) {
      navigator.clipboard.writeText(room.inviteCode);
      setCopied(true);
      playSound('success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const players = gameState ? Object.values(gameState.players) : [];

  // Player colors for display
  const playerColors = [
    '#44D62C', '#FF4444', '#4488FF', '#FFD700', '#FF69B4', '#FF8C00'
  ];

  if (room) {
    // Show room lobby
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Gamepad2 className="w-8 h-8 text-[#44D62C]" />
              <h1 className="text-3xl font-bold text-[#44D62C]" style={{ textShadow: '0 0 20px rgba(68,214,44,0.5)' }}>
                CORPORATE MONOPOLY
              </h1>
            </div>
            <p className="text-gray-400">Empire Edition</p>
          </div>

          {/* Room Info Card */}
          <div className="bg-gray-900/80 border border-[#44D62C]/30 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">{room.name}</h2>
                <p className="text-sm text-gray-400">
                  {isHost ? 'You are the host' : `Host: ${room.hostId}`}
                </p>
              </div>
              
              {room.inviteCode && (
                <div className="flex items-center gap-2">
                  <div className="bg-black/50 px-4 py-2 rounded-lg font-mono text-[#44D62C]">
                    {room.inviteCode}
                  </div>
                  <button
                    onClick={copyInviteCode}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Copy invite code"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Player List */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Players ({players.length}/6)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-3 bg-black/30 px-4 py-3 rounded-lg border border-gray-700/50"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: playerColors[index] || '#666' }}
                    >
                      <span className="text-sm font-bold text-black">
                        {player.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {player.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {player.id === room.hostId ? '👑 Host' : 'Player'}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: Math.max(0, 6 - players.length) }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="flex items-center gap-3 bg-black/20 px-4 py-3 rounded-lg border border-dashed border-gray-700"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <Users className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-600">Empty slot</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Settings */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-black/30 px-4 py-3 rounded-lg">
                <p className="text-xs text-gray-500">Starting Balance</p>
                <p className="text-lg font-bold text-[#44D62C]">
                  ${room.settings.startingBalance}
                </p>
              </div>
              <div className="bg-black/30 px-4 py-3 rounded-lg">
                <p className="text-xs text-gray-500">Salary</p>
                <p className="text-lg font-bold text-[#44D62C]">
                  ${room.settings.salaryAmount}
                </p>
              </div>
              <div className="bg-black/30 px-4 py-3 rounded-lg">
                <p className="text-xs text-gray-500">Powers</p>
                <p className="text-lg font-bold text-[#44D62C]">
                  {room.settings.powersEnabled ? 'On' : 'Off'}
                </p>
              </div>
              <div className="bg-black/30 px-4 py-3 rounded-lg">
                <p className="text-xs text-gray-500">Trading</p>
                <p className="text-lg font-bold text-[#44D62C]">
                  {room.settings.tradingEnabled ? 'On' : 'Off'}
                </p>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              {isHost ? (
                <button
                  onClick={handleStartGame}
                  disabled={!canStartGame}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#44D62C] hover:bg-[#3bc428] disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  <Play className="w-5 h-5" />
                  Start Game
                </button>
              ) : (
                <div className="flex-1 text-center py-3 text-gray-400">
                  Waiting for host to start the game...
                </div>
              )}
              
              <button
                onClick={() => {
                  playSound('click');
                  // Leave room logic
                }}
                className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 rounded-lg transition-colors"
              >
                Leave
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center text-gray-500 text-sm">
            <p>Share the invite code with friends to join your game</p>
          </div>
        </div>
      </div>
    );
  }

  // Show initial lobby (create/join)
  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gamepad2 className="w-12 h-12 text-[#44D62C]" />
          </div>
          <h1 className="text-4xl font-bold text-[#44D62C] mb-2" style={{ textShadow: '0 0 30px rgba(68,214,44,0.5)' }}>
            CORPORATE MONOPOLY
          </h1>
          <p className="text-gray-400">Empire Edition</p>
        </div>

        {/* Toggle between create and join */}
        <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
          <button
            onClick={() => setShowCreateForm(true)}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              showCreateForm
                ? 'bg-[#44D62C] text-black font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Create Room
          </button>
          <button
            onClick={() => setShowCreateForm(false)}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${
              !showCreateForm
                ? 'bg-[#44D62C] text-black font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Join Room
          </button>
        </div>

        {/* Form */}
        <div className="bg-gray-900/80 border border-[#44D62C]/20 rounded-xl p-6">
          {showCreateForm ? (
            <form onSubmit={handleCreateRoom}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="My Gaming Room"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#44D62C] transition-colors"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Player1"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#44D62C] transition-colors"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#44D62C] hover:bg-[#3bc428] text-black font-bold py-3 px-6 rounded-lg transition-all duration-200"
              >
                <Sparkles className="w-5 h-5" />
                Create Room
              </button>
            </form>
          ) : (
            <form onSubmit={handleJoinRoom}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Invite Code
                </label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="ABC123"
                  maxLength={6}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#44D62C] transition-colors font-mono uppercase tracking-wider text-center text-xl"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Player1"
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#44D62C] transition-colors"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={joining}
                className="w-full flex items-center justify-center gap-2 bg-[#44D62C] hover:bg-[#3bc428] disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-3 px-6 rounded-lg transition-all duration-200"
              >
                <Users className="w-5 h-5" />
                {joining ? 'Joining...' : 'Join Room'}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-xs">
          <p>2-6 players • Classic Monopoly rules • Corporate powers</p>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;