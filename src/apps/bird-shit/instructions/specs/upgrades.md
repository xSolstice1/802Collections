# Spec: Upgrade System

## Overview

On each level-up the player sees an upgrade shop. Upgrades are bought with coins earned
during gameplay. All upgrades persist for the entire run; they reset on new game.

---

## Upgrade Catalog

| Key | Name | Max Level | Costs | Effect per level |
|---|---|---|---|---|
| `poopSpeed` | Poop Speed | 3 | 5, 10, 18 | `+1.0` to drop velocity |
| `poopSize` | Poop Size | 3 | 5, 10, 18 | `+3px` width, `+2px` height |
| `birdSpeed` | Bird Speed | 3 | 4, 8, 14 | `+0.6` to movement speed |
| `extraLife` | Extra Life | 5 | 8, 12, 18, 25, 35 | `+1 HP` (applied immediately) |
| `splitPoop` | Split Poop | 2 | 15, 28 | Level 1 = 2 drops, Level 2 = 3 drops |
| `homingPoop` | Homing Poop | 2 | 18, 32 | Level 1 = weak tracking (0.4), Level 2 = strong (0.9) |

---

## Stat Calculators

```ts
poopSpeed  = BASE_POOP_SPEED (3) + upgrades.poopSpeed × 1.0
poopWidth  = BASE_POOP_W (8)     + upgrades.poopSize  × 3
poopHeight = BASE_POOP_H (10)    + upgrades.poopSize  × 2
birdSpeed  = BASE_BIRD_SPEED (2.5) + upgrades.birdSpeed × 0.6
homingStr  = 0 | 0.4 | 0.9  (based on homingPoop level)
```

---

## Upgrade Screen Layout

Drawn on canvas (not DOM). 2-column × 3-row grid.

- `startX = 50`, `startY = 100`, `colW = 360`, `rowH = 80`
- Each card: `colW - 20` wide, `rowH - 12` tall
- Green border + faint green bg if player can afford; grey otherwise
- Shows: key number `[1]–[6]`, name, level pips, description, coin cost

Input:
- Keyboard: press `1`–`6` to buy corresponding upgrade
- Click/tap: hit-test each card bounds to determine which upgrade was clicked

---

## Homing Poop Behaviour

When `homingPoop > 0`, each frame per active poop:
1. Find nearest un-hit pedestrian or hunter with `dy > 0` (below poop) within 200px
2. Nudge `vx` toward that target: `vx += sign(dx) × homingStr × 0.1`
3. Apply slight damping: `vx *= 0.97`

---

## Extra Life

Unlike other upgrades, `extraLife` has an immediate side effect: `g.lives++` and
`setLives(g.lives)` are called at purchase time in addition to incrementing the upgrade counter.
