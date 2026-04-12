# Spec: Core Gameplay

## Game Loop States

| State | Description |
|---|---|
| `idle` | Title screen, bird shown, press SPACE or click to start |
| `playing` | Active game; bird moves, entities spawn, bullets fly |
| `upgrading` | Level-up card selection screen; game paused |
| `boss` | Boss fight active (sub-state of playing; no separate pause) |
| `relic_select` | Post-boss relic picker overlay |
| `over` | Game over screen; shows final score and high score |

Transitions:
```
idle → playing → upgrading → playing
                            ↗ (relic_select → upgrading)
playing → boss → relic_select
playing → over → playing (new game)
```

---

## Entities

### Bird (player)
- Size: `BIRD_W=36 × BIRD_H=28` px
- Free movement in all 4 directions (WASD / Arrow keys)
- Bounded: `x ∈ [0, CANVAS_W - BIRD_W]`, `y ∈ [SKY_MIN=20, GROUND_Y - BIRD_H - 10]`
- Collision hitbox inset +4px on all sides (28×20 effective)
- Flashes at 50% opacity (`hitFlash > 0 && Math.floor(hitFlash * 60) % 4 < 2`)
- Wing toggles at ~7.5Hz for animation

### Pedestrian
- Size: `PED_W=20 × PED_H=36` px
- Spawns at `x = CANVAS_W + random(0, 100)`, `y = GROUND_Y - PED_H`
- Moves left at `scrollSpeed + random(0, 30)` px/s
- Removed when `x < -PED_W`
- Awards **+10 × comboMult score, +1 + coinBonus coins** when hit by poop
- Appearance changes on hit (grey, X eyes, frown)
- Spawn interval: `BASE_SPAWN_INTERVAL_PED = 1.667s`, scales per level

### Hunter
- Size: `HUNTER_W=24 × HUNTER_H=40` px
- Spawns after `time > 2s`; moves left at `scrollSpeed × 0.7 + random(0, 18)` px/s
- Shoots aimed bullets at bird on timer
- Removed when `x < -HUNTER_W - 10` or hit by poop
- Awards **+25 × comboMult score, +3 + coinBonus coins** when hit by poop
- Spawn interval: `BASE_SPAWN_INTERVAL_HUNTER = 4.167s`, scales per level

### Poop
- Spawned at bird's bottom-center
- `vy = poopSpeed × 0.35` (downward), `vx` depends on split level (0, ±~5, ±~8 px/s)
- Physics: `vy += POOP_GRAVITY (360) × dt`, `vx *= 0.99^(dt×60)` (air resistance)
- Biome wind: `vx += biome.windForce × dt`
- Homing: nudges vx toward nearest target within 200px if `homingPoop > 0`
- Clamped horizontally to canvas bounds
- Removed on: boss hit, ped hit, hunter hit, obstacle hit, balloon hit, or `y >= GROUND_Y`
- Cooldown: `POOP_COOLDOWN = 0.2s`

### Bullet
- Spawned at hunter position, aimed at bird's current position
- Speed: `bulletSpeed` px/s (scales per level)
- Gravity: `vy += GRAVITY (72) × dt`
- Removed when out of canvas bounds (+10px margin)
- Triggers `takeDamage()` on bird collision when `hitFlash === 0`

### Obstacle (Building)
- Size: `OBSTACLE_W=42` px, variable height (50px min, scales per level)
- Active from level 3+
- Moves left at `scrollSpeed × 0.85` px/s
- Blocks poop (poop removed on collision, no score)
- Damages bird on overlap (calls `takeDamage()`)

### Balloon
- Size: `BALLOON_W=22 × BALLOON_H=28` px
- Active from level 3+
- Bobs vertically via `sin(time × 1.5 + driftPhase) × driftAmp`
- Awards **+5 score, +1 + coinBonus coins** when popped by poop
- Damages bird on direct contact

---

## Scoring

| Action | Points | Coins |
|---|---|---|
| Hit pedestrian | +10 × comboMult | +1 + coinBonus |
| Hit hunter | +25 × comboMult | +3 + coinBonus |
| Pop balloon | +5 | +1 + coinBonus |
| Boss drone hit | +15 | +2 |
| Boss hitbox hit | +5 × damage | +damage |

High score persisted to `localStorage` key `bird-shit-highscore`.

---

## Combo System

- `combo` counter increments on each ped or hunter hit
- `comboTimer = 2s` reset on each hit; decrements each frame
- When `comboTimer <= 0`: combo resets to 0
- Score multiplier: `comboMult = 1 + combo × 0.25` (applied at hit time)
- Displayed in HUD when combo > 0

---

## Level Progression

Level-up triggers when `score >= getLevelThreshold(currentLevel)`.

Thresholds: `[0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800]`
After index 9: each additional level needs +600 more than previous.

On level-up, checks `getBossForLevel(level)`:
- **Boss level**: spawn boss, clear all entities, stay in `playing` state
- **Normal level**: `g.running = false`, offer 3 cards (or all cards in dev mode), state → `upgrading`

On boss defeat:
1. Offer relics (`rollRelics`, 3 choices)
2. State → `relic_select`
3. After relic pick → offer cards → state → `upgrading`

On continue (after card pick):
1. Clear bullets, obstacles, balloons
2. `countdownTimer = COUNTDOWN_TIME (3s)`
3. State → `playing`, new `requestAnimationFrame` loop starts

During countdown: bird can move; spawning and collision disabled.

---

## Difficulty Scaling

`setDifficulty(g, lvl)` called on level-up and game start.

| Parameter | Formula |
|---|---|
| `scrollSpeed` | `BASE (90) + (lvl-1) × 9` px/s |
| `spawnIntervalPed` | `BASE (1.667s) − (lvl-1) × 0.133s` (min ~0.583s) |
| `spawnIntervalHunter` | `BASE (4.167s) − (lvl-1) × 0.367s` (min ~1.167s) |
| `hunterShootInterval` | `BASE (1.5s) − (lvl-1) × 0.117s` (min ~0.583s) |
| `bulletSpeed` | `BASE (360) + (lvl-1) × 12` px/s |

---

## Lives System

- Start: 3 lives (+ meta bonus `extraLives`)
- `takeDamage()` called on: bullet hit, obstacle contact, balloon contact
- Shield check: if `shieldActive`, block hit and start 15s recharge instead
- Dev mode: `takeDamage()` skips HP decrement entirely
- At 0 lives: `running = false`, state → `over`, score submitted to leaderboard

---

## Run Modes

| Mode | Seed Source | Description |
|---|---|---|
| `classic` | `randomSeed()` | Random seed each run |
| `daily` | `dailySeed()` | Deterministic from current date — same for all players |
| `seeded` | Provided value | Fixed seed for reproducibility |

Seed affects card rolls and relic rolls (via seeded RNG in `systems/rng.ts`).

---

## Biomes

6 biomes, each with distinct visual and gameplay properties.
Selected via `pickBiome()` at game start (random).

| Property | Effect |
|---|---|
| `skyGradient` | Canvas sky gradient colors |
| `groundColor` | Ground fill color |
| `groundLineColor` | Ground border color |
| `dashColor` | Road dash color |
| `windForce` | Constant horizontal force on poops (px/s²) |

---

## Effect Entities

| Type | Triggered by | Behavior |
|---|---|---|
| `ToxicPuddle` | Direct ped/hunter hit (if `toxicPoop > 0`) | Ground hazard, damages enemies every 0.5s, decays over `3 + toxicPoop` seconds |
| `GroundTrail` | Poop in flight (if `goldenGut > 0`, random) | Golden particle at poop bottom, decays over 2s, damages touching enemies |
| `LightningArc` | Direct hit (if `stormGut > 0`) | Visual arc to nearest unchained enemy, chains up to 3 times, 100px range |
| `SplashEffect` | Any poop impact (if `scatterBomb > 0`) | Expanding orange ring, 80px max radius, 0.35s duration |
