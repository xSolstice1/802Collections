# Spec: Audio System

Source: `sound/MonopolySound.ts`

---

## Overview

All audio is generated procedurally using the **Web Audio API** — no pre-recorded files. This keeps the bundle small and allows dynamic, parameterized sound effects.

A singleton instance `monopolySoundEngine` is exported and called from `store/gameStore.ts` and `hooks/useMonopolyGame.ts` as a side effect after game actions.

---

## Architecture

```
MonopolySoundEngine
├── AudioContext           ← Single shared context (lazy init on first play)
├── masterGain             ← Global volume control
├── musicGain              ← Separate gain for background music
├── play(type, options?)   ← Trigger SFX
├── startMusic()           ← Begin ambient loop
├── stopMusic()            ← Stop ambient loop
├── setVolume(0–1)         ← Master volume
├── setMusicVolume(0–1)
├── toggleSound()
├── toggleMusic()
└── loadPreferences()      ← Read from localStorage
```

The `AudioContext` is created lazily on first user interaction to comply with browser autoplay policies.

---

## Sound Effects (15 types)

| SFX Key | Trigger | Description |
|---|---|---|
| `dice_roll` | Roll button pressed | Rapid filtered noise burst with frequency sweep |
| `dice_land` | Dice value settled | Short percussive thud |
| `purchase` | Property bought | Ascending chord arpeggio |
| `upgrade` | Property upgraded | Bright ascending tone sweep |
| `bankruptcy` | Player goes bankrupt | Descending drone fade-out |
| `card_draw` | Card drawn from deck | Soft whoosh + paper flutter |
| `rent_paid` | Rent transferred | Coin-drop cascade |
| `jail` | Player sent to jail | Low metallic clang |
| `power_use` | Corporate power activated | Electronic charge-up burst |
| `game_start` | Game begins | Energetic fanfare sequence |
| `game_end` | Winner declared | Extended victory fanfare |
| `click` | UI button press | Short tick (50 ms) |
| `hover` | UI hover (debounced) | Very short soft tick (20 ms) |
| `error` | Invalid action | Low buzz |
| `success` | Action confirmed | Short positive chime |

---

## Background Music

- **Style**: Ambient cyberpunk drone.
- **Generation**: Multiple sine oscillators at harmonically related frequencies, slight detuning for warmth.
- **Loop**: 4-second buffer, loops indefinitely.
- **Start**: Called on game start event.
- **Stop**: Called on game end or page unload.
- **Gain**: Separate `musicGain` node, independently controlled.

---

## Oscillator & Signal Chain

```
Oscillator(s)  →  Gain (envelope)  →  Filter (optional)  →  masterGain  →  destination
```

- **Attack/decay envelopes**: Applied via `gainNode.gain.setTargetAtTime` for smooth onset/release.
- **Frequency sweeps**: `oscillator.frequency.linearRampToValueAtTime` for pitch slides.
- **Oscillator types**: `sine`, `square`, `triangle`, `sawtooth` — chosen per SFX character.
- **Noise**: `AudioBuffer` filled with `Math.random() * 2 - 1` for percussion/noise bursts.

---

## Preferences Persistence

Sound settings are saved to `localStorage` under the key `monopoly-sound-prefs`:

```typescript
interface SoundPrefs {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;        // 0–1
  musicVolume: number;   // 0–1
}
```

`loadPreferences()` is called at engine construction. Settings modal calls `toggleSound`, `toggleMusic`, `setVolume`, and `setMusicVolume`; each persists immediately to `localStorage`.

---

## Usage Pattern

```typescript
// In store action (fire and forget)
monopolySoundEngine.play('purchase');
monopolySoundEngine.play('dice_roll');

// Volume control (from settings modal)
monopolySoundEngine.setVolume(0.7);
monopolySoundEngine.toggleMusic();
```

Sound calls are never awaited; audio failures are silently swallowed to avoid blocking game logic.

---

## Browser Compatibility

Web Audio API is supported in all modern browsers (Chrome 66+, Firefox 76+, Safari 14+). No polyfill is included. On unsupported browsers, `AudioContext` construction will throw; the engine catches this and sets `soundEnabled = false`.
