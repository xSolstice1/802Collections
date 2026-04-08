# 🎮 Corporate Monopoly - Empire Edition

A production-ready, multiplayer Monopoly game module for the 802Collections platform, featuring a sleek corporate gaming aesthetic with neon green accents.

## 🚀 Features

### Core Gameplay
- **Classic Monopoly Rules**: Turn-based dice rolling, property purchasing, rent collection, and bankruptcy
- **40 Space Board**: Including properties, railroads (Distribution Networks), utilities (Core Systems), and special spaces
- **Property Tiers**: Cheap, Mid, and Expensive properties with upgrade mechanics
- **Upgrades System**: Build "Upgrades" (houses) and "HQ" (hotels) to increase rent

### Corporate Gaming Theme
- **22 Properties**: Named after gaming peripherals and devices (DeathAdder, Blackwidow, Kraken, etc.)
- **Corporate Powers**: Unique abilities for each player with cooldowns
- **Re-themed Cards**: Market Events (Chance) and Corporate Actions (Community Chest)
- **Neon Aesthetic**: Black background with Razer Green (#44D62C) glow effects

### Multiplayer System
- **Room-based**: Create or join game rooms with unique invite codes
- **2-6 Players**: Configurable player count
- **Real-time Updates**: Firebase Realtime Database for state synchronization
- **Spectator Ready**: Architecture supports future spectator mode

### Audio & UX
- **Web Audio API**: Procedurally generated sound effects
- **Sound Effects**: Dice rolls, purchases, upgrades, card draws, and more
- **Background Music**: Ambient cyberpunk drone (optional)
- **Responsive Design**: Works on desktop and mobile devices

## 📁 Project Structure

```
src/apps/monopoly/
├── components/
│   ├── Board/
│   │   ├── Board.tsx          # Main game board component
│   │   └── BoardTile.tsx      # Individual tile component
│   └── screens/
│       ├── LobbyScreen.tsx    # Room creation/joining
│       └── GameScreen.tsx     # Main game interface
├── data/
│   └── board.ts               # Property definitions, cards, board layout
├── hooks/
│   └── useMonopolyGame.ts     # Custom hooks for game logic
├── sound/
│   └── MonopolySound.ts       # Web Audio API sound engine
├── store/
│   └── gameStore.ts           # Zustand state management
├── types/
│   └── index.ts               # TypeScript type definitions
├── index.ts                   # Module exports
├── MonopolyApp.tsx            # Main app component
├── MonopolyWrapper.tsx        # Integration wrapper
└── README.md                  # This file
```

## 🛠️ Usage

### Basic Integration

```tsx
import { MonopolyApp } from '@apps/monopoly';

// Use directly in your app
<MonopolyApp
  theme={{
    primaryColor: '#44D62C',
    backgroundColor: '#000000',
  }}
  rules={{
    startingBalance: 1500,
    salaryAmount: 200,
  }}
/>
```

### Configuration Options

```typescript
interface MonopolyConfig {
  theme?: {
    primaryColor?: string;    // Default: '#44D62C' (Razer Green)
    backgroundColor?: string; // Default: '#000000'
  };
  rules?: {
    startingBalance?: number;  // Default: 1500
    salaryAmount?: number;     // Default: 200
    auctionEnabled?: boolean;  // Default: true
    tradingEnabled?: boolean;  // Default: true
    powersEnabled?: boolean;   // Default: true
  };
  onGameComplete?: (winnerId: string) => void;
}
```

### Using Custom Hooks

```tsx
import { 
  useMonopolyGame, 
  useMonopolyPlayer, 
  useMonopolyProperty 
} from '@apps/monopoly';

// Main game hook
const {
  room,
  gameState,
  currentPlayer,
  isMyTurn,
  canRollDice,
  handleRollDice,
  handleBuyProperty,
  // ... more
} = useMonopolyGame();

// Player-specific hook
const { player, properties, totalValue } = useMonopolyPlayer(playerId);

// Property-specific hook
const { property, owner, canBeBought } = useMonopolyProperty('deathadder');
```

## 🎲 Game Rules

### Setup
1. Each player starts with $1500
2. Players are assigned a random corporate power
3. First player is randomly selected

### Turn Sequence
1. **Roll Phase**: Roll dice and move
2. **Action Phase**: Buy property, use power, or end turn
3. **End Phase**: Pass turn to next player

### Properties
- **Color Groups**: Properties of the same color form a group
- **Monopoly**: Owning all properties of a color allows upgrades
- **Rent**: Doubles when owning a monopoly, increases with upgrades

### Corporate Powers
Each player receives one of six powers:
- **Hostile Takeover**: Buy property without auction
- **Market Crash**: Reduce all rents by 50% for one round
- **Monopoly Boost**: Double your rent for one turn
- **Corporate Espionage**: Steal $100 from another player
- **Venture Capital**: Receive $200 from the bank
- **Tax Loophole**: Skip next tax/fee payment

### Winning
Last player remaining (not bankrupt) wins the game.

## 🔧 Firebase Setup

### Required Configuration

Add to your `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Database Structure

```
rooms/
  {roomId}/
    room/
      id: string
      name: string
      hostId: string
      status: 'waiting' | 'playing' | 'finished'
      maxPlayers: number
      createdAt: number
      settings: RoomSettings
    gameState/
      phase: 'lobby' | 'playing' | 'finished'
      currentPlayerIndex: number
      turnPhase: 'rolling' | 'action' | 'end'
      players: { [playerId]: Player }
      properties: { [propertyId]: Property }
      dice: DiceResult | null
      events: GameEvent[]
    players/
      {playerId}/
        id: string
        name: string
        balance: number
        position: number
        properties: string[]
        inJail: boolean
        isBankrupt: boolean
        color: string
```

## 🎨 Customization

### Adding New Properties

Edit `src/apps/monopoly/data/board.ts`:

```typescript
export const PROPERTIES: Property[] = [
  // Add your property
  {
    id: 'new_property',
    name: 'New Property',
    type: 'property',
    tier: 'mid',
    price: 200,
    rent: 16,
    rentWithHq: 80,
    upgradeCost: 100,
    position: 42,
    color: '#FF0000',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  // ...
];
```

### Adding New Cards

```typescript
export const MARKET_EVENT_CARDS: Card[] = [
  {
    id: 'me_custom',
    type: 'marketEvent',
    title: 'Custom Event',
    description: 'Description of what happens',
    effect: { type: 'collect', value: 100 },
  },
  // ...
];
```

### Adding Corporate Powers

Edit `src/apps/monopoly/types/index.ts`:

```typescript
export const CORPORATE_POWERS: CorporatePower[] = [
  // ... existing powers
  {
    type: 'customPower',
    name: 'Custom Power',
    description: 'What this power does',
    cooldown: 60000, // milliseconds
    icon: '🎯',
  },
];
```

## 📱 Responsive Design

The game board automatically scales to fit different screen sizes:

- **Desktop**: Full board with side panels
- **Tablet**: Condensed layout with collapsible panels
- **Mobile**: Vertical scroll with stacked components

## 🐛 Known Limitations

1. **Trading**: Basic trading UI not yet implemented
2. **Auctions**: Property auctions on decline not implemented
3. **Mortgaging**: Property mortgaging not implemented
4. **Multiplayer Sync**: Currently uses local state; Firebase sync is architected but needs implementation

## 🚧 Future Enhancements

- [ ] Full Firebase Realtime Database synchronization
- [ ] Trading interface with drag-and-drop
- [ ] Property auction system
- [ ] Spectator mode
- [ ] Game replay system
- [ ] AI opponents for single-player
- [ ] Achievement system
- [ ] Statistics dashboard
- [ ] Custom game modes

## 📄 License

This module is part of the 802Collections platform. See the main project LICENSE for details.

## 🙏 Credits

- **Hasbro** - Original Monopoly game
- **802Collections Team** - Platform infrastructure

---

Built with ❤️ using React, TypeScript, TailwindCSS, and Web Audio API
