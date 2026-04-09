# Spec: Multiplayer & Room System

---

## Room Architecture

Rooms are the top-level container for a game session.

```
Room (metadata)
└── GameState (full game snapshot)
    └── Players (per-player state)
```

### Room Lifecycle

```
waiting  →  playing  →  finished
```

- **waiting**: Players can join/leave. Host can start when ≥ 2 players present.
- **playing**: Game is active. New players cannot join.
- **finished**: Game over. State preserved for result display.

---

## Room Data Model

```typescript
interface Room {
  id: string;            // UUID-style, generated at creation
  name: string;          // Display name (e.g., "LuoYi's Game")
  hostId: string;        // Player ID of room creator
  status: 'waiting' | 'playing' | 'finished';
  maxPlayers: number;    // Default 6
  minPlayers: number;    // Default 2
  createdAt: number;     // Unix timestamp (ms)
  startedAt?: number;
  finishedAt?: number;
  settings: RoomSettings;
  inviteCode?: string;   // 6-character alphanumeric
}

interface RoomSettings {
  startingBalance: number;   // Default 1500
  goSalary: number;          // Default 200
  turnTimeout: number;       // Seconds, default 60
}
```

### Invite Code

Generated at room creation: 6 uppercase alphanumeric characters (e.g., `A3KZ9M`). Used by other players to join without knowing the room ID.

---

## Firebase Data Structure

```
firebase root
└── rooms/
    └── {roomId}/
        ├── room/          ← Room metadata (mirrors Room interface)
        ├── gameState/     ← Complete GameState object
        └── players/       ← Record<playerId, Player>
```

Database URL: `https://collection-a7a10-default-rtdb.asia-southeast1.firebasedatabase.app`

Database rules (development — open read/write):
```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

---

## Firebase Service API

All functions are in `services/firebaseMonopoly.ts`.

### Room Operations

| Function | Description |
|---|---|
| `createRoom(room, initialGameState)` | Write new room and initial game state |
| `getRoom(roomId)` | One-time fetch of room metadata |
| `getRoomByInviteCode(code)` | Query rooms by invite code |
| `updateRoomStatus(roomId, status)` | Update `room.status` field |
| `subscribeToRoom(roomId, cb)` | Real-time listener → returns unsubscribe fn |

### Player Operations

| Function | Description |
|---|---|
| `addPlayerToRoom(roomId, player)` | Write player to `players/{playerId}` |
| `removePlayerFromRoom(roomId, playerId)` | Delete player node |
| `updatePlayer(roomId, playerId, updates)` | Partial update of player fields |
| `subscribeToPlayers(roomId, cb)` | Real-time listener on all players |

### Game State Operations

| Function | Description |
|---|---|
| `updateGameState(roomId, gameState)` | Overwrite full game state |
| `getGameState(roomId)` | One-time fetch of game state |
| `subscribeToGameState(roomId, cb)` | Real-time listener → returns unsubscribe fn |

---

## Current State (Not Yet Wired)

The Firebase service layer is complete but **not connected to the UI or Zustand store**. The app currently works as local/single-session only:

- `createRoom` and `joinRoom` in the store generate IDs locally but do not persist to Firebase.
- `subscribeToGameState` is never called; remote updates are not received.
- Multiple browser tabs or devices will have independent, unsynced game states.

---

## Planned Multiplayer Integration

See `plan.md` Priority 1 for full task list. High-level:

1. On `createRoom` / `joinRoom` → write to Firebase + start subscriptions.
2. On every Zustand mutation → push updated `gameState` to Firebase.
3. Subscription callback → merge remote state into local store.
4. On `leaveRoom` → call unsubscribe handles and remove player from Firebase.
5. Conflict strategy: **current player writes; others read**. Only the active player pushes `gameState` changes during their turn.

---

## Player ID Strategy

Player IDs are generated client-side as `player-{timestamp}-{random}`. Because there is no auth, the ID is stored only in the Zustand store's `currentUserId` field for the duration of the session. Reconnecting generates a new ID, which breaks session continuity — reconnect handling is a future task.
