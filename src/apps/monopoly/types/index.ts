/**
 * Monopoly Game Types
 * 
 * Complete type definitions for the Razer-themed Monopoly game
 */

// ============================================================================
// Property Types
// ============================================================================

export type PropertyTier = 'cheap' | 'mid' | 'expensive';
export type PropertyType = 'property' | 'railroad' | 'utility';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  tier: PropertyTier;
  price: number;
  rent: number;
  rentWithHq: number;
  upgradeCost: number;
  position: number; // Position on the board (0-39)
  color: string;
  owner: string | null; // Player ID
  upgrades: number; // 0-4 upgrades, 5 = HQ
  mortgaged: boolean;
}

// ============================================================================
// Player Types
// ============================================================================

export interface Player {
  id: string;
  name: string;
  avatar?: string;
  balance: number;
  position: number;
  properties: string[]; // Property IDs
  inJail: boolean;
  jailTurns: number;
  isBankrupt: boolean;
  color: string;
  power: CorporatePower | null;
  powerUsed: boolean;
  powerCooldown: number; // Timestamp when power is available again
}

// ============================================================================
// Corporate Powers (Unique Twist)
// ============================================================================

export type PowerType = 
  | 'hostileTakeover' 
  | 'marketCrash' 
  | 'monopolyBoost' 
  | 'corporateSpy'
  | 'ventureCapital'
  | 'taxEvasion';

export interface CorporatePower {
  type: PowerType;
  name: string;
  description: string;
  cooldown: number; // milliseconds
  icon: string;
}

export const CORPORATE_POWERS: CorporatePower[] = [
  {
    type: 'hostileTakeover',
    name: 'Hostile Takeover',
    description: 'Buy any unowned property without auction',
    cooldown: 60000, // 60 seconds
    icon: '🏢',
  },
  {
    type: 'marketCrash',
    name: 'Market Crash',
    description: 'Reduce all rents by 50% for one round',
    cooldown: 90000,
    icon: '📉',
  },
  {
    type: 'monopolyBoost',
    name: 'Monopoly Boost',
    description: 'Double your rent for one turn',
    cooldown: 45000,
    icon: '🚀',
  },
  {
    type: 'corporateSpy',
    name: 'Corporate Espionage',
    description: 'Steal $100 from another player',
    cooldown: 120000,
    icon: '🕵️',
  },
  {
    type: 'ventureCapital',
    name: 'Venture Capital',
    description: 'Receive $200 from the bank',
    cooldown: 90000,
    icon: '💰',
  },
  {
    type: 'taxEvasion',
    name: 'Tax Loophole',
    description: 'Skip next tax/fee payment',
    cooldown: 120000,
    icon: '📋',
  },
];

// ============================================================================
// Card Types
// ============================================================================

export type CardType = 'marketEvent' | 'corporateAction';

export interface Card {
  id: string;
  type: CardType;
  title: string;
  description: string;
  effect: CardEffect;
  value?: number;
}

export type CardEffectType = 
  | 'collect' 
  | 'pay' 
  | 'moveTo' 
  | 'moveToNearest'
  | 'jail' 
  | 'getOutOfJail' 
  | 'upgrade' 
  | 'steal'
  | 'repair';

export interface CardEffect {
  type: CardEffectType;
  value?: number;
  target?: string;
  description?: string;
}

// ============================================================================
// Board Space Types
// ============================================================================

export type SpaceType = 
  | 'property' 
  | 'railroad' 
  | 'utility'
  | 'tax' 
  | 'corner' 
  | 'chance' 
  | 'communityChest';

export interface BoardSpace {
  position: number;
  name: string;
  type: SpaceType;
  propertyId?: string; // Link to property if applicable
}

// ============================================================================
// Game State Types
// ============================================================================

export type GamePhase = 'lobby' | 'playing' | 'finished';
export type TurnPhase = 'rolling' | 'action' | 'end';

export interface DiceResult {
  die1: number;
  die2: number;
  total: number;
  isDoubles: boolean;
  timestamp: number;
}

export interface GameEvent {
  id: string;
  type: GameEventType;
  playerId: string;
  description: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export type GameEventType = 
  | 'dice_roll' 
  | 'property_purchase' 
  | 'rent_paid'
  | 'upgrade' 
  | 'jail' 
  | 'card_draw' 
  | 'bankruptcy'
  | 'power_used'
  | 'trade'
  | 'game_start'
  | 'game_end';

export interface GameState {
  id: string; // Room ID
  phase: GamePhase;
  currentPlayerIndex: number;
  turnPhase: TurnPhase;
  playerOrder: string[]; // Ordered array of player IDs for turn sequence
  players: Record<string, Player>;
  properties: Record<string, Property>;
  board: BoardSpace[];
  dice: DiceResult | null;
  consecutiveDoubles: number;
  marketCrashActive: boolean;
  marketCrashPlayer: string | null;
  events: GameEvent[];
  turnStartTime: number;
  winnerId: string | null;
  doublesExtraRoll: boolean;
}

export interface LandingResult {
  type: 'nothing' | 'rent' | 'tax' | 'card' | 'jail' | 'unowned_property' | 'own_property';
  message: string;
  card?: Card;
}

// ============================================================================
// Room Types
// ============================================================================

export type RoomStatus = 'waiting' | 'playing' | 'finished';

export interface Room {
  id: string;
  name: string;
  hostId: string;
  status: RoomStatus;
  maxPlayers: number;
  minPlayers: number;
  createdAt: number;
  startedAt?: number;
  finishedAt?: number;
  settings: RoomSettings;
  inviteCode?: string;
}

export interface RoomSettings {
  startingBalance: number;
  salaryAmount: number;
  luxuryTaxAmount: number;
  incomeTaxAmount: number;
  jailFines: number;
  turnTimer: number; // seconds, 0 = unlimited
  auctionEnabled: boolean;
  tradingEnabled: boolean;
  powersEnabled: boolean;
}

// ============================================================================
// Trade Types
// ============================================================================

export interface TradeOffer {
  id: string;
  fromPlayerId: string;
  toPlayerId: string;
  offeredProperties: string[];
  offeredMoney: number;
  requestedProperties: string[];
  requestedMoney: number;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  createdAt: number;
}

// ============================================================================
// Firebase Schema Types
// ============================================================================

export interface FirebaseRoomData {
  room: Omit<Room, 'inviteCode'>;
  gameState: GameState;
  players: Record<string, Player>;
}

// ============================================================================
// Default Game Configuration
// ============================================================================

export const DEFAULT_ROOM_SETTINGS: RoomSettings = {
  startingBalance: 1500,
  salaryAmount: 200,
  luxuryTaxAmount: 100,
  incomeTaxAmount: 200,
  jailFines: 50,
  turnTimer: 0,
  auctionEnabled: true,
  tradingEnabled: true,
  powersEnabled: true,
};

export const DEFAULT_GAME_CONFIG = {
  maxPlayers: 6,
  minPlayers: 2,
  passGoAmount: 200,
  jailTurnsToRelease: 3,
  upgradeLimit: 4,
  hqLevel: 5,
};