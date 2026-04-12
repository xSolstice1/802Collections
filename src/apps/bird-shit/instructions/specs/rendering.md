# Spec: Rendering System

## Canvas Setup

- Resolution: `800×400` (`CANVAS_W × CANVAS_H`)
- Ground line: `y = 350` (`GROUND_Y`)
- Sky region: `y = 0` to `GROUND_Y` — gradient colors from active biome
- Ground strip: `y = GROUND_Y` to `CANVAS_H` — fill + border from active biome
- Road dashes: scrolling dotted line at `GROUND_Y + 15`, dash every 40px, offset by `(time × scrollSpeed) % 40`

CSS: `imageRendering: pixelated`, `object-fit: contain` for responsive scaling.

---

## Biome Rendering

Each biome defines:
- `skyGradient: [top, bottom]` — two CSS color stops for sky gradient
- `groundColor` — ground fill
- `groundLineColor` — ground border stroke
- `dashColor` — road dash stroke
- `windForce` — horizontal force applied to poops in flight (px/s²)

6 biomes total (e.g. city night, desert, forest, snow, etc.). Selected at game start.

---

## Draw Functions

All draw functions are pure — take `ctx` + entity data, draw, restore state.

### Bird draw functions

All share `DrawBirdFn` signature:
```ts
(ctx: CanvasRenderingContext2D, x: number, y: number, wingUp: boolean, flash: boolean) => void
```
`flash = true` → `ctx.globalAlpha = 0.5` for entire draw.

Called in game loop:
```ts
selectedSkinRef.current(ctx, g.birdX, g.birdY, g.wingUp,
  g.hitFlash > 0 && Math.floor(g.hitFlash * 60) % 4 < 2);
```

See `specs/bird-skins.md` for full species catalog.

### `drawPedestrian(ctx, p)`
Parts: shadow → poop splat on head (if `p.hit`) → legs + shoes → torso (gradient) →
arms → head (radial gradient) → hair → eyes (X when hit, dots when normal) → smile/frown.
Leg swing: `Math.sin(p.x × 0.1)`.

### `drawHunter(ctx, h)`
Parts: shadow → legs + boots → vest (gradient) → vest pockets → ammo belt →
gun arm → rifle (rotated rect) → front arm → head (radial gradient) →
safari hat → angry eyes + pupils + eyebrows → grim mouth → stubble dots.
Leg swing: `Math.sin(h.x × 0.08)`.

### `drawObstacle(ctx, obs)`
Building silhouette with procedural windows. Window pattern seeded from `obs.windowOffset`.

### `drawBalloon(ctx, bal, frame)`
Colored oval balloon with string, highlight, and subtle sway. Color from `BALLOON_COLORS[bal.colorIndex]`.

### `drawBullet(ctx, b)`
1. Angle from `(b.vx, b.vy)`
2. Red translucent trail (12px behind)
3. Yellow ellipse rotated to angle, with shadow glow
4. White tip highlight

### `drawPoop(ctx, p)`
Three stacked ellipses (bottom wide → top narrow) with radial gradient.
Highlight ellipse for sheen. Two wavy stink lines above.
Scale: `s = p.w / BASE_POOP_W` (supports size upgrades).

### `drawHeart(ctx, cx, cy, size)`
Red bezier-curve heart. Used for lives in HUD.

### `drawCoin(ctx, cx, cy, r)`
Yellow circle with `$` character. Used in HUD.

---

## Effects Rendering (inline in game loop)

All effects are stored in `gameRef` arrays and rendered + updated each frame.

### Toxic Puddles (`g.toxicPuddles`)
- Green `rgba(34, 197, 94, alpha)` filled rect at ground level
- Alpha fades as `life` decreases
- Damages enemies overlapping the rect every 0.5s tick
- Duration: `3 + toxicPoop` seconds

### Ground Trails (`g.groundTrails`)
- Golden `rgba(251, 191, 36, alpha)` filled circle (3px radius)
- Rendered at poop's bottom position while in flight
- Damages enemies touching trail (within 10px x, 15px y)
- Duration: 2s

### Lightning Arcs (`g.lightningArcs`)
- Blue `rgba(96, 165, 250, alpha)` jagged line between two points
- 5-segment path with `±12px` random jitter per segment
- Visual only; damage applied at hit time, not per frame
- Duration: ~0.25s (alpha = `min(1, life × 4)`)

### Splash Effects (`g.splashEffects`)
- Orange expanding ring: `rgba(255, 160, 30, alpha)` stroke
- Inner flash: `rgba(255, 220, 80, alpha)` fill at first 30% of animation
- Ring grows from 0 to `fx.radius (80px)` over `SPLASH_DURATION (0.35s)`
- Alpha fades from 0.8 → 0
- Triggered by `scatterBomb` on any poop impact

---

## HUD Layout

Drawn every frame during `playing` state, rendered on top of entities.

| Element | Position | Style |
|---|---|---|
| Score | top-left (16, 30) | bold 18px JetBrains Mono, green (`#44D62C`) |
| Level label | top-left (16, 48) | bold 13px JetBrains Mono, yellow |
| Level progress bar | (62, 40), 80px wide | grey bg, yellow fill |
| Combo | top-left, below level | shown when combo > 0; yellow, fades with timer |
| Lives (hearts) | top-center | row of red bezier hearts |
| Coins | near top-center | coin icon + count |
| Shield indicator | near lives | shown when featherShield active; blue icon |
| Best score | top-right | right-aligned, grey |

---

## Boss Rendering

Each boss has its own `draw(ctx, boss, time)` function in `bosses/`.

Boss HP bar drawn at bottom-center:
- `160px × 10px` bar at `(CANVAS_W/2 - 80, CANVAS_H - 20)`
- Color: green (>50% HP) → yellow (25–50%) → red (<25%)
- Boss name displayed above bar

Boss intro overlay: semi-transparent black + "BOSS FIGHT!" text for `introTimer` duration.

---

## Countdown Overlay

When `countdownTimer > 0` during `playing`:
- Semi-transparent black overlay (`rgba(0,0,0,0.35)`)
- Pulsing number (scale 1.0 → 1.3 within each second)
- "Level N" label below
- "Get ready!" hint text

---

## Card Selection Overlay (`CardSelectionOverlay.tsx`)

DOM overlay (not canvas). Renders when `gameState === 'upgrading'`.

- **Normal mode** (≤4 cards): horizontal flex row, up to 600px wide
- **Dev mode** (>4 cards): 4-column CSS grid, scrollable, up to 680px wide
- Each card: rarity border color, rarity badge, icon, name, description (hidden in grid)
- "DEV: all cards" badge shown in grid mode
- Click selects card with 300ms delay (prevents double-click)

---

## Relic Selection Overlay (`RelicSelectionOverlay.tsx`)

DOM overlay. Renders when `gameState === 'relic_select'`.
Similar card-style layout, 3 relics offered, no stacks.

---

## Idle / Game Over Screens

Drawn via `useEffect` when `gameState !== 'playing'` and not `upgrading`.

- Same sky + ground background (dark static gradient, not biome)
- Bird drawn at center (wing up, no flash)
- `idle`: title + "Press SPACE to start" + controls hint
- `over`: "GAME OVER" (red) + score + level + "New High Score!" if applicable
