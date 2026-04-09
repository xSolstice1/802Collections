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
  TurnPhase,
  Card,
  LandingResult,
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
  playerOrder: players.map(p => p.id),
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
  joinRoom: (roomId: string, playerName: string, existingRoom?: Room) => Player | null;
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
  syncPlayers: (players: Player[]) => void;
  
  // Getters
  getCurrentPlayer: () => Player | null;
  getPlayerAtPosition: (position: number) => Player[];
  getPropertyOwner: (propertyId: string) => Player | null;
  getActivePlayers: () => Player[];

  // Actions - New game logic
  calculateRent: (property: Property, diceRoll?: number) => number;
  processLanding: (playerId: string, diceTotal: number) => LandingResult;
  applyCardEffect: (playerId: string, card: Card) => string;
  rollDiceInJail: (playerId: string) => { freed: boolean; dice: DiceResult };

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
    // Use invite code as the room ID so guests can look it up directly
    const inviteCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    const finalSettings = { ...DEFAULT_ROOM_SETTINGS, ...settings };

    const room: Room = {
      id: inviteCode,
      name,
      hostId: get().currentUserId || 'guest',
      status: 'waiting',
      maxPlayers: 6,
      minPlayers: 2,
      createdAt: Date.now(),
      settings: finalSettings,
      inviteCode,
    };

    set({
      room,
      gameState: createInitialGameState(inviteCode, []),
    });

    return room;
  },

  joinRoom: (roomId, playerName, existingRoom?) => {
    const state = get();

    // If no room exists, use the provided room or create a basic room structure for local play
    if (!state.room) {
      const room: Room = existingRoom || {
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
    
    if (playerCount >= (currentState.room?.maxPlayers || 6)) return null;

    const playerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const playerIndex = playerCount;
    const color = PLAYER_COLORS[playerIndex % PLAYER_COLORS.length];
    const startingBalance = currentState.room?.settings.startingBalance || DEFAULT_ROOM_SETTINGS.startingBalance;

    const player = createPlayer(playerId, playerName, color, startingBalance);

    // Only claim host if room has placeholder hostId (i.e., creator before any player joined)
    const isFirstPlayer = playerCount === 0 && currentState.room?.hostId === 'guest';

    set((state) => ({
      currentUserId: playerId,
      room: isFirstPlayer && state.room ? { ...state.room, hostId: playerId } : state.room,
      gameState: {
        ...state.gameState!,
        players: {
          ...state.gameState!.players,
          [playerId]: player,
        },
        playerOrder: [...state.gameState!.playerOrder, playerId],
      },
    }));

    return player;
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
        playerOrder: Object.keys(state.gameState.players),
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

    if (!player || !property || property.owner) return false;
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
    if (property.type !== 'property') return false; // Can't upgrade railroads/utilities
    if (property.upgrades >= 5) return false; // Max: 4 houses + 1 hotel
    if (player.balance < property.upgradeCost) return false;

    // Must own all properties of the color group (monopoly required)
    const allOfColor = Object.values(state.gameState.properties).filter(
      p => p.color === property.color && p.type === 'property'
    );
    if (!allOfColor.every(p => p.owner === playerId)) return false;

    // Even building rule: can only build on property with fewest houses
    const minUpgrades = Math.min(...allOfColor.map(p => p.upgrades));
    if (property.upgrades > minUpgrades) return false;

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

    const level = property.upgrades + 1;
    const upgradeLabel = level >= 5 ? 'a Hotel' : `House ${level}`;
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

    const { playerOrder, players, currentPlayerIndex } = state.gameState;
    if (!playerOrder || playerOrder.length === 0) return;

    const activePlayers = playerOrder.filter(id => !players[id]?.isBankrupt);
    if (activePlayers.length < 2) {
      const winner = players[activePlayers[0]];
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

    let nextIndex = currentPlayerIndex;
    do {
      nextIndex = (nextIndex + 1) % playerOrder.length;
    } while (players[playerOrder[nextIndex]]?.isBankrupt);

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

  syncPlayers: (players) => {
    set((state) => {
      if (!state.gameState) return {};

      const synced = players.reduce((acc, p) => {
        // Firebase drops empty arrays, so ensure defaults
        acc[p.id] = { ...p, properties: p.properties || [] };
        return acc;
      }, {} as Record<string, Player>);

      // Preserve current user's local player if not yet in Firebase
      const myId = state.currentUserId;
      if (myId && !synced[myId] && state.gameState.players[myId]) {
        synced[myId] = state.gameState.players[myId];
      }

      return {
        gameState: {
          ...state.gameState,
          players: synced,
        },
      };
    });
  },

  // New game logic
  calculateRent: (property, diceRoll?) => {
    const state = get();
    if (!state.gameState || property.mortgaged) return 0;

    let rent = 0;

    if (property.type === 'railroad') {
      // $25, $50, $100, $200 for 1-4 railroads
      const owner = property.owner ? state.gameState.players[property.owner] : null;
      if (owner) {
        const railroadCount = (owner.properties || []).filter(
          (pid) => state.gameState?.properties[pid]?.type === 'railroad'
        ).length;
        rent = 25 * Math.pow(2, railroadCount - 1);
      }
    } else if (property.type === 'utility') {
      // 4x dice roll for 1 utility, 10x for 2
      const owner = property.owner ? state.gameState.players[property.owner] : null;
      if (owner) {
        const utilityCount = (owner.properties || []).filter(
          (pid) => state.gameState?.properties[pid]?.type === 'utility'
        ).length;
        rent = (diceRoll || 7) * (utilityCount === 2 ? 10 : 4);
      }
    } else {
      // Regular property — Monopoly-style rent multipliers
      if (property.upgrades > 0) {
        // Rent with houses/hotel (based on real Monopoly ratios)
        const multipliers = [1, 5, 15, 45, 80, 125];
        rent = Math.ceil(property.rent * multipliers[property.upgrades]);
      } else {
        rent = property.rent;
        // Monopoly bonus: owning all properties of a color doubles base rent
        if (property.owner) {
          const allOfColor = Object.values(state.gameState.properties).filter(
            p => p.color === property.color && p.type === 'property'
          );
          const allOwned = allOfColor.every(p => p.owner === property.owner);
          if (allOwned) {
            rent *= 2;
          }
        }
      }
    }

    if (state.gameState.marketCrashActive) {
      rent = Math.floor(rent / 2);
    }

    return rent;
  },

  processLanding: (playerId, diceTotal) => {
    const state = get();
    if (!state.gameState) return { type: 'nothing', message: '' };

    const player = state.gameState.players[playerId];
    if (!player) return { type: 'nothing', message: '' };
    const space = state.gameState.board[player.position];
    if (!space) return { type: 'nothing', message: `Landed on position ${player.position}` };

    switch (space.type) {
      case 'property':
      case 'railroad':
      case 'utility': {
        if (!space.propertyId) return { type: 'nothing', message: '' };
        const property = state.gameState.properties[space.propertyId];
        if (!property) return { type: 'nothing', message: '' };

        if (!property.owner) {
          return { type: 'unowned_property', message: `${space.name} is available for $${property.price}` };
        } else if (property.owner === playerId) {
          return { type: 'own_property', message: `You own ${space.name}` };
        } else if (!property.mortgaged) {
          const rent = get().calculateRent(property, diceTotal);
          const ownerName = state.gameState.players[property.owner]?.name || 'Unknown';
          get().payRent(playerId, property.owner, rent);
          return { type: 'rent', message: `Paid $${rent} rent to ${ownerName}` };
        }
        return { type: 'nothing', message: '' };
      }

      case 'tax': {
        const isIncomeTax = space.position === 4;
        const amount = isIncomeTax
          ? (state.room?.settings.incomeTaxAmount || 200)
          : (state.room?.settings.luxuryTaxAmount || 100);

        const updatedPlayer = { ...player, balance: player.balance - amount };
        if (updatedPlayer.balance < 0) {
          get().bankruptPlayer(playerId);
          return { type: 'tax', message: `Bankrupt from ${space.name}!` };
        }
        set((s) => ({
          gameState: s.gameState ? {
            ...s.gameState,
            players: { ...s.gameState.players, [playerId]: updatedPlayer },
          } : s.gameState,
        }));
        get().addEvent('rent_paid', playerId, `${player.name} paid $${amount} in taxes`);
        return { type: 'tax', message: `Paid $${amount} ${space.name}` };
      }

      case 'chance': {
        const card = get().drawMarketEvent(playerId);
        if (card) {
          const msg = get().applyCardEffect(playerId, card);
          return { type: 'card', message: msg, card };
        }
        return { type: 'nothing', message: '' };
      }

      case 'communityChest': {
        const card = get().drawCorporateAction(playerId);
        if (card) {
          const msg = get().applyCardEffect(playerId, card);
          return { type: 'card', message: msg, card };
        }
        return { type: 'nothing', message: '' };
      }

      case 'corner': {
        if (space.position === 30) {
          get().goToJail(playerId);
          return { type: 'jail', message: 'Sent to Headquarters!' };
        }
        return { type: 'nothing', message: `Landed on ${space.name}` };
      }

      default:
        return { type: 'nothing', message: '' };
    }
  },

  applyCardEffect: (playerId, card) => {
    const state = get();
    if (!state.gameState) return card.description;

    const player = state.gameState.players[playerId];
    if (!player) return card.description;

    const effect = card.effect;

    switch (effect.type) {
      case 'collect': {
        const updated = { ...player, balance: player.balance + (effect.value || 0) };
        set((s) => ({
          gameState: s.gameState ? {
            ...s.gameState,
            players: { ...s.gameState.players, [playerId]: updated },
          } : s.gameState,
        }));
        return `${card.title}: Collected $${effect.value}`;
      }

      case 'pay': {
        const amount = effect.value || 0;
        const updated = { ...player, balance: player.balance - amount };
        if (updated.balance < 0) {
          get().bankruptPlayer(playerId);
          return `${card.title}: Bankrupt!`;
        }
        set((s) => ({
          gameState: s.gameState ? {
            ...s.gameState,
            players: { ...s.gameState.players, [playerId]: updated },
          } : s.gameState,
        }));
        return `${card.title}: Paid $${amount}`;
      }

      case 'moveTo': {
        const targetPos = effect.value || 0;
        const passedGo = targetPos <= player.position && targetPos === 0;
        const salary = passedGo ? (state.room?.settings.salaryAmount || 200) : 0;
        const updated = { ...player, position: targetPos, balance: player.balance + salary };
        set((s) => ({
          gameState: s.gameState ? {
            ...s.gameState,
            players: { ...s.gameState.players, [playerId]: updated },
          } : s.gameState,
        }));
        return `${card.title}: Moved to ${state.gameState.board[targetPos]?.name || 'GO'}${salary > 0 ? ` and collected $${salary}` : ''}`;
      }

      case 'jail': {
        get().goToJail(playerId);
        return `${card.title}: Sent to Headquarters!`;
      }

      case 'getOutOfJail': {
        if (player.inJail) {
          const updated = { ...player, inJail: false, jailTurns: 0 };
          set((s) => ({
            gameState: s.gameState ? {
              ...s.gameState,
              players: { ...s.gameState.players, [playerId]: updated },
            } : s.gameState,
          }));
        }
        return `${card.title}: Get Out of HQ Free!`;
      }

      case 'steal': {
        const amount = effect.value || 0;
        const others = Object.values(state.gameState.players).filter(p => p.id !== playerId && !p.isBankrupt);
        const richest = others.sort((a, b) => b.balance - a.balance)[0];
        if (richest) {
          const stealAmount = Math.min(amount, richest.balance);
          const updatedPlayer = { ...player, balance: player.balance + stealAmount };
          const updatedRichest = { ...richest, balance: richest.balance - stealAmount };
          set((s) => ({
            gameState: s.gameState ? {
              ...s.gameState,
              players: {
                ...s.gameState.players,
                [playerId]: updatedPlayer,
                [richest.id]: updatedRichest,
              },
            } : s.gameState,
          }));
          return `${card.title}: Stole $${stealAmount} from ${richest.name}`;
        }
        return `${card.title}: No one to steal from!`;
      }

      case 'repair': {
        let totalCost = 0;
        (player.properties || []).forEach((propId) => {
          const prop = state.gameState?.properties[propId];
          if (prop && prop.upgrades > 0) {
            if (prop.upgrades >= 5) {
              totalCost += card.type === 'marketEvent' ? 100 : 80;
            } else {
              totalCost += prop.upgrades * (card.type === 'marketEvent' ? 50 : 40);
            }
          }
        });
        if (totalCost > 0) {
          const updated = { ...player, balance: player.balance - totalCost };
          if (updated.balance < 0) {
            get().bankruptPlayer(playerId);
            return `${card.title}: Bankrupt from repairs!`;
          }
          set((s) => ({
            gameState: s.gameState ? {
              ...s.gameState,
              players: { ...s.gameState.players, [playerId]: updated },
            } : s.gameState,
          }));
        }
        return `${card.title}: Paid $${totalCost} in repairs`;
      }

      default:
        return card.description;
    }
  },

  rollDiceInJail: (playerId) => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const isDoubles = die1 === die2;
    const diceResult: DiceResult = { die1, die2, total: die1 + die2, isDoubles, timestamp: Date.now() };

    const state = get();
    if (!state.gameState) return { freed: false, dice: diceResult };
    const player = state.gameState.players[playerId];
    if (!player) return { freed: false, dice: diceResult };

    if (isDoubles) {
      // Freed! Move the player
      const updated = { ...player, inJail: false, jailTurns: 0 };
      set((s) => ({
        gameState: s.gameState ? {
          ...s.gameState,
          dice: diceResult,
          players: { ...s.gameState.players, [playerId]: updated },
        } : s.gameState,
      }));
      get().movePlayer(playerId, diceResult.total);
      return { freed: true, dice: diceResult };
    } else {
      const newJailTurns = player.jailTurns + 1;
      if (newJailTurns >= 3) {
        // Forced to pay fine after 3 failed attempts
        const fine = state.room?.settings.jailFines || 50;
        const updated = { ...player, inJail: false, jailTurns: 0, balance: player.balance - fine };
        if (updated.balance < 0) {
          get().bankruptPlayer(playerId);
          set((s) => ({ gameState: s.gameState ? { ...s.gameState, dice: diceResult } : s.gameState }));
          return { freed: false, dice: diceResult };
        }
        set((s) => ({
          gameState: s.gameState ? {
            ...s.gameState,
            dice: diceResult,
            players: { ...s.gameState.players, [playerId]: updated },
          } : s.gameState,
        }));
        get().addEvent('jail', playerId, `${player.name} paid $${fine} fine after 3 failed attempts`);
        return { freed: true, dice: diceResult };
      } else {
        const updated = { ...player, jailTurns: newJailTurns };
        set((s) => ({
          gameState: s.gameState ? {
            ...s.gameState,
            dice: diceResult,
            players: { ...s.gameState.players, [playerId]: updated },
          } : s.gameState,
        }));
        return { freed: false, dice: diceResult };
      }
    }
  },

  // Getters
  getCurrentPlayer: () => {
    const state = get();
    if (!state.gameState || !state.gameState.playerOrder) return null;
    const currentPlayerId = state.gameState.playerOrder[state.gameState.currentPlayerIndex];
    return currentPlayerId ? state.gameState.players[currentPlayerId] || null : null;
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