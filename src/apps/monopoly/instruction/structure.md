# Monopoly App — Project Structure

## Directory Tree

```
src/apps/monopoly/
├── components/
│   ├── Board/
│   │   ├── Board.tsx              # 11×11 CSS grid board layout, maps 40 spaces to grid positions
│   │   └── BoardTile.tsx          # Individual board space: color bar, ownership, upgrades, player tokens
│   └── screens/
│       ├── GameScreen.tsx         # Main gameplay UI: left panel, center board, right panel
│       └── LobbyScreen.tsx        # Room creation/joining and pre-game lobby
├── data/
│   └── board.ts                   # Static data: all 40 board spaces, properties, card decks
├── hooks/
│   └── useMonopolyGame.ts         # React hook layer; exposes computed state and actions to components
├── services/
│   └── firebaseMonopoly.ts        # Firebase Realtime Database CRUD and real-time subscription helpers
├── sound/
│   └── MonopolySound.ts           # Procedural Web Audio API engine (15 SFX + ambient music)
├── store/
│   └── gameStore.ts               # Zustand store; all game state, 30+ actions, business logic
├── types/
│   └── index.ts                   # All TypeScript interfaces and enums
├── MonopolyApp.tsx                # Root component; routes between LobbyScreen and GameScreen
├── MonopolyWrapper.tsx            # Thin wrapper providing default room config
├── index.ts                       # Public module exports
├── README.md                      # User-facing guide
├── FIREBASE_SETUP.md              # Firebase project configuration guide
└── instruction/
    ├── structure.md               # This file
    ├── plan.md                    # Development roadmap and TODOs
    └── specs/
        ├── game-mechanics.md      # Core rules, turn flow, win conditions
        ├── board-data.md          # Board spaces, properties, card decks
        ├── multiplayer.md         # Room system and Firebase sync architecture
        ├── state-management.md    # Zustand store, data models, action catalog
        ├── ui-components.md       # Component hierarchy and rendering details
        └── audio.md               # Sound engine design and SFX catalog
```

---

## Layer Responsibilities

| Layer | Location | Responsibility |
|---|---|---|
| Types | `types/index.ts` | Source of truth for all data shapes |
| Static data | `data/board.ts` | Board spaces, property configs, card text |
| State / logic | `store/gameStore.ts` | Game state, mutations, business rules |
| Hook API | `hooks/useMonopolyGame.ts` | Computed values and action wrappers for UI |
| Components | `components/` | Pure rendering; read from hooks, dispatch actions |
| Services | `services/firebaseMonopoly.ts` | External I/O; Firebase reads/writes/subscriptions |
| Audio | `sound/MonopolySound.ts` | Side effects; called from store/hooks, no state |
| Entry points | `MonopolyApp.tsx`, `MonopolyWrapper.tsx` | Wiring and defaults |

---

## Key File Sizes (lines)

| File | ~Lines |
|---|---|
| `store/gameStore.ts` | 791 |
| `data/board.ts` | 802 |
| `sound/MonopolySound.ts` | 505 |
| `hooks/useMonopolyGame.ts` | 459 |
| `components/screens/GameScreen.tsx` | 425 |
| `components/screens/LobbyScreen.tsx` | 411 |
| `types/index.ts` | 304 |
| `services/firebaseMonopoly.ts` | 335 |
| `components/Board/BoardTile.tsx` | 203 |
| `components/Board/Board.tsx` | 160 |
| `MonopolyApp.tsx` | 263 |

---

## Tech Stack

| Concern | Technology |
|---|---|
| UI framework | React 18.3 + TypeScript 5.6 |
| Build tool | Vite |
| State management | Zustand 5.0 |
| Routing | React Router DOM 6.28 |
| Styling | TailwindCSS 3.4 |
| Icons | Lucide React 0.454 |
| Audio | Web Audio API (native) |
| Backend / realtime | Firebase Realtime Database 12.11 |
| Firebase region | `asia-southeast1` |
