export const CANVAS_W = 800;
export const CANVAS_H = 400;
export const GROUND_Y = 350;
export const SKY_MIN = 20;
export const BASE_BIRD_SPEED = 2.5;
export const BASE_SCROLL_SPEED = 1.5;
export const BASE_POOP_SPEED = 3;
export const BIRD_W = 36;
export const BIRD_H = 28;
export const PED_W = 20;
export const PED_H = 36;
export const BASE_POOP_W = 8;
export const BASE_POOP_H = 10;
export const BULLET_W = 8;
export const BULLET_H = 4;
export const BASE_BULLET_SPEED = 6;
export const HUNTER_W = 24;
export const HUNTER_H = 40;
export const BASE_SPAWN_INTERVAL_PED = 100;
export const BASE_SPAWN_INTERVAL_HUNTER = 250;
export const BASE_HUNTER_SHOOT_INTERVAL = 90;
export const POOP_COOLDOWN_FRAMES = 12;
export const GRAVITY = 0.02;
export const POOP_GRAVITY = 0.1;
export const COUNTDOWN_FRAMES = 180; // 3 seconds at 60fps
export const STORAGE_KEY = 'bird-shit-highscore';

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
