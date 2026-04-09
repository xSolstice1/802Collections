import { useRef, useCallback, useEffect } from 'react';
import {
  CANVAS_W, CANVAS_H, GROUND_Y, SKY_MIN,
  BIRD_W, BIRD_H, PED_W, PED_H, HUNTER_W, HUNTER_H,
  BULLET_W, BULLET_H,
  BASE_SCROLL_SPEED, BASE_SPAWN_INTERVAL_PED, BASE_SPAWN_INTERVAL_HUNTER,
  BASE_HUNTER_SHOOT_INTERVAL, BASE_BULLET_SPEED,
  POOP_COOLDOWN_FRAMES, GRAVITY, POOP_GRAVITY, COUNTDOWN_FRAMES, STORAGE_KEY,
  OBSTACLE_W, getLevelThreshold, collides, getObstacleSpawnInterval, getObstacleMaxHeight, OBSTACLE_MIN_H,
  BALLOON_W, BALLOON_H, getBalloonSpawnInterval,
} from '../constants';
import { DEFAULT_UPGRADES, UPGRADE_DEFS, getPoopSpeed, getPoopW, getPoopH, getBirdSpeed, getHomingStrength } from '../upgrades';
import { drawObstacle, drawBalloon, drawPedestrian, drawHunter, drawBullet, drawPoop, drawHeart, drawCoin, drawUpgradeScreen } from '../renderers';
import { leaderboardApi } from '@services/leaderboardApi';
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
}: UseGameLoopParams) {
  const frameRef = useRef<number>(0);
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
  });

  const setDifficulty = (g: GameData, lvl: number) => {
    g.scrollSpeed = BASE_SCROLL_SPEED + (lvl - 1) * 0.15;
    g.spawnIntervalPed = Math.max(35, BASE_SPAWN_INTERVAL_PED - (lvl - 1) * 8);
    g.spawnIntervalHunter = Math.max(70, BASE_SPAWN_INTERVAL_HUNTER - (lvl - 1) * 22);
    g.hunterShootInterval = Math.max(35, BASE_HUNTER_SHOOT_INTERVAL - (lvl - 1) * 7);
    g.bulletSpeed = BASE_BULLET_SPEED + (lvl - 1) * 0.2;
  };

  const redrawUpgradeScreen = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) drawUpgradeScreen(ctx, gameRef.current);
  }, [canvasRef]);

  const dropPoop = useCallback(() => {
    const g = gameRef.current;
    if (!g.running || g.poopCooldown > 0 || g.countdownTimer > 0) return;
    g.poopCooldown = POOP_COOLDOWN_FRAMES;

    const pw = getPoopW(g.upgrades);
    const ph = getPoopH(g.upgrades);
    const ps = getPoopSpeed(g.upgrades);
    const splitCount = 1 + g.upgrades.splitPoop; // 1, 2, or 3

    for (let i = 0; i < splitCount; i++) {
      let vx = 0;
      if (splitCount === 2) {
        vx = i === 0 ? -0.7 : 0.7;
      } else if (splitCount === 3) {
        vx = (i - 1) * 0.8;
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

  const gameLoop = useCallback(() => {
    const g = gameRef.current;
    if (!g.running) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    g.frame++;
    g.wingUp = Math.floor(g.frame / 8) % 2 === 0;
    if (g.hitFlash > 0) g.hitFlash--;
    if (g.poopCooldown > 0) g.poopCooldown--;

    const inCountdown = g.countdownTimer > 0;
    if (inCountdown) g.countdownTimer--;

    // Check level up (not during countdown)
    const nextThreshold = getLevelThreshold(g.level);
    if (!inCountdown && g.score >= nextThreshold) {
      g.running = false;
      g.level++;
      setLevel(g.level);
      setDifficulty(g, g.level);
      setGameState('upgrading');
      return;
    }

    // Bird free movement (always allowed, even during countdown)
    const birdSpd = getBirdSpeed(g.upgrades);
    const keys = keysRef.current;
    if (keys.has('ArrowUp') || keys.has('KeyW')) g.birdY -= birdSpd;
    if (keys.has('ArrowDown') || keys.has('KeyS')) g.birdY += birdSpd;
    if (keys.has('ArrowLeft') || keys.has('KeyA')) g.birdX -= birdSpd;
    if (keys.has('ArrowRight') || keys.has('KeyD')) g.birdX += birdSpd;

    if (g.birdX < 0) g.birdX = 0;
    if (g.birdX > CANVAS_W - BIRD_W) g.birdX = CANVAS_W - BIRD_W;
    if (g.birdY < SKY_MIN) g.birdY = SKY_MIN;
    if (g.birdY > GROUND_Y - BIRD_H - 10) g.birdY = GROUND_Y - BIRD_H - 10;

    // Spawning & combat only when not in countdown
    if (!inCountdown) {
      if (g.frame % g.spawnIntervalPed === 0) {
        g.pedestrians.push({
          x: CANVAS_W + Math.random() * 100,
          y: GROUND_Y - PED_H,
          w: PED_W,
          h: PED_H,
          hit: false,
          speed: g.scrollSpeed + Math.random() * 0.5,
        });
      }
      if (g.frame % g.spawnIntervalHunter === 0 && g.frame > 120) {
        g.hunters.push({
          x: CANVAS_W + Math.random() * 60,
          y: GROUND_Y - HUNTER_H,
          w: HUNTER_W,
          h: HUNTER_H,
          speed: g.scrollSpeed * 0.7 + Math.random() * 0.3,
          shootTimer: 30 + Math.floor(Math.random() * 40),
        });
      }
      const obstacleInterval = getObstacleSpawnInterval(g.level);
      if (obstacleInterval !== Infinity && g.frame % Math.floor(obstacleInterval) === 0) {
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
      const balloonInterval = getBalloonSpawnInterval(g.level);
      if (balloonInterval !== Infinity && g.frame % Math.floor(balloonInterval) === 0) {
        const baseY = SKY_MIN + 20 + Math.floor(Math.random() * (GROUND_Y - SKY_MIN - 140));
        const bal: Balloon = {
          x: CANVAS_W + Math.random() * 80,
          y: baseY,
          w: BALLOON_W,
          h: BALLOON_H,
          speed: g.scrollSpeed * 0.7 + Math.random() * 0.4,
          baseY,
          driftPhase: Math.random() * Math.PI * 2,
          driftAmp: 8 + Math.random() * 12,
          colorIndex: Math.floor(Math.random() * 6),
        };
        g.balloons.push(bal);
      }
    }

    const homingStr = getHomingStrength(g.upgrades);

    // Update poops
    g.poops = g.poops.filter((p) => {
      p.vy += POOP_GRAVITY;
      p.y += p.vy;
      p.x += p.vx;
      p.vx *= 0.99;

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
          p.vx += (nearestDx > 0 ? 1 : -1) * homingStr * 0.1;
          p.vx *= 0.97;
        }
      }

      if (p.x < 0) p.x = 0;
      if (p.x > CANVAS_W - p.w) p.x = CANVAS_W - p.w;

      for (const ped of g.pedestrians) {
        if (!ped.hit && collides(p, ped)) {
          ped.hit = true;
          g.score += 10;
          g.coins += 1;
          setScore(g.score);
          setCoins(g.coins);
          return false;
        }
      }
      for (let i = g.hunters.length - 1; i >= 0; i--) {
        if (collides(p, g.hunters[i])) {
          g.hunters.splice(i, 1);
          g.score += 25;
          g.coins += 3;
          setScore(g.score);
          setCoins(g.coins);
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
          return false;
        }
      }
      return p.y < GROUND_Y;
    });

    // Update pedestrians
    g.pedestrians = g.pedestrians.filter((p) => {
      p.x -= p.speed;
      return p.x > -PED_W;
    });

    // Update hunters & shooting
    g.hunters = g.hunters.filter((h) => {
      h.x -= h.speed;
      if (!inCountdown) {
        h.shootTimer--;
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
          h.shootTimer = g.hunterShootInterval + Math.floor(Math.random() * 40);
        }
      }
      return h.x > -HUNTER_W - 10;
    });

    // Update bullets
    const birdEntity: Entity = {
      x: g.birdX + 4,
      y: g.birdY + 4,
      w: BIRD_W - 8,
      h: BIRD_H - 8,
    };
    g.bullets = g.bullets.filter((b) => {
      b.vy += GRAVITY;
      b.x += b.vx;
      b.y += b.vy;
      if (!inCountdown && g.hitFlash === 0 && collides(b, birdEntity)) {
        g.lives--;
        g.hitFlash = 40;
        setLives(g.lives);
        if (g.lives <= 0) {
          g.running = false;
          setGameState('over');
          if (g.score > highScoreRef.current) {
            setHighScore(g.score);
            localStorage.setItem(STORAGE_KEY, g.score.toString());
          }
          submitScoreRef.current(g.score);
        }
        return false;
      }
      return b.x > -10 && b.x < CANVAS_W + 10 && b.y > -10 && b.y < CANVAS_H + 10;
    });

    // Update obstacles + bird collision
    g.obstacles = g.obstacles.filter((obs) => {
      obs.x -= obs.speed;
      if (!inCountdown && g.hitFlash === 0 && collides(birdEntity, obs)) {
        g.lives--;
        g.hitFlash = 40;
        setLives(g.lives);
        if (g.lives <= 0) {
          g.running = false;
          setGameState('over');
          if (g.score > highScoreRef.current) {
            setHighScore(g.score);
            localStorage.setItem(STORAGE_KEY, g.score.toString());
          }
          submitScoreRef.current(g.score);
        }
      }
      return obs.x > -OBSTACLE_W;
    });

    // Update balloons + bird collision
    g.balloons = g.balloons.filter((bal) => {
      bal.x -= bal.speed;
      bal.y = bal.baseY + Math.sin(g.frame * 0.025 + bal.driftPhase) * bal.driftAmp;
      const balEntity = { x: bal.x + 3, y: bal.y + 3, w: BALLOON_W - 6, h: BALLOON_H - 6 };
      if (!inCountdown && g.hitFlash === 0 && collides(birdEntity, balEntity)) {
        g.lives--;
        g.hitFlash = 40;
        setLives(g.lives);
        if (g.lives <= 0) {
          g.running = false;
          setGameState('over');
          if (g.score > highScoreRef.current) {
            setHighScore(g.score);
            localStorage.setItem(STORAGE_KEY, g.score.toString());
          }
          submitScoreRef.current(g.score);
        }
        return false;
      }
      return bal.x > -BALLOON_W;
    });

    if (!g.running) return;

    // Draw sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    skyGrad.addColorStop(0, '#0a0a0a');
    skyGrad.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, CANVAS_W, GROUND_Y);

    // Draw ground
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y);
    ctx.strokeStyle = '#44D62C';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(CANVAS_W, GROUND_Y);
    ctx.stroke();

    // Road dashes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    const dashOffset = (g.frame * g.scrollSpeed) % 40;
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
    selectedSkinRef.current(ctx, g.birdX, g.birdY, g.wingUp, g.hitFlash > 0 && g.hitFlash % 4 < 2);

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

      const secondsLeft = Math.ceil(g.countdownTimer / 60);
      const frameInSecond = g.countdownTimer % 60;
      const scale = 1 + (frameInSecond / 60) * 0.3;

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

  const buyUpgrade = useCallback((index: number) => {
    const g = gameRef.current;
    if (index < 0 || index >= UPGRADE_DEFS.length) return;
    const def = UPGRADE_DEFS[index];
    const currentLevel = g.upgrades[def.key];
    if (currentLevel >= def.maxLevel) return;
    const cost = def.costs[currentLevel];
    if (g.coins < cost) return;

    g.coins -= cost;
    g.upgrades[def.key]++;
    setCoins(g.coins);

    if (def.key === 'extraLife') {
      g.lives++;
      setLives(g.lives);
    }

    // Re-render upgrade screen
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) drawUpgradeScreen(ctx, g);
  }, [canvasRef, setCoins, setLives]);
  buyUpgradeRef.current = buyUpgrade;

  const continueFromUpgrade = useCallback(() => {
    const g = gameRef.current;
    g.running = true;
    g.bullets = [];
    g.obstacles = [];
    g.balloons = [];
    g.countdownTimer = COUNTDOWN_FRAMES;
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop, setGameState]);

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
    g.hitFlash = 0;
    g.poopCooldown = 0;
    g.countdownTimer = COUNTDOWN_FRAMES;
    g.upgrades = { ...DEFAULT_UPGRADES };
    setDifficulty(g, 1);
    setScore(0);
    setLives(3);
    setCoins(0);
    setLevel(1);
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop, setGameState, setScore, setLives, setCoins, setLevel]);
  startGameRef.current = startGame;

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
    buyUpgrade,
    continueFromUpgrade,
  };
}
