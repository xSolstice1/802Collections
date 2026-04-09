# Spec: Rendering System

## Canvas Setup

- Resolution: 800×400 (CANVAS_W × CANVAS_H)
- Ground line: y = 350 (GROUND_Y)
- Sky region: y = 0 to GROUND_Y (gradient: `#0a0a0a` → `#1a1a2e`)
- Ground strip: y = GROUND_Y to CANVAS_H (fill `#1f2937`, green border line)
- Road dashes: scrolling dotted line at `GROUND_Y + 15`, dash every 40px

CSS: `imageRendering: pixelated`, `object-fit: contain` for responsive scaling.

---

## Draw Functions

All draw functions are pure — they take `ctx` + entity data, draw to canvas, restore state.

### Bird draw functions

All bird draw functions share the same `DrawBirdFn` signature:

```ts
(ctx: CanvasRenderingContext2D, x: number, y: number, wingUp: boolean, flash: boolean) => void
```

The active species is stored as `selectedSkinRef: MutableRefObject<DrawBirdFn>` and called
directly in the game loop. See `specs/bird-skins.md` for the full species catalog.

**`drawBird` (Classic Parakeet)** — parts drawn back to front:
1. Tail feathers — filled polygon
2. Body shadow — dark ellipse offset down
3. Main body — radial gradient ellipse (light green center → dark edge)
4. Body outline — dark green stroke
5. Belly highlight — white translucent ellipse
6. Wing — ellipse with linear gradient; position depends on `wingUp`; feather lines as strokes
7. Eye white + shadow → iris → eye shine
8. Beak — linear gradient quadratic curve; divider line; blush mark

When `flash = true`: `ctx.globalAlpha = 0.5` for the entire draw (applies to all species).

### `drawPedestrian(ctx, p)`
Parts: shadow → poop splat on head (if `p.hit`) → legs + shoes → torso (gradient) →
arms → head (radial gradient) → hair → eyes (X when hit, dots when normal) → smile/frown.

Leg swing animated via `Math.sin(p.x × 0.1)`.

### `drawHunter(ctx, h)`
Parts: shadow → legs + boots → vest (gradient) → vest pockets → ammo belt →
gun arm → rifle (rotated rect) → front arm → head (radial gradient) →
safari hat (brim + crown + band) → angry eyes + pupils + eyebrows → grim mouth → stubble dots.

Leg swing animated via `Math.sin(h.x × 0.08)`.

### `drawBullet(ctx, b)`
1. Compute angle from `(b.vx, b.vy)`
2. Draw trail (red translucent line, 12px behind)
3. Draw bullet body (yellow ellipse, rotated to angle, with shadow glow)
4. Draw tip highlight (small white ellipse)

### `drawPoop(ctx, p)`
Three stacked ellipses (bottom wide → top narrow) with radial gradient.
Highlight ellipse for sheen.
Two wavy stink lines above.
Scale factor `s = p.w / BASE_POOP_W` applied to all sizes (supports size upgrades).

### `drawHeart(ctx, cx, cy, size)`
Red bezier-curve heart shape. Used for lives display in HUD.

### `drawCoin(ctx, cx, cy, r)`
Yellow filled circle with `$` character in center. Used in HUD and upgrade screen.

---

## HUD Layout

Drawn every frame during `playing` state, on top of entities.

| Element | Position | Style |
|---|---|---|
| Score | top-left (16, 30) | bold 18px JetBrains Mono, green |
| Level label | top-left (16, 48) | bold 13px JetBrains Mono, yellow |
| Level progress bar | (62, 40), 80px wide | grey bg, yellow fill proportional to progress |
| Lives (hearts) | top-center, row of hearts | centered, 24px apart |
| Coins | top-right area | coin icon + count |
| Best score | top-right (CANVAS_W-16, 30) | right-aligned, grey |

---

## Countdown Overlay

When `countdownTimer > 0` during `playing`:
- Semi-transparent black overlay (`rgba(0,0,0,0.35)`)
- Pulsing number (scale from 1.0 to 1.3 within each second)
- "Level N" label below the number
- "Get ready!" hint text

---

## Idle / Game Over Screens

Drawn via `useEffect` when `gameState !== 'playing'`.

- Same sky + ground background
- Bird drawn at center (wing up, no flash)
- `idle`: title text + "Press SPACE to start" + controls hint
- `over`: "GAME OVER" (red) + final score + level + "New High Score!" if applicable
- `upgrading`: delegates to `drawUpgradeScreen` (see upgrades spec)

---

## Coordinate Mapping (clientToCanvas)

For click/touch on the canvas element (which may be letterboxed via `object-fit: contain`):
1. Get element bounding rect
2. Compute actual render area (accounting for aspect ratio vs element size)
3. Compute offsets (letterbox bars)
4. Map client coords to canvas coords via linear scale

Returns `null` if click falls outside the rendered area.
