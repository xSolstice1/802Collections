import {
  CANVAS_W, CANVAS_H, GROUND_Y,
  POOP_GRAVITY, GRAVITY,
  PED_W, HUNTER_W, OBSTACLE_W, BALLOON_W,
  collides,
} from '../constants';
import { getHomingStrength } from '../upgrades';
import { birdShitSound } from '../sound';
import type { GameData, Entity } from '../types';

interface CollisionCallbacks {
  setScore: (n: number) => void;
  setCoins: (n: number) => void;
  setLives: (n: number) => void;
}

export function updateProjectiles(g: GameData, dt: number, callbacks: CollisionCallbacks) {
  const { setScore, setCoins } = callbacks;
  const homingStr = getHomingStrength(g.upgrades);

  g.poops = g.poops.filter((p) => {
    p.vy += POOP_GRAVITY * dt;
    p.y += p.vy * dt;
    p.x += p.vx * dt;
    p.vx *= Math.pow(0.99, dt * 60);

    if (homingStr > 0) {
      let nearestDx = 0;
      let nearestDist = Infinity;
      const targets: Entity[] = [
        ...g.pedestrians.filter((ped) => !ped.hit),
        ...g.hunters,
      ];
      for (const t of targets) {
        const dx = t.x + t.w / 2 - (p.x + p.w / 2);
        const dy = t.y + t.h / 2 - (p.y + p.h / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < nearestDist && dy > 0) {
          nearestDist = dist;
          nearestDx = dx;
        }
      }
      if (nearestDist < 200) {
        p.vx += (nearestDx > 0 ? 1 : -1) * homingStr * dt;
        p.vx *= Math.pow(0.97, dt * 60);
      }
    }

    if (p.x < 0) p.x = 0;
    if (p.x > CANVAS_W - p.w) p.x = CANVAS_W - p.w;

    // Boss collision
    if (g.boss && g.bossDefinition && !g.boss.defeated) {
      const boss = g.boss;
      const def = g.bossDefinition;

      if (def.id === 'drones' && boss.data.drones) {
        const drones = boss.data.drones as Array<{x: number; y: number; hp: number}>;
        for (const drone of drones) {
          if (drone.hp <= 0) continue;
          const droneBox = { x: drone.x - 8, y: drone.y - 4, w: 16, h: 8 };
          if (collides(p, droneBox)) {
            drone.hp = 0;
            boss.hp--;
            g.score += 15;
            g.coins += 2;
            setScore(g.score);
            setCoins(g.coins);
            birdShitSound.play('boss_hit');
            if (boss.hp <= 0) boss.defeated = true;
            return false;
          }
        }
      }

      const hitbox = def.getHitbox(boss);
      if (hitbox && collides(p, hitbox)) {
        boss.hp--;
        boss.data.hitFlash = 0.15;
        g.score += 5;
        g.coins += 1;
        setScore(g.score);
        setCoins(g.coins);
        birdShitSound.play('boss_hit');
        if (boss.hp <= 0) boss.defeated = true;
        return false;
      }
    }

    const cb = g.upgrades.coinBonus;
    for (const ped of g.pedestrians) {
      if (!ped.hit && collides(p, ped)) {
        ped.hit = true;
        g.score += 10;
        g.coins += 1 + cb;
        setScore(g.score);
        setCoins(g.coins);
        birdShitSound.play('poop_hit_ped');
        return false;
      }
    }
    for (let i = g.hunters.length - 1; i >= 0; i--) {
      if (collides(p, g.hunters[i])) {
        g.hunters.splice(i, 1);
        g.score += 25;
        g.coins += 3 + cb;
        setScore(g.score);
        setCoins(g.coins);
        birdShitSound.play('poop_hit_hunter');
        return false;
      }
    }
    for (const obs of g.obstacles) {
      if (collides(p, obs)) return false;
    }
    for (let i = g.balloons.length - 1; i >= 0; i--) {
      if (collides(p, g.balloons[i])) {
        g.balloons.splice(i, 1);
        g.score += 5;
        g.coins += 1 + cb;
        setScore(g.score);
        setCoins(g.coins);
        birdShitSound.play('poop_hit_balloon');
        return false;
      }
    }
    return p.y < GROUND_Y;
  });

  // Update pedestrians
  g.pedestrians = g.pedestrians.filter((p) => {
    p.x -= p.speed * dt;
    return p.x > -PED_W;
  });

  // Update hunters & shooting
  const inCountdown = g.countdownTimer > 0;
  g.hunters = g.hunters.filter((h) => {
    h.x -= h.speed * dt;
    if (!inCountdown) {
      h.shootTimer -= dt;
      if (h.shootTimer <= 0 && h.x > 0 && h.x < CANVAS_W) {
        const dx = g.birdX - (h.x + HUNTER_W / 2);
        const dy = g.birdY - (h.y - 10);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          g.bullets.push({
            x: h.x + HUNTER_W / 2,
            y: h.y - 4,
            w: 8,
            h: 4,
            vx: (dx / dist) * g.bulletSpeed,
            vy: (dy / dist) * g.bulletSpeed,
          });
        }
        h.shootTimer = g.hunterShootInterval + Math.random() * 0.667;
      }
    }
    return h.x > -HUNTER_W - 10;
  });

  // Update bullets
  g.bullets = g.bullets.filter((b) => {
    b.vy += GRAVITY * dt;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    return b.x > -10 && b.x < CANVAS_W + 10 && b.y > -10 && b.y < CANVAS_H + 10;
  });

  // Update obstacles
  g.obstacles = g.obstacles.filter((obs) => {
    obs.x -= obs.speed * dt;
    return obs.x > -OBSTACLE_W;
  });

  // Update balloons
  g.balloons = g.balloons.filter((bal) => {
    bal.x -= bal.speed * dt;
    bal.y = bal.baseY + Math.sin(g.time * 1.5 + bal.driftPhase) * bal.driftAmp;
    return bal.x > -BALLOON_W;
  });
}
