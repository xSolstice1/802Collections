# Spec: Bird Species System

## Overview

Players choose a bird species before starting a game. Each species has its own
custom draw function — not a color palette swap, but a fully distinct visual design.
Species are cosmetic only; no stat changes. Unlocked by reaching score milestones.

**Status: Implemented**

---

## Architecture — `DrawBirdFn`

```ts
// skins.ts
export type DrawBirdFn = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  wingUp: boolean,
  flash: boolean
) => void;

export interface BirdSkin {
  id: string;
  name: string;
  draw: DrawBirdFn;
  unlockScore: number;
}
```

Each species is a standalone file in `renderers/`. The game loop calls:

```ts
selectedSkinRef.current(ctx, g.birdX, g.birdY, g.wingUp, g.hitFlash > 0 && g.hitFlash % 4 < 2);
```

`selectedSkinRef` is a `MutableRefObject<DrawBirdFn>` updated every render from React state,
so the game loop always uses the latest selection with zero re-renders.

---

## Species Catalog

| ID | Name | File | Key Visual Features | Unlock |
|---|---|---|---|---|
| `classic` | Parakeet | `drawBird.ts` | Green body, radial gradient, yellow beak | Free |
| `magpie` | Magpie | `drawBirdMagpie.ts` | Black/white, long iridescent blue-green tail | Free |
| `cockatiel` | Cockatiel | `drawBirdCrowned.ts` | Grey body, yellow face patch, orange cheek, erect yellow crest | 250 |
| `owl` | Owl | `drawBirdOwl.ts` | Warm brown, cream facial disk, ear tufts, two large yellow forward-facing eyes | 500 |
| `toucan` | Toucan | `drawBirdToucan.ts` | Glossy black, white bib, massive bill (green→yellow→orange→red) | 1500 |
| `eagle` | Eagle | `drawBirdEagle.ts` | Dark brown body, white head & tail, large hooked yellow beak | 3000 |

---

## Draw Function Coordinate System

All draw functions share the same signature and use `BIRD_W=36, BIRD_H=28`:

- `(x, y)` — top-left corner of bounding box
- `cx = x + BIRD_W/2`, `cy = y + BIRD_H/2` — body centre
- Bird faces **right** (beak on right, tail on left)
- Beak extends up to ~+17px past `x + BIRD_W` (toucan; most others ~+10px)
- Wing up: ellipse above body; wing down: ellipse below body
- `flash = true`: `ctx.globalAlpha = 0.5` for hit-flash effect

---

## UI — Skin Selector

Shown only when `gameState === 'idle'` (hidden during play, over, upgrading).

- Rendered as a DOM card below the leaderboard button
- 6-column grid (3 on mobile), one button per species
- Each button contains a `SkinPreview` canvas (80×52px, `imageRendering: pixelated`)
  that calls `draw(ctx, 12, 14, true, false)` directly
- Locked species show a lock icon + score threshold overlay
- Active species highlighted with brand border (`#44D62C`)
- Selection persisted to `localStorage` key `birdshit-skin`

---

## Adding a New Species

1. Create `renderers/drawBirdXxx.ts` — implement `DrawBirdFn` signature
2. Export from `renderers/index.ts`
3. Add entry to `BIRD_SKINS` array in `skins.ts` with an `id`, `name`, `draw`, `unlockScore`

No changes needed to the game loop or component.
