import { useState, useRef, useEffect, useCallback } from 'react';
import { Bird, Play } from 'lucide-react';

// --- Game Constants ---
const CANVAS_W = 800;
const CANVAS_H = 400;
const GROUND_Y = 350;
const SKY_MIN = 20;
const BASE_BIRD_SPEED = 2.5;
const BASE_SCROLL_SPEED = 1.5;
const BASE_POOP_SPEED = 3;
const BIRD_W = 36;
const BIRD_H = 28;
const PED_W = 20;
const PED_H = 36;
const BASE_POOP_W = 8;
const BASE_POOP_H = 10;
const BULLET_W = 8;
const BULLET_H = 4;
const BASE_BULLET_SPEED = 3.5;
const HUNTER_W = 24;
const HUNTER_H = 40;
const BASE_SPAWN_INTERVAL_PED = 100;
const BASE_SPAWN_INTERVAL_HUNTER = 250;
const BASE_HUNTER_SHOOT_INTERVAL = 90;
const POOP_COOLDOWN_FRAMES = 12;
const STORAGE_KEY = 'bird-shit-highscore';

// Level thresholds - score needed to reach each level
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800];
// After index 9, each level needs +600 more

function getLevelThreshold(level: number): number {
  if (level < LEVEL_THRESHOLDS.length) return LEVEL_THRESHOLDS[level];
  return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (level - LEVEL_THRESHOLDS.length + 1) * 600;
}

// --- Upgrade Definitions ---
interface Upgrades {
  poopSpeed: number;
  poopSize: number;
  birdSpeed: number;
  extraLife: number;
  splitPoop: number;
  homingPoop: number;
}

const DEFAULT_UPGRADES: Upgrades = {
  poopSpeed: 0,
  poopSize: 0,
  birdSpeed: 0,
  extraLife: 0,
  splitPoop: 0,
  homingPoop: 0,
};

interface UpgradeDef {
  key: keyof Upgrades;
  name: string;
  desc: string[];
  maxLevel: number;
  costs: number[];
}

const UPGRADE_DEFS: UpgradeDef[] = [
  { key: 'poopSpeed', name: 'Poop Speed', desc: ['Faster poop', 'Even faster', 'Maximum velocity'], maxLevel: 3, costs: [5, 10, 18] },
  { key: 'poopSize', name: 'Poop Size', desc: ['Bigger poop', 'Huge poop', 'Mega poop'], maxLevel: 3, costs: [5, 10, 18] },
  { key: 'birdSpeed', name: 'Bird Speed', desc: ['Faster flight', 'Swift bird', 'Lightning bird'], maxLevel: 3, costs: [4, 8, 14] },
  { key: 'extraLife', name: 'Extra Life', desc: ['+1 HP', '+1 HP', '+1 HP', '+1 HP', '+1 HP'], maxLevel: 5, costs: [8, 12, 18, 25, 35] },
  { key: 'splitPoop', name: 'Split Poop', desc: ['Double drop', 'Triple drop'], maxLevel: 2, costs: [15, 28] },
  { key: 'homingPoop', name: 'Homing Poop', desc: ['Weak tracking', 'Strong tracking'], maxLevel: 2, costs: [18, 32] },
];

interface Entity {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface Pedestrian extends Entity {
  hit: boolean;
  speed: number;
}
interface Hunter extends Entity {
  speed: number;
  shootTimer: number;
}
interface Poop extends Entity {
  vy: number;
  vx: number;
}
interface Bullet extends Entity {
  vx: number;
  vy: number;
}

type GameState = 'idle' | 'playing' | 'upgrading' | 'over';

const BirdShitApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const keysRef = useRef<Set<string>>(new Set());
  const gameRef = useRef({
    running: false,
    birdX: 120,
    birdY: 150,
    score: 0,
    lives: 3,
    coins: 0,
    level: 1,
    poops: [] as Poop[],
    pedestrians: [] as Pedestrian[],
    hunters: [] as Hunter[],
    bullets: [] as Bullet[],
    frame: 0,
    wingUp: false,
    hitFlash: 0,
    poopCooldown: 0,
    upgrades: { ...DEFAULT_UPGRADES } as Upgrades,
    // Difficulty params (recalculated per level)
    scrollSpeed: BASE_SCROLL_SPEED,
    spawnIntervalPed: BASE_SPAWN_INTERVAL_PED,
    spawnIntervalHunter: BASE_SPAWN_INTERVAL_HUNTER,
    hunterShootInterval: BASE_HUNTER_SHOOT_INTERVAL,
    bulletSpeed: BASE_BULLET_SPEED,
  });

  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  // Compute effective stats from upgrades
  const getPoopSpeed = useCallback((upgrades: Upgrades) => BASE_POOP_SPEED + upgrades.poopSpeed * 1.0, []);
  const getPoopW = useCallback((upgrades: Upgrades) => BASE_POOP_W + upgrades.poopSize * 3, []);
  const getPoopH = useCallback((upgrades: Upgrades) => BASE_POOP_H + upgrades.poopSize * 2, []);
  const getBirdSpeed = useCallback((upgrades: Upgrades) => BASE_BIRD_SPEED + upgrades.birdSpeed * 0.6, []);
  const getHomingStrength = useCallback((upgrades: Upgrades) => upgrades.homingPoop === 0 ? 0 : upgrades.homingPoop === 1 ? 0.4 : 0.9, []);

  // Recalculate difficulty for a given level
  const setDifficulty = useCallback((g: typeof gameRef.current, lvl: number) => {
    g.scrollSpeed = BASE_SCROLL_SPEED + (lvl - 1) * 0.15;
    g.spawnIntervalPed = Math.max(35, BASE_SPAWN_INTERVAL_PED - (lvl - 1) * 8);
    g.spawnIntervalHunter = Math.max(70, BASE_SPAWN_INTERVAL_HUNTER - (lvl - 1) * 22);
    g.hunterShootInterval = Math.max(35, BASE_HUNTER_SHOOT_INTERVAL - (lvl - 1) * 7);
    g.bulletSpeed = BASE_BULLET_SPEED + (lvl - 1) * 0.2;
  }, []);

  // --- Drawing helpers ---
  const drawBird = (ctx: CanvasRenderingContext2D, x: number, y: number, wingUp: boolean, flash: boolean) => {
    ctx.save();
    if (flash) ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#44D62C';
    ctx.beginPath();
    ctx.ellipse(x + BIRD_W / 2, y + BIRD_H / 2, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#37ad24';
    ctx.beginPath();
    if (wingUp) {
      ctx.ellipse(x + BIRD_W / 2 - 2, y - 4, 12, 6, -0.3, 0, Math.PI * 2);
    } else {
      ctx.ellipse(x + BIRD_W / 2 - 2, y + BIRD_H - 2, 12, 5, 0.3, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x + BIRD_W - 8, y + 8, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x + BIRD_W - 7, y + 8, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(x + BIRD_W, y + 10);
    ctx.lineTo(x + BIRD_W + 8, y + 13);
    ctx.lineTo(x + BIRD_W, y + 16);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const drawPedestrian = (ctx: CanvasRenderingContext2D, p: Pedestrian) => {
    ctx.save();
    if (p.hit) {
      ctx.fillStyle = '#854d0e';
      ctx.beginPath();
      ctx.ellipse(p.x + PED_W / 2, p.y - 2, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = p.hit ? '#999' : '#e5e7eb';
    ctx.beginPath();
    ctx.arc(p.x + PED_W / 2, p.y + 6, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = p.hit ? '#666' : '#9ca3af';
    ctx.fillRect(p.x + 4, p.y + 12, 12, 14);
    ctx.strokeStyle = p.hit ? '#666' : '#9ca3af';
    ctx.lineWidth = 3;
    const legOffset = Math.sin(p.x * 0.1) * 3;
    ctx.beginPath();
    ctx.moveTo(p.x + 7, p.y + 26);
    ctx.lineTo(p.x + 5 + legOffset, p.y + PED_H);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x + 13, p.y + 26);
    ctx.lineTo(p.x + 15 - legOffset, p.y + PED_H);
    ctx.stroke();
    ctx.restore();
  };

  const drawHunter = (ctx: CanvasRenderingContext2D, h: Hunter) => {
    ctx.save();
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(h.x + HUNTER_W / 2, h.y + 6, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(h.x + 2, h.y - 4, HUNTER_W - 4, 8);
    ctx.fillRect(h.x + 6, h.y - 10, HUNTER_W - 12, 8);
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(h.x + 4, h.y + 13, 16, 16);
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(h.x + HUNTER_W / 2, h.y + 16);
    ctx.lineTo(h.x + HUNTER_W / 2 + 10, h.y + 4);
    ctx.stroke();
    ctx.fillStyle = '#374151';
    ctx.fillRect(h.x + HUNTER_W / 2 + 6, h.y - 2, 4, 10);
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 3;
    const legOffset = Math.sin(h.x * 0.08) * 3;
    ctx.beginPath();
    ctx.moveTo(h.x + 8, h.y + 29);
    ctx.lineTo(h.x + 6 + legOffset, h.y + HUNTER_H);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(h.x + 16, h.y + 29);
    ctx.lineTo(h.x + 18 - legOffset, h.y + HUNTER_H);
    ctx.stroke();
    ctx.restore();
  };

  const drawBullet = (ctx: CanvasRenderingContext2D, b: Bullet) => {
    ctx.save();
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 6;
    ctx.fillRect(b.x, b.y, BULLET_W, BULLET_H);
    ctx.restore();
  };

  const drawPoop = (ctx: CanvasRenderingContext2D, p: Poop) => {
    ctx.save();
    ctx.fillStyle = '#854d0e';
    ctx.beginPath();
    ctx.ellipse(p.x + p.w / 2, p.y + p.h / 2, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#a16207';
    ctx.beginPath();
    ctx.ellipse(p.x + p.w / 2, p.y + 2, Math.min(3, p.w / 2), 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawHeart = (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) => {
    ctx.save();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(cx, cy + size * 0.3);
    ctx.bezierCurveTo(cx, cy - size * 0.3, cx - size, cy - size * 0.3, cx - size, cy + size * 0.1);
    ctx.bezierCurveTo(cx - size, cy + size * 0.6, cx, cy + size, cx, cy + size);
    ctx.bezierCurveTo(cx, cy + size, cx + size, cy + size * 0.6, cx + size, cy + size * 0.1);
    ctx.bezierCurveTo(cx + size, cy - size * 0.3, cx, cy - size * 0.3, cx, cy + size * 0.3);
    ctx.fill();
    ctx.restore();
  };

  const drawCoin = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
    ctx.save();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#b45309';
    ctx.font = `bold ${r}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', cx, cy + 1);
    ctx.restore();
  };

  // --- Collision detection ---
  const collides = (a: Entity, b: Entity) =>
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

  // --- Drop poop with upgrades ---
  const dropPoop = useCallback(() => {
    const g = gameRef.current;
    if (!g.running || g.poopCooldown > 0) return;
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
        vy: ps,
        vx,
      });
    }
  }, [getPoopW, getPoopH, getPoopSpeed]);

  // --- Upgrade screen drawing ---
  const drawUpgradeScreen = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const g = gameRef.current;

    // Dark background
    const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    skyGrad.addColorStop(0, '#0a0a0a');
    skyGrad.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Border glow
    ctx.strokeStyle = '#44D62C';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 10, CANVAS_W - 40, CANVAS_H - 20);

    // Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillText(`LEVEL ${g.level} COMPLETE!`, CANVAS_W / 2, 48);

    // Coins display
    drawCoin(ctx, CANVAS_W / 2 - 50, 72, 8);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${g.coins} coins`, CANVAS_W / 2 - 38, 77);

    // Upgrades grid (2 columns, 3 rows)
    const startX = 50;
    const startY = 100;
    const colW = 360;
    const rowH = 80;

    for (let i = 0; i < UPGRADE_DEFS.length; i++) {
      const def = UPGRADE_DEFS[i];
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = startX + col * colW;
      const y = startY + row * rowH;
      const currentLevel = g.upgrades[def.key];
      const isMaxed = currentLevel >= def.maxLevel;
      const cost = isMaxed ? 0 : def.costs[currentLevel];
      const canAfford = !isMaxed && g.coins >= cost;

      // Background box
      ctx.fillStyle = canAfford ? 'rgba(68, 214, 44, 0.08)' : 'rgba(255,255,255,0.03)';
      ctx.strokeStyle = canAfford ? '#44D62C' : '#374151';
      ctx.lineWidth = 1;
      const boxW = colW - 20;
      const boxH = rowH - 12;
      ctx.fillRect(x, y, boxW, boxH);
      ctx.strokeRect(x, y, boxW, boxH);

      // Key number
      ctx.fillStyle = canAfford ? '#44D62C' : '#4b5563';
      ctx.font = 'bold 20px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`[${i + 1}]`, x + 22, y + 28);

      // Name
      ctx.fillStyle = isMaxed ? '#6b7280' : '#e5e7eb';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(def.name, x + 44, y + 22);

      // Level pips
      for (let j = 0; j < def.maxLevel; j++) {
        ctx.fillStyle = j < currentLevel ? '#44D62C' : '#374151';
        ctx.fillRect(x + 44 + j * 16, y + 30, 12, 4);
      }

      // Description or MAXED
      ctx.font = '12px Inter, sans-serif';
      if (isMaxed) {
        ctx.fillStyle = '#6b7280';
        ctx.fillText('MAXED', x + 44, y + 54);
      } else {
        ctx.fillStyle = '#9ca3af';
        ctx.fillText(def.desc[currentLevel], x + 44, y + 54);
        // Cost
        drawCoin(ctx, x + boxW - 50, y + 26, 6);
        ctx.fillStyle = canAfford ? '#fbbf24' : '#6b7280';
        ctx.font = 'bold 13px "JetBrains Mono", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`${cost}`, x + boxW - 12, y + 30);
      }
    }

    // Hint
    ctx.textAlign = 'center';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('Press 1-6 or click to buy upgrades', CANVAS_W / 2, CANVAS_H - 12);
  }, []);

  // --- Game loop ---
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

    // --- Check level up ---
    const nextThreshold = getLevelThreshold(g.level);
    if (g.score >= nextThreshold) {
      g.running = false;
      g.level++;
      setLevel(g.level);
      setDifficulty(g, g.level);
      setGameState('upgrading');
      return;
    }

    // --- Bird free movement ---
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

    // Spawn pedestrians
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

    // Spawn hunters (after a brief grace period at start of each level segment)
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

    // Homing poop logic
    const homingStr = getHomingStrength(g.upgrades);

    // Update poops
    g.poops = g.poops.filter(p => {
      p.y += p.vy;
      p.x += p.vx;

      // Homing: nudge toward nearest target
      if (homingStr > 0) {
        let nearestDx = 0;
        let nearestDist = Infinity;
        const targets: Entity[] = [
          ...g.pedestrians.filter(ped => !ped.hit),
          ...g.hunters,
        ];
        for (const t of targets) {
          const dx = (t.x + t.w / 2) - (p.x + p.w / 2);
          const dy = (t.y + t.h / 2) - (p.y + p.h / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < nearestDist && dy > 0) { // only track things below
            nearestDist = dist;
            nearestDx = dx;
          }
        }
        if (nearestDist < 200) {
          p.vx += (nearestDx > 0 ? 1 : -1) * homingStr * 0.1;
          // Dampen vx slightly
          p.vx *= 0.97;
        }
      }

      // Clamp poop to canvas bounds horizontally
      if (p.x < 0) p.x = 0;
      if (p.x > CANVAS_W - p.w) p.x = CANVAS_W - p.w;

      // Check poop-pedestrian collision
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
      // Check poop-hunter collision
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
      return p.y < GROUND_Y;
    });

    // Update pedestrians
    g.pedestrians = g.pedestrians.filter(p => {
      p.x -= p.speed;
      return p.x > -PED_W;
    });

    // Update hunters & shooting
    g.hunters = g.hunters.filter(h => {
      h.x -= h.speed;
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
      return h.x > -HUNTER_W - 10;
    });

    // Update bullets
    const birdEntity: Entity = { x: g.birdX + 4, y: g.birdY + 4, w: BIRD_W - 8, h: BIRD_H - 8 };
    g.bullets = g.bullets.filter(b => {
      b.x += b.vx;
      b.y += b.vy;
      if (g.hitFlash === 0 && collides(b, birdEntity)) {
        g.lives--;
        g.hitFlash = 40;
        setLives(g.lives);
        if (g.lives <= 0) {
          g.running = false;
          setGameState('over');
          if (g.score > highScore) {
            setHighScore(g.score);
            localStorage.setItem(STORAGE_KEY, g.score.toString());
          }
        }
        return false;
      }
      return b.x > -10 && b.x < CANVAS_W + 10 && b.y > -10 && b.y < CANVAS_H + 10;
    });

    if (!g.running) return;

    // --- Draw ---
    const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    skyGrad.addColorStop(0, '#0a0a0a');
    skyGrad.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, CANVAS_W, GROUND_Y);

    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y);
    ctx.strokeStyle = '#44D62C';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(CANVAS_W, GROUND_Y);
    ctx.stroke();

    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    const dashOffset = (g.frame * g.scrollSpeed) % 40;
    for (let dx = -dashOffset; dx < CANVAS_W; dx += 40) {
      ctx.beginPath();
      ctx.moveTo(dx, GROUND_Y + 15);
      ctx.lineTo(dx + 20, GROUND_Y + 15);
      ctx.stroke();
    }

    g.pedestrians.forEach(p => drawPedestrian(ctx, p));
    g.hunters.forEach(h => drawHunter(ctx, h));
    g.bullets.forEach(b => drawBullet(ctx, b));
    g.poops.forEach(p => drawPoop(ctx, p));
    drawBird(ctx, g.birdX, g.birdY, g.wingUp, g.hitFlash > 0 && g.hitFlash % 4 < 2);

    // HUD
    ctx.fillStyle = '#44D62C';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${g.score}`, 16, 30);

    // Level indicator
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
    ctx.fillText(`Best: ${Math.max(g.score, highScore)}`, CANVAS_W - 16, 30);

    frameRef.current = requestAnimationFrame(gameLoop);
  }, [highScore, setDifficulty, getBirdSpeed, getHomingStrength, getPoopSpeed, getPoopW, getPoopH]);

  // --- Buy upgrade ---
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

    // Apply extra life immediately
    if (def.key === 'extraLife') {
      g.lives++;
      setLives(g.lives);
    }

    // Redraw upgrade screen
    drawUpgradeScreen();
  }, [drawUpgradeScreen]);

  // --- Continue from upgrade screen ---
  const continueFromUpgrade = useCallback(() => {
    const g = gameRef.current;
    g.running = true;
    // Clear existing enemies/bullets for a fresh start to the new level
    g.bullets = [];
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

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
    g.frame = 0;
    g.hitFlash = 0;
    g.poopCooldown = 0;
    g.upgrades = { ...DEFAULT_UPGRADES };
    setDifficulty(g, 1);
    setScore(0);
    setLives(3);
    setCoins(0);
    setLevel(1);
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop, setDifficulty]);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
        e.preventDefault();
      }

      if (gameState === 'upgrading') {
        // Number keys 1-6 to buy upgrades
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 6) {
          buyUpgrade(num - 1);
        }
        return;
      }

      if (gameState !== 'playing') {
        if (e.code === 'Space' || e.code === 'Enter') {
          startGame();
        }
        return;
      }

      keysRef.current.add(e.code);
      if (e.code === 'Space') {
        dropPoop();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, startGame, dropPoop, buyUpgrade, continueFromUpgrade]);

  // Cleanup
  useEffect(() => {
    return () => {
      gameRef.current.running = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Draw idle/game over/upgrade screens
  useEffect(() => {
    if (gameState === 'playing') return;

    if (gameState === 'upgrading') {
      drawUpgradeScreen();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    skyGrad.addColorStop(0, '#0a0a0a');
    skyGrad.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, CANVAS_W, GROUND_Y);
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y);
    ctx.strokeStyle = '#44D62C';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(CANVAS_W, GROUND_Y);
    ctx.stroke();

    drawBird(ctx, CANVAS_W / 2 - BIRD_W / 2, 140, true, false);
    ctx.textAlign = 'center';

    if (gameState === 'over') {
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 36px Inter, sans-serif';
      ctx.fillText('GAME OVER', CANVAS_W / 2, 100);
      ctx.fillStyle = '#44D62C';
      ctx.font = 'bold 24px "JetBrains Mono", monospace';
      ctx.fillText(`Score: ${score}`, CANVAS_W / 2, 210);
      ctx.fillStyle = '#fbbf24';
      ctx.font = '16px "JetBrains Mono", monospace';
      ctx.fillText(`Level ${level}`, CANVAS_W / 2, 235);
      if (score >= highScore && score > 0) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = '16px Inter, sans-serif';
        ctx.fillText('New High Score!', CANVAS_W / 2, 260);
      }
    } else {
      ctx.fillStyle = '#44D62C';
      ctx.font = 'bold 28px Inter, sans-serif';
      ctx.fillText('Bird Shit Simulator', CANVAS_W / 2, 100);
    }

    ctx.fillStyle = '#6b7280';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText('Press SPACE to start', CANVAS_W / 2, 290);
    ctx.font = '13px Inter, sans-serif';
    ctx.fillText('WASD / Arrows = Move  |  SPACE = Poop', CANVAS_W / 2, 320);
  }, [gameState, score, highScore, level, drawUpgradeScreen]);

  // Handle canvas click for upgrade screen
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState === 'upgrading') {
      // Check if clicking on an upgrade box
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_W / rect.width;
      const scaleY = CANVAS_H / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;

      const startX = 50;
      const startY = 100;
      const colW = 360;
      const rowH = 80;

      for (let i = 0; i < UPGRADE_DEFS.length; i++) {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = startX + col * colW;
        const y = startY + row * rowH;
        const boxW = colW - 20;
        const boxH = rowH - 12;

        if (mx >= x && mx <= x + boxW && my >= y && my <= y + boxH) {
          buyUpgrade(i);
          return;
        }
      }

      return;
    }

    if (gameState === 'playing') dropPoop();
    else startGame();
  }, [gameState, dropPoop, startGame, buyUpgrade, continueFromUpgrade]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-802/10 rounded-lg">
          <Bird className="w-6 h-6 text-802" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">Bird Shit Simulator</h1>
          <p className="text-sm text-gray-400">
            Fly freely, poop on pedestrians, and dodge the hunters!
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">High Score</p>
          <p className="text-lg font-mono font-bold text-802">{highScore}</p>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="card p-4 flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="rounded-lg border border-gray-800 w-full"
          style={{ maxWidth: CANVAS_W, imageRendering: 'pixelated' }}
          onClick={handleCanvasClick}
        />

        {/* Mobile Controls */}
        {gameState === 'playing' && (
          <div className="grid grid-cols-3 gap-2 mt-4 sm:hidden w-full max-w-xs">
            <div />
            <button
              onTouchStart={(e) => { e.preventDefault(); keysRef.current.add('ArrowUp'); }}
              onTouchEnd={() => keysRef.current.delete('ArrowUp')}
              className="btn-secondary py-3 text-lg"
            >
              Up
            </button>
            <div />
            <button
              onTouchStart={(e) => { e.preventDefault(); keysRef.current.add('ArrowLeft'); }}
              onTouchEnd={() => keysRef.current.delete('ArrowLeft')}
              className="btn-secondary py-3 text-lg"
            >
              Left
            </button>
            <button
              onTouchStart={(e) => { e.preventDefault(); dropPoop(); }}
              className="btn-primary py-3 text-lg"
            >
              Poop
            </button>
            <button
              onTouchStart={(e) => { e.preventDefault(); keysRef.current.add('ArrowRight'); }}
              onTouchEnd={() => keysRef.current.delete('ArrowRight')}
              className="btn-secondary py-3 text-lg"
            >
              Right
            </button>
            <div />
            <button
              onTouchStart={(e) => { e.preventDefault(); keysRef.current.add('ArrowDown'); }}
              onTouchEnd={() => keysRef.current.delete('ArrowDown')}
              className="btn-secondary py-3 text-lg"
            >
              Down
            </button>
            <div />
          </div>
        )}

        {/* Controls bar */}
        <div className="flex items-center gap-4 mt-4">
          {gameState === 'idle' && (
            <button onClick={startGame} className="btn-primary flex items-center gap-2 px-6 py-2">
              <Play className="w-4 h-4" />
              Start Game
            </button>
          )}
          {gameState === 'over' && (
            <button onClick={startGame} className="btn-primary flex items-center gap-2 px-6 py-2">
              <Play className="w-4 h-4" />
              Play Again
            </button>
          )}
          {gameState === 'upgrading' && (
            <button onClick={continueFromUpgrade} className="btn-primary flex items-center gap-2 px-6 py-2">
              <Play className="w-4 h-4" />
              Continue to Level {level}
            </button>
          )}
          {gameState === 'playing' && (
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-500 font-mono">
                Score: <span className="text-802 font-bold">{score}</span>
              </p>
              <p className="text-sm text-gray-500 font-mono">
                Level: <span className="text-yellow-400 font-bold">{level}</span>
              </p>
              <p className="text-sm text-gray-500 font-mono">
                Lives: <span className="text-red-400 font-bold">{lives}</span>
              </p>
              <p className="text-sm text-gray-500 font-mono">
                Coins: <span className="text-yellow-400 font-bold">{coins}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="card p-4">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center text-sm">
          <div>
            <kbd className="px-2 py-1 bg-gray-800 rounded text-802 font-mono text-xs">WASD / Arrows</kbd>
            <p className="text-gray-500 mt-1">Move freely</p>
          </div>
          <div>
            <kbd className="px-2 py-1 bg-gray-800 rounded text-802 font-mono text-xs">SPACE</kbd>
            <p className="text-gray-500 mt-1">Drop poop</p>
          </div>
          <div>
            <span className="text-802 font-bold">+10</span> / <span className="text-802 font-bold">+25</span>
            <p className="text-gray-500 mt-1">Pedestrian / Hunter</p>
          </div>
          <div>
            <span className="text-red-400 font-bold">3 Lives</span>
            <p className="text-gray-500 mt-1">Dodge hunter bullets!</p>
          </div>
          <div>
            <span className="text-yellow-400 font-bold">Upgrades</span>
            <p className="text-gray-500 mt-1">Level up to upgrade!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirdShitApp;
