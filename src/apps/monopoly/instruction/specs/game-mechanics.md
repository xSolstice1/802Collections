# Spec: Game Mechanics

## Overview

Corporate Monopoly follows classic Monopoly rules with a Razer-themed skin and six unique corporate powers.

---

## Starting Conditions

| Setting | Default | Configurable |
|---|---|---|
| Starting balance | $1,500 | Yes (`RoomSettings.startingBalance`) |
| GO salary | $200 | Yes (`RoomSettings.goSalary`) |
| Min players | 2 | No |
| Max players | 6 | No |
| Turn timer | 60 s | Yes (`RoomSettings.turnTimeout`) |

Each player is assigned a random **corporate power** and a unique **color** from the player color pool.

---

## Turn Sequence

```
rolling  →  action  →  end
```

1. **Rolling phase** (`turnPhase = 'rolling'`)
   - Active player presses "Roll Dice".
   - Two dice (1–6 each) are generated randomly.
   - If doubles → set `doublesExtraRoll = true`, increment `consecutiveDoubles`.
   - If `consecutiveDoubles === 3` → send player to Jail immediately, end turn.
   - Move player forward `dice.total` spaces (wrapping at 40).
   - Collect GO salary if position wraps past 0.
   - Transition to `action` phase.

2. **Action phase** (`turnPhase = 'action'`)
   - Resolve the landed space (see Space Resolution below).
   - Player may optionally use their corporate power once per turn.
   - Player ends turn manually (or timer auto-ends).

3. **End turn** (`turnPhase = 'end'`)
   - If `doublesExtraRoll` is true, player rolls again (skip to rolling phase).
   - Otherwise advance `currentPlayerIndex` to next non-bankrupt player.
   - Reset `doublesExtraRoll`, `consecutiveDoubles` (for non-doubles turn).

---

## Space Resolution

| Space type | Behavior |
|---|---|
| `go` | Collect GO salary (already collected on pass). |
| `property` / `railroad` / `utility` | If unowned → offer purchase. If owned by another → pay rent. If mortgaged → no action. |
| `tax` | Pay fixed tax amount to bank. |
| `chance` (Market Events) | Draw top card from market event deck; apply effect. |
| `community_chest` (Corporate Actions) | Draw top card from corporate action deck; apply effect. |
| `go_to_jail` | Move to jail position (10), set `inJail = true`. |
| `jail` | Just visiting (no effect) unless player is in jail. |
| `free_parking` | No effect. |

---

## Property Purchase

- Player landing on unowned property is offered it at face value.
- `canBuyProperty` is true when: it is the player's turn, `turnPhase === 'action'`, the property is unowned, and the player has enough balance.
- On purchase: deduct `property.price` from balance, set `property.owner = playerId`, add property id to `player.properties`.
- **Auction** (not yet implemented): if player declines, auction begins among all players.

---

## Rent Calculation

### Standard Property
```
base rent = property.rent
with monopoly (owns all of color) = base rent × 2   (no upgrades)
with N upgrades = property.rentUpgrades[N]           (if defined, else linear scale)
with HQ (upgrades = 5) = property.rentWithHq
```

### Railroad
```
count = number of railroads owned by same player
rent = 25 × 2^(count - 1)    →  25 / 50 / 100 / 200
```

### Utility
```
count = number of utilities owned by same player
if count === 1: rent = dice.total × 4
if count === 2: rent = dice.total × 10
```

### Modifiers
- **Market Crash** active (`marketCrashActive = true`): all rents halved for that round.
- **Monopoly Boost** power: doubled rent for the power user's next collected payment.

---

## Property Upgrades

- Requires player to own **all properties in the color group** (monopoly).
- Cost per upgrade: `property.upgradeCost`.
- Upgrade levels: 0 (no houses) → 1 → 2 → 3 → 4 → 5 (HQ / hotel).
- All properties in the group must be within one level of each other (even building rule).
- Mortgaged properties block upgrades for the whole group.

---

## Jail Mechanics

**Going to Jail:**
- Land on "Go To HQ" space.
- Roll three consecutive doubles.
- Draw a "Go to Jail" card.

**In Jail** (`player.inJail = true`):
- Player stays at position 10.
- Each turn in jail: `player.jailTurns++`.
- Options to escape (not all implemented):
  - Roll doubles → leave jail, move that amount.
  - Pay $50 fine → leave jail, roll normally.
  - Use "Get Out of Jail Free" card.
  - After 3 turns → forced to pay $50 and roll.

---

## Bankruptcy & Win Condition

**Bankruptcy** when a player's balance drops below 0 and they cannot raise funds:
- Set `player.isBankrupt = true`.
- Release all owned properties (set `owner = null`, `upgrades = 0`).
- Player is skipped in turn rotation.

**Win condition**: last non-bankrupt player wins.
- Set `gameState.winnerId = playerId` and `gameState.phase = 'finished'`.

---

## Corporate Powers

Each player is assigned one power randomly at game start. Powers have a `cooldown` timestamp preventing reuse within the cooldown window.

| Power | Effect | Cooldown |
|---|---|---|
| Hostile Takeover | Buy any unowned property at face value (bypass auction) | 60 s |
| Market Crash | Halve all rents for one full round | 90 s |
| Monopoly Boost | Double your next collected rent | 45 s |
| Corporate Espionage | Steal $100 from any player | 120 s |
| Venture Capital | Receive $200 from bank | 90 s |
| Tax Loophole | Skip next tax or fee payment | 120 s |

Powers may only be used on the player's own turn, once per turn.

---

## Card Decks

Two separate 12-card decks, each shuffled at game start and reshuffled when empty.

**Market Events (Chance):** Movement cards, collect/pay money, go to jail, repairs.

**Corporate Actions (Community Chest):** Collect from bank, pay bank, collect from all players, bonuses.

See `specs/board-data.md` for full card text.
