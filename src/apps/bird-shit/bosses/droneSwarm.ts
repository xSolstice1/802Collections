import type { BossDefinition, BossState } from './types';
import type { GameData, Bullet } from '../types';
import { BULLET_W, BULLET_H } from '../constants';

interface DroneData {
  x: number;
  y: number;
  hp: number;
  angle: number;     // orbit angle
  diving: boolean;
  diveTimer: number;
}

/**
 * Drone Swarm — appears at level 15.
 * 6 small drones orbit in a pattern. Each has 1 HP.
 * Boss is "defeated" when all drones are destroyed.
 * Drones periodically dive toward bird.
 *
 * Boss HP = number of drones alive.
 */
export const droneSwarm: BossDefinition = {
  id: 'drones',
  name: 'Drone Armada',
  maxHp: (level) => 6 + Math.floor(level / 5),
  w: 200,
  h: 150,

  spawn: (canvasW, _canvasH, groundY) => ({
    x: canvasW / 2 - 100,
    y: groundY / 2 - 75,
  }),

  update: (boss: BossState, g: GameData, dt: number): Bullet[] => {
    const projectiles: Bullet[] = [];
    if (boss.defeated || boss.introTimer > 0) return projectiles;

    // Initialize drones
    if (!boss.data.drones) {
      const count = boss.maxHp;
      const drones: DroneData[] = [];
      for (let i = 0; i < count; i++) {
        drones.push({
          x: 0, y: 0,
          hp: 1,
          angle: (i / count) * Math.PI * 2,
          diving: false,
          diveTimer: 2 + Math.random() * 3,
        });
      }
      boss.data.drones = drones;
    }

    const drones = boss.data.drones as DroneData[];
    const cx = boss.x + boss.w / 2;
    const cy = boss.y + boss.h / 2;
    const orbitRadius = 70 + Math.sin(g.time * 0.5) * 15;
    const orbitSpeed = 1.5;

    let alive = 0;
    for (const drone of drones) {
      if (drone.hp <= 0) continue;
      alive++;

      if (drone.diving) {
        // Dive toward bird
        const dx = g.birdX - drone.x;
        const dy = g.birdY - drone.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        drone.x += (dx / dist) * 250 * dt;
        drone.y += (dy / dist) * 250 * dt;

        drone.diveTimer -= dt;
        if (drone.diveTimer <= 0) {
          drone.diving = false;
          drone.diveTimer = 3 + Math.random() * 2;
          // Fire a bullet when pulling out of dive
          projectiles.push({
            x: drone.x, y: drone.y,
            w: BULLET_W, h: BULLET_H,
            vx: (dx / dist) * 200,
            vy: (dy / dist) * 200,
          });
        }
      } else {
        // Orbit
        drone.angle += orbitSpeed * dt;
        drone.x = cx + Math.cos(drone.angle) * orbitRadius;
        drone.y = cy + Math.sin(drone.angle) * orbitRadius * 0.6;

        drone.diveTimer -= dt;
        if (drone.diveTimer <= 0) {
          drone.diving = true;
          drone.diveTimer = 0.8; // dive duration
        }
      }
    }

    boss.hp = alive;
    if (alive === 0) boss.defeated = true;

    return projectiles;
  },

  draw: (ctx: CanvasRenderingContext2D, boss: BossState, time: number) => {
    const drones = (boss.data.drones as DroneData[]) ?? [];

    for (const drone of drones) {
      if (drone.hp <= 0) continue;

      const flash = drone.diving;
      ctx.save();

      // Drone body
      ctx.fillStyle = flash ? '#ef4444' : '#6b7280';
      ctx.fillRect(drone.x - 8, drone.y - 4, 16, 8);

      // Propellers
      const propAngle = time * 20;
      ctx.fillStyle = '#9ca3af';
      for (let i = 0; i < 4; i++) {
        const a = propAngle + (i * Math.PI) / 2;
        const px = drone.x + Math.cos(a) * 10;
        const py = drone.y + Math.sin(a) * 3 - 5;
        ctx.fillRect(px - 3, py - 1, 6, 2);
      }

      // LED light
      ctx.fillStyle = drone.diving ? '#fbbf24' : '#22c55e';
      ctx.beginPath();
      ctx.arc(drone.x, drone.y - 2, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  },

  getHitbox: (_boss: BossState) => {
    // Individual drone hitboxes handled in bossSystem collision check
    // Return null here — collision is per-drone
    return null;
  },
};
