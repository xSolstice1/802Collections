/**
 * Monopoly Sound Engine
 * 
 * Web Audio API-based sound effects for the Razer-themed Monopoly game
 * Features: Dice rolls, purchases, upgrades, card draws, and ambient sounds
 */

export type SoundType = 
  | 'dice_roll'
  | 'dice_land'
  | 'purchase'
  | 'upgrade'
  | 'bankruptcy'
  | 'card_draw'
  | 'rent_paid'
  | 'jail'
  | 'power_use'
  | 'game_start'
  | 'game_end'
  | 'click'
  | 'hover'
  | 'error'
  | 'success';

interface SoundConfig {
  frequency: number;
  duration: number;
  type: OscillatorType;
  volume: number;
  delay?: number;
  sweep?: { from: number; to: number };
}

export class MonopolySoundEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private enabled: boolean = true;
  private musicEnabled: boolean = false;
  private musicOscillators: OscillatorNode[] = [];
  private bgmInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    try {
      // Check for saved preferences
      const savedEnabled = localStorage.getItem('monopoly-sound-enabled');
      const savedMusic = localStorage.getItem('monopoly-music-enabled');
      
      if (savedEnabled !== null) {
        this.enabled = savedEnabled === 'true';
      }
      if (savedMusic !== null) {
        this.musicEnabled = savedMusic === 'true';
      }
    } catch {
      // localStorage not available
    }
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = this.enabled ? 0.3 : 0;
    }
    return this.audioContext;
  }

  private playTone(config: SoundConfig): void {
    if (!this.enabled) return;

    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain!);

      oscillator.type = config.type;
      oscillator.frequency.setValueAtTime(config.frequency, ctx.currentTime);

      // Frequency sweep if configured
      if (config.sweep) {
        oscillator.frequency.exponentialRampToValueAtTime(
          config.sweep.to,
          ctx.currentTime + config.duration
        );
      }

      // Volume envelope
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(config.volume, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + config.duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + config.duration);

      // Cleanup
      setTimeout(() => {
        oscillator.disconnect();
        gainNode.disconnect();
      }, config.duration * 1000 + 100);
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }

  // ==========================================================================
  // Sound Effects
  // ==========================================================================

  playDiceRoll(): void {
    // Mechanical clicking sound
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        this.playTone({
          frequency: 800 + Math.random() * 400,
          duration: 0.05,
          type: 'square',
          volume: 0.15,
        });
      }, i * 80);
    }
  }

  playDiceLand(): void {
    // Satisfying thud
    this.playTone({
      frequency: 200,
      duration: 0.15,
      type: 'sine',
      volume: 0.3,
      sweep: { from: 300, to: 100 },
    });
    
    setTimeout(() => {
      this.playTone({
        frequency: 150,
        duration: 0.1,
        type: 'triangle',
        volume: 0.2,
      });
    }, 100);
  }

  playPurchase(): void {
    // Positive "cha-ching" sound
    this.playTone({
      frequency: 523.25, // C5
      duration: 0.15,
      type: 'sine',
      volume: 0.25,
    });
    
    setTimeout(() => {
      this.playTone({
        frequency: 659.25, // E5
        duration: 0.15,
        type: 'sine',
        volume: 0.25,
      });
    }, 100);
    
    setTimeout(() => {
      this.playTone({
        frequency: 783.99, // G5
        duration: 0.2,
        type: 'sine',
        volume: 0.25,
      });
    }, 200);
  }

  playUpgrade(): void {
    // Ascending build sound
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone({
          frequency: freq,
          duration: 0.12,
          type: 'sine',
          volume: 0.2,
        });
      }, i * 80);
    });
  }

  playBankruptcy(): void {
    // Dramatic descending sound
    this.playTone({
      frequency: 400,
      duration: 0.5,
      type: 'sawtooth',
      volume: 0.2,
      sweep: { from: 400, to: 100 },
    });
    
    setTimeout(() => {
      this.playTone({
        frequency: 80,
        duration: 0.3,
        type: 'sine',
        volume: 0.15,
      });
    }, 400);
  }

  playCardDraw(): void {
    // Card flip sound
    this.playTone({
      frequency: 1200,
      duration: 0.08,
      type: 'square',
      volume: 0.1,
    });
    
    setTimeout(() => {
      this.playTone({
        frequency: 800,
        duration: 0.06,
        type: 'square',
        volume: 0.08,
      });
    }, 60);
  }

  playRentPaid(): void {
    // Money transfer sound
    this.playTone({
      frequency: 440,
      duration: 0.1,
      type: 'sine',
      volume: 0.2,
      sweep: { from: 600, to: 400 },
    });
  }

  playJail(): void {
    // Jail cell door sound
    this.playTone({
      frequency: 200,
      duration: 0.3,
      type: 'sawtooth',
      volume: 0.2,
    });
    
    setTimeout(() => {
      this.playTone({
        frequency: 150,
        duration: 0.2,
        type: 'square',
        volume: 0.15,
      });
    }, 200);
  }

  playPowerUse(): void {
    // Sci-fi power activation
    this.playTone({
      frequency: 300,
      duration: 0.3,
      type: 'sawtooth',
      volume: 0.2,
      sweep: { from: 300, to: 900 },
    });
    
    setTimeout(() => {
      this.playTone({
        frequency: 900,
        duration: 0.2,
        type: 'sine',
        volume: 0.15,
      });
    }, 250);
  }

  playGameStart(): void {
    // Exciting start fanfare
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone({
          frequency: freq,
          duration: 0.2,
          type: 'sine',
          volume: 0.25,
        });
      }, i * 150);
    });
  }

  playGameEnd(): void {
    // Victory/defeat fanfare
    const notes = [783.99, 659.25, 523.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone({
          frequency: freq,
          duration: 0.3,
          type: 'sine',
          volume: 0.25,
        });
      }, i * 200);
    });
  }

  playClick(): void {
    this.playTone({
      frequency: 600,
      duration: 0.05,
      type: 'sine',
      volume: 0.1,
    });
  }

  playHover(): void {
    this.playTone({
      frequency: 800,
      duration: 0.03,
      type: 'sine',
      volume: 0.05,
    });
  }

  playError(): void {
    this.playTone({
      frequency: 200,
      duration: 0.2,
      type: 'sawtooth',
      volume: 0.15,
    });
  }

  playSuccess(): void {
    this.playTone({
      frequency: 880,
      duration: 0.15,
      type: 'sine',
      volume: 0.2,
    });
    
    setTimeout(() => {
      this.playTone({
        frequency: 1100,
        duration: 0.2,
        type: 'sine',
        volume: 0.2,
      });
    }, 100);
  }

  play(type: SoundType): void {
    switch (type) {
      case 'dice_roll': this.playDiceRoll(); break;
      case 'dice_land': this.playDiceLand(); break;
      case 'purchase': this.playPurchase(); break;
      case 'upgrade': this.playUpgrade(); break;
      case 'bankruptcy': this.playBankruptcy(); break;
      case 'card_draw': this.playCardDraw(); break;
      case 'rent_paid': this.playRentPaid(); break;
      case 'jail': this.playJail(); break;
      case 'power_use': this.playPowerUse(); break;
      case 'game_start': this.playGameStart(); break;
      case 'game_end': this.playGameEnd(); break;
      case 'click': this.playClick(); break;
      case 'hover': this.playHover(); break;
      case 'error': this.playError(); break;
      case 'success': this.playSuccess(); break;
    }
  }

  // ==========================================================================
  // Background Music (Ambient Cyberpunk)
  // ==========================================================================

  startBGM(): void {
    if (!this.enabled || !this.musicEnabled) return;
    if (this.bgmInterval) return;

    // Simple ambient drone
    const ctx = this.getAudioContext();
    
    const playDrone = () => {
      if (!this.musicEnabled) return;
      
      const baseFreqs = [55, 82.5, 110]; // Low ambient notes
      
      baseFreqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        filter.type = 'lowpass';
        filter.frequency.value = 200 + Math.random() * 100;
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 1);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 4);
        
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 4);
        
        this.musicOscillators.push(osc);
        
        setTimeout(() => {
          osc.disconnect();
          filter.disconnect();
          gain.disconnect();
        }, 4100);
      });
    };

    playDrone();
    this.bgmInterval = setInterval(playDrone, 4000);
  }

  stopBGM(): void {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    
    this.musicOscillators.forEach(osc => {
      try { osc.stop(); } catch { /* already stopped */ }
    });
    this.musicOscillators = [];
  }

  // ==========================================================================
  // Controls
  // ==========================================================================

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    localStorage.setItem('monopoly-sound-enabled', enabled.toString());
    
    if (this.masterGain) {
      this.masterGain.gain.value = enabled ? 0.3 : 0;
    }
    
    if (!enabled) {
      this.stopBGM();
    }
  }

  setMusicEnabled(enabled: boolean): void {
    this.musicEnabled = enabled;
    localStorage.setItem('monopoly-music-enabled', enabled.toString());
    
    if (!enabled) {
      this.stopBGM();
    } else if (this.enabled) {
      this.startBGM();
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  toggleEnabled(): boolean {
    this.setEnabled(!this.enabled);
    return this.enabled;
  }

  toggleMusic(): boolean {
    this.setMusicEnabled(!this.musicEnabled);
    return this.musicEnabled;
  }

  // ==========================================================================
  // Cleanup
  // ==========================================================================

  dispose(): void {
    this.stopBGM();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.masterGain = null;
    }
  }
}

// Singleton instance
export const monopolySoundEngine = new MonopolySoundEngine();

export default monopolySoundEngine;