# Bird Shit Simulator — Development Plan

## Current Status

Fully playable roguelite arcade game. Modular codebase. Six bird species, card-based
upgrade system, relic rewards, boss fights, biomes, combo scoring, meta-progression,
sound, dev mode, daily/seeded run modes, mobile controls, fullscreen.

---

## ✅ Priority 1 — Refactor: Split into Modules

**Done.** Fully modular. `BirdShitApp.tsx` handles React state + JSX only.

---

## ✅ Priority 2 — Bird Species

**Done.** Six species via `DrawBirdFn` architecture. See `specs/bird-skins.md`.

---

## ✅ Priority 3 — Difficulty Balancing

**Done.** Reviewed and tuned:

- Scroll speed, spawn intervals, hunter shoot rate all scale per level
- Difficulty formula: `setDifficulty(g, lvl)` in `useGameLoop.ts`
- Boss fights at specific levels break up difficulty curve
- Biomes (6 total) introduce environmental variety

---

## ✅ Priority 4 — New Game Mechanics

**Done:**

- **Boss levels** — every N levels triggers one of 3 boss types
- **Card system** — roguelite level-up: choose from 3 upgrade cards (all cards in dev mode)
- **Relic system** — post-boss reward: passive bonuses applied to run
- **Poop streak bonus** — combo multiplier (x1.25 per hit, resets after 2s)
- **Power-ups** — scatter bomb (AoE), homing poop, toxic poop, feather shield, storm gut (chain lightning), golden gut (ground trails)
- **Environment variety** — 6 biomes with distinct sky/ground/wind

---

## ✅ Priority 5 — Polish

**Done:**

- Particle effects on AoE hit (expanding orange ring via `splashEffects`)
- Toxic puddles (green ground hazard)
- Chain lightning arcs (visual between enemies)
- Golden gut ground trails
- Screen-space hit flash on bird
- Sound system via Web Audio API (`sound.ts`)
- Game over screen with score + level display
- Meta-progression (cross-run currency + upgrades)
- Dev mode (localhost only): invincibility + all cards

---

## Remaining / Future Work

### Difficulty Tuning

- Hunter spawn rate at high levels (can flood screen past level 15)
- Bullet speed curve (near-impossible past level 20)
- Consider soft cap past level 20

### Polish

- Screen shake on bullet hit
- Game over stats breakdown (hits, misses, accuracy %)
- Particle splat animation on direct ped/hunter hit

### Content

- Additional boss types
- Additional biome types
- Additional relic pool entries

---

## Architecture Decisions

- All game state in `gameRef` (mutable ref) — zero re-renders in game loop
- Draw functions are pure — no closures on game state
- `dropPoopRef`, `startGameRef`, `buyUpgradeRef` pattern avoids stale closures in event listeners
- Leaderboard submit is fire-and-forget — never block game-over screen on network
- Card system uses `rollCards(pickedCards, count)` — respects `maxStacks` per card
- Dev mode gated to `window.location.hostname === 'localhost'`
