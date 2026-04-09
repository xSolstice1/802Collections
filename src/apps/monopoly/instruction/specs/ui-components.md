# Spec: UI Components

---

## Component Hierarchy

```
MonopolyWrapper
└── MonopolyApp
    ├── LobbyScreen          (room === null || phase === 'lobby')
    └── GameScreen           (phase === 'playing' || 'finished')
        ├── TopBar
        ├── LeftPanel
        │   ├── PlayerList
        │   ├── MyProperties
        │   └── MyMonopolies
        ├── CenterArea
        │   └── Board
        │       └── BoardTile × 40
        └── RightPanel
            ├── CurrentPlayerInfo
            ├── DiceDisplay
            ├── ActionButtons
            └── EventLog
```

---

## MonopolyApp (`MonopolyApp.tsx`)

Root component. Reads `room` and `gameState.phase` from the Zustand store to decide which screen to render.

**Props:** none (reads from store)

**Renders:**
- `LobbyScreen` when no room or room phase is `lobby` or `waiting`
- `GameScreen` when phase is `playing` or `finished`

---

## LobbyScreen (`screens/LobbyScreen.tsx`)

Handles both pre-join and in-lobby states.

**States:**
1. **Entry** — two buttons: "Create Room" / "Join Room".
2. **Create form** — input for room name and player name; submit calls `createRoom`.
3. **Join form** — input for invite code and player name; submit calls `joinRoom`.
4. **Lobby** — shows room name, invite code, player list, and "Start Game" button (host only, enabled when ≥ 2 players).

**Key UI elements:**
- Invite code displayed as large monospace text for easy sharing.
- Player list with color indicators.
- "Leave Room" button always visible.

---

## GameScreen (`screens/GameScreen.tsx`)

Main gameplay view. Three-column layout on desktop.

### Left Panel
- Player list: name, balance, color dot, bankrupt indicator.
- My properties: grouped by color, shows upgrade level.
- My monopolies: highlights complete color sets.

### Center Area
- Contains `Board` component.
- Below board on mobile: action buttons and dice.

### Right Panel
- **Current player info**: whose turn it is, their balance.
- **Dice display**: shows last roll result; doubles indicator.
- **Action buttons** (conditional):
  - "Roll Dice" — visible when `canRollDice`
  - "Buy Property" — visible when `canBuyProperty`
  - "Upgrade Property" — visible when `canUpgradeProperty`
  - "Use Power" — visible when player has unused power off cooldown
  - "End Turn" — visible when `turnPhase === 'action'`
- **Event log**: last 50 events, newest at top, scrollable.

### Settings & Help
- Settings modal: sound toggle, music toggle, volume slider.
- Help modal: condensed game rules.
- Both accessible via icon buttons in the top bar.

---

## Board (`components/Board/Board.tsx`)

Renders the 40-space board as an 11×11 CSS grid.

**Position mapping:**
- Bottom row (left to right): positions 0–10 → grid cells `(11,1)` to `(11,11)`
- Left column (bottom to top): positions 11–19 → grid cells `(10,1)` to `(2,1)`
- Top row (left to right): positions 20–30 → grid cells `(1,1)` to `(1,11)`
- Right column (top to bottom): positions 31–39 → grid cells `(2,11)` to `(10,11)`
- Center: positions `(2,2)` to `(10,10)` — used for game info display

**Responsibilities:**
- Lay out tiles at correct grid coordinates.
- Render center content area (game logo, phase display).
- Pass `isSelected`, `playerTokens` props down to each `BoardTile`.

---

## BoardTile (`components/Board/BoardTile.tsx`)

Renders a single board space.

**Props:**
```typescript
{
  space: BoardSpace;
  property?: Property;
  players: Player[];        // Players currently on this tile
  isSelected: boolean;
  onClick: () => void;
}
```

**Visual layers (bottom to top):**
1. **Color bar** — top strip showing property group color.
2. **Space content** — name, price (if property), space icon (if special).
3. **Upgrade indicators** — small triangles for houses (1–4), building emoji for HQ (5).
4. **Ownership bar** — bottom strip filled with owner's player color.
5. **Player tokens** — colored dots for each player on this tile.
6. **Selection ring** — highlight border when `isSelected`.

**Orientation:** Corner tiles use larger cells; side tiles rotate label text to fit.

---

## Notification System

Toast notifications displayed via a fixed overlay.

```typescript
interface Notification {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  duration?: number;   // ms, default 3000
}
```

Set via `setNotification` store action. Auto-dismiss after `duration` ms. Displayed in `MonopolyApp` as a fixed-position overlay above all content.

---

## Styling Conventions

- **Color scheme:** black background (`#000`), Razer green accent (`#44D62C`), white text.
- **Framework:** TailwindCSS utility classes throughout; no custom CSS files.
- **Breakpoints:** `sm` (mobile), `md` (tablet), `lg` (desktop). Board shrinks on small screens.
- **Fonts:** System sans-serif; monospace for dice values and invite codes.
- **Animations:** TailwindCSS `transition`, `animate-pulse` for active turn indicator.

---

## Hooks Used by Components

| Hook | Used by | Purpose |
|---|---|---|
| `useMonopolyGame()` | GameScreen | Main access to all state and actions |
| `useMonopolyPlayer(id)` | PlayerList, LeftPanel | Per-player data and net worth |
| `useMonopolyProperty(id)` | BoardTile, MyProperties | Property data and ownership |
| `useMonopolyRoom()` | LobbyScreen, TopBar | Room info and player list |
