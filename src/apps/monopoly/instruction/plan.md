# Monopoly App — Development Plan

## Current Status

The game is feature-complete for local single-session play. All core Monopoly mechanics, UI, sound, and the Firebase service layer are in place. The main gap is that Firebase real-time sync is **built but not wired into the UI**, so multiplayer currently works only on one device.

---

## Priority 1 — Activate Multiplayer Sync

The Firebase service (`firebaseMonopoly.ts`) already exposes `subscribeToRoom`, `subscribeToGameState`, and `subscribeToPlayers`. These need to be connected to the Zustand store.

**Tasks:**

1. **Subscribe on room join** — After `createRoom` or `joinRoom` succeeds, call `subscribeToGameState(roomId, callback)` and store the unsubscribe handle.
2. **Push state after every mutation** — Each Zustand action that mutates `gameState` should call `updateGameState(roomId, newState)` after applying the local change.
3. **Handle incoming updates** — The subscription callback should diff the remote state against local and apply non-conflicting fields.
4. **Unsubscribe on leave** — Call all unsubscribe handles when `leaveRoom` is dispatched.
5. **Write debounce** — Debounce `updateGameState` writes to ~200 ms to avoid thrashing on rapid state changes (e.g., dice roll → move → action).
6. **Conflict guard** — Only the current player should write `gameState.currentPlayerIndex` and `turnPhase`; other clients are read-only for those fields during a turn.

---

## Priority 2 — Complete Core Rules

### Jail "Pay Fine" Flow
- Show "Pay $50 to leave jail" button during jail turns.
- Deduct balance, set `inJail = false`, allow normal roll.
- Also support "Get Out of Jail Free" card effect (one already exists in card data).

### Property Auctions
- When a player declines to buy a property, start an auction among active players.
- Each player bids or passes; highest bidder wins at their bid price.
- Requires an `auctionState` slice in the store and an `AuctionModal` component.

### Property Mortgaging
- Allow owner to mortgage a property for half its price (add `mortgaged` flag already in type).
- Mortgaged properties collect no rent.
- Unmortgage by paying 110% of mortgage value.
- Block upgrades on mortgaged properties.

### Trading
- `showTradeModal` flag already exists in the store.
- Build `TradeModal` component: select player → select properties/cash to offer → select properties/cash to request → confirm.
- Add `proposeTrade` / `acceptTrade` / `rejectTrade` actions to the store.
- With Firebase active, push trade proposals as events so the receiving player can accept in real-time.

---

## Priority 3 — Turn Timer Enforcement

The `turnStartTime` field is already tracked. Add enforcement:

- Show countdown timer in `GameScreen` (already displayed but cosmetic).
- Auto-call `endTurn` when timer expires (default 60 s; configurable via `RoomSettings`).
- Pause timer during modals (auction, trade).

---

## Priority 4 — Polish & UX

- **Reconnect handling** — If a player's client disconnects and reconnects, re-subscribe and restore their view from Firebase.
- **Spectator mode** — Allow joining a room after game starts as read-only observer.
- **Game end screen** — Dedicated winner screen with final leaderboard and net worths instead of just a notification.
- **Mobile layout** — Board overlaps controls on small screens; add a toggle to switch between board view and action panel.
- **Loading states** — Show spinner/skeleton while Firebase reads complete on initial join.

---

## Priority 5 — Future Features

- **AI opponents** — Bot player that follows a simple buy-everything strategy; useful for testing and single-player.
- **Game statistics** — Track and display per-game stats (total rent collected, properties owned, turns played).
- **Achievement system** — Unlock badges (e.g., "Landlord" for owning all of one color).
- **Custom game modes** — Configurable starting balance, speed mode (no auctions), team play.

---

## Decisions & Notes

- Keep the Zustand store as the single source of truth; Firebase is a persistence/sync layer, not the authoritative store.
- All game logic stays in `gameStore.ts` and `hooks/useMonopolyGame.ts` — Firebase service should only do I/O.
- When multiplayer is active, only the **current player's client** should execute game mutations; all others observe.
- Sound calls are fire-and-forget side effects; never block on them.
