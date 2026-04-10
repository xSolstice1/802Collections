/**
 * Bird Shit Simulator Sound System
 * Uses Web Audio API to generate all sounds programmatically — no audio files.
 */

export type BSSoundType =
  | 'poop_drop'
  | 'poop_hit_ped'
  | 'poop_hit_hunter'
  | 'poop_hit_balloon'
  | 'bullet_hit'
  | 'level_up'
  | 'game_over'
  | 'game_start'
  | 'boss_intro'
  | 'boss_hit'
  | 'boss_defeat'
  | 'card_select';

export class BirdShitSoundManager {
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private bgmPlaying = false;
  private bgmOscillators: OscillatorNode[] = [];
  private muted = false;
  private sfxVolume = 0.3;
  private bgmVolume = 0.15;

  private getContext(): AudioContext {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.connect(this.audioCtx.destination);
      this.masterGain.gain.value = 1;
    }
    return this.audioCtx;
  }

  init() {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.masterGain) this.masterGain.gain.value = muted ? 0 : 1;
  }

  isMuted() { return this.muted; }

  setSFXVolume(v: number) { this.sfxVolume = Math.max(0, Math.min(1, v)); }
  setBGMVolume(v: number) {
    this.bgmVolume = Math.max(0, Math.min(1, v));
    if (this.bgmGain) this.bgmGain.gain.value = this.bgmVolume;
  }

  getSFXVolume() { return this.sfxVolume; }
  getBGMVolume() { return this.bgmVolume; }
  isBGMPlaying() { return this.bgmPlaying; }

  private playTone(
    freq: number, dur: number,
    type: OscillatorType = 'sine',
    volume = this.sfxVolume,
    startDelay = 0,
  ) {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t = ctx.currentTime + startDelay;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(t);
    osc.stop(t + dur);
  }

  private playNoise(dur: number, volume: number, startDelay = 0) {
    const ctx = this.getContext();
    const bufSize = ctx.sampleRate * dur;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const gain = ctx.createGain();
    const t = ctx.currentTime + startDelay;
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(gain);
    gain.connect(this.masterGain!);
    src.start(t);
    src.stop(t + dur);
  }

  play(type: BSSoundType) {
    switch (type) {
      case 'poop_drop': return this.playPoopDrop();
      case 'poop_hit_ped': return this.playPoopHitPed();
      case 'poop_hit_hunter': return this.playPoopHitHunter();
      case 'poop_hit_balloon': return this.playPoopHitBalloon();
      case 'bullet_hit': return this.playBulletHit();
      case 'level_up': return this.playLevelUp();
      case 'game_over': return this.playGameOver();
      case 'game_start': return this.playGameStart();
      case 'boss_intro': return this.playBossIntro();
      case 'boss_hit': return this.playBossHit();
      case 'boss_defeat': return this.playBossDefeat();
      case 'card_select': return this.playCardSelect();
    }
  }

  // Wet splat — short descending tone + noise burst
  private playPoopDrop() {
    this.playTone(300, 0.08, 'sine', this.sfxVolume * 0.4);
    this.playTone(180, 0.06, 'triangle', this.sfxVolume * 0.3, 0.02);
  }

  // Satisfying splat on pedestrian — wet impact
  private playPoopHitPed() {
    this.playNoise(0.12, this.sfxVolume * 0.4);
    this.playTone(200, 0.1, 'square', this.sfxVolume * 0.3);
    this.playTone(120, 0.15, 'sine', this.sfxVolume * 0.2, 0.05);
  }

  // Heavier splat on hunter — more impactful
  private playPoopHitHunter() {
    this.playNoise(0.15, this.sfxVolume * 0.5);
    this.playTone(160, 0.12, 'sawtooth', this.sfxVolume * 0.4);
    this.playTone(100, 0.18, 'sine', this.sfxVolume * 0.3, 0.05);
    this.playTone(600, 0.05, 'sine', this.sfxVolume * 0.2, 0.08); // coin ding
  }

  // Pop on balloon
  private playPoopHitBalloon() {
    this.playNoise(0.06, this.sfxVolume * 0.3);
    this.playTone(800, 0.08, 'sine', this.sfxVolume * 0.4);
    this.playTone(1200, 0.05, 'sine', this.sfxVolume * 0.2, 0.03);
  }

  // Getting hit by bullet — sharp pain
  private playBulletHit() {
    this.playTone(400, 0.08, 'sawtooth', this.sfxVolume * 0.6);
    this.playTone(200, 0.15, 'square', this.sfxVolume * 0.4, 0.03);
    this.playNoise(0.1, this.sfxVolume * 0.3, 0.02);
  }

  // Ascending fanfare
  private playLevelUp() {
    [523, 659, 784, 1047].forEach((freq, i) => {
      this.playTone(freq, 0.2, 'sine', this.sfxVolume * 0.7, i * 0.1);
    });
  }

  // Descending wah-wah
  private playGameOver() {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.8);
    gain.gain.setValueAtTime(this.sfxVolume * 0.6, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.9);
    this.playTone(100, 0.7, 'square', this.sfxVolume * 0.3, 0.1);
  }

  // Cheerful start jingle
  private playGameStart() {
    [392, 523, 659, 784].forEach((freq, i) => {
      this.playTone(freq, 0.15, 'sine', this.sfxVolume * 0.6, i * 0.08);
    });
  }

  // Ominous boss warning
  private playBossIntro() {
    this.playTone(80, 0.6, 'sawtooth', this.sfxVolume * 0.5);
    this.playTone(85, 0.5, 'square', this.sfxVolume * 0.3, 0.1);
    this.playTone(160, 0.3, 'sawtooth', this.sfxVolume * 0.4, 0.4);
  }

  // Short thud on boss damage
  private playBossHit() {
    this.playTone(250, 0.08, 'square', this.sfxVolume * 0.5);
    this.playNoise(0.06, this.sfxVolume * 0.3);
  }

  // Triumphant boss defeat
  private playBossDefeat() {
    [523, 659, 784, 1047, 1319].forEach((freq, i) => {
      this.playTone(freq, 0.25, 'sine', this.sfxVolume * 0.8, i * 0.12);
    });
    this.playTone(1319, 0.6, 'triangle', this.sfxVolume * 0.4, 0.6);
  }

  // Subtle card pick confirmation
  private playCardSelect() {
    this.playTone(600, 0.08, 'sine', this.sfxVolume * 0.4);
    this.playTone(900, 0.1, 'sine', this.sfxVolume * 0.3, 0.06);
  }

  // Retro chiptune BGM loop
  startBGM() {
    if (this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;

    const ctx = this.getContext();
    this.bgmGain = ctx.createGain();
    this.bgmGain.gain.value = this.bgmVolume;
    this.bgmGain.connect(this.masterGain!);

    const melody = [
      { freq: 392, dur: 0.2 },   // G4
      { freq: 440, dur: 0.2 },   // A4
      { freq: 523, dur: 0.2 },   // C5
      { freq: 440, dur: 0.2 },   // A4
      { freq: 349, dur: 0.3 },   // F4
      { freq: 330, dur: 0.2 },   // E4
      { freq: 294, dur: 0.2 },   // D4
      { freq: 330, dur: 0.3 },   // E4
      { freq: 392, dur: 0.4 },   // G4 (hold)
      { freq: 349, dur: 0.2 },   // F4
      { freq: 330, dur: 0.2 },   // E4
      { freq: 294, dur: 0.4 },   // D4 (hold)
    ];

    const totalDuration = melody.reduce((s, n) => s + n.dur, 0);

    const loopBGM = () => {
      if (!this.bgmPlaying) return;
      let t = 0;
      for (const note of melody) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = note.freq;
        const start = ctx.currentTime + t;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.25, start + 0.01);
        gain.gain.setValueAtTime(0.25, start + note.dur * 0.8);
        gain.gain.linearRampToValueAtTime(0, start + note.dur);
        osc.connect(gain);
        gain.connect(this.bgmGain!);
        osc.start(start);
        osc.stop(start + note.dur);
        this.bgmOscillators.push(osc);
        t += note.dur;
      }
      setTimeout(loopBGM, totalDuration * 1000);
    };

    loopBGM();
  }

  stopBGM() {
    this.bgmPlaying = false;
    for (const osc of this.bgmOscillators) {
      try { osc.stop(); } catch { /* already stopped */ }
    }
    this.bgmOscillators = [];
    if (this.bgmGain) {
      this.bgmGain.disconnect();
      this.bgmGain = null;
    }
  }

  destroy() {
    this.stopBGM();
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.masterGain = null;
  }
}

export const birdShitSound = new BirdShitSoundManager();
