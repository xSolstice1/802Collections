export interface Upgrades {
  poopSpeed: number;
  poopSize: number;
  birdSpeed: number;
  extraLife: number;
  splitPoop: number;
  homingPoop: number;
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

export type GameState = 'idle' | 'playing' | 'upgrading' | 'over';

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
  wingUp: boolean;
  hitFlash: number;
  poopCooldown: number;
  countdownTimer: number;
  upgrades: Upgrades;
  scrollSpeed: number;
  spawnIntervalPed: number;
  spawnIntervalHunter: number;
  hunterShootInterval: number;
  bulletSpeed: number;
}
