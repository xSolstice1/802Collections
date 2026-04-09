/**
 * Firebase Monopoly Service
 * 
 * Handles Realtime Database operations for the Monopoly game
 * including room management, game state sync, and multiplayer features
 */

import {
  ref,
  set,
  push,
  onValue,
  off,
  update,
  remove,
  get,
  DataSnapshot,
  Unsubscribe,
} from 'firebase/database';
import { rtdb } from '@services/firebase';
import type {
  Room,
  GameState,
  Player,
  Property,
  RoomSettings,
} from '../types';

// ============================================================================
// Database References
// ============================================================================

const ROOMS_REF = ref(rtdb, 'rooms');
export const getRoomRef = (roomId: string) => ref(rtdb, `rooms/${roomId}`);
export const getRoomGameRef = (roomId: string) => ref(rtdb, `rooms/${roomId}/gameState`);
export const getRoomPlayersRef = (roomId: string) => ref(rtdb, `rooms/${roomId}/players`);

// ============================================================================
// Room Management
// ============================================================================

/**
 * Create a new game room
 */
export const createRoom = async (
  name: string,
  hostId: string,
  settings: Partial<RoomSettings> = {}
): Promise<Room> => {
  const roomRef = push(ROOMS_REF);
  const roomId = roomRef.key!;

  const room: Room = {
    id: roomId,
    name,
    hostId,
    status: 'waiting',
    maxPlayers: 6,
    minPlayers: 2,
    createdAt: Date.now(),
    settings: {
      startingBalance: settings.startingBalance ?? 1500,
      salaryAmount: settings.salaryAmount ?? 200,
      luxuryTaxAmount: settings.luxuryTaxAmount ?? 100,
      incomeTaxAmount: settings.incomeTaxAmount ?? 200,
      jailFines: settings.jailFines ?? 50,
      turnTimer: settings.turnTimer ?? 0,
      auctionEnabled: settings.auctionEnabled ?? true,
      tradingEnabled: settings.tradingEnabled ?? true,
      powersEnabled: settings.powersEnabled ?? true,
    },
    inviteCode: generateInviteCode(),
  };

  await set(roomRef, {
    room: {
      id: room.id,
      name: room.name,
      hostId: room.hostId,
      status: room.status,
      maxPlayers: room.maxPlayers,
      minPlayers: room.minPlayers,
      createdAt: room.createdAt,
      settings: room.settings,
      inviteCode: room.inviteCode,
    },
    gameState: createInitialGameState(roomId),
    players: {},
  });

  return room;
};

/**
 * Get a room by ID
 */
export const getRoom = async (roomId: string): Promise<Room | null> => {
  const snapshot = await get(getRoomRef(roomId));
  if (!snapshot.exists()) return null;
  return snapshot.val().room as Room;
};

/**
 * Get a room by invite code (invite code is used as the room ID)
 */
export const getRoomByInviteCode = async (inviteCode: string): Promise<Room | null> => {
  return getRoom(inviteCode);
};

/**
 * Update room status
 */
export const updateRoomStatus = async (
  roomId: string,
  status: Room['status']
): Promise<void> => {
  await update(getRoomRef(roomId), {
    'room.status': status,
    ...(status === 'playing' ? { 'room.startedAt': Date.now() } : {}),
    ...(status === 'finished' ? { 'room.finishedAt': Date.now() } : {}),
  });
};

/**
 * Save a room to Firebase (used to persist locally-created rooms)
 */
export const saveRoom = async (room: Room): Promise<void> => {
  await set(getRoomRef(room.id), { room });
};

/**
 * Delete a room
 */
export const deleteRoom = async (roomId: string): Promise<void> => {
  await remove(getRoomRef(roomId));
};

// ============================================================================
// Player Management
// ============================================================================

/**
 * Add a player to a room
 */
export const addPlayerToRoom = async (
  roomId: string,
  player: Omit<Player, 'id'>
): Promise<Player> => {
  const playerRef = push(getRoomPlayersRef(roomId));
  const playerId = playerRef.key!;

  const newPlayer: Player = {
    ...player,
    id: playerId,
  };

  await set(playerRef, newPlayer);
  return newPlayer;
};

/**
 * Set a player in a room using an existing player ID
 */
export const setPlayerInRoom = async (
  roomId: string,
  player: Player
): Promise<void> => {
  await set(ref(rtdb, `rooms/${roomId}/players/${player.id}`), player);
};

/**
 * Update a player
 */
export const updatePlayer = async (
  roomId: string,
  playerId: string,
  updates: Partial<Player>
): Promise<void> => {
  await update(ref(rtdb, `rooms/${roomId}/players/${playerId}`), updates);
};

/**
 * Remove a player from a room
 */
export const removePlayerFromRoom = async (
  roomId: string,
  playerId: string
): Promise<void> => {
  await remove(ref(rtdb, `rooms/${roomId}/players/${playerId}`));
};

/**
 * Get all players in a room
 */
export const getRoomPlayers = async (roomId: string): Promise<Player[]> => {
  const snapshot = await get(getRoomPlayersRef(roomId));
  if (!snapshot.exists()) return [];
  return Object.values(snapshot.val()) as Player[];
};

// ============================================================================
// Game State Management
// ============================================================================

/**
 * Update game state
 */
export const updateGameState = async (
  roomId: string,
  gameState: Partial<GameState>
): Promise<void> => {
  await update(getRoomGameRef(roomId), gameState);
};

/**
 * Get current game state
 */
export const getGameState = async (roomId: string): Promise<GameState | null> => {
  const snapshot = await get(getRoomGameRef(roomId));
  if (!snapshot.exists()) return null;
  return snapshot.val() as GameState;
};

// ============================================================================
// Real-time Listeners
// ============================================================================

/**
 * Subscribe to room updates
 */
export const subscribeToRoom = (
  roomId: string,
  callback: (room: Room | null) => void
): Unsubscribe => {
  const roomRef = ref(rtdb, `rooms/${roomId}/room`);
  onValue(roomRef, (snapshot: DataSnapshot) => {
    callback(snapshot.val() as Room | null);
  });

  return () => off(roomRef);
};

/**
 * Subscribe to game state updates
 */
export const subscribeToGameState = (
  roomId: string,
  callback: (gameState: GameState | null) => void
): Unsubscribe => {
  const gameRef = getRoomGameRef(roomId);
  onValue(gameRef, (snapshot: DataSnapshot) => {
    callback(snapshot.val() as GameState | null);
  });

  return () => off(gameRef);
};

/**
 * Subscribe to player updates
 */
export const subscribeToPlayers = (
  roomId: string,
  callback: (players: Player[]) => void
): Unsubscribe => {
  const playersRef = getRoomPlayersRef(roomId);
  onValue(playersRef, (snapshot: DataSnapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }
    callback(Object.values(snapshot.val()) as Player[]);
  });

  return () => off(playersRef);
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate a unique invite code
 */
const generateInviteCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

/**
 * Create initial game state for a new room
 */
const createInitialGameState = (roomId: string): GameState => ({
  id: roomId,
  phase: 'lobby',
  currentPlayerIndex: 0,
  turnPhase: 'rolling',
  playerOrder: [],
  players: {},
  properties: {},
  board: [],
  dice: null,
  consecutiveDoubles: 0,
  marketCrashActive: false,
  marketCrashPlayer: null,
  events: [],
  turnStartTime: Date.now(),
  winnerId: null,
  doublesExtraRoll: false,
});

// ============================================================================
// Exports
// ============================================================================

export default {
  // Room
  createRoom,
  getRoom,
  getRoomByInviteCode,
  saveRoom,
  updateRoomStatus,
  deleteRoom,
  getRoomRef,
  
  // Player
  addPlayerToRoom,
  updatePlayer,
  removePlayerFromRoom,
  getRoomPlayers,
  
  // Game State
  updateGameState,
  getGameState,
  getRoomGameRef,
  
  // Subscriptions
  subscribeToRoom,
  subscribeToGameState,
  subscribeToPlayers,
};