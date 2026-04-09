# Spec: Core Gameplay

## Game Loop States

| State | Description |
|---|---|
| `idle` | Title screen, bird shown, press SPACE or click to start |
| `playing` | Active game; bird moves, entities spawn, bullets fly |
| `upgrading` | Level-up screen; game paused, player buys upgrades |
| `over` | Game over screen; shows final score and high score |

Transitions: `idle → playing → upgrading ↔ playing → over → playing`

---

## Entities

### Bird (player)
- Size: 36×28px
- Free movement in all 4 directions (WASD / Arrow keys)
- Bounded within canvas (0 to CANVAS_W, SKY_MIN to GROUND_Y - BIRD_H - 10)
- Collision hitbox is inset: +4px on all sides (32×20 effective)
- Flashes at 50% opacity every 4 frames when `hitFlash > 0`
- Wing toggles up/down every 8 frames for animation

### Pedestrian
- Size: 20×36px
- Spawns off right edge, walks left at `scrollSpeed + random(0, 0.5)`
- Removed when `x < -PED_W`
- Awards **+10 score, +1 coin** when hit by poop
- Appearance changes when hit (grey, X eyes, frown)
- Spawn interval: starts 100 frames, decreases by 8/level (min 35)

### Hunter
- Size: 24×40px
- Spawns off right edge after frame 120, walks left at `scrollSpeed × 0.7 + random(0, 0.3)`
- Shoots aimed bullets at bird on timer
- Removed when `x < -HUNTER_W - 10` or hit by poop
- Awards **+25 score, +3 coins** when hit by poop
- Spawn interval: starts 250 frames, decreases by 22/level (min 70)
- Shoot interval: starts 90 frames, decreases by 7/level (min 35)

### Poop
- Spawned at bird's bottom-center
- Initial velocity: `vx` (0, ±0.7, or ±0.8 for split upgrades), `vy = poopSpeed × 0.35`
- Gravity: `vy += 0.1` each frame (accelerates downward)
- Air resistance: `vx *= 0.99`
- Removed when `y >= GROUND_Y`
- Cooldown: 12 frames between drops

### Bullet
- Spawned at hunter's position, aimed toward bird's current position
- Speed: `BASE_BULLET_SPEED (6) + (level - 1) × 0.2`
- Gravity: `vy += 0.02` (slight arc)
- Removed when out of canvas bounds (+10px margin)
- Triggers `lives--` and `hitFlash = 40` when hitting bird (requires `hitFlash === 0`)

---

## Scoring

| Action | Points | Coins |
|---|---|---|
| Hit pedestrian | +10 | +1 |
| Hit hunter | +25 | +3 |

High score persisted to `localStorage` key `bird-shit-highscore`.

---

## Level Progression

Level-up triggers when `score >= getLevelThreshold(currentLevel)`.

Thresholds: `[0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800]`
After level 10: each level needs +600 more than the previous.

On level-up:
1. `g.running = false`
2. `level++`, difficulty recalculated via `setDifficulty`
3. State → `upgrading`

On continue:
1. Clear all bullets
2. `countdownTimer = 180` (3-second countdown at 60fps)
3. State → `playing`, game loop restarts

During countdown: bird can move, but no spawning or collision.

---

## Difficulty Scaling (per level)

| Parameter | Formula | Min |
|---|---|---|
| `scrollSpeed` | `1.5 + (level-1) × 0.15` | — |
| `spawnIntervalPed` | `100 - (level-1) × 8` | 35 |
| `spawnIntervalHunter` | `250 - (level-1) × 22` | 70 |
| `hunterShootInterval` | `90 - (level-1) × 7` | 35 |
| `bulletSpeed` | `6 + (level-1) × 0.2` | — |

---

## Lives System

- Start with 3 lives (upgradeable via Extra Life upgrade)
- Lose a life when a bullet hits bird and `hitFlash === 0`
- At 0 lives: `running = false`, state → `over`, score submitted to leaderboard
