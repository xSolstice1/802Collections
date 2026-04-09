# Bird Shit Simulator — Development Plan

## Current Status

Fully playable, fully modular. Refactor complete. Six distinct bird species selectable
before game start. Core loop, upgrades, leaderboard, mobile controls, fullscreen all working.

---

## ✅ Priority 1 — Refactor: Split into Modules

**Done.** `BirdShitApp.tsx` split from ~2030 lines into focused modules:
`constants.ts`, `types.ts`, `upgrades.ts`, `skins.ts`, `renderers/*`, `hooks/*`.
`BirdShitApp.tsx` is now ~580 lines (state wiring + JSX only).

---

## ✅ Priority 2 — Bird Species (formerly "Skins")

**Done.** Implemented as `DrawBirdFn` function-per-species architecture (not color palettes).

Six species, each with its own draw file in `renderers/`:

| ID | Name | Unlock |
|---|---|---|
| `classic` | Parakeet | Free |
| `magpie` | Magpie | Free |
| `cockatiel` | Cockatiel | Score ≥ 250 |
| `owl` | Owl | Score ≥ 500 |
| `toucan` | Toucan | Score ≥ 1500 |
| `eagle` | Eagle | Score ≥ 3000 |

Skin chosen before game start only (selector hidden during play). Persisted to `localStorage`.

See `specs/bird-skins.md` for full design.

---

## Priority 3 — Difficulty Balancing

Current level scaling is linear. Review and tune:

- Hunter spawn rate at high levels (currently can flood the screen)
- Bullet speed curve (can become near-impossible past level 15)
- Coin income vs upgrade costs ratio
- Consider adding a "soft cap" past level 20 to plateau difficulty

---

## Priority 4 — New Game Mechanics

Potential additions (pick based on player feedback):

- **Poop streak bonus** — consecutive hits multiply score (x2, x3 combo)
- **Boss levels** — every 5 levels, a large target appears worth big points
- **Power-ups** — temporary invincibility star, poop frenzy, coin magnet
- **Environment variety** — different backdrops per level (city, forest, beach)

---

## Priority 5 — Polish

- Particle effects on poop hit (splat animation)
- Screen shake on bullet hit
- Sound effects (wing flap, splat, bullet whiz) via Web Audio API
- Game over screen with stats breakdown (hits, misses, accuracy %)

---

## Decisions & Notes

- Keep all game state in `gameRef` (mutable ref) for zero-re-render game loop performance; React state is only for UI display
- Draw functions are pure — they receive all needed data as parameters, no closures on game state
- `dropPoopRef`, `startGameRef`, `buyUpgradeRef` pattern avoids stale closure issues inside event listeners
- Leaderboard submit is fire-and-forget; never block game over screen on network
