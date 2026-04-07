/**
 * Snake Game Sound System
 * Uses Web Audio API to generate all sounds programmatically
 */

export class SnakeSoundManager {
  private audioCtx: AudioContext | null = null;
  private bgmPlaying = false;
  private bgmOscillators: OscillatorNode[] = [];
  private bgmGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private muted = false;
  private bgmVolume = 0.15;
  private sfxVolume = 0.3;

  constructor() {}

  private getContext(): AudioContext {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.connect(this.audioCtx.destination);
      this.masterGain.gain.value = 1;
    }
    return this.audioCtx;
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.masterGain) {
      this.masterGain.gain.value = muted ? 0 : 1;
    }
  }

  setBGMVolume(volume: number) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));
    if (this.bgmGain) {
      this.bgmGain.gain.value = this.bgmVolume;
    }
  }

  setSFXVolume(volume: number) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  isMuted(): boolean {
    return this.muted;
  }

  isBGMPlaying(): boolean {
    return this.bgmPlaying;
  }

  // Initialize audio context (must be called after user interaction)
  init() {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
  }

  // Play a simple tone
  private playTone(
    frequency: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = this.sfxVolume,
    startTime = 0
  ) {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = frequency;

    gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration);
  }

  // Eat sound - satisfying crunch
  playEat() {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Main crunch tone
    osc.type = 'square';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(this.sfxVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);

    // Add a click component
    this.playTone(800, 0.05, 'sine', this.sfxVolume * 0.5, 0);
    this.playTone(1200, 0.03, 'square', this.sfxVolume * 0.3, 0.02);
  }

  // Powerup pickup sound
  playPowerup() {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523, ctx.currentTime); // C5
    osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
    osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
    osc.frequency.setValueAtTime(1047, ctx.currentTime + 0.3); // C6

    gain.gain.setValueAtTime(this.sfxVolume, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(this.sfxVolume * 1.2, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);

    // Add sparkle
    this.playTone(1568, 0.3, 'sine', this.sfxVolume * 0.3, 0.2);
  }

  // Death/crash sound
  playDeath() {
    const ctx = this.getContext();

    // Low rumble
    this.playTone(150, 0.5, 'sawtooth', this.sfxVolume * 0.8);
    this.playTone(100, 0.6, 'square', this.sfxVolume * 0.5, 0.1);

    // Descending tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(this.sfxVolume * 0.6, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.7);
  }

  // Direction change sound (subtle)
  playDirectionChange() {
    this.playTone(600, 0.03, 'sine', this.sfxVolume * 0.15);
  }

  // Game start sound
  playStart() {
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      this.playTone(freq, 0.2, 'sine', this.sfxVolume * 0.8, i * 0.1);
    });
  }

  // Level up / combo sound
  playCombo() {
    const notes = [523, 659, 784, 1047, 1319]; // C5, E5, G5, C6, E6

    notes.forEach((freq, i) => {
      this.playTone(freq, 0.15, 'sine', this.sfxVolume * 0.7, i * 0.08);
    });
  }

  // Chaos event sound
  playChaosEvent() {
    const ctx = this.getContext();

    // Warning siren
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.2);
    osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(this.sfxVolume * 0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  }

  // Stone landing sound (crazy mode)
  playStoneLand() {
    this.playTone(80, 0.3, 'square', this.sfxVolume * 0.6);
    this.playTone(60, 0.4, 'sawtooth', this.sfxVolume * 0.4, 0.1);
  }

  // Wall hit sound
  playWallHit() {
    this.playTone(200, 0.1, 'square', this.sfxVolume * 0.5);
    this.playTone(150, 0.15, 'sawtooth', this.sfxVolume * 0.3, 0.05);
  }

  // Background music - retro style
  startBGM() {
    if (this.bgmPlaying) return;

    this.init();
    this.bgmPlaying = true;

    const ctx = this.getContext();
    this.bgmGain = ctx.createGain();
    this.bgmGain.gain.value = this.bgmVolume;
    this.bgmGain.connect(this.masterGain!);

    // Simple retro bass line pattern
    const bassLine = [
      { freq: 130.81, dur: 0.25 }, // C3
      { freq: 130.81, dur: 0.25 },
      { freq: 146.83, dur: 0.25 }, // D3
      { freq: 164.81, dur: 0.25 }, // E3
      { freq: 174.61, dur: 0.25 }, // F3
      { freq: 174.61, dur: 0.25 },
      { freq: 164.81, dur: 0.25 },
      { freq: 146.83, dur: 0.25 },
      { freq: 130.81, dur: 0.5 }, // C3 (longer)
      { freq: 116.54, dur: 0.25 }, // Bb2
      { freq: 130.81, dur: 0.25 }, // C3
      { freq: 146.83, dur: 0.5 }, // D3 (longer)
    ];

    const loopBGM = () => {
      if (!this.bgmPlaying) return;

      let time = 0;
      bassLine.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.value = note.freq;

        gain.gain.setValueAtTime(0, ctx.currentTime + time);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + time + 0.01);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + time + note.dur * 0.8);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + time + note.dur);

        osc.connect(gain);
        gain.connect(this.bgmGain!);

        osc.start(ctx.currentTime + time);
        osc.stop(ctx.currentTime + time + note.dur);

        this.bgmOscillators.push(osc);

        time += note.dur;
      });

      // Loop
      const totalDuration = bassLine.reduce((sum, n) => sum + n.dur, 0);
      setTimeout(loopBGM, totalDuration * 1000);
    };

    loopBGM();
  }

  stopBGM() {
    this.bgmPlaying = false;
    this.bgmOscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {
        // Already stopped
      }
    });
    this.bgmOscillators = [];
    if (this.bgmGain) {
      this.bgmGain.disconnect();
      this.bgmGain = null;
    }
  }

  // Cleanup
  destroy() {
    this.stopBGM();
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.masterGain = null;
  }
}

// Export singleton instance
export const snakeSoundManager = new SnakeSoundManager();