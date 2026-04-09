# Spec: Mobile Controls

## Overview

On mobile (`isMobile = true`), the game enters a fullscreen overlay mode (`mobilePlay = true`)
once the player starts. Controls use a floating joystick on the left half and a poop button on the right.

---

## Joystick (left half)

The left 50% of the screen is a transparent touch zone.

**On touch start:**
- Record touch identifier and origin `(clientX, clientY)`
- Position the joystick base div at the touch origin (centering it)
- Fade joystick in (`opacity: 1`)

**On touch move:**
- Compute `dx, dy` from origin
- Clamp to `MAX_DIST = (JOYSTICK_SIZE - THUMB_SIZE) / 2 = 35px`
- Translate joystick thumb via CSS transform
- Map to `keysRef` keys:
  - `|dx| > MAX_DIST × 0.3` → `ArrowLeft` or `ArrowRight`
  - `|dy| > MAX_DIST × 0.3` → `ArrowUp` or `ArrowDown`

**On touch end / cancel:**
- Reset thumb transform, fade joystick out (`opacity: 0`)
- Remove all arrow keys from `keysRef`

**Constants:**
- `JOYSTICK_SIZE = 120px` (base circle diameter)
- `THUMB_SIZE = 50px`
- `MAX_DIST = 35px`
- `DEAD_ZONE = 0.3` (30% of max dist)

**Visual:** Green-tinted radial gradient base with crosshair lines; green gradient thumb.

---

## Poop Button (right side)

Absolutely positioned: `right: 5dvw`, `bottom: 5dvh`, `20dvh × 20dvh` (max 100×100px).

- `onTouchStart`: calls `dropPoop()` with `preventDefault`
- Brown radial gradient, poop emoji `💩` centered
- No interaction during non-playing states

---

## Safety Net: Stuck Controls

Three mechanisms to clear stuck keys/joystick state:

1. `window blur` — clears all keys and resets joystick
2. `document visibilitychange` — same
3. `window touchend/touchcancel` — checks if joystick touch ID is still in the active touches list; resets if gone

---

## Portrait Orientation Warning

When `isMobile && isPortrait && !portraitDismissed` (only during `mobilePlay`):
- Fixed full-screen overlay with dark background
- Rotating phone emoji animation (CSS keyframe)
- "Rotate your device" message
- "Continue anyway" button sets `portraitDismissed = true`

Auto-resets `portraitDismissed` to `false` when device returns to landscape.

---

## Fullscreen Toggle

A button appears top-right during `mobilePlay`:
- Uses `document.requestFullscreen()` / `document.exitFullscreen()`
- Icon: `Maximize` / `Minimize` from Lucide React
- State tracked via `fullscreenchange` event listener
