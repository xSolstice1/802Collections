# Bird Shit Simulator — Project Structure

## Current State

Fully modular. `BirdShitApp.tsx` is ~580 lines (state wiring + JSX only).
Each concern lives in its own file — constants, types, upgrades, renderers, hooks.
Six distinct bird species are drawable via the `DrawBirdFn` architecture in `skins.ts`.

---

## Directory Tree

```
src/apps/bird-shit/
├── constants.ts               # Game constants, canvas dimensions, level thresholds
├── types.ts                   # All TypeScript interfaces and type aliases
├── upgrades.ts                # UPGRADE_DEFS, DEFAULT_UPGRADES, upgrade helpers
├── skins.ts                   # DrawBirdFn type, BirdSkin interface, BIRD_SKINS catalog
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
│   └── drawHUD.ts             # drawHeart, drawCoin, drawUpgradeScreen
├── hooks/
│   ├── useGameLoop.ts         # Main game loop: physics, spawning, collision, scoring
│   └── useControls.ts         # Keyboard listener + floating joystick handlers
├── BirdShitApp.tsx            # Root component — state wiring + JSX only (~580 lines)
└── instructions/
    ├── structure.md           # This file
    ├── plan.md                # Development roadmap and TODOs
    └── specs/
        ├── core-gameplay.md   # Game rules, entities, scoring, level progression
        ├── upgrades.md        # Upgrade system — definitions, costs, effects
        ├── rendering.md       # Draw functions, canvas pipeline, HUD layout
        ├── mobile-controls.md # Touch joystick and poop button implementation
        └── bird-skins.md      # Bird species system — DrawBirdFn architecture
```

---

## Layer Responsibilities

| Layer | Location | Responsibility |
|---|---|---|
| Constants | `constants.ts` | Single source of truth for all magic numbers |
| Types | `types.ts` | All data shapes; no logic |
| Upgrades | `upgrades.ts` | Upgrade definitions, default values, stat calculators |
| Renderers | `renderers/` | Pure canvas draw functions; no state, no refs |
| Game loop | `hooks/useGameLoop.ts` | Physics, spawning, collision detection, scoring |
| Controls | `hooks/useControls.ts` | Keyboard + touch input; writes to `keysRef` |
| App | `BirdShitApp.tsx` | React state, refs wiring, JSX layout |

---

## Estimated File Sizes (after split)

| File | ~Lines |
|---|---|
| `hooks/useGameLoop.ts` | 420 |
| `BirdShitApp.tsx` | 280 |
| `renderers/drawHUD.ts` | 150 |
| `renderers/drawBird.ts` | 145 |
| `renderers/drawPedestrian.ts` | 155 |
| `renderers/drawHunter.ts` | 170 |
| `hooks/useControls.ts` | 140 |
| `renderers/drawPoop.ts` | 50 |
| `renderers/drawBullet.ts` | 30 |
| `upgrades.ts` | 35 |
| `types.ts` | 30 |
| `constants.ts` | 40 |

---

## Tech Stack

| Concern | Technology |
|---|---|
| UI framework | React 18 + TypeScript |
| Build tool | Vite |
| Rendering | HTML5 Canvas (2D context) |
| Styling | TailwindCSS |
| Icons | Lucide React |
| Leaderboard | Custom `leaderboardApi` service |
