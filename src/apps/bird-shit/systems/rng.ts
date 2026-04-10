/**
 * Mulberry32 — a simple, fast seeded PRNG.
 * Deterministic: same seed → same sequence of numbers.
 */
export class SeededRNG {
  private state: number;
  readonly seed: number;

  constructor(seed: number) {
    this.seed = seed;
    this.state = seed;
  }

  /** Returns a float in [0, 1) */
  next(): number {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Returns an integer in [min, max] inclusive */
  nextInt(min: number, max: number): number {
    return min + Math.floor(this.next() * (max - min + 1));
  }

  /** Returns a float in [min, max) */
  nextFloat(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  /** Shuffle array in place (Fisher-Yates) */
  shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /** Reset to initial seed */
  reset() {
    this.state = this.seed;
  }
}

/** Generate a seed from a date string (YYYYMMDD) for daily challenges */
export function dailySeed(date?: Date): number {
  const d = date ?? new Date();
  const str = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  // Simple hash
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return hash >>> 0; // unsigned
}

/** Generate a random seed */
export function randomSeed(): number {
  return (Math.random() * 0xffffffff) >>> 0;
}
