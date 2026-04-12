# Bird Shit Simulator — Project Structure

## Current State

Fully modular roguelite arcade game. `BirdShitApp.tsx` is ~600 lines (state wiring + JSX only).
Six bird species, card/relic/meta upgrade systems, 3 boss types, 6 biomes, sound, dev mode.

---

## Directory Tree

```
src/apps/bird-shit/
├── constants.ts               # All magic numbers, canvas dims, level thresholds, collides()
├── types.ts                   # All TypeScript interfaces and type aliases
├── upgrades.ts                # UPGRADE_DEFS, DEFAULT_UPGRADES, stat calculators
├── skins.ts                   # DrawBirdFn type, BirdSkin interface, BIRD_SKINS catalog
├── cards.ts                   # CARD_POOL, UpgradeCard type, rollCards(), rarity weights
├── relics.ts                  # RELIC_POOL, Relic type, rollRelics()
├── biomes.ts                  # BIOMES array, Biome type, pickBiome()
├── meta.ts                    # META_UPGRADES, MetaState, loadMeta/saveMeta, getMetaBonuses
├── sound.ts                   # birdShitSound: Web Audio API SFX + BGM manager
├── renderers/
│   ├── index.ts               # Re-exports all draw functions
│   ├── drawBird.ts            # Classic green parakeet
│   ├── drawBirdMagpie.ts      # Black/white with iridescent tail
│   ├── drawBirdCrowned.ts     # Cockatiel: grey + yellow face + erect crest
│   ├── drawBirdOwl.ts         # Brown owl with facial disk + two forward-facing eyes
│   ├── drawBirdToucan.ts      # Black body + white bib + multicolour bill
│   ├── drawBirdEagle.ts       # Bald eagle: dark brown + white head + hooked beak
│   ├── drawPedestrian.ts      # drawPedestrian(ctx, p)
│   ├── drawHunter.ts          # drawHunter(ctx, h)
│   ├── drawBullet.ts          # drawBullet(ctx, b)
│   ├── drawPoop.ts            # drawPoop(ctx, p)
│   ├── drawObstacle.ts        # drawObstacle(ctx, obs) — buildings/obstacles
│   ├── drawBalloon.ts         # drawBalloon(ctx, bal, frame) — floating balloons
│   └── drawHUD.ts             # drawHeart, drawCoin (used in game loop HUD)
├── hooks/
│   ├── useGameLoop.ts         # Main game loop: physics, spawning, collision, scoring, rendering
│   └── useControls.ts         # Keyboard listener + floating joystick handlers
├── systems/
│   ├── collisionSystem.ts     # updateBirdCollisions() — bullets/obstacles/balloons → bird
│   ├── spawnSystem.ts         # updateSpawning() — ped/hunter/obstacle/balloon spawning
│   ├── projectileSystem.ts    # updateProjectiles() — poop physics + entity collisions (unused; logic inline in useGameLoop)
│   ├── rng.ts                 # Seeded RNG: randomSeed(), dailySeed(), seededRandom()
│   └── objectPool.ts          # Generic object pool for entity reuse
├── bosses/
│   ├── index.ts               # getBossForLevel(), boss registry
│   ├── types.ts               # BossDefinition, BossState interfaces
│   ├── constructionBoss.ts    # Construction crane boss
│   ├── droneSwarm.ts          # Drone swarm boss (per-drone hitboxes)
│   └── sniperHunter.ts        # Sniper hunter boss (high-damage precision shots)
├── components/
│   ├── CardSelectionOverlay.tsx   # Level-up card picker (3-card row or 4-col grid in dev mode)
│   ├── RelicSelectionOverlay.tsx  # Post-boss relic picker
│   └── MetaUpgradePanel.tsx       # Cross-run upgrade shop (meta currency)
├── BirdShitApp.tsx            # Root component — state, refs, JSX layout, modals
└── instructions/
    ├── structure.md           # This file
    ├── plan.md                # Development roadmap
    └── specs/
        ├── core-gameplay.md   # Game rules, entities, states, level progression
        ├── upgrades.md        # Card system, relics, meta upgrades, stat calculators
        ├── rendering.md       # Draw functions, effects, HUD, biomes
        ├── mobile-controls.md # Touch joystick and poop button implementation
        └── bird-skins.md      # Bird species system — DrawBirdFn architecture
```

---

## Layer Responsibilities

| Layer | Location | Responsibility |
|---|---|---|
| Constants | `constants.ts` | Single source of truth for all magic numbers |
| Types | `types.ts` | All data shapes; no logic |
| Upgrades | `upgrades.ts` | Classic upgrade definitions and stat calculators |
| Cards | `cards.ts` | Roguelite card pool, rarity weights, roll logic |
| Relics | `relics.ts` | Post-boss passive bonuses |
| Biomes | `biomes.ts` | Environment definitions and selection |
| Meta | `meta.ts` | Persistent cross-run progression |
| Sound | `sound.ts` | Web Audio API abstraction |
| Renderers | `renderers/` | Pure canvas draw functions; no state, no refs |
| Bosses | `bosses/` | Boss definitions, hitboxes, draw, spawn logic |
| Systems | `systems/` | Extracted subsystems (collision, spawn, RNG, pool) |
| Game loop | `hooks/useGameLoop.ts` | Physics, spawning, collision, scoring, rendering |
| Controls | `hooks/useControls.ts` | Keyboard + touch input; writes to `keysRef` |
| Components | `components/` | Overlay UI for card/relic/meta selection |
| App | `BirdShitApp.tsx` | React state, refs wiring, JSX layout, modals |

---

## Key Data Flows

**Game state** (`gameRef: MutableRefObject<GameData>`):
- Single mutable object, written directly in game loop
- React state (`score`, `lives`, etc.) updated via callbacks for UI display only

**Upgrade application**:
- Classic upgrades: coin-gated shop (legacy, now card system primary)
- Cards: `selectCard(index)` → `card.apply(g, stacks)` → modifies `g.upgrades`
- Relics: `selectRelic(index)` → `relic.apply(g)` → modifies `g.upgrades` or `g.lives`
- Meta: `getMetaBonuses(meta)` applied at game start only

**Dev mode**:
- `devModeRef: MutableRefObject<boolean>` passed to `useGameLoop`
- Invincibility: `takeDamage` skips HP decrement when true
- All cards: `rollCards(pickedCards, CARD_POOL.length)` instead of 3
- UI toggle visible only on `window.location.hostname === 'localhost'`

---

## Tech Stack

| Concern | Technology |
|---|---|
| UI framework | React 18 + TypeScript |
| Build tool | Vite |
| Rendering | HTML5 Canvas (2D context) |
| Styling | TailwindCSS |
| Icons | Lucide React |
| Sound | Web Audio API (custom `birdShitSound` manager) |
| Leaderboard | Custom `leaderboardApi` service |
