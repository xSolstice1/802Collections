import type { GameData, Bullet } from '../types';

export interface BossState {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  x: number;
  y: number;
  w: number;
  h: number;
  phase: number;
  phaseTimer: number;
  attackTimer: number;
  defeated: boolean;
  introTimer: number;     // seconds of intro animation before fight starts
  data: Record<string, unknown>;
}

export interface BossDefinition {
  id: string;
  name: string;
  maxHp: (level: number) => number;
  w: number;
  h: number;
  spawn: (canvasW: number, canvasH: number, groundY: number) => { x: number; y: number };
  update: (boss: BossState, g: GameData, dt: number) => Bullet[];
  draw: (ctx: CanvasRenderingContext2D, boss: BossState, time: number) => void;
  getHitbox: (boss: BossState) => { x: number; y: number; w: number; h: number } | null;
}
