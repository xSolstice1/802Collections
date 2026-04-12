import { useRef, useCallback, useEffect } from 'react';
import {
  CANVAS_W, CANVAS_H, GROUND_Y, SKY_MIN, MAX_DT,
  BIRD_W, BIRD_H, PED_W, PED_H, HUNTER_W, HUNTER_H,
  BULLET_W, BULLET_H,
  BASE_SCROLL_SPEED, BASE_SPAWN_INTERVAL_PED, BASE_SPAWN_INTERVAL_HUNTER,
  BASE_HUNTER_SHOOT_INTERVAL, BASE_BULLET_SPEED,
  POOP_COOLDOWN, GRAVITY, POOP_GRAVITY, COUNTDOWN_TIME, HIT_FLASH_TIME, STORAGE_KEY,
  OBSTACLE_W, getLevelThreshold, collides, getObstacleSpawnInterval, getObstacleMaxHeight, OBSTACLE_MIN_H,
  BALLOON_W, BALLOON_H, getBalloonSpawnInterval,
} from '../constants';
import { DEFAULT_UPGRADES, getPoopSpeed, getPoopW, getPoopH, getBirdSpeed, getHomingStrength, getPoopDamage } from '../upgrades';
import { rollCards, CARD_POOL } from '../cards';
import { getBossForLevel } from '../bosses';
import { rollRelics } from '../relics';
import { BIOMES, pickBiome } from '../biomes';
import { randomSeed, dailySeed } from '../systems/rng';
import type { BossState } from '../bosses';
import { drawObstacle, drawBalloon, drawPedestrian, drawHunter, drawBullet, drawPoop, drawHeart, drawCoin } from '../renderers';
import { leaderboardApi } from '@services/leaderboardApi';
import { birdShitSound } from '../sound';
import type { GameState, GameData, Upgrades, Entity, Obstacle, Balloon } from '../types';
import type { DrawBirdFn } from '../skins';

interface UseGameLoopParams {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  keysRef: React.MutableRefObject<Set<string>>;
  selectedSkinRef: React.MutableRefObject<DrawBirdFn>;
  startGameRef: React.MutableRefObject<() => void>;
  dropPoopRef: React.MutableRefObject<() => void>;
  buyUpgradeRef: React.MutableRefObject<(index: number) => void>;
  submitScoreRef: React.MutableRefObject<(score: number) => void>;
  setGameState: (s: GameState) => void;
  setScore: (n: number) => void;
  setLives: (n: number) => void;
  setCoins: (n: number) => void;
  setLevel: (n: number) => void;
  setHighScore: (n: number) => void;
  highScoreRef: React.MutableRefObject<number>;
  playerNameRef: React.MutableRefObject<string>;
  devModeRef: React.MutableRefObject<boolean>;
}

export function useGameLoop({
  canvasRef,
  keysRef,
  selectedSkinRef,
  startGameRef,
  dropPoopRef,
  buyUpgradeRef,
  submitScoreRef,
  setGameState,
  setScore,
  setLives,
  setCoins,
  setLevel,
  setHighScore,
  highScoreRef,
  playerNameRef,
  devModeRef,
}: UseGameLoopParams) {
  const frameRef = useRef<number>(0);
  const prevTimeRef = useRef<number>(0);
  const gameRef = useRef<GameData>({
    running: false,
    birdX: 120,
    birdY: 150,
    score: 0,
    lives: 3,
    coins: 0,
    level: 1,
    poops: [],
    pedestrians: [],
    hunters: [],
    bullets: [],
    obstacles: [],
    balloons: [],
    frame: 0,
    time: 0,
    wingUp: false,
    hitFlash: 0,
    poopCooldown: 0,
    countdownTimer: 0,
    upgrades: { ...DEFAULT_UPGRADES } as Upgrades,
    scrollSpeed: BASE_SCROLL_SPEED,
    spawnIntervalPed: BASE_SPAWN_INTERVAL_PED,
    spawnIntervalHunter: BASE_SPAWN_INTERVAL_HUNTER,
    hunterShootInterval: BASE_HUNTER_SHOOT_INTERVAL,
    bulletSpeed: BASE_BULLET_SPEED,
    spawnTimerPed: 0,
    spawnTimerHunter: 0,
    spawnTimerObstacle: 0,
    spawnTimerBalloon: 0,
    pickedCards: new Map(),
    offeredCards: [],
    biome: BIOMES[0],
    boss: null,
    bossDefinition: null,
    relics: [],
    offeredRelics: [],
    combo: 0,
    comboTimer: 0,
    runMode: 'classic',
    seed: 0,
    toxicPuddles: [],
    groundTrails: [],
    lightningArcs: [],
    splashEffects: [],
    shieldTimer: 0,
    shieldActive: false,
  });

  const setDifficulty = (g: GameData, lvl: number) => {
    g.scrollSpeed = BASE_SCROLL_SPEED + (lvl - 1) * 9;       // was 0.15/frame * 60
    g.spawnIntervalPed = Math.max(35 / 60, BASE_SPAWN_INTERVAL_PED - (lvl - 1) * (8 / 60));
    g.spawnIntervalHunter = Math.max(70 / 60, BASE_SPAWN_INTERVAL_HUNTER - (lvl - 1) * (22 / 60));
    g.hunterShootInterval = Math.max(35 / 60, BASE_HUNTER_SHOOT_INTERVAL - (lvl - 1) * (7 / 60));
    g.bulletSpeed = BASE_BULLET_SPEED + (lvl - 1) * 12;      // was 0.2/frame * 60
  };

  const redrawUpgradeScreen = useCallback(() => {
    // Now handled by React DOM overlay (CardSelectionOverlay)
  }, []);

  const dropPoop = useCallback(() => {
    const g = gameRef.current;
    if (!g.running || g.poopCooldown > 0 || g.countdownTimer > 0) return;
    g.poopCooldown = POOP_COOLDOWN;
    birdShitSound.play('poop_drop');

    const pw = getPoopW(g.upgrades);
    const ph = getPoopH(g.upgrades);
    const ps = getPoopSpeed(g.upgrades);
    const splitCount = 1 + g.upgrades.splitPoop; // 1, 2, or 3

    for (let i = 0; i < splitCount; i++) {
      let vx = 0;
      if (splitCount === 2) {
        vx = i === 0 ? -42 : 42;    // was ±0.7/frame * 60
      } else if (splitCount === 3) {
        vx = (i - 1) * 48;           // was (i-1)*0.8/frame * 60
      }
      g.poops.push({
        x: g.birdX + BIRD_W / 2 - pw / 2,
        y: g.birdY + BIRD_H,
        w: pw,
        h: ph,
        vy: ps * 0.35,
        vx,
      });
    }
  }, []);
  dropPoopRef.current = dropPoop;

  const gameLoop = useCallback((now: number) => {
    const g = gameRef.current;
    if (!g.running) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Compute deltaTime in seconds, capped to prevent physics explosions
    if (prevTimeRef.current === 0) prevTimeRef.current = now;
    const dt = Math.min((now - prevTimeRef.current) / 1000, MAX_DT);
    prevTimeRef.current = now;

    g.frame++;
    g.time += dt;
    g.wingUp = Math.floor(g.time * 7.5) % 2 === 0; // ~same rate as frame/8 at 60fps
    if (g.hitFlash > 0) g.hitFlash = Math.max(0, g.hitFlash - dt);
    if (g.poopCooldown > 0) g.poopCooldown = Math.max(0, g.poopCooldown - dt);

    const inCountdown = g.countdownTimer > 0;
    if (inCountdown) g.countdownTimer = Math.max(0, g.countdownTimer - dt);

    // Combo timer decay
    if (g.comboTimer > 0) {
      g.comboTimer -= dt;
      if (g.comboTimer <= 0) {
        g.combo = 0;
        g.comboTimer = 0;
      }
    }

    // Feather shield recharge
    if (g.upgrades.featherShield && !g.shieldActive) {
      g.shieldTimer -= dt;
      if (g.shieldTimer <= 0) {
        g.shieldActive = true;
        g.shieldTimer = 0;
      }
    }

    // Check level up (not during countdown)
    const nextThreshold = getLevelThreshold(g.level);
    if (!inCountdown && !g.boss && g.score >= nextThreshold) {
      g.level++;
      setLevel(g.level);
      setDifficulty(g, g.level);

      // Check if this is a boss level
      const bossDef = getBossForLevel(g.level);
      if (bossDef) {
        const pos = bossDef.spawn(CANVAS_W, CANVAS_H, GROUND_Y);
        const bossState: BossState = {
          id: bossDef.id,
          name: bossDef.name,
          hp: bossDef.maxHp(g.level),
          maxHp: bossDef.maxHp(g.level),
          x: pos.x, y: pos.y,
          w: bossDef.w, h: bossDef.h,
          phase: 0, phaseTimer: 0, attackTimer: 2,
          defeated: false,
          introTimer: 2,
          data: {},
        };
        g.boss = bossState;
        g.bossDefinition = bossDef;
        g.pedestrians = [];
        g.hunters = [];
        g.bullets = [];
        g.obstacles = [];
        g.balloons = [];
        birdShitSound.play('boss_intro');
        // Stay in 'playing' state, boss fight is part of gameplay
      } else {
        g.running = false;
        g.offeredCards = rollCards(g.pickedCards, devModeRef.current ? CARD_POOL.length : 3);
        setGameState('upgrading');
        birdShitSound.play('level_up');
        return;
      }
    }

    // Bird free movement (always allowed, even during countdown)
    const birdSpd = getBirdSpeed(g.upgrades);
    const keys = keysRef.current;
    if (keys.has('ArrowUp') || keys.has('KeyW')) g.birdY -= birdSpd * dt;
    if (keys.has('ArrowDown') || keys.has('KeyS')) g.birdY += birdSpd * dt;
    if (keys.has('ArrowLeft') || keys.has('KeyA')) g.birdX -= birdSpd * dt;
    if (keys.has('ArrowRight') || keys.has('KeyD')) g.birdX += birdSpd * dt;

    if (g.birdX < 0) g.birdX = 0;
    if (g.birdX > CANVAS_W - BIRD_W) g.birdX = CANVAS_W - BIRD_W;
    if (g.birdY < SKY_MIN) g.birdY = SKY_MIN;
    if (g.birdY > GROUND_Y - BIRD_H - 10) g.birdY = GROUND_Y - BIRD_H - 10;

    // Spawning & combat only when not in countdown and no active boss
    if (!inCountdown && !g.boss) {
      // Pedestrian spawning (accumulator pattern)
      g.spawnTimerPed += dt;
      while (g.spawnTimerPed >= g.spawnIntervalPed) {
        g.spawnTimerPed -= g.spawnIntervalPed;
        g.pedestrians.push({
          x: CANVAS_W + Math.random() * 100,
          y: GROUND_Y - PED_H,
          w: PED_W,
          h: PED_H,
          hit: false,
          speed: g.scrollSpeed + Math.random() * 30, // was 0.5/frame * 60
        });
      }

      // Hunter spawning
      if (g.time > 2) { // was frame > 120 → 120/60 = 2 seconds
        g.spawnTimerHunter += dt;
        while (g.spawnTimerHunter >= g.spawnIntervalHunter) {
          g.spawnTimerHunter -= g.spawnIntervalHunter;
          g.hunters.push({
            x: CANVAS_W + Math.random() * 60,
            y: GROUND_Y - HUNTER_H,
            w: HUNTER_W,
            h: HUNTER_H,
            speed: g.scrollSpeed * 0.7 + Math.random() * 18, // was 0.3/frame * 60
            shootTimer: 0.5 + Math.random() * 0.667, // was 30+rand*40 frames → seconds
          });
        }
      }

      // Obstacle spawning
      const obstacleInterval = getObstacleSpawnInterval(g.level);
      if (obstacleInterval !== Infinity) {
        g.spawnTimerObstacle += dt;
        while (g.spawnTimerObstacle >= obstacleInterval) {
          g.spawnTimerObstacle -= obstacleInterval;
          const maxH = getObstacleMaxHeight(g.level);
          const h = OBSTACLE_MIN_H + Math.floor(Math.random() * (maxH - OBSTACLE_MIN_H + 1));
          const obs: Obstacle = {
            x: CANVAS_W + Math.random() * 60,
            y: GROUND_Y - h,
            w: OBSTACLE_W,
            h,
            speed: g.scrollSpeed * 0.85,
            windowOffset: Math.floor(Math.random() * 7),
          };
          g.obstacles.push(obs);
        }
      }

      // Balloon spawning
      const balloonInterval = getBalloonSpawnInterval(g.level);
      if (balloonInterval !== Infinity) {
        g.spawnTimerBalloon += dt;
        while (g.spawnTimerBalloon >= balloonInterval) {
          g.spawnTimerBalloon -= balloonInterval;
          const baseY = SKY_MIN + 20 + Math.floor(Math.random() * (GROUND_Y - SKY_MIN - 140));
          const bal: Balloon = {
            x: CANVAS_W + Math.random() * 80,
            y: baseY,
            w: BALLOON_W,
            h: BALLOON_H,
            speed: g.scrollSpeed * 0.7 + Math.random() * 24, // was 0.4/frame * 60
            baseY,
            driftPhase: Math.random() * Math.PI * 2,
            driftAmp: 8 + Math.random() * 12,
            colorIndex: Math.floor(Math.random() * 6),
          };
          g.balloons.push(bal);
        }
      }
    }

    // ── Boss update ──
    if (g.boss && g.bossDefinition) {
      const boss = g.boss;
      const def = g.bossDefinition;

      if (boss.introTimer > 0) {
        boss.introTimer -= dt;
      } else if (!boss.defeated) {
        // Boss attack logic
        const newProjectiles = def.update(boss, g, dt);
        for (const proj of newProjectiles) {
          g.bullets.push(proj);
        }

        // Decay boss hit flash
        if ((boss.data.hitFlash as number) > 0) {
          boss.data.hitFlash = Math.max(0, (boss.data.hitFlash as number) - dt);
        }
      }

      // Check boss defeated
      if (boss.defeated) {
        boss.data.defeatTimer = ((boss.data.defeatTimer as number) ?? 1.5) - dt;
        if ((boss.data.defeatTimer as number) <= 0) {
          // Award boss bonus
          g.score += 100;
          g.coins += 20;
          setScore(g.score);
          setCoins(g.coins);
          birdShitSound.play('boss_defeat');

          // Offer relic selection after boss
          g.boss = null;
          g.bossDefinition = null;
          g.running = false;
          g.offeredRelics = rollRelics(g.relics);
          if (g.offeredRelics.length > 0) {
            setGameState('relic_select');
          } else {
            // No relics available — go to card selection
            g.offeredCards = rollCards(g.pickedCards, devModeRef.current ? CARD_POOL.length : 3);
            setGameState('upgrading');
          }
          birdShitSound.play('level_up');
          return;
        }
      }
    }

    const homingStr = getHomingStrength(g.upgrades);

    // Helper: spawn toxic puddle at position
    const spawnPuddle = (px: number, _py: number) => {
      if (g.upgrades.toxicPoop <= 0) return;
      g.toxicPuddles.push({
        x: px - 12, y: GROUND_Y - 4,
        w: 24 + g.upgrades.toxicPoop * 8,
        h: 4,
        life: 3 + g.upgrades.toxicPoop,
        damage: 1,
        tickTimer: 0.5,
      });
    };

    // Helper: scatter bomb AoE at position
    const scatterAoE = (px: number, py: number) => {
      if (!g.upgrades.scatterBomb) return;
      const radius = 80;
      // Always show ring on any impact
      g.splashEffects.push({ x: px, y: py, radius, life: 0.35 });
      for (const ped of g.pedestrians) {
        if (ped.hit) continue;
        const dx = (ped.x + ped.w / 2) - px;
        const dy = (ped.y + ped.h / 2) - py;
        if (dx * dx + dy * dy < radius * radius) {
          ped.hit = true;
          g.score += 10;
          g.coins += 1;
          setScore(g.score);
          setCoins(g.coins);
        }
      }
      for (let i = g.hunters.length - 1; i >= 0; i--) {
        const h = g.hunters[i];
        const dx = (h.x + h.w / 2) - px;
        const dy = (h.y + h.h / 2) - py;
        if (dx * dx + dy * dy < radius * radius) {
          g.hunters.splice(i, 1);
          g.score += 25;
          g.coins += 3;
          setScore(g.score);
          setCoins(g.coins);
        }
      }
    };

    // Helper: chain lightning from hit position
    const chainLightning = (px: number, py: number) => {
      if (!g.upgrades.stormGut) return;
      const range = 100;
      const maxChains = 3;
      let chains = 0;
      let cx = px, cy = py;
      const hitSet = new Set<number>();

      for (let c = 0; c < maxChains; c++) {
        let bestDist = Infinity;
        let bestIdx = -1;
        let bestX = 0, bestY = 0;
        let bestIsPed = true;

        // Check pedestrians
        for (let i = 0; i < g.pedestrians.length; i++) {
          if (g.pedestrians[i].hit || hitSet.has(i)) continue;
          const tx = g.pedestrians[i].x + g.pedestrians[i].w / 2;
          const ty = g.pedestrians[i].y + g.pedestrians[i].h / 2;
          const d = Math.sqrt((tx - cx) ** 2 + (ty - cy) ** 2);
          if (d < range && d < bestDist) {
            bestDist = d; bestIdx = i; bestX = tx; bestY = ty; bestIsPed = true;
          }
        }
        // Check hunters
        for (let i = 0; i < g.hunters.length; i++) {
          const tx = g.hunters[i].x + g.hunters[i].w / 2;
          const ty = g.hunters[i].y + g.hunters[i].h / 2;
          const d = Math.sqrt((tx - cx) ** 2 + (ty - cy) ** 2);
          if (d < range && d < bestDist) {
            bestDist = d; bestIdx = i + 10000; bestX = tx; bestY = ty; bestIsPed = false;
          }
        }

        if (bestIdx < 0) break;
        // Visual arc
        g.lightningArcs.push({ x1: cx, y1: cy, x2: bestX, y2: bestY, life: 0.3 });
        // Damage
        if (bestIsPed) {
          g.pedestrians[bestIdx].hit = true;
          g.score += 10;
          g.coins += 1;
        } else {
          const hi = bestIdx - 10000;
          g.hunters.splice(hi, 1);
          g.score += 25;
          g.coins += 3;
        }
        setScore(g.score);
        setCoins(g.coins);
        hitSet.add(bestIdx);
        cx = bestX; cy = bestY;
        chains++;
      }
    };

    // Update poops
    g.poops = g.poops.filter((p) => {
      p.vy += POOP_GRAVITY * dt;
      p.vx += g.biome.windForce * dt; // biome wind
      p.y += p.vy * dt;
      p.x += p.vx * dt;
      p.vx *= Math.pow(0.99, dt * 60); // frame-rate-independent damping

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
      const dmg = getPoopDamage(g.upgrades);
      if (g.boss && g.bossDefinition && !g.boss.defeated) {
        const boss = g.boss;
        const def = g.bossDefinition;

        // Special handling for drone swarm (per-drone collision)
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

        // Standard boss hitbox
        const hitbox = def.getHitbox(boss);
        if (hitbox && collides(p, hitbox)) {
          boss.hp = Math.max(0, boss.hp - dmg);
          boss.data.hitFlash = 0.15;
          g.score += 5 * dmg;
          g.coins += dmg;
          setScore(g.score);
          setCoins(g.coins);
          birdShitSound.play('boss_hit');
          if (boss.hp <= 0) boss.defeated = true;
          return false;
        }
      }

      const cb = g.upgrades.coinBonus;
      const comboMult = 1 + g.combo * 0.25;
      for (const ped of g.pedestrians) {
        if (!ped.hit && collides(p, ped)) {
          ped.hit = true;
          g.combo++;
          g.comboTimer = 2;
          g.score += Math.round(10 * comboMult);
          g.coins += 1 + cb;
          setScore(g.score);
          setCoins(g.coins);
          birdShitSound.play('poop_hit_ped');
          const hitX = p.x + p.w / 2, hitY = p.y + p.h / 2;
          scatterAoE(hitX, hitY);
          chainLightning(hitX, hitY);
          spawnPuddle(hitX, hitY);
          return false;
        }
      }
      for (let i = g.hunters.length - 1; i >= 0; i--) {
        if (collides(p, g.hunters[i])) {
          const hitX = g.hunters[i].x + g.hunters[i].w / 2;
          const hitY = g.hunters[i].y + g.hunters[i].h / 2;
          g.hunters.splice(i, 1);
          g.combo++;
          g.comboTimer = 2;
          g.score += Math.round(25 * comboMult);
          g.coins += 3 + cb;
          setScore(g.score);
          setCoins(g.coins);
          birdShitSound.play('poop_hit_hunter');
          scatterAoE(hitX, hitY);
          chainLightning(hitX, hitY);
          spawnPuddle(hitX, hitY);
          return false;
        }
      }
      // Poops are blocked by buildings
      for (const obs of g.obstacles) {
        if (collides(p, obs)) return false;
      }
      // Poops pop balloons for a small bonus
      for (let i = g.balloons.length - 1; i >= 0; i--) {
        if (collides(p, g.balloons[i])) {
          g.balloons.splice(i, 1);
          g.score += 5;
          g.coins += 1;
          setScore(g.score);
          setCoins(g.coins);
          birdShitSound.play('poop_hit_balloon');
          return false;
        }
      }
      // Golden gut: drop trail particles while falling
      if (g.upgrades.goldenGut && Math.random() < dt * 10) {
        g.groundTrails.push({ x: p.x + p.w / 2, y: p.y + p.h, life: 2.0 });
      }
      // Poop hits ground
      if (p.y >= GROUND_Y) {
        scatterAoE(p.x + p.w / 2, GROUND_Y);
        spawnPuddle(p.x + p.w / 2, GROUND_Y);
        return false;
      }
      return true;
    });

    // Update pedestrians
    g.pedestrians = g.pedestrians.filter((p) => {
      p.x -= p.speed * dt;
      return p.x > -PED_W;
    });

    // Update hunters & shooting
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
              w: BULLET_W,
              h: BULLET_H,
              vx: (dx / dist) * g.bulletSpeed,
              vy: (dy / dist) * g.bulletSpeed,
            });
          }
          h.shootTimer = g.hunterShootInterval + Math.random() * 0.667; // was rand*40 frames
        }
      }
      return h.x > -HUNTER_W - 10;
    });

    // Helper: take damage (checks shield first)
    const takeDamage = () => {
      if (g.shieldActive) {
        g.shieldActive = false;
        g.shieldTimer = 15;
        g.hitFlash = HIT_FLASH_TIME * 0.3; // brief flash to show shield blocked
        return;
      }
      g.hitFlash = HIT_FLASH_TIME;
      birdShitSound.play('bullet_hit');
      if (devModeRef.current) return; // dev mode: invincible, skip HP loss
      g.lives--;
      setLives(g.lives);
      if (g.lives <= 0) {
        g.running = false;
        setGameState('over');
        birdShitSound.play('game_over');
        if (g.score > highScoreRef.current) {
          setHighScore(g.score);
          localStorage.setItem(STORAGE_KEY, g.score.toString());
        }
        submitScoreRef.current(g.score);
      }
    };

    // Update bullets
    const birdEntity: Entity = {
      x: g.birdX + 4,
      y: g.birdY + 4,
      w: BIRD_W - 8,
      h: BIRD_H - 8,
    };
    g.bullets = g.bullets.filter((b) => {
      b.vy += GRAVITY * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      if (!inCountdown && g.hitFlash === 0 && collides(b, birdEntity)) {
        takeDamage();
        return false;
      }
      return b.x > -10 && b.x < CANVAS_W + 10 && b.y > -10 && b.y < CANVAS_H + 10;
    });

    // Update obstacles + bird collision
    g.obstacles = g.obstacles.filter((obs) => {
      obs.x -= obs.speed * dt;
      if (!inCountdown && g.hitFlash === 0 && collides(birdEntity, obs)) {
        takeDamage();
      }
      return obs.x > -OBSTACLE_W;
    });

    // Update balloons + bird collision
    g.balloons = g.balloons.filter((bal) => {
      bal.x -= bal.speed * dt;
      bal.y = bal.baseY + Math.sin(g.time * 1.5 + bal.driftPhase) * bal.driftAmp;
      const balEntity = { x: bal.x + 3, y: bal.y + 3, w: BALLOON_W - 6, h: BALLOON_H - 6 };
      if (!inCountdown && g.hitFlash === 0 && collides(birdEntity, balEntity)) {
        takeDamage();
        return false;
      }
      return bal.x > -BALLOON_W;
    });

    if (!g.running) return;

    // Draw sky (biome-colored)
    const biome = g.biome;
    const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    skyGrad.addColorStop(0, biome.skyGradient[0]);
    skyGrad.addColorStop(1, biome.skyGradient[1]);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, CANVAS_W, GROUND_Y);

    // Draw ground
    ctx.fillStyle = biome.groundColor;
    ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y);
    ctx.strokeStyle = biome.groundLineColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(CANVAS_W, GROUND_Y);
    ctx.stroke();

    // Road dashes
    ctx.strokeStyle = biome.dashColor;
    ctx.lineWidth = 1;
    const dashOffset = (g.time * g.scrollSpeed) % 40;
    for (let dx = -dashOffset; dx < CANVAS_W; dx += 40) {
      ctx.beginPath();
      ctx.moveTo(dx, GROUND_Y + 15);
      ctx.lineTo(dx + 20, GROUND_Y + 15);
      ctx.stroke();
    }

    // Draw entities
    g.obstacles.forEach((o) => drawObstacle(ctx, o));
    g.balloons.forEach((bal) => drawBalloon(ctx, bal, g.frame));
    g.pedestrians.forEach((p) => drawPedestrian(ctx, p));
    g.hunters.forEach((h) => drawHunter(ctx, h));
    g.bullets.forEach((b) => drawBullet(ctx, b));
    g.poops.forEach((p) => drawPoop(ctx, p));
    selectedSkinRef.current(ctx, g.birdX, g.birdY, g.wingUp, g.hitFlash > 0 && Math.floor(g.hitFlash * 60) % 4 < 2);

    // ── Update + render effects ──

    // Toxic puddles: damage enemies, decay
    g.toxicPuddles = g.toxicPuddles.filter((puddle) => {
      puddle.life -= dt;
      puddle.tickTimer -= dt;
      if (puddle.tickTimer <= 0) {
        puddle.tickTimer = 0.5;
        // Damage pedestrians/hunters standing in puddle
        for (const ped of g.pedestrians) {
          if (!ped.hit && ped.x < puddle.x + puddle.w && ped.x + PED_W > puddle.x && ped.y + PED_H > puddle.y) {
            ped.hit = true;
            g.score += 10;
            g.coins += 1;
            setScore(g.score);
            setCoins(g.coins);
          }
        }
        for (let i = g.hunters.length - 1; i >= 0; i--) {
          const h = g.hunters[i];
          if (h.x < puddle.x + puddle.w && h.x + HUNTER_W > puddle.x && h.y + HUNTER_H > puddle.y) {
            g.hunters.splice(i, 1);
            g.score += 25;
            g.coins += 3;
            setScore(g.score);
            setCoins(g.coins);
          }
        }
      }
      // Draw puddle
      const alpha = Math.min(1, puddle.life * 0.5);
      ctx.fillStyle = `rgba(34, 197, 94, ${alpha * 0.5})`;
      ctx.fillRect(puddle.x, puddle.y, puddle.w, puddle.h);
      ctx.fillStyle = `rgba(34, 197, 94, ${alpha * 0.3})`;
      ctx.fillRect(puddle.x - 2, puddle.y + puddle.h, puddle.w + 4, 2);
      return puddle.life > 0;
    });

    // Ground trails (golden gut): damage on contact, decay
    g.groundTrails = g.groundTrails.filter((trail) => {
      trail.life -= dt;
      // Damage enemies touching trail
      for (const ped of g.pedestrians) {
        if (!ped.hit && Math.abs(ped.x + PED_W / 2 - trail.x) < 10 && Math.abs(ped.y + PED_H - trail.y) < 15) {
          ped.hit = true;
          g.score += 10;
          g.coins += 1;
          setScore(g.score);
          setCoins(g.coins);
        }
      }
      // Draw trail particle
      const alpha = Math.min(1, trail.life * 0.7);
      ctx.fillStyle = `rgba(251, 191, 36, ${alpha * 0.6})`;
      ctx.beginPath();
      ctx.arc(trail.x, trail.y, 3, 0, Math.PI * 2);
      ctx.fill();
      return trail.life > 0;
    });

    // Lightning arcs: visual only, decay
    g.lightningArcs = g.lightningArcs.filter((arc) => {
      arc.life -= dt;
      const alpha = Math.min(1, arc.life * 4);
      ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Jagged lightning path
      const dx = arc.x2 - arc.x1;
      const dy = arc.y2 - arc.y1;
      const segs = 5;
      ctx.moveTo(arc.x1, arc.y1);
      for (let s = 1; s < segs; s++) {
        const t = s / segs;
        const jx = (Math.random() - 0.5) * 12;
        const jy = (Math.random() - 0.5) * 12;
        ctx.lineTo(arc.x1 + dx * t + jx, arc.y1 + dy * t + jy);
      }
      ctx.lineTo(arc.x2, arc.y2);
      ctx.stroke();
      return arc.life > 0;
    });

    // Scatter bomb splash rings: expand + fade
    const SPLASH_DURATION = 0.35;
    g.splashEffects = g.splashEffects.filter((fx) => {
      fx.life -= dt;
      const progress = 1 - fx.life / SPLASH_DURATION; // 0→1
      const currentRadius = fx.radius * progress;
      const alpha = (1 - progress) * 0.8;
      ctx.strokeStyle = `rgba(255, 160, 30, ${alpha})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(fx.x, fx.y, currentRadius, 0, Math.PI * 2);
      ctx.stroke();
      // Inner fill flash at start
      if (progress < 0.3) {
        ctx.fillStyle = `rgba(255, 220, 80, ${(0.3 - progress) * 1.5})`;
        ctx.beginPath();
        ctx.arc(fx.x, fx.y, currentRadius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      return fx.life > 0;
    });

    // Draw boss
    if (g.boss && g.bossDefinition) {
      g.bossDefinition.draw(ctx, g.boss, g.time);

      // Boss HP bar
      const boss = g.boss;
      const barW = 160;
      const barH = 10;
      const barX = CANVAS_W / 2 - barW / 2;
      const barY = CANVAS_H - 20;
      const hpRatio = Math.max(0, boss.hp / boss.maxHp);

      ctx.fillStyle = '#374151';
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = hpRatio > 0.5 ? '#22c55e' : hpRatio > 0.25 ? '#fbbf24' : '#ef4444';
      ctx.fillRect(barX, barY, barW * hpRatio, barH);
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 1;
      ctx.strokeRect(barX, barY, barW, barH);

      // Boss name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(boss.name, CANVAS_W / 2, barY - 4);
      ctx.textAlign = 'left';

      // Boss intro overlay
      if (boss.introTimer > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.5, boss.introTimer * 0.3)})`;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 28px Inter, sans-serif';
        ctx.fillText('BOSS FIGHT!', CANVAS_W / 2, CANVAS_H / 2 - 20);
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 18px Inter, sans-serif';
        ctx.fillText(boss.name, CANVAS_W / 2, CANVAS_H / 2 + 15);
        ctx.textAlign = 'left';
      }

      // Shield indicator
      if (g.upgrades.featherShield) {
        ctx.textAlign = 'left';
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillStyle = g.shieldActive ? '#22c55e' : '#6b7280';
        ctx.fillText(g.shieldActive ? '🛡️ READY' : `🛡️ ${Math.ceil(g.shieldTimer)}s`, 16, CANVAS_H - 10);
      }
    }

    // Night biome: spotlight visibility
    if (biome.visibilityRadius > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-in';
      const grad = ctx.createRadialGradient(
        g.birdX + BIRD_W / 2, g.birdY + BIRD_H / 2, biome.visibilityRadius * 0.3,
        g.birdX + BIRD_W / 2, g.birdY + BIRD_H / 2, biome.visibilityRadius,
      );
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(1, 'rgba(255,255,255,0.15)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.restore();
    }

    // Combo counter
    if (g.combo > 1) {
      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = `bold ${16 + g.combo}px "JetBrains Mono", monospace`;
      ctx.fillStyle = `rgba(251,191,36,${Math.min(1, 0.5 + g.comboTimer * 0.25)})`;
      ctx.fillText(`${g.combo}x COMBO`, CANVAS_W / 2, 70);
      ctx.restore();
    }

    // HUD
    ctx.fillStyle = '#44D62C';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${g.score}`, 16, 30);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillText(`Lv.${g.level}`, 16, 48);

    // Level progress bar
    const prevThreshold = getLevelThreshold(g.level - 1);
    const progress = Math.min(1, (g.score - prevThreshold) / (nextThreshold - prevThreshold));
    ctx.fillStyle = '#374151';
    ctx.fillRect(62, 40, 80, 6);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(62, 40, 80 * progress, 6);

    // Lives (hearts)
    const heartsStartX = CANVAS_W / 2 - (g.lives * 24) / 2;
    for (let i = 0; i < g.lives; i++) {
      drawHeart(ctx, heartsStartX + i * 24, 16, 8);
    }

    // Coins
    drawCoin(ctx, CANVAS_W - 110, 44, 6);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${g.coins}`, CANVAS_W - 100, 48);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px "JetBrains Mono", monospace';
    ctx.fillText(`Best: ${Math.max(g.score, highScoreRef.current)}`, CANVAS_W - 16, 30);

    // Countdown overlay
    if (inCountdown) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      const secondsLeft = Math.ceil(g.countdownTimer);
      const frac = g.countdownTimer - Math.floor(g.countdownTimer);
      const scale = 1 + frac * 0.3;

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (secondsLeft > 0) {
        ctx.font = `bold ${Math.round(72 * scale)}px Inter, sans-serif`;
        ctx.fillStyle = '#44D62C';
        ctx.shadowColor = '#44D62C';
        ctx.shadowBlur = 20;
        ctx.fillText(`${secondsLeft}`, CANVAS_W / 2, CANVAS_H / 2 - 20);
        ctx.shadowBlur = 0;
        ctx.font = 'bold 18px Inter, sans-serif';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText(`Level ${g.level}`, CANVAS_W / 2, CANVAS_H / 2 + 30);
        ctx.font = '14px Inter, sans-serif';
        ctx.fillStyle = '#9ca3af';
        ctx.fillText('Get ready!', CANVAS_W / 2, CANVAS_H / 2 + 55);
      }
      ctx.restore();
    }

    frameRef.current = requestAnimationFrame(gameLoop);
  }, [canvasRef, keysRef, selectedSkinRef, setGameState, setScore, setLives, setCoins, setLevel, setHighScore, highScoreRef, submitScoreRef]);

  const selectCard = useCallback((index: number) => {
    const g = gameRef.current;
    if (index < 0 || index >= g.offeredCards.length) return;
    const card = g.offeredCards[index];
    const currentStacks = g.pickedCards.get(card.id) ?? 0;
    card.apply(g, currentStacks + 1);
    g.pickedCards.set(card.id, currentStacks + 1);
    setLives(g.lives);
    setCoins(g.coins);
    birdShitSound.play('card_select');
    // Shield activation check
    if (g.upgrades.featherShield && !g.shieldActive) {
      g.shieldTimer = 15;
      g.shieldActive = false;
    }
  }, [setLives, setCoins]);
  buyUpgradeRef.current = selectCard as unknown as (index: number) => void;

  const continueFromUpgrade = useCallback(() => {
    const g = gameRef.current;
    g.running = true;
    g.bullets = [];
    g.obstacles = [];
    g.balloons = [];
    g.countdownTimer = COUNTDOWN_TIME;
    g.spawnTimerPed = 0;
    g.spawnTimerHunter = 0;
    g.spawnTimerObstacle = 0;
    g.spawnTimerBalloon = 0;
    prevTimeRef.current = 0; // reset dt tracking
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop, setGameState]);

  const selectRelic = useCallback((index: number) => {
    const g = gameRef.current;
    if (index < 0 || index >= g.offeredRelics.length) return;
    const relic = g.offeredRelics[index];
    relic.apply(g);
    g.relics.push(relic.id);
    setLives(g.lives);
    birdShitSound.play('card_select');

    // After relic, offer card selection
    g.offeredCards = rollCards(g.pickedCards, devModeRef.current ? CARD_POOL.length : 3);
    setGameState('upgrading');
  }, [setLives, setGameState]);

  const submitScoreToLeaderboard = useCallback(async (finalScore: number) => {
    if (finalScore <= 0) return;
    let name = playerNameRef.current;
    if (!name) {
      name = `Player_${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      localStorage.setItem('birdshit-player-name', name);
    }
    try {
      console.info('Submitting Bird Shit score:', { name, score: finalScore, game: 'bird-shit' });
      await leaderboardApi.addEntry(name, finalScore, 'bird-shit');
      console.info('Score submitted successfully');
    } catch (error) {
      console.error('Failed to submit score to leaderboard:', error);
    }
  }, [playerNameRef]);
  submitScoreRef.current = submitScoreToLeaderboard;

  const startGame = useCallback(() => {
    birdShitSound.init();
    birdShitSound.play('game_start');
    const g = gameRef.current;
    g.running = true;
    g.birdX = 120;
    g.birdY = 150;
    g.score = 0;
    g.lives = 3;
    g.coins = 0;
    g.level = 1;
    g.poops = [];
    g.pedestrians = [];
    g.hunters = [];
    g.bullets = [];
    g.obstacles = [];
    g.balloons = [];
    g.frame = 0;
    g.time = 0;
    g.hitFlash = 0;
    g.poopCooldown = 0;
    g.countdownTimer = COUNTDOWN_TIME;
    g.upgrades = { ...DEFAULT_UPGRADES };
    g.spawnTimerPed = 0;
    g.spawnTimerHunter = 0;
    g.spawnTimerObstacle = 0;
    g.spawnTimerBalloon = 0;
    g.pickedCards = new Map();
    g.offeredCards = [];
    g.biome = pickBiome();
    g.boss = null;
    g.bossDefinition = null;
    g.relics = [];
    g.offeredRelics = [];
    g.combo = 0;
    g.comboTimer = 0;
    g.runMode = 'classic';
    g.seed = randomSeed();
    g.toxicPuddles = [];
    g.groundTrails = [];
    g.lightningArcs = [];
    g.splashEffects = [];
    g.shieldTimer = 0;
    g.shieldActive = false;
    setDifficulty(g, 1);
    setScore(0);
    setLives(3);
    setCoins(0);
    setLevel(1);
    prevTimeRef.current = 0; // reset dt tracking
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop, setGameState, setScore, setLives, setCoins, setLevel]);
  startGameRef.current = startGame;

  const startWithMode = useCallback((mode: 'classic' | 'daily' | 'seeded', seed?: number) => {
    startGame();
    const g = gameRef.current;
    g.runMode = mode;
    if (mode === 'daily') {
      g.seed = dailySeed();
    } else if (seed !== undefined) {
      g.seed = seed;
    }
  }, [startGame]);

  // Cleanup on unmount
  useEffect(() => {
    const game = gameRef.current;
    return () => {
      game.running = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return {
    gameRef,
    frameRef,
    redrawUpgradeScreen,
    startGame,
    dropPoop,
    selectCard,
    selectRelic,
    continueFromUpgrade,
    startWithMode,
  };
}
