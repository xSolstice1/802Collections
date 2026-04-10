import type { BossDefinition, BossState } from './types';
import type { GameData, Bullet } from '../types';
import { BULLET_W, BULLET_H } from '../constants';

/**
 * Construction Boss — appears at level 5.
 * Throws bricks in arc. Helmet acts as armor.
 * Exposed weak spot when arm raised to throw (brief window).
 *
 * Phases:
 *  0 = idle/walk, winding up to throw
 *  1 = throwing (vulnerable window ~0.5s)
 *  2 = enraged (below 50% HP) — faster throws, debris splash
 */
export const constructionBoss: BossDefinition = {
  id: 'construction',
  name: 'Foreman Frank',
  maxHp: (level) => 15 + level * 3,
  w: 60,
  h: 80,

  spawn: (canvasW, _canvasH, groundY) => ({
    x: canvasW - 100,
    y: groundY - 80,
  }),

  update: (boss: BossState, g: GameData, dt: number): Bullet[] => {
    const projectiles: Bullet[] = [];
    if (boss.defeated || boss.introTimer > 0) return projectiles;

    const enraged = boss.hp < boss.maxHp * 0.5;
    const throwInterval = enraged ? 1.2 : 2.0;
    const brickSpeed = enraged ? 280 : 200;

    boss.attackTimer -= dt;

    // Sway left/right
    const sway = Math.sin(g.time * 1.5) * 30;
    boss.data.swayX = sway;

    if (boss.attackTimer <= 0) {
      // Enter throwing phase
      boss.phase = 1;
      boss.phaseTimer = 0.5; // vulnerable window

      // Throw a brick aimed at bird
      const bx = boss.x + boss.w / 2;
      const by = boss.y + 10;
      const dx = g.birdX - bx;
      const dy = g.birdY - by;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      projectiles.push({
        x: bx, y: by, w: 12, h: 8,
        vx: (dx / dist) * brickSpeed,
        vy: (dy / dist) * brickSpeed - 100, // arc upward
      });

      // Enraged: add debris splash
      if (enraged) {
        for (let i = -1; i <= 1; i += 2) {
          projectiles.push({
            x: bx, y: by, w: BULLET_W, h: BULLET_H,
            vx: (dx / dist) * brickSpeed * 0.7 + i * 80,
            vy: (dy / dist) * brickSpeed - 140,
          });
        }
      }

      boss.attackTimer = throwInterval;
    }

    // Phase timer
    if (boss.phase === 1) {
      boss.phaseTimer -= dt;
      if (boss.phaseTimer <= 0) boss.phase = 0;
    }

    return projectiles;
  },

  draw: (ctx: CanvasRenderingContext2D, boss: BossState, time: number) => {
    const x = boss.x + ((boss.data.swayX as number) ?? 0);
    const y = boss.y;
    const flash = boss.data.hitFlash as number ?? 0;

    ctx.save();

    if (flash > 0) {
      ctx.globalAlpha = 0.6;
    }

    // Body (orange vest)
    ctx.fillStyle = '#f97316';
    ctx.fillRect(x + 10, y + 30, 40, 35);

    // Legs
    ctx.fillStyle = '#1e3a5f';
    ctx.fillRect(x + 14, y + 65, 12, 15);
    ctx.fillRect(x + 34, y + 65, 12, 15);

    // Head
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(x + 18, y + 12, 24, 18);

    // Eyes (angry)
    ctx.fillStyle = '#000';
    ctx.fillRect(x + 23, y + 18, 4, 4);
    ctx.fillRect(x + 33, y + 18, 4, 4);

    // Helmet (armor indicator)
    const helmetUp = boss.phase === 1; // raised during throw
    const helmetY = helmetUp ? y + 2 : y + 8;
    ctx.fillStyle = boss.hp > boss.maxHp * 0.5 ? '#fbbf24' : '#ef4444';
    ctx.fillRect(x + 14, helmetY, 32, 10);
    ctx.fillRect(x + 18, helmetY - 4, 24, 6);

    // Arm with brick (during throw phase)
    if (boss.phase === 1) {
      ctx.fillStyle = '#d4a574';
      ctx.fillRect(x + 45, y + 15, 12, 8);
      ctx.fillStyle = '#92400e';
      ctx.fillRect(x + 50, y + 10, 12, 8);
    } else {
      ctx.fillStyle = '#d4a574';
      ctx.fillRect(x + 45, y + 35, 10, 8);
      // Brick in hand
      ctx.fillStyle = '#92400e';
      const bobble = Math.sin(time * 3) * 2;
      ctx.fillRect(x + 48, y + 30 + bobble, 12, 8);
    }

    // Weak spot indicator when throwing
    if (boss.phase === 1) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(x + 16, y + 10, 28, 22);
      ctx.setLineDash([]);
    }

    ctx.restore();
  },

  getHitbox: (boss: BossState) => {
    if (boss.phase === 1) {
      // Vulnerable head hitbox when throwing
      const sx = (boss.data.swayX as number) ?? 0;
      return { x: boss.x + sx + 16, y: boss.y + 10, w: 28, h: 22 };
    }
    return null; // Armored — no hitbox when not throwing
  },
};
