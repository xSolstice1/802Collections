import { useState, useRef, useEffect, useCallback } from 'react';
import { Ribbon, Play, Maximize, Minimize, Zap, Shield, Clock, Star, Ghost } from 'lucide-react';

// --- Game Constants ---
const CANVAS_W = 600;
const HUD_HEIGHT = 44;
const CELL_SIZE = 20;
const GRID_W = CANVAS_W / CELL_SIZE;            // 30
const GRID_H = (600 - HUD_HEIGHT) / CELL_SIZE;  // 27 playable rows (with 16px leftover)
const GRID_OFFSET_Y = HUD_HEIGHT + 8;           // grid starts below HUD + small gap
const CANVAS_H = GRID_OFFSET_Y + GRID_H * CELL_SIZE; // total canvas height
const BASE_TICK_MS = 120;
const MIN_TICK_MS = 50;
const STORAGE_KEY_CLASSIC = 'snake-highscore';
const STORAGE_KEY_MODERN = 'snake-highscore-modern';

type Direction = 'up' | 'down' | 'left' | 'right';
type GameState = 'idle' | 'playing' | 'over';
type GameMode = 'classic' | 'modern';

interface Cell { x: number; y: number; }

// --- Powerup system ---
type PowerupType = 'speed' | 'slow' | 'shield' | 'double' | 'ghost';

interface Powerup {
  type: PowerupType;
  cell: Cell;
  spawnTime: number;
  duration: number; // how long it stays on field (ms)
}

interface ActivePowerup {
  type: PowerupType;
  endTime: number;
}

const POWERUP_INFO: Record<PowerupType, { color: string; glow: string; label: string; effectDuration: number }> = {
  speed:  { color: '#fbbf24', glow: '#f59e0b', label: 'SPEED',   effectDuration: 5000 },
  slow:   { color: '#60a5fa', glow: '#3b82f6', label: 'SLOW',    effectDuration: 6000 },
  shield: { color: '#a78bfa', glow: '#8b5cf6', label: 'SHIELD',  effectDuration: 4000 },
  double: { color: '#f472b6', glow: '#ec4899', label: '2X PTS',  effectDuration: 8000 },
  ghost:  { color: '#34d399', glow: '#10b981', label: 'GHOST',   effectDuration: 5000 },
};

const SnakeApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dirQueue = useRef<Direction[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    life: number; maxLife: number;
    size: number;
    color: string;
  }

  const gameRef = useRef({
    snake: [{ x: 5, y: Math.floor(GRID_H / 2) }] as Cell[],
    dir: 'right' as Direction,
    food: { x: 15, y: Math.floor(GRID_H / 2) } as Cell,
    score: 0,
    running: false,
    particles: [] as Particle[],
    frame: 0,
    // Modern mode state
    powerups: [] as Powerup[],
    activePowerups: [] as ActivePowerup[],
    lastPowerupSpawn: 0,
    shieldHits: 0,
  });
  const renderRef = useRef<number>(0);

  const [gameState, setGameState] = useState<GameState>('idle');
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CLASSIC);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [modernHighScore, setModernHighScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MODERN);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentHighScore = gameMode === 'classic' ? highScore : modernHighScore;

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Track fullscreen
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        const el = gameAreaRef.current ?? document.documentElement;
        await el.requestFullscreen();
      }
    } catch {}
  }, []);

  // --- Spawn food not on snake or powerups ---
  const spawnFood = useCallback((snake: Cell[], powerups?: Powerup[]): Cell => {
    const occupied = new Set(snake.map(c => `${c.x},${c.y}`));
    if (powerups) powerups.forEach(p => occupied.add(`${p.cell.x},${p.cell.y}`));
    let cell: Cell;
    do {
      cell = { x: Math.floor(Math.random() * GRID_W), y: Math.floor(Math.random() * GRID_H) };
    } while (occupied.has(`${cell.x},${cell.y}`));
    return cell;
  }, []);

  // --- Spawn powerup ---
  const spawnPowerup = useCallback((snake: Cell[], food: Cell, existing: Powerup[]): Powerup | null => {
    const types: PowerupType[] = ['speed', 'slow', 'shield', 'double', 'ghost'];
    const type = types[Math.floor(Math.random() * types.length)];
    const occupied = new Set(snake.map(c => `${c.x},${c.y}`));
    occupied.add(`${food.x},${food.y}`);
    existing.forEach(p => occupied.add(`${p.cell.x},${p.cell.y}`));

    let cell: Cell;
    let attempts = 0;
    do {
      cell = { x: Math.floor(Math.random() * GRID_W), y: Math.floor(Math.random() * GRID_H) };
      attempts++;
      if (attempts > 100) return null;
    } while (occupied.has(`${cell.x},${cell.y}`));

    return { type, cell, spawnTime: Date.now(), duration: 8000 + Math.random() * 4000 };
  }, []);

  // --- Spawn particles on eat ---
  const spawnEatParticles = useCallback((cx: number, cy: number, color1 = '#ef4444', color2 = '#fbbf24') => {
    const g = gameRef.current;
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.5;
      const speed = 1.5 + Math.random() * 3;
      g.particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1, maxLife: 1,
        size: 2 + Math.random() * 3,
        color: Math.random() > 0.5 ? color1 : color2,
      });
    }
  }, []);

  // --- Check if a powerup effect is active ---
  const hasPowerup = useCallback((type: PowerupType): boolean => {
    return gameRef.current.activePowerups.some(ap => ap.type === type && ap.endTime > Date.now());
  }, []);

  // --- Helper: get cell center (with grid offset) ---
  const cellCenter = useCallback((c: Cell) => ({
    x: c.x * CELL_SIZE + CELL_SIZE / 2,
    y: GRID_OFFSET_Y + c.y * CELL_SIZE + CELL_SIZE / 2,
  }), []);

  // --- Drawing ---
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const g = gameRef.current;
    g.frame++;
    const t = Date.now() / 1000;
    const now = Date.now();

    // --- Background ---
    ctx.fillStyle = '#080810';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // --- HUD area background ---
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, CANVAS_W, HUD_HEIGHT);
    // HUD separator line
    ctx.strokeStyle = 'rgba(68, 214, 44, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, HUD_HEIGHT);
    ctx.lineTo(CANVAS_W, HUD_HEIGHT);
    ctx.stroke();

    // --- Checkerboard tiles (in grid area only) ---
    for (let gx = 0; gx < GRID_W; gx++) {
      for (let gy = 0; gy < GRID_H; gy++) {
        if ((gx + gy) % 2 === 0) {
          ctx.fillStyle = 'rgba(68, 214, 44, 0.018)';
        } else {
          ctx.fillStyle = 'rgba(68, 214, 44, 0.008)';
        }
        ctx.fillRect(gx * CELL_SIZE, GRID_OFFSET_Y + gy * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    // Subtle corner vignette
    const vigCy = GRID_OFFSET_Y + (GRID_H * CELL_SIZE) / 2;
    const vignette = ctx.createRadialGradient(CANVAS_W / 2, vigCy, CANVAS_W * 0.25, CANVAS_W / 2, vigCy, CANVAS_W * 0.7);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, GRID_OFFSET_Y, CANVAS_W, GRID_H * CELL_SIZE);

    // Border glow (around grid area)
    ctx.save();
    ctx.shadowColor = '#44D62C';
    ctx.shadowBlur = 8;
    ctx.strokeStyle = 'rgba(68, 214, 44, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, GRID_OFFSET_Y, CANVAS_W - 2, GRID_H * CELL_SIZE);
    ctx.restore();
    ctx.strokeStyle = 'rgba(68, 214, 44, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, GRID_OFFSET_Y, CANVAS_W, GRID_H * CELL_SIZE);

    // --- Ghost mode visual ---
    if (hasPowerup('ghost')) {
      ctx.save();
      ctx.fillStyle = `rgba(52, 211, 153, ${0.03 + Math.sin(t * 4) * 0.02})`;
      ctx.fillRect(0, GRID_OFFSET_Y, CANVAS_W, GRID_H * CELL_SIZE);
      ctx.restore();
    }

    // --- Update & draw particles ---
    g.particles = g.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.life -= 0.025;
      if (p.life <= 0) return false;

      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return true;
    });

    // --- Powerups on field ---
    for (const pu of g.powerups) {
      const info = POWERUP_INFO[pu.type];
      const pcx = pu.cell.x * CELL_SIZE + CELL_SIZE / 2;
      const pcy = GRID_OFFSET_Y + pu.cell.y * CELL_SIZE + CELL_SIZE / 2;
      const timeLeft = (pu.spawnTime + pu.duration - now) / pu.duration;
      const puPulse = 1 + Math.sin(t * 5) * 0.12;
      const radius = (CELL_SIZE / 2.5) * puPulse;

      // Blink when about to expire
      if (timeLeft < 0.3 && Math.sin(t * 12) > 0) continue;

      // Glow rings
      ctx.save();
      for (let ring = 2; ring >= 1; ring--) {
        ctx.globalAlpha = 0.08 * ring;
        ctx.fillStyle = info.glow;
        ctx.beginPath();
        ctx.arc(pcx, pcy, radius + ring * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Main circle
      ctx.save();
      ctx.shadowColor = info.glow;
      ctx.shadowBlur = 14;
      const puGrad = ctx.createRadialGradient(pcx - 1, pcy - 2, 1, pcx, pcy, radius);
      puGrad.addColorStop(0, '#fff');
      puGrad.addColorStop(0.3, info.color);
      puGrad.addColorStop(1, info.glow);
      ctx.fillStyle = puGrad;
      ctx.beginPath();
      ctx.arc(pcx, pcy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Icon text
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const icons: Record<PowerupType, string> = { speed: '⚡', slow: '🕐', shield: '🛡', double: '×2', ghost: '👻' };
      ctx.fillText(icons[pu.type], pcx, pcy + 1);
      ctx.restore();
    }

    // --- Food: animated pulsing glow ---
    const fcx = g.food.x * CELL_SIZE + CELL_SIZE / 2;
    const fcy = GRID_OFFSET_Y + g.food.y * CELL_SIZE + CELL_SIZE / 2;
    const pulse = 1 + Math.sin(t * 4) * 0.15;
    const foodRadius = (CELL_SIZE / 2.2) * pulse;

    // Outer glow rings
    ctx.save();
    for (let ring = 3; ring >= 1; ring--) {
      ctx.globalAlpha = 0.06 * ring;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(fcx, fcy, foodRadius + ring * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Inner glow
    ctx.save();
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 20;
    const appleGrad = ctx.createRadialGradient(fcx - 2, fcy - 3, 1, fcx, fcy, foodRadius);
    appleGrad.addColorStop(0, '#ff8a8a');
    appleGrad.addColorStop(0.4, '#ef4444');
    appleGrad.addColorStop(1, '#991b1b');
    ctx.fillStyle = appleGrad;
    ctx.beginPath();
    ctx.arc(fcx, fcy, foodRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Stem
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(fcx, fcy - foodRadius);
    ctx.quadraticCurveTo(fcx + 3, fcy - foodRadius - 5, fcx + 1, fcy - foodRadius - 8);
    ctx.stroke();

    // Leaf
    ctx.save();
    ctx.fillStyle = '#22c55e';
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.ellipse(fcx + 4, fcy - foodRadius - 2, 4, 2, 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Specular highlight
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.beginPath();
    ctx.ellipse(fcx - 2.5, fcy - 3, 2.5, 1.8, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Floating sparkle particles around food
    for (let i = 0; i < 3; i++) {
      const angle = t * 2 + (Math.PI * 2 * i) / 3;
      const dist = foodRadius + 8 + Math.sin(t * 3 + i) * 3;
      const sx = fcx + Math.cos(angle) * dist;
      const sy = fcy + Math.sin(angle) * dist;
      ctx.save();
      ctx.globalAlpha = 0.4 + Math.sin(t * 5 + i * 2) * 0.3;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // --- Snake body: smooth connected segments with glow ---
    const snake = g.snake;
    if (snake.length === 0) return;

    const centers = snake.map(cellCenter);
    const isGhost = hasPowerup('ghost');
    const isShielded = hasPowerup('shield');

    // Draw body glow underneath
    ctx.save();
    ctx.shadowColor = isGhost ? '#34d399' : isShielded ? '#a78bfa' : '#44D62C';
    ctx.shadowBlur = 16;
    ctx.strokeStyle = isGhost ? 'rgba(52, 211, 153, 0.15)' : 'rgba(68, 214, 44, 0.15)';
    ctx.lineWidth = CELL_SIZE + 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(centers[0].x, centers[0].y);
    for (let i = 1; i < centers.length; i++) {
      ctx.lineTo(centers[i].x, centers[i].y);
    }
    ctx.stroke();
    ctx.restore();

    // Draw body segments from tail to head
    for (let i = snake.length - 1; i >= 0; i--) {
      const cx = centers[i].x;
      const cy = centers[i].y;
      const pct = i / Math.max(snake.length - 1, 1);
      const isHead = i === 0;

      const segSize = isHead ? CELL_SIZE - 1 : CELL_SIZE - 2 - pct * 4;
      const half = segSize / 2;

      // Ghost transparency
      if (isGhost) {
        ctx.save();
        ctx.globalAlpha = 0.5 + Math.sin(t * 6) * 0.15;
      }

      // Shield visual
      if (isShielded && isHead) {
        ctx.save();
        ctx.strokeStyle = `rgba(167, 139, 250, ${0.4 + Math.sin(t * 5) * 0.2})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(cx, cy, CELL_SIZE / 2 + 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      if (isHead) {
        ctx.save();
        ctx.shadowColor = isGhost ? '#34d399' : '#44D62C';
        ctx.shadowBlur = 10;

        const headGrad = ctx.createRadialGradient(cx - 2, cy - 2, 1, cx, cy, half + 2);
        if (isGhost) {
          headGrad.addColorStop(0, '#86efac');
          headGrad.addColorStop(0.5, '#34d399');
          headGrad.addColorStop(1, '#059669');
        } else {
          headGrad.addColorStop(0, '#7df76a');
          headGrad.addColorStop(0.5, '#44D62C');
          headGrad.addColorStop(1, '#1e8c14');
        }
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.roundRect(cx - half, cy - half, segSize, segSize, 7);
        ctx.fill();

        ctx.strokeStyle = 'rgba(30, 140, 20, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        // Eyes
        const eyeOffset = 4;
        const eyeForward = 3;
        let e1x: number, e1y: number, e2x: number, e2y: number;

        if (g.dir === 'right') {
          e1x = cx + eyeForward; e1y = cy - eyeOffset;
          e2x = cx + eyeForward; e2y = cy + eyeOffset;
        } else if (g.dir === 'left') {
          e1x = cx - eyeForward; e1y = cy - eyeOffset;
          e2x = cx - eyeForward; e2y = cy + eyeOffset;
        } else if (g.dir === 'up') {
          e1x = cx - eyeOffset; e1y = cy - eyeForward;
          e2x = cx + eyeOffset; e2y = cy - eyeForward;
        } else {
          e1x = cx - eyeOffset; e1y = cy + eyeForward;
          e2x = cx + eyeOffset; e2y = cy + eyeForward;
        }

        ctx.save();
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 3;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(e1x, e1y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(e2x, e2y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        const pd = 0.8;
        const pdx = g.dir === 'left' ? -pd : g.dir === 'right' ? pd : 0;
        const pdy = g.dir === 'up' ? -pd : g.dir === 'down' ? pd : 0;
        ctx.fillStyle = '#0a0a0a';
        ctx.beginPath();
        ctx.arc(e1x + pdx, e1y + pdy, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(e2x + pdx, e2y + pdy, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath();
        ctx.arc(e1x + pdx + 0.5, e1y + pdy - 0.5, 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(e2x + pdx + 0.5, e2y + pdy - 0.5, 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Tongue
        if (Math.sin(t * 8) > 0) {
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1.2;
          ctx.lineCap = 'round';
          let tx = cx, ty = cy;
          let tdx = 0, tdy = 0;
          if (g.dir === 'right') { tx = cx + half + 1; tdx = 6; }
          if (g.dir === 'left') { tx = cx - half - 1; tdx = -6; }
          if (g.dir === 'up') { ty = cy - half - 1; tdy = -6; }
          if (g.dir === 'down') { ty = cy + half + 1; tdy = 6; }
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(tx + tdx, ty + tdy);
          const forkLen = 3;
          if (g.dir === 'right' || g.dir === 'left') {
            ctx.moveTo(tx + tdx, ty + tdy);
            ctx.lineTo(tx + tdx + (tdx > 0 ? forkLen : -forkLen), ty + tdy - forkLen);
            ctx.moveTo(tx + tdx, ty + tdy);
            ctx.lineTo(tx + tdx + (tdx > 0 ? forkLen : -forkLen), ty + tdy + forkLen);
          } else {
            ctx.moveTo(tx + tdx, ty + tdy);
            ctx.lineTo(tx + tdx - forkLen, ty + tdy + (tdy > 0 ? forkLen : -forkLen));
            ctx.moveTo(tx + tdx, ty + tdy);
            ctx.lineTo(tx + tdx + forkLen, ty + tdy + (tdy > 0 ? forkLen : -forkLen));
          }
          ctx.stroke();
        }
      } else {
        const r = Math.round(68 - pct * 30);
        const gv = Math.round(214 - pct * 100);
        const b = Math.round(44 + pct * 30);

        const segGrad = ctx.createRadialGradient(cx - 1, cy - 1, 0, cx, cy, half + 1);
        if (isGhost) {
          segGrad.addColorStop(0, `rgba(${r + 40}, ${gv + 60}, ${b + 80}, 1)`);
          segGrad.addColorStop(0.7, `rgba(${r}, ${gv + 30}, ${b + 60}, 1)`);
          segGrad.addColorStop(1, `rgba(${Math.max(0, r - 20)}, ${Math.max(0, gv)}, ${b + 40}, 1)`);
        } else {
          segGrad.addColorStop(0, `rgba(${r + 40}, ${gv + 30}, ${b}, 1)`);
          segGrad.addColorStop(0.7, `rgb(${r}, ${gv}, ${b})`);
          segGrad.addColorStop(1, `rgb(${Math.max(0, r - 20)}, ${Math.max(0, gv - 30)}, ${b})`);
        }
        ctx.fillStyle = segGrad;

        ctx.beginPath();
        ctx.roundRect(cx - half, cy - half, segSize, segSize, 5);
        ctx.fill();

        if (i < snake.length - 1) {
          const prev = centers[i + 1];
          const dx = cx - prev.x;
          const dy = cy - prev.y;
          const prevHalf = (CELL_SIZE - 2 - ((i + 1) / Math.max(snake.length - 1, 1)) * 4) / 2;
          const minHalf = Math.min(half, prevHalf);

          ctx.fillStyle = isGhost ? `rgba(${r}, ${gv + 30}, ${b + 60}, 1)` : `rgb(${r}, ${gv}, ${b})`;
          if (Math.abs(dx) > 0) {
            ctx.fillRect(Math.min(cx, prev.x) + 1, cy - minHalf + 1, Math.abs(dx) - 2, minHalf * 2 - 2);
          } else if (Math.abs(dy) > 0) {
            ctx.fillRect(cx - minHalf + 1, Math.min(cy, prev.y) + 1, minHalf * 2 - 2, Math.abs(dy) - 2);
          }
        }

        if (i % 3 === 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.08 - pct * 0.06})`;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-2, -2, 4, 4);
          ctx.restore();
        }

        ctx.strokeStyle = `rgba(30, 140, 20, ${0.25 - pct * 0.15})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.roundRect(cx - half, cy - half, segSize, segSize, 5);
        ctx.stroke();
      }

      if (isGhost) ctx.restore();
    }

    // --- HUD: glassmorphism pills (drawn in HUD area) ---
    ctx.save();
    // Score pill
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(10, 8, 130, 28, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(68, 214, 44, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#44D62C';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${g.score}`, 22, 27);

    // Best pill
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(CANVAS_W - 140, 8, 130, 28, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(107, 114, 128, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    const bestScore = gameMode === 'classic' ? Math.max(g.score, highScore) : Math.max(g.score, modernHighScore);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '13px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Best: ${bestScore}`, CANVAS_W - 20, 27);

    // Length pill
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(148, 8, 90, 28, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Len: ${snake.length}`, 158, 27);

    // Active powerup indicators (modern mode)
    if (gameMode === 'modern') {
      const active = g.activePowerups.filter(ap => ap.endTime > now);
      let px = 250;
      for (const ap of active) {
        const info = POWERUP_INFO[ap.type];
        const remaining = (ap.endTime - now) / info.effectDuration;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.roundRect(px, 8, 56, 28, 14);
        ctx.fill();
        ctx.strokeStyle = `${info.color}60`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Timer bar
        ctx.fillStyle = `${info.color}40`;
        ctx.beginPath();
        ctx.roundRect(px + 2, 10, Math.max(0, 52 * remaining), 24, 12);
        ctx.fill();

        ctx.fillStyle = info.color;
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(info.label, px + 28, 26);

        px += 62;
      }
    }

    ctx.restore();
  }, [highScore, modernHighScore, gameMode, cellCenter, hasPowerup]);

  // --- Game tick ---
  const tick = useCallback(() => {
    const g = gameRef.current;
    if (!g.running) return;
    const now = Date.now();

    // Clean expired powerups on field
    if (gameMode === 'modern') {
      g.powerups = g.powerups.filter(p => now - p.spawnTime < p.duration);
      g.activePowerups = g.activePowerups.filter(ap => ap.endTime > now);

      // Spawn new powerup periodically
      if (now - g.lastPowerupSpawn > 6000 + Math.random() * 4000 && g.powerups.length < 2) {
        const pu = spawnPowerup(g.snake, g.food, g.powerups);
        if (pu) {
          g.powerups.push(pu);
          g.lastPowerupSpawn = now;
        }
      }
    }

    // Process direction queue
    if (dirQueue.current.length > 0) {
      const next = dirQueue.current.shift()!;
      const opposites: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' };
      if (next !== opposites[g.dir]) {
        g.dir = next;
      }
    }

    // Move head
    const head = g.snake[0];
    let nx = head.x;
    let ny = head.y;
    if (g.dir === 'up') ny--;
    if (g.dir === 'down') ny++;
    if (g.dir === 'left') nx--;
    if (g.dir === 'right') nx++;

    const isGhost = gameMode === 'modern' && hasPowerup('ghost');
    const isShielded = gameMode === 'modern' && hasPowerup('shield');

    // Wall collision - ghost wraps around
    if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) {
      if (isGhost) {
        if (nx < 0) nx = GRID_W - 1;
        else if (nx >= GRID_W) nx = 0;
        if (ny < 0) ny = GRID_H - 1;
        else if (ny >= GRID_H) ny = 0;
      } else {
        g.running = false;
        setGameState('over');
        const storageKey = gameMode === 'classic' ? STORAGE_KEY_CLASSIC : STORAGE_KEY_MODERN;
        const hs = gameMode === 'classic' ? highScore : modernHighScore;
        if (g.score > hs) {
          if (gameMode === 'classic') setHighScore(g.score);
          else setModernHighScore(g.score);
          localStorage.setItem(storageKey, g.score.toString());
        }
        draw();
        return;
      }
    }

    // Self collision - shield absorbs one hit
    let selfCollision = false;
    for (const seg of g.snake) {
      if (seg.x === nx && seg.y === ny) {
        selfCollision = true;
        break;
      }
    }

    if (selfCollision) {
      if (isShielded) {
        // Shield absorbs - remove shield
        g.activePowerups = g.activePowerups.filter(ap => ap.type !== 'shield');
        g.shieldHits++;
        spawnEatParticles(
          nx * CELL_SIZE + CELL_SIZE / 2,
          GRID_OFFSET_Y + ny * CELL_SIZE + CELL_SIZE / 2,
          '#a78bfa', '#8b5cf6'
        );
      } else if (isGhost) {
        // Ghost passes through itself
      } else {
        g.running = false;
        setGameState('over');
        const storageKey = gameMode === 'classic' ? STORAGE_KEY_CLASSIC : STORAGE_KEY_MODERN;
        const hs = gameMode === 'classic' ? highScore : modernHighScore;
        if (g.score > hs) {
          if (gameMode === 'classic') setHighScore(g.score);
          else setModernHighScore(g.score);
          localStorage.setItem(storageKey, g.score.toString());
        }
        draw();
        return;
      }
    }

    const newHead = { x: nx, y: ny };
    g.snake.unshift(newHead);

    // Eat food?
    if (nx === g.food.x && ny === g.food.y) {
      const pts = hasPowerup('double') ? 20 : 10;
      g.score += pts;
      setScore(g.score);
      spawnEatParticles(
        g.food.x * CELL_SIZE + CELL_SIZE / 2,
        GRID_OFFSET_Y + g.food.y * CELL_SIZE + CELL_SIZE / 2
      );
      g.food = spawnFood(g.snake, g.powerups);
    } else {
      g.snake.pop();
    }

    // Check powerup pickup (modern)
    if (gameMode === 'modern') {
      g.powerups = g.powerups.filter(pu => {
        if (pu.cell.x === nx && pu.cell.y === ny) {
          const info = POWERUP_INFO[pu.type];
          // Remove existing of same type, replace with new
          g.activePowerups = g.activePowerups.filter(ap => ap.type !== pu.type);
          g.activePowerups.push({ type: pu.type, endTime: now + info.effectDuration });
          spawnEatParticles(
            pu.cell.x * CELL_SIZE + CELL_SIZE / 2,
            GRID_OFFSET_Y + pu.cell.y * CELL_SIZE + CELL_SIZE / 2,
            info.color, '#fff'
          );
          return false;
        }
        return true;
      });
    }

    draw();

    // Speed: affected by powerups in modern mode
    let speed = Math.max(MIN_TICK_MS, BASE_TICK_MS - (g.snake.length - 1) * 2);
    if (gameMode === 'modern') {
      if (hasPowerup('speed')) speed = Math.max(35, speed * 0.6);
      if (hasPowerup('slow')) speed = Math.min(200, speed * 1.6);
    }
    tickRef.current = setTimeout(tick, speed);
  }, [draw, spawnFood, spawnPowerup, highScore, modernHighScore, gameMode, hasPowerup, spawnEatParticles]);

  // --- Render loop ---
  const renderLoop = useCallback(() => {
    const g = gameRef.current;
    if (!g.running) return;
    draw();
    renderRef.current = requestAnimationFrame(renderLoop);
  }, [draw]);

  // --- Start game ---
  const startGame = useCallback(() => {
    const g = gameRef.current;
    g.snake = [{ x: 5, y: Math.floor(GRID_H / 2) }];
    g.dir = 'right';
    g.score = 0;
    g.running = true;
    g.food = spawnFood(g.snake);
    g.particles = [];
    g.frame = 0;
    g.powerups = [];
    g.activePowerups = [];
    g.lastPowerupSpawn = Date.now();
    g.shieldHits = 0;
    dirQueue.current = [];
    setScore(0);
    setGameState('playing');
    if (tickRef.current) clearTimeout(tickRef.current);
    tickRef.current = setTimeout(tick, BASE_TICK_MS);
    cancelAnimationFrame(renderRef.current);
    renderRef.current = requestAnimationFrame(renderLoop);
  }, [tick, spawnFood, renderLoop]);

  // --- Keyboard input ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(e.code)) {
        e.preventDefault();
      }

      if (gameState !== 'playing') {
        if (e.code === 'Space' || e.code === 'Enter') startGame();
        return;
      }

      const keyMap: Record<string, Direction> = {
        ArrowUp: 'up', KeyW: 'up',
        ArrowDown: 'down', KeyS: 'down',
        ArrowLeft: 'left', KeyA: 'left',
        ArrowRight: 'right', KeyD: 'right',
      };
      const dir = keyMap[e.code];
      if (dir) {
        if (dirQueue.current.length < 2) {
          dirQueue.current.push(dir);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, startGame]);

  // --- Swipe input for mobile ---
  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (gameState !== 'playing') return;
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current || gameState !== 'playing') return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;

      const MIN_SWIPE = 20;
      if (Math.abs(dx) < MIN_SWIPE && Math.abs(dy) < MIN_SWIPE) return;

      let dir: Direction;
      if (Math.abs(dx) > Math.abs(dy)) {
        dir = dx > 0 ? 'right' : 'left';
      } else {
        dir = dy > 0 ? 'down' : 'up';
      }
      if (dirQueue.current.length < 2) {
        dirQueue.current.push(dir);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, gameState]);

  // Cleanup
  useEffect(() => {
    return () => {
      gameRef.current.running = false;
      if (tickRef.current) clearTimeout(tickRef.current);
      cancelAnimationFrame(renderRef.current);
    };
  }, []);

  // Draw idle/game over screens with animation
  useEffect(() => {
    if (gameState === 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame = 0;
    const drawScreen = () => {
      const t = Date.now() / 1000;

      ctx.fillStyle = '#080810';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Animated grid dots
      for (let gx = 0; gx < GRID_W; gx++) {
        for (let gy = 0; gy < GRID_H; gy++) {
          const dist = Math.sqrt((gx - GRID_W / 2) ** 2 + (gy - GRID_H / 2) ** 2);
          const wave = Math.sin(t * 2 - dist * 0.3) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(68, 214, 44, ${0.02 + wave * 0.03})`;
          ctx.beginPath();
          ctx.arc(gx * CELL_SIZE + CELL_SIZE / 2, GRID_OFFSET_Y + gy * CELL_SIZE + CELL_SIZE / 2, 1 + wave, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Vignette
      const vignette = ctx.createRadialGradient(CANVAS_W / 2, CANVAS_H / 2, CANVAS_W * 0.2, CANVAS_W / 2, CANVAS_H / 2, CANVAS_W * 0.7);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Border glow
      ctx.save();
      ctx.shadowColor = '#44D62C';
      ctx.shadowBlur = 10 + Math.sin(t * 2) * 4;
      ctx.strokeStyle = 'rgba(68, 214, 44, 0.5)';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, CANVAS_W - 2, CANVAS_H - 2);
      ctx.restore();

      // Animated decorative snake path
      ctx.save();
      ctx.strokeStyle = 'rgba(68, 214, 44, 0.15)';
      ctx.lineWidth = CELL_SIZE - 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      for (let i = 0; i < 20; i++) {
        const px = CANVAS_W * 0.15 + (CANVAS_W * 0.7 * i) / 20;
        const py = CANVAS_H * 0.35 + Math.sin(t * 1.5 + i * 0.5) * 30;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
      const headX = CANVAS_W * 0.15 + CANVAS_W * 0.7;
      const headY = CANVAS_H * 0.35 + Math.sin(t * 1.5 + 20 * 0.5) * 30;
      ctx.fillStyle = 'rgba(68, 214, 44, 0.25)';
      ctx.beginPath();
      ctx.arc(headX, headY, CELL_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.textAlign = 'center';

      if (gameState === 'over') {
        ctx.save();
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 42px Inter, sans-serif';
        ctx.fillText('GAME OVER', CANVAS_W / 2, CANVAS_H * 0.42);
        ctx.restore();

        ctx.save();
        ctx.shadowColor = '#44D62C';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#44D62C';
        ctx.font = 'bold 28px "JetBrains Mono", monospace';
        ctx.fillText(`${score}`, CANVAS_W / 2, CANVAS_H * 0.52);
        ctx.restore();
        ctx.fillStyle = '#6b7280';
        ctx.font = '14px "JetBrains Mono", monospace';
        ctx.fillText('POINTS', CANVAS_W / 2, CANVAS_H * 0.56);

        if (score >= currentHighScore && score > 0) {
          ctx.save();
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 12;
          ctx.fillStyle = '#fbbf24';
          ctx.font = 'bold 16px Inter, sans-serif';
          ctx.fillText('NEW HIGH SCORE!', CANVAS_W / 2, CANVAS_H * 0.63);
          ctx.restore();
        }

        // Mode label
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillText(gameMode === 'modern' ? 'MODERN MODE' : 'CLASSIC MODE', CANVAS_W / 2, CANVAS_H * 0.68);
      } else {
        ctx.save();
        ctx.shadowColor = '#44D62C';
        ctx.shadowBlur = 24;
        ctx.fillStyle = '#44D62C';
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.fillText('SNAKE', CANVAS_W / 2, CANVAS_H * 0.48);
        ctx.restore();

        ctx.fillStyle = '#6b7280';
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText('A CLASSIC REIMAGINED', CANVAS_W / 2, CANVAS_H * 0.53);

        // Mode indicator
        ctx.fillStyle = gameMode === 'modern' ? '#f472b6' : '#44D62C';
        ctx.font = 'bold 13px "JetBrains Mono", monospace';
        ctx.fillText(gameMode === 'modern' ? '✦ MODERN MODE ✦' : '◆ CLASSIC MODE ◆', CANVAS_W / 2, CANVAS_H * 0.58);
      }

      const hintAlpha = 0.4 + Math.sin(t * 3) * 0.2;
      ctx.fillStyle = `rgba(156, 163, 175, ${hintAlpha})`;
      ctx.font = '15px Inter, sans-serif';
      ctx.fillText(isMobile ? 'Tap to start' : 'Press SPACE to start', CANVAS_W / 2, CANVAS_H * 0.75);
      ctx.font = '12px Inter, sans-serif';
      ctx.fillStyle = 'rgba(107, 114, 128, 0.6)';
      ctx.fillText(isMobile ? 'Swipe to change direction' : 'WASD / Arrows = Move', CANVAS_W / 2, CANVAS_H * 0.79);

      animFrame = requestAnimationFrame(drawScreen);
    };

    drawScreen();
    return () => cancelAnimationFrame(animFrame);
  }, [gameState, score, currentHighScore, isMobile, gameMode]);

  const handleCanvasClick = useCallback((_e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') startGame();
  }, [gameState, startGame]);

  const handleCanvasTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') {
      e.preventDefault();
      startGame();
    }
  }, [gameState, startGame]);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-802/10 rounded-lg">
          <Ribbon className="w-6 h-6 text-802" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">Snake</h1>
          <p className="text-sm text-gray-400">
            Eat apples, grow longer, don't hit the walls or yourself!
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isMobile && (
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg border border-gray-700 active:scale-90"
              style={{ touchAction: 'none' }}
            >
              {isFullscreen
                ? <Minimize className="w-4 h-4 text-gray-400" />
                : <Maximize className="w-4 h-4 text-gray-400" />
              }
            </button>
          )}
          <div className="text-right">
            <p className="text-xs text-gray-500">High Score</p>
            <p className="text-lg font-mono font-bold text-802">{currentHighScore}</p>
          </div>
        </div>
      </div>

      {/* Mode selector */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => { if (gameState !== 'playing') setGameMode('classic'); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            gameMode === 'classic'
              ? 'bg-802/20 text-802 border border-802/40'
              : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600'
          } ${gameState === 'playing' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Ribbon className="w-4 h-4" />
          Classic
        </button>
        <button
          onClick={() => { if (gameState !== 'playing') setGameMode('modern'); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            gameMode === 'modern'
              ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40'
              : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600'
          } ${gameState === 'playing' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Zap className="w-4 h-4" />
          Modern
        </button>
      </div>

      {/* Game area */}
      <div ref={gameAreaRef} className={`card p-4 flex flex-col items-center relative ${isFullscreen ? '!p-0 bg-black justify-center h-full' : ''}`}>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className={`rounded-lg border border-gray-800 ${isFullscreen ? '' : 'w-full'}`}
          style={{ maxWidth: isFullscreen ? '100vw' : CANVAS_W, maxHeight: isFullscreen ? '100vh' : undefined, width: isFullscreen ? 'auto' : undefined, height: isFullscreen ? 'auto' : undefined, imageRendering: 'pixelated', touchAction: 'none', userSelect: 'none', WebkitTouchCallout: 'none', objectFit: 'contain' } as React.CSSProperties}
          onClick={handleCanvasClick}
          onTouchStart={handleCanvasTouchStart}
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Fullscreen exit button overlay */}
        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 border border-gray-700 active:scale-90 z-10"
            style={{ touchAction: 'none' }}
          >
            <Minimize className="w-4 h-4 text-gray-400" />
          </button>
        )}

        {/* Controls bar */}
        <div className={`flex items-center gap-4 mt-4 ${isFullscreen ? 'hidden' : ''}`}>
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
          {gameState === 'playing' && (
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-500 font-mono">
                Score: <span className="text-802 font-bold">{score}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="card p-4">
        {gameMode === 'classic' ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <kbd className="px-2 py-1 bg-gray-800 rounded text-802 font-mono text-xs">{isMobile ? 'Swipe' : 'WASD / Arrows'}</kbd>
              <p className="text-gray-500 mt-1">Change direction</p>
            </div>
            <div>
              <span className="text-red-400 text-lg">🍎</span>
              <p className="text-gray-500 mt-1">Eat to grow</p>
            </div>
            <div>
              <span className="text-802 font-bold">+10</span>
              <p className="text-gray-500 mt-1">Per apple</p>
            </div>
            <div>
              <span className="text-yellow-400 font-bold">Speed Up</span>
              <p className="text-gray-500 mt-1">As you grow!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
                <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
                <div>
                  <span className="text-yellow-400 font-medium">Speed Boost</span>
                  <p className="text-gray-500 text-xs">Move faster</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="text-blue-400 font-medium">Slow Motion</span>
                  <p className="text-gray-500 text-xs">Move slower</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
                <Shield className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="text-purple-400 font-medium">Shield</span>
                  <p className="text-gray-500 text-xs">Survive one self-hit</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
                <Star className="w-4 h-4 text-pink-400 shrink-0" />
                <div>
                  <span className="text-pink-400 font-medium">Double Points</span>
                  <p className="text-gray-500 text-xs">2x score per apple</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
                <Ghost className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-emerald-400 font-medium">Ghost Mode</span>
                  <p className="text-gray-500 text-xs">Pass through walls & self</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
                <span className="text-red-400 text-lg shrink-0">🍎</span>
                <div>
                  <span className="text-red-400 font-medium">+10 / +20</span>
                  <p className="text-gray-500 text-xs">Normal / with 2x</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeApp;
