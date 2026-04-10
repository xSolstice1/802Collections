import type { BossDefinition, BossState } from './types';
import type { GameData, Bullet } from '../types';
import { BULLET_W, BULLET_H } from '../constants';

/**
 * Sniper Hunter — appears at level 10.
 * Visible laser sight for 1.5s, then fires fast shot.
 * Encourages constant movement and timing.
 *
 * Phases:
 *  0 = repositioning (walking to new spot)
 *  1 = aiming (laser sight visible, tracking bird)
 *  2 = firing (instant shot at locked position)
 */
export const sniperHunter: BossDefinition = {
  id: 'sniper',
  name: 'Hawk-Eye Harris',
  maxHp: (level) => 20 + level * 3,
  w: 40,
  h: 50,

  spawn: (canvasW, _canvasH, groundY) => ({
    x: canvasW - 80,
    y: groundY - 50,
  }),

  update: (boss: BossState, g: GameData, dt: number): Bullet[] => {
    const projectiles: Bullet[] = [];
    if (boss.defeated || boss.introTimer > 0) return projectiles;

    const enraged = boss.hp < boss.maxHp * 0.5;
    boss.phaseTimer -= dt;

    switch (boss.phase) {
      case 0: {
        // Repositioning
        const targetX = boss.data.targetX as number ?? boss.x;
        const dx = targetX - boss.x;
        boss.x += Math.sign(dx) * 120 * dt;
        if (Math.abs(dx) < 5) {
          boss.phase = 1;
          boss.phaseTimer = enraged ? 1.0 : 1.5;
          boss.data.laserTargetX = g.birdX;
          boss.data.laserTargetY = g.birdY;
        }
        break;
      }
      case 1: {
        // Aiming — laser tracks bird
        boss.data.laserTargetX = g.birdX;
        boss.data.laserTargetY = g.birdY;
        if (boss.phaseTimer <= 0) {
          boss.phase = 2;
          boss.phaseTimer = 0.1;
          // Lock final aim position
          boss.data.fireX = g.birdX;
          boss.data.fireY = g.birdY;
        }
        break;
      }
      case 2: {
        // Fire
        if (boss.phaseTimer <= 0.09) {
          const fx = boss.data.fireX as number;
          const fy = boss.data.fireY as number;
          const bx = boss.x + boss.w / 2;
          const by = boss.y + 10;
          const dx = fx - bx;
          const dy = fy - by;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const speed = enraged ? 600 : 480;

          projectiles.push({
            x: bx, y: by, w: BULLET_W + 4, h: BULLET_H + 2,
            vx: (dx / dist) * speed,
            vy: (dy / dist) * speed,
          });
          boss.data.fireX = undefined; // prevent re-fire

          // Start reposition
          boss.phase = 0;
          boss.phaseTimer = enraged ? 0.8 : 1.2;
          // Pick random ground position
          const minX = 400;
          const maxX = 750;
          boss.data.targetX = minX + Math.random() * (maxX - minX);
        }
        break;
      }
    }

    return projectiles;
  },

  draw: (ctx: CanvasRenderingContext2D, boss: BossState, time: number) => {
    const x = boss.x;
    const y = boss.y;
    const flash = boss.data.hitFlash as number ?? 0;

    ctx.save();
    if (flash > 0) ctx.globalAlpha = 0.6;

    // Body (camo green)
    ctx.fillStyle = '#365314';
    ctx.fillRect(x + 8, y + 18, 24, 22);

    // Legs
    ctx.fillStyle = '#1a2e05';
    ctx.fillRect(x + 10, y + 40, 8, 10);
    ctx.fillRect(x + 22, y + 40, 8, 10);

    // Head
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(x + 12, y + 4, 16, 14);

    // Beret
    ctx.fillStyle = '#7c2d12';
    ctx.fillRect(x + 10, y + 2, 20, 6);

    // Eye (scope eye)
    ctx.fillStyle = '#000';
    ctx.fillRect(x + 22, y + 8, 3, 3);

    // Scope glow
    if (boss.phase === 1) {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(x + 24, y + 10, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Rifle
    ctx.fillStyle = '#44403c';
    ctx.fillRect(x + 30, y + 16, 20, 4);
    ctx.fillRect(x + 28, y + 14, 4, 8);

    // Laser sight
    if (boss.phase === 1) {
      const lx = boss.data.laserTargetX as number;
      const ly = boss.data.laserTargetY as number;
      ctx.strokeStyle = `rgba(239, 68, 68, ${0.4 + Math.sin(time * 10) * 0.3})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(x + 40, y + 18);
      ctx.lineTo(lx + 18, ly + 14);
      ctx.stroke();
      ctx.setLineDash([]);

      // Target reticle
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(lx + 18, ly + 14, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(lx + 6, ly + 14);
      ctx.lineTo(lx + 30, ly + 14);
      ctx.moveTo(lx + 18, ly + 2);
      ctx.lineTo(lx + 18, ly + 26);
      ctx.stroke();
    }

    ctx.restore();
  },

  getHitbox: (boss: BossState) => {
    // Always vulnerable (no armor) but small target
    return { x: boss.x + 8, y: boss.y + 4, w: 28, h: 36 };
  },
};
