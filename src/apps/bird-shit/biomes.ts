export interface Biome {
  id: string;
  name: string;
  icon: string;
  skyGradient: [string, string];
  groundColor: string;
  groundLineColor: string;
  dashColor: string;
  windForce: number;           // px/s² applied to poop vx
  visibilityRadius: number;    // 0 = full visibility, >0 = spotlight radius around bird
  balloonSpawnMult: number;    // multiplier on balloon spawn rate
  hunterSpawnMult: number;     // multiplier on hunter spawn rate
}

export const BIOMES: Biome[] = [
  {
    id: 'city', name: 'City', icon: '🌇',
    skyGradient: ['#0a0a0a', '#1a1a2e'],
    groundColor: '#1f2937', groundLineColor: '#44D62C', dashColor: '#374151',
    windForce: 0, visibilityRadius: 0,
    balloonSpawnMult: 1, hunterSpawnMult: 1,
  },
  {
    id: 'beach', name: 'Beach', icon: '🏖️',
    skyGradient: ['#1a3a5c', '#87CEEB'],
    groundColor: '#c2b280', groundLineColor: '#fbbf24', dashColor: '#a89060',
    windForce: 40, visibilityRadius: 0,
    balloonSpawnMult: 0.8, hunterSpawnMult: 0.7,
  },
  {
    id: 'night', name: 'Night', icon: '🌙',
    skyGradient: ['#000000', '#0a0a14'],
    groundColor: '#111827', groundLineColor: '#22c55e', dashColor: '#1f2937',
    windForce: 0, visibilityRadius: 120,
    balloonSpawnMult: 0.6, hunterSpawnMult: 1.3,
  },
  {
    id: 'festival', name: 'Festival', icon: '🎉',
    skyGradient: ['#1a0a2e', '#2e1a4a'],
    groundColor: '#1f2937', groundLineColor: '#ec4899', dashColor: '#4a1a5e',
    windForce: 0, visibilityRadius: 0,
    balloonSpawnMult: 2.5, hunterSpawnMult: 0.9,
  },
];

/** Pick a random biome for a run (or a specific one by id) */
export function pickBiome(id?: string): Biome {
  if (id) {
    const found = BIOMES.find((b) => b.id === id);
    if (found) return found;
  }
  return BIOMES[Math.floor(Math.random() * BIOMES.length)];
}
