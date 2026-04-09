# Spec: State Management

Source: `store/gameStore.ts`, `types/index.ts`

---

## Store Overview

Zustand is used as the single source of truth. The store is a flat object with all game state and actions. No Context API is used; components access the store via `useMonopolyGame` hook.

---

## Top-Level Store Shape

```typescript
interface MonopolyStore {
  // Room & identity
  room: Room | null;
  currentUserId: string | null;

  // Game data
  gameState: GameState | null;

  // UI state
  selectedProperty: string | null;
  showTradeModal: boolean;
  showPowerModal: boolean;
  notification: Notification | null;

  // Card decks (shuffled at game start)
  marketEventDeck: MarketEventCard[];
  corporateActionDeck: CorporateActionCard[];

  // Actions (30+)
  createRoom: (...) => void;
  joinRoom: (...) => void;
  // ...
}
```

---

## GameState Shape

```typescript
interface GameState {
  id: string;                            // = room.id
  phase: 'lobby' | 'playing' | 'finished';
  currentPlayerIndex: number;            // Index into ordered player list
  turnPhase: 'rolling' | 'action' | 'end';
  players: Record<string, Player>;       // Keyed by player ID
  properties: Record<string, Property>; // Keyed by property ID
  board: BoardSpace[];                   // Fixed 40-element array
  dice: DiceResult | null;
  consecutiveDoubles: number;
  marketCrashActive: boolean;
  marketCrashPlayer: string | null;
  events: GameEvent[];                   // Capped at 50 entries
  turnStartTime: number;                 // Unix ms
  winnerId: string | null;
  doublesExtraRoll: boolean;
}
```

---

## Player Shape

```typescript
interface Player {
  id: string;
  name: string;
  avatar?: string;
  balance: number;
  position: number;           // 0–39 on board
  properties: string[];       // Property IDs owned
  inJail: boolean;
  jailTurns: number;
  isBankrupt: boolean;
  color: string;              // CSS color string
  power: CorporatePower | null;
  powerUsed: boolean;         // Used this turn?
  powerCooldown: number;      // Unix ms timestamp until available
}
```

---

## Property Shape

```typescript
interface Property {
  id: string;
  name: string;
  type: 'property' | 'railroad' | 'utility';
  tier: 'cheap' | 'mid' | 'expensive';
  price: number;
  rent: number;               // Base rent (level 0)
  rentWithHq: number;         // Max rent (level 5)
  upgradeCost: number;
  position: number;
  color: string;
  owner: string | null;       // Player ID or null
  upgrades: number;           // 0–5
  mortgaged: boolean;
}
```

---

## Action Catalog

### Room Actions

| Action | Signature | Description |
|---|---|---|
| `createRoom` | `(name, hostName) => void` | Generate room ID, invite code, initial game state; set as current room |
| `joinRoom` | `(inviteCode, playerName) => void` | Look up room by invite code, add player |
| `leaveRoom` | `() => void` | Remove current player, clear local room state |
| `startGame` | `() => void` | Transition phase to `playing`, assign powers/colors, shuffle decks |

### Turn Actions

| Action | Signature | Description |
|---|---|---|
| `rollDice` | `() => void` | Generate two dice, detect doubles/jail, move player |
| `movePlayer` | `(playerId, spaces) => void` | Advance position, collect salary if passing GO |
| `endTurn` | `() => void` | Advance to next non-bankrupt player, reset doubles |

### Property Actions

| Action | Signature | Description |
|---|---|---|
| `buyProperty` | `(propertyId) => void` | Deduct price, assign owner, add to player.properties |
| `upgradeProperty` | `(propertyId) => void` | Deduct upgrade cost, increment upgrades |
| `payRent` | `(propertyId) => void` | Calculate rent, transfer from payer to owner |

### Jail Actions

| Action | Signature | Description |
|---|---|---|
| `goToJail` | `(playerId) => void` | Set position to 10, inJail to true |
| `payJailFine` | `() => void` | Deduct $50, set inJail false (not yet implemented) |

### Card Actions

| Action | Signature | Description |
|---|---|---|
| `drawMarketEvent` | `() => void` | Pop top card, apply effect, reshuffle if empty |
| `drawCorporateAction` | `() => void` | Pop top card, apply effect, reshuffle if empty |

### Corporate Power Actions

| Action | Signature | Description |
|---|---|---|
| `usePower` | `(targetPlayerId?) => void` | Apply power effect, set `powerUsed = true`, stamp cooldown |

### UI Actions

| Action | Signature | Description |
|---|---|---|
| `setSelectedProperty` | `(id \| null) => void` | Highlight property on board |
| `setShowTradeModal` | `(show) => void` | Toggle trade modal |
| `setNotification` | `(msg, type) => void` | Show toast notification |

### Internal Helpers

| Helper | Description |
|---|---|
| `addEvent(text)` | Push to `gameState.events`, cap at 50 |
| `bankruptPlayer(playerId)` | Set bankrupt, release properties, check win |
| `getCurrentPlayer()` | Return player at `currentPlayerIndex` |
| `getActivePlayers()` | Filter out bankrupt players |
| `getPropertyOwner(propertyId)` | Return owner player or null |

---

## Zustand Selector Pattern

Components use fine-grained selectors to avoid unnecessary re-renders:

```typescript
// Prefer:
const balance = useMonopolyStore(s => s.gameState?.players[id]?.balance);

// Over:
const { gameState } = useMonopolyStore(); // re-renders on any change
```

The `useMonopolyGame` hook wraps the most common selectors and actions so components never import the store directly.
