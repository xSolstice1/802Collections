export const CANVAS_W = 800;
export const CANVAS_H = 400;
export const GROUND_Y = 350;
export const SKY_MIN = 20;
export const MAX_DT = 0.05; // cap dt at 50ms to prevent physics explosions

// All speeds in pixels per second (converted from per-frame * 60)
export const BASE_BIRD_SPEED = 150;
export const BASE_SCROLL_SPEED = 90;
export const BASE_POOP_SPEED = 180;
export const BIRD_W = 36;
export const BIRD_H = 28;
export const PED_W = 20;
export const PED_H = 36;
export const BASE_POOP_W = 8;
export const BASE_POOP_H = 10;
export const BULLET_W = 8;
export const BULLET_H = 4;
export const BASE_BULLET_SPEED = 360;
export const HUNTER_W = 24;
export const HUNTER_H = 40;

// All intervals/timers in seconds (converted from frames / 60)
export const BASE_SPAWN_INTERVAL_PED = 1.667;
export const BASE_SPAWN_INTERVAL_HUNTER = 4.167;
export const BASE_HUNTER_SHOOT_INTERVAL = 1.5;
export const POOP_COOLDOWN = 0.2;
export const GRAVITY = 72;       // px/s² (bullet gravity)
export const POOP_GRAVITY = 360; // px/s² (poop gravity)
export const COUNTDOWN_TIME = 3.0; // seconds
export const HIT_FLASH_TIME = 0.667; // seconds
export const STORAGE_KEY = 'bird-shit-highscore';

export const OBSTACLE_W = 42;
export const OBSTACLE_MIN_LEVEL = 3;
export const OBSTACLE_MIN_H = 50;
export const OBSTACLE_TOP_GAP = 90; // minimum clear sky gap above any building

// Spawn interval in seconds; returns Infinity if obstacles not yet active
export function getObstacleSpawnInterval(level: number): number {
  if (level < OBSTACLE_MIN_LEVEL) return Infinity;
  return Math.max(90, 280 - (level - OBSTACLE_MIN_LEVEL) * 22) / 60;
}

// Maximum building height at a given level (always leaves OBSTACLE_TOP_GAP clear)
export function getObstacleMaxHeight(level: number): number {
  if (level < OBSTACLE_MIN_LEVEL) return 0;
  const cap = GROUND_Y - SKY_MIN - OBSTACLE_TOP_GAP;
  return Math.min(cap, OBSTACLE_MIN_H + (level - OBSTACLE_MIN_LEVEL) * 28);
}

export const BALLOON_W = 22;
export const BALLOON_H = 28;
export const BALLOON_MIN_LEVEL = 3;
export const BALLOON_COLORS = ['#ef4444', '#3b82f6', '#fbbf24', '#22c55e', '#ec4899', '#f97316'];

// Staggered from building interval so they don't sync up (returns seconds)
export function getBalloonSpawnInterval(level: number): number {
  if (level < BALLOON_MIN_LEVEL) return Infinity;
  return Math.max(80, 210 - (level - BALLOON_MIN_LEVEL) * 18) / 60;
}

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800];

export function getLevelThreshold(level: number): number {
  if (level < LEVEL_THRESHOLDS.length) return LEVEL_THRESHOLDS[level];
  return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (level - LEVEL_THRESHOLDS.length + 1) * 600;
}

export function collides(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number }
): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
