/**
 * Monopoly Game Store
 * 
 * Zustand store for managing Monopoly game state with Firebase sync
 */

import { create } from 'zustand';
import type {
  GameState,
  Player,
  Property,
  Room,
  RoomSettings,
  DiceResult,
  GameEvent,
  GamePhase,
  TurnPhase,
  Card,
} from '../types';
import { PROPERTIES, BOARD_SPACES, MARKET_EVENT_CARDS, CORPORATE_ACTION_CARDS } from '../data/board';
import { CORPORATE_POWERS, DEFAULT_ROOM_SETTINGS } from '../types';

// ============================================================================
// Initial State Factories
// ============================================================================

const createInitialGameState = (roomId: string, players: Player[]): GameState => ({
  id: roomId,
  phase: 'lobby',
  currentPlayerIndex: 0,
  turnPhase: 'rolling',
  players: players.reduce((acc, player) => {
    acc[player.id] = player;
    return acc;
  }, {} as Record<string, Player>),
  properties: PROPERTIES.reduce((acc, prop) => {
    acc[prop.id] = { ...prop };
    return acc;
  }, {} as Record<string, Property>),
  board: BOARD_SPACES,
  dice: null,
  consecutiveDoubles: 0,
  marketCrashActive: false,
  marketCrashPlayer: null,
  events: [],
  turnStartTime: Date.now(),
  winnerId: null,
  doublesExtraRoll: false,
});

const createPlayer = (
  id: string,
  name: string,
  color: string,
  startingBalance: number
): Player => {
  const power = CORPORATE_POWERS[Math.floor(Math.random() * CORPORATE_POWERS.length)];
  return {
    id,
    name,
    balance: startingBalance,
    position: 0,
    properties: [],
    inJail: false,
    jailTurns: 0,
    isBankrupt: false,
    color,
    power,
    powerUsed: false,
    powerCooldown: 0,
  };
};

// ============================================================================
// Player Colors
// ============================================================================

const PLAYER_COLORS = [
  '#44D62C', // Razer Green
  '#FF4444', // Red
  '#4488FF', // Blue
  '#FFD700', // Gold
  '#FF69B4', // Pink
  '#FF8C00', // Orange
];

// ============================================================================
// Store State Interface
// ============================================================================

interface MonopolyStore {
  // Room state
  room: Room | null;
  currentUserId: string | null;
  
  // Game state
  gameState: GameState | null;
  
  // UI state
  selectedProperty: string | null;
  showTradeModal: boolean;
  showPowerModal: boolean;
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;
  
  // Card decks
  marketEventDeck: Card[];
  corporateActionDeck: Card[];
  
  // Actions - Room
  createRoom: (name: string, settings?: Partial<RoomSettings>) => Room;
  joinRoom: (roomId: string, playerName: string) => boolean;
  leaveRoom: () => void;
  setCurrentUser: (userId: string) => void;
  startGame: () => boolean;
  
  // Actions - Game
  rollDice: () => DiceResult;
  movePlayer: (playerId: string, spaces: number) => void;
  buyProperty: (playerId: string, propertyId: string) => boolean;
  upgradeProperty: (playerId: string, propertyId: string) => boolean;
  payRent: (tenantId: string, landlordId: string, amount: number) => void;
  endTurn: () => void;
  goToJail: (playerId: string) => void;
  payJailFine: (playerId: string) => boolean;
  usePower: (playerId: string) => boolean;
  
  // Actions - Cards
  drawMarketEvent: (playerId: string) => Card | null;
  drawCorporateAction: (playerId: string) => Card | null;
  
  // Actions - UI
  setSelectedProperty: (propertyId: string | null) => void;
  setShowTradeModal: (show: boolean) => void;
  setShowPowerModal: (show: boolean) => void;
  setNotification: (notification: { message: string; type: 'success' | 'error' | 'info' } | null) => void;
  
  // Actions - Firebase sync
  syncFromFirebase: (room: Room, gameState: GameState) => void;
  
  // Getters
  getCurrentPlayer: () => Player | null;
  getPlayerAtPosition: (position: number) => Player[];
  getPropertyOwner: (propertyId: string) => Player | null;
  getActivePlayers: () => Player[];

  // Internal helpers
  addEvent: (type: GameEvent['type'], playerId: string, description: string) => void;
  bankruptPlayer: (playerId: string, creditorId?: string) => void;
}

// ============================================================================
// Create Store
// ============================================================================

export const useMonopolyStore = create<MonopolyStore>((set, get) => ({
  // Initial state
  room: null,
  currentUserId: null,
  gameState: null,
  selectedProperty: null,
  showTradeModal: false,
  showPowerModal: false,
  notification: null,
  marketEventDeck: [...MARKET_EVENT_CARDS],
  corporateActionDeck: [...CORPORATE_ACTION_CARDS],

  // Room Actions
  createRoom: (name, settings = {}) => {
    const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const finalSettings = { ...DEFAULT_ROOM_SETTINGS, ...settings };
    
    const room: Room = {
      id: roomId,
      name,
      hostId: get().currentUserId || 'guest',
      status: 'waiting',
      maxPlayers: 6,
      minPlayers: 2,
      createdAt: Date.now(),
      settings: finalSettings,
      inviteCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
    };

    set({ 
      room,
      gameState: createInitialGameState(roomId, []),
    });

    return room;
  },

  joinRoom: (roomId, playerName) => {
    const state = get();
    
    // If no room exists, create a basic room structure for local play
    if (!state.room) {
      const room: Room = {
        id: roomId,
        name: 'Room ' + roomId.slice(-4),
        hostId: 'host',
        status: 'waiting',
        maxPlayers: 6,
        minPlayers: 2,
        createdAt: Date.now(),
        settings: DEFAULT_ROOM_SETTINGS,
      };
      
      set({ room });
    }
    
    // Initialize game state if not exists
    if (!state.gameState) {
      set({
        gameState: createInitialGameState(roomId, []),
      });
    }
    
    const currentState = get();
    const playerCount = Object.keys(currentState.gameState!.players).length;
    
    if (playerCount >= (currentState.room?.maxPlayers || 6)) return false;

    const playerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const playerIndex = playerCount;
    const color = PLAYER_COLORS[playerIndex % PLAYER_COLORS.length];
    const startingBalance = currentState.room?.settings.startingBalance || DEFAULT_ROOM_SETTINGS.startingBalance;

    const player = createPlayer(playerId, playerName, color, startingBalance);

    set((state) => ({
      currentUserId: playerId,
      gameState: {
        ...state.gameState!,
        players: {
          ...state.gameState!.players,
          [playerId]: player,
        },
      },
    }));

    return true;
  },

  leaveRoom: () => {
    set({
      room: null,
      gameState: null,
      currentUserId: null,
      selectedProperty: null,
    });
  },

  setCurrentUser: (userId) => {
    set({ currentUserId: userId });
  },

  startGame: () => {
    const state = get();
    if (!state.gameState || !state.room) return false;

    const playerCount = Object.keys(state.gameState.players).length;
    if (playerCount < 2) return false;

    // Shuffle card decks
    const shuffledMarket = [...MARKET_EVENT_CARDS].sort(() => Math.random() - 0.5);
    const shuffledCorporate = [...CORPORATE_ACTION_CARDS].sort(() => Math.random() - 0.5);

    set({
      room: {
        ...state.room,
        status: 'playing',
        startedAt: Date.now(),
      },
      gameState: {
        ...state.gameState,
        phase: 'playing',
        currentPlayerIndex: Math.floor(Math.random() * playerCount),
        turnStartTime: Date.now(),
      },
      marketEventDeck: shuffledMarket,
      corporateActionDeck: shuffledCorporate,
    });

    // Add game start event
    get().addEvent('game_start', state.gameState.players[Object.keys(state.gameState.players)[0]]?.id || '', 'Game started!');

    return true;
  },

  // Game Actions
  rollDice: () => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const isDoubles = die1 === die2;
    
    const diceResult: DiceResult = {
      die1,
      die2,
      total: die1 + die2,
      isDoubles,
      timestamp: Date.now(),
    };

    set((state) => {
      if (!state.gameState) return {};
      
      const newConsecutiveDoubles = isDoubles 
        ? state.gameState.consecutiveDoubles + 1 
        : 0;

      return {
        gameState: {
          ...state.gameState!,
          dice: diceResult,
          consecutiveDoubles: newConsecutiveDoubles,
          turnPhase: 'action' as TurnPhase,
        },
      };
    });

    return diceResult;
  },

  movePlayer: (playerId, spaces) => {
    const state = get();
    if (!state.gameState) return;

    const player = state.gameState.players[playerId];
    if (!player) return;

    const oldPosition = player.position;
    let newPosition = (oldPosition + spaces) % 40;
    
    // Check if passed GO
    let passedGo = false;
    if (newPosition < oldPosition) {
      passedGo = true;
    }

    const updatedPlayer: Player = {
      ...player,
      position: newPosition,
      balance: passedGo 
        ? player.balance + (state.room?.settings.salaryAmount || DEFAULT_ROOM_SETTINGS.salaryAmount)
        : player.balance,
    };

    set((state) => ({
      gameState: {
        ...state.gameState!,
        players: {
          ...state.gameState!.players,
          [playerId]: updatedPlayer,
        },
      },
    }));

    // Add move event
    get().addEvent(
      'dice_roll',
      playerId,
      `${player.name} moved ${spaces} spaces to ${state.gameState?.board[newPosition]?.name || newPosition}`
    );
  },

  buyProperty: (playerId, propertyId) => {
    const state = get();
    if (!state.gameState) return false;

    const player = state.gameState.players[playerId];
    const property = state.gameState.properties[propertyId];

    if (!player || !property || property.owner !== null) return false;
    if (player.balance < property.price) return false;

    const updatedPlayer: Player = {
      ...player,
      balance: player.balance - property.price,
      properties: [...player.properties, propertyId],
    };

    const updatedProperty: Property = {
      ...property,
      owner: playerId,
    };

    set((state) => ({
      gameState: {
        ...state.gameState!,
        players: {
          ...state.gameState!.players,
          [playerId]: updatedPlayer,
        },
        properties: {
          ...state.gameState!.properties,
          [propertyId]: updatedProperty,
        },
      },
    }));

    // Add purchase event
    get().addEvent(
      'property_purchase',
      playerId,
      `${player.name} purchased ${property.name} for $${property.price}`
    );

    return true;
  },

  upgradeProperty: (playerId, propertyId) => {
    const state = get();
    if (!state.gameState) return false;

    const player = state.gameState.players[playerId];
    const property = state.gameState.properties[propertyId];

    if (!player || !property) return false;
    if (property.owner !== playerId) return false;
    if (property.upgrades >= 5) return false; // Max 5 (4 upgrades + HQ)
    if (player.balance < property.upgradeCost) return false;

    const updatedPlayer: Player = {
      ...player,
      balance: player.balance - property.upgradeCost,
    };

    const updatedProperty: Property = {
      ...property,
      upgrades: property.upgrades + 1,
    };

    set((state) => ({
      gameState: {
        ...state.gameState!,
        players: {
          ...state.gameState!.players,
          [playerId]: updatedPlayer,
        },
        properties: {
          ...state.gameState!.properties,
          [propertyId]: updatedProperty,
        },
      },
    }));

    // Add upgrade event
    const upgradeLabel = property.upgrades + 1 >= 5 ? 'HQ' : `Upgrade ${property.upgrades + 1}`;
    get().addEvent(
      'upgrade',
      playerId,
      `${player.name} built ${upgradeLabel} on ${property.name}`
    );

    return true;
  },

  payRent: (tenantId, landlordId, amount) => {
    const state = get();
    if (!state.gameState) return;

    const tenant = state.gameState.players[tenantId];
    const landlord = state.gameState.players[landlordId];

    if (!tenant || !landlord) return;

    // Check for market crash
    const finalAmount = state.gameState.marketCrashActive ? Math.floor(amount / 2) : amount;

    // Check if tenant can pay
    if (tenant.balance < finalAmount) {
      // Bankruptcy
      get().bankruptPlayer(tenantId, landlordId);
      return;
    }

    const updatedTenant: Player = {
      ...tenant,
      balance: tenant.balance - finalAmount,
    };

    const updatedLandlord: Player = {
      ...landlord,
      balance: landlord.balance + finalAmount,
    };

    set((state) => ({
      gameState: {
        ...state.gameState!,
        players: {
          ...state.gameState!.players,
          [tenantId]: updatedTenant,
          [landlordId]: updatedLandlord,
        },
      },
    }));

    // Add rent event
    get().addEvent(
      'rent_paid',
      tenantId,
      `${tenant.name} paid $${finalAmount} rent to ${landlord.name}`
    );
  },

  endTurn: () => {
    const state = get();
    if (!state.gameState) return;

    const players = Object.values(state.gameState.players).filter(p => !p.isBankrupt);
    const playerCount = players.length;
    
    if (playerCount < 2) {
      // Game over
      const winner = players[0];
      set({
        room: state.room ? { ...state.room, status: 'finished', finishedAt: Date.now() } : null,
        gameState: {
          ...state.gameState,
          phase: 'finished',
          winnerId: winner?.id || null,
        },
      });
      get().addEvent('game_end', winner?.id || '', `${winner?.name} wins the game!`);
      return;
    }

    const nextIndex = (state.gameState.currentPlayerIndex + 1) % playerCount;

    set({
      gameState: {
        ...state.gameState,
        currentPlayerIndex: nextIndex,
        turnPhase: 'rolling',
        dice: null,
        consecutiveDoubles: 0,
        doublesExtraRoll: false,
        turnStartTime: Date.now(),
      },
    });
  },

  goToJail: (playerId) => {
    const state = get();
    if (!state.gameState) return;

    const player = state.gameState.players[playerId];
    if (!player) return;

    const updatedPlayer: Player = {
      ...player,
      position: 10, // Jail position
      inJail: true,
      jailTurns: 0,
    };

    set((state) => ({
      gameState: {
        ...state.gameState!,
        players: {
          ...state.gameState!.players,
          [playerId]: updatedPlayer,
        },
      },
    }));

    get().addEvent('jail', playerId, `${player.name} was sent to Headquarters!`);
  },

  payJailFine: (playerId) => {
    const state = get();
    if (!state.gameState) return false;

    const player = state.gameState.players[playerId];
    if (!player || !player.inJail) return false;

    const fine = state.room?.settings.jailFines || DEFAULT_ROOM_SETTINGS.jailFines;
    if (player.balance < fine) return false;

    const updatedPlayer: Player = {
      ...player,
      balance: player.balance - fine,
      inJail: false,
      jailTurns: 0,
    };

    set((state) => ({
      gameState: {
        ...state.gameState!,
        players: {
          ...state.gameState!.players,
          [playerId]: updatedPlayer,
        },
      },
    }));

    return true;
  },

  usePower: (playerId) => {
    const state = get();
    if (!state.gameState) return false;

    const player = state.gameState.players[playerId];
    if (!player || !player.power) return false;
    if (player.powerUsed) return false;

    const now = Date.now();
    if (now < player.powerCooldown) return false;

    const updatedPlayer: Player = {
      ...player,
      powerUsed: true,
      powerCooldown: now + player.power.cooldown,
    };

    set((state) => ({
      gameState: {
        ...state.gameState!,
        players: {
          ...state.gameState!.players,
          [playerId]: updatedPlayer,
        },
      },
    }));

    get().addEvent('power_used', playerId, `${player.name} used ${player.power?.name}!`);

    return true;
  },

  // Card Actions
  drawMarketEvent: (playerId) => {
    const state = get();
    if (state.marketEventDeck.length === 0) {
      // Reshuffle discard pile
      set({ marketEventDeck: [...MARKET_EVENT_CARDS].sort(() => Math.random() - 0.5) });
    }

    const card = state.marketEventDeck[0];
    if (!card) return null;

    set((state) => ({
      marketEventDeck: state.marketEventDeck.slice(1),
    }));

    get().addEvent('card_draw', playerId, `${card.title}: ${card.description}`);

    return card;
  },

  drawCorporateAction: (playerId) => {
    const state = get();
    if (state.corporateActionDeck.length === 0) {
      set({ corporateActionDeck: [...CORPORATE_ACTION_CARDS].sort(() => Math.random() - 0.5) });
    }

    const card = state.corporateActionDeck[0];
    if (!card) return null;

    set((state) => ({
      corporateActionDeck: state.corporateActionDeck.slice(1),
    }));

    get().addEvent('card_draw', playerId, `${card.title}: ${card.description}`);

    return card;
  },

  // UI Actions
  setSelectedProperty: (propertyId) => {
    set({ selectedProperty: propertyId });
  },

  setShowTradeModal: (show) => {
    set({ showTradeModal: show });
  },

  setShowPowerModal: (show) => {
    set({ showPowerModal: show });
  },

  setNotification: (notification) => {
    set({ notification });
    if (notification) {
      setTimeout(() => set({ notification: null }), 3000);
    }
  },

  // Firebase Sync
  syncFromFirebase: (room, gameState) => {
    set({ room, gameState });
  },

  // Getters
  getCurrentPlayer: () => {
    const state = get();
    if (!state.gameState) return null;
    const playerIds = Object.keys(state.gameState.players);
    const currentPlayerId = playerIds[state.gameState.currentPlayerIndex];
    return state.gameState.players[currentPlayerId] || null;
  },

  getPlayerAtPosition: (position) => {
    const state = get();
    if (!state.gameState) return [];
    return Object.values(state.gameState.players).filter(p => p.position === position && !p.isBankrupt);
  },

  getPropertyOwner: (propertyId) => {
    const state = get();
    if (!state.gameState) return null;
    const property = state.gameState.properties[propertyId];
    if (!property || !property.owner) return null;
    return state.gameState.players[property.owner] || null;
  },

  getActivePlayers: () => {
    const state = get();
    if (!state.gameState) return [];
    return Object.values(state.gameState.players).filter(p => !p.isBankrupt);
  },

  // Helper - Add event (internal)
  addEvent: (type, playerId, description) => {
    const state = get();
    if (!state.gameState) return;

    const event: GameEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      type,
      playerId,
      description,
      timestamp: Date.now(),
    };

    set((state) => ({
      gameState: {
        ...state.gameState!,
        events: [event, ...state.gameState!.events].slice(0, 50), // Keep last 50 events
      },
    }));
  },

  // Helper - Bankrupt player (internal)
  bankruptPlayer: (playerId, creditorId?) => {
    const state = get();
    if (!state.gameState) return;

    const player = state.gameState.players[playerId];
    if (!player) return;

    // Transfer properties to creditor or back to bank
    player.properties.forEach((propId) => {
      const property = state.gameState?.properties[propId];
      if (property) {
        set((state) => ({
          gameState: {
            ...state.gameState!,
            properties: {
              ...state.gameState!.properties,
              [propId]: {
                ...property,
                owner: creditorId || null,
                upgrades: 0, // Reset upgrades on bankruptcy
              },
            },
          },
        }));
      }
    });

    set((state) => ({
      gameState: {
        ...state.gameState!,
        players: {
          ...state.gameState!.players,
          [playerId]: {
            ...player,
            isBankrupt: true,
            balance: 0,
            properties: [],
          },
        },
      },
    }));

    get().addEvent('bankruptcy', playerId, `${player.name} went bankrupt!`);
  },
}));

// ============================================================================
// Exports
// ============================================================================

export default useMonopolyStore;