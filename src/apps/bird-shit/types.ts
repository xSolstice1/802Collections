export interface Upgrades {
  poopSpeed: number;
  poopSize: number;
  birdSpeed: number;
  extraLife: number;
  splitPoop: number;
  homingPoop: number;
  // Card-system additions
  damage: number;          // bonus damage per poop hit (base = 1)
  coinBonus: number;       // extra coins per hit
  toxicPoop: number;       // toxic puddle stacks
  scatterBomb: number;     // AoE explosion on impact
  featherShield: number;   // block 1 hit every 15s
  goldenGut: number;       // damaging ground trails
  stormGut: number;        // chain lightning on hit
}

export interface UpgradeDef {
  key: keyof Upgrades;
  name: string;
  desc: string[];
  maxLevel: number;
  costs: number[];
}

export interface Entity {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Pedestrian extends Entity {
  hit: boolean;
  speed: number;
}

export interface Hunter extends Entity {
  speed: number;
  shootTimer: number;
}

export interface Poop extends Entity {
  vy: number;
  vx: number;
}

export interface Bullet extends Entity {
  vx: number;
  vy: number;
}

export interface Obstacle extends Entity {
  speed: number;
  windowOffset: number; // random seed for window pattern
}

export interface Balloon extends Entity {
  speed: number;
  baseY: number;      // stable y reference for bobbing
  driftPhase: number; // sine wave phase offset
  driftAmp: number;   // bobbing amplitude in px
  colorIndex: number; // index into BALLOON_COLORS
}

export interface ToxicPuddle {
  x: number;
  y: number;
  w: number;
  h: number;
  life: number;     // seconds remaining
  damage: number;   // damage per tick
  tickTimer: number; // seconds until next damage tick
}

export interface GroundTrail {
  x: number;
  y: number;
  life: number;     // seconds remaining
}

export interface LightningArc {
  x1: number; y1: number;
  x2: number; y2: number;
  life: number;     // seconds remaining (visual only)
}

export interface SplashEffect {
  x: number;
  y: number;
  radius: number;   // max radius in px
  life: number;     // seconds remaining (total = 0.35s)
}

export type GameState = 'idle' | 'playing' | 'upgrading' | 'over' | 'boss' | 'relic_select';

export interface GameData {
  running: boolean;
  birdX: number;
  birdY: number;
  score: number;
  lives: number;
  coins: number;
  level: number;
  poops: Poop[];
  pedestrians: Pedestrian[];
  hunters: Hunter[];
  bullets: Bullet[];
  obstacles: Obstacle[];
  balloons: Balloon[];
  frame: number;
  time: number;           // elapsed game time in seconds (for animations)
  wingUp: boolean;
  hitFlash: number;       // seconds remaining
  poopCooldown: number;   // seconds remaining
  countdownTimer: number; // seconds remaining
  upgrades: Upgrades;
  // Difficulty params (per-second units)
  scrollSpeed: number;       // px/s
  spawnIntervalPed: number;  // seconds between spawns
  spawnIntervalHunter: number;
  hunterShootInterval: number;
  bulletSpeed: number;       // px/s
  // Spawn accumulators (accumulate dt, spawn when >= interval)
  spawnTimerPed: number;
  spawnTimerHunter: number;
  spawnTimerObstacle: number;
  spawnTimerBalloon: number;
  // Card upgrade system
  pickedCards: Map<string, number>;
  offeredCards: import('./cards').UpgradeCard[];
  // Boss system
  boss: import('./bosses/types').BossState | null;
  bossDefinition: import('./bosses/types').BossDefinition | null;
  // Biome
  biome: import('./biomes').Biome;
  // Relic system
  relics: string[];                            // held relic IDs
  offeredRelics: import('./relics').Relic[];    // relics to choose from after boss
  // Combo system
  combo: number;
  comboTimer: number; // seconds until combo resets
  // Run mode
  runMode: 'classic' | 'daily' | 'seeded';
  seed: number;
  // Effect entities
  toxicPuddles: ToxicPuddle[];
  groundTrails: GroundTrail[];
  lightningArcs: LightningArc[];
  splashEffects: SplashEffect[];
  // Special mechanics
  shieldTimer: number;    // seconds until feather shield recharges
  shieldActive: boolean;  // whether shield can block next hit
}
