import { useState, useRef, useEffect, useCallback } from 'react';
import { Ribbon, Play, Maximize, Minimize, Zap, Shield, Clock, Star, Ghost, Flame, Trophy, X } from 'lucide-react';
import { GameLeaderboard } from '@components/leaderboard';
import { leaderboardApi } from '@services/leaderboardApi';
import { snakeSoundManager } from './sound';

// --- Game Constants ---
const CANVAS_W = 600;
const HUD_HEIGHT = 44;
const CELL_SIZE = 20;
const GRID_W = CANVAS_W / CELL_SIZE;
const GRID_H = (600 - HUD_HEIGHT) / CELL_SIZE;
const GRID_OFFSET_Y = HUD_HEIGHT + 8;
const CANVAS_H = GRID_OFFSET_Y + GRID_H * CELL_SIZE;
const BASE_TICK_MS = 120;
const MIN_TICK_MS = 50;
const STORAGE_KEY_CLASSIC = 'snake-highscore';
const STORAGE_KEY_MODERN = 'snake-highscore-modern';
const STORAGE_KEY_CRAZY = 'snake-highscore-crazy';

type Direction = 'up' | 'down' | 'left' | 'right';
type GameState = 'idle' | 'playing' | 'over';
type GameMode = 'classic' | 'modern' | 'crazy';

interface Cell { x: number; y: number; }

// --- Powerup system (modern) ---
type PowerupType = 'speed' | 'slow' | 'shield' | 'double' | 'ghost';

interface Powerup {
  type: PowerupType;
  cell: Cell;
  spawnTime: number;
  duration: number;
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

// --- Chaos system (crazy mode) ---
type ChaosType = 'reverse' | 'warp' | 'portals' | 'frenzy' | 'walls' | 'drunk' | 'shrink' | 'gravity' | 'shake' | 'rainbow';

interface ChaosEvent {
  type: ChaosType;
  endTime: number;
  data?: unknown;
}

interface Portal { a: Cell; b: Cell; }

interface FallingStone {
  cell: Cell;
  spawnTime: number;  // when shadow appears
  landTime: number;   // when it hits the ground (3s countdown)
  despawnTime: number; // when it disappears after landing
  landed: boolean;
}

const CHAOS_INFO: Record<ChaosType, { color: string; label: string; icon: string; duration: number }> = {
  reverse:  { color: '#ef4444', label: 'REVERSED!',     icon: '🔄', duration: 5000 },
  warp:     { color: '#fbbf24', label: 'WARP SPEED!',   icon: '💨', duration: 3000 },
  portals:  { color: '#a78bfa', label: 'PORTALS!',      icon: '🌀', duration: 8000 },
  frenzy:   { color: '#f472b6', label: 'FOOD FRENZY!',  icon: '🍎', duration: 7000 },
  walls:    { color: '#6b7280', label: 'WALLS!',        icon: '🧱', duration: 6000 },
  drunk:    { color: '#34d399', label: 'DRUNK MODE!',   icon: '🍺', duration: 5000 },
  shrink:   { color: '#f97316', label: 'SHRINK RAY!',   icon: '✂️', duration: 0 },
  gravity:  { color: '#60a5fa', label: 'GRAVITY!',      icon: '🌊', duration: 5000 },
  shake:    { color: '#fbbf24', label: 'EARTHQUAKE!',   icon: '💥', duration: 6000 },
  rainbow:  { color: '#ec4899', label: 'RAINBOW!',      icon: '🌈', duration: 6000 },
};

const SnakeApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dirQueue = useRef<Direction[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const startGameRef = useRef<() => void>(() => {});
  const submitScoreRef = useRef<(score: number) => void>(() => {});

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
    // Modern mode
    powerups: [] as Powerup[],
    activePowerups: [] as ActivePowerup[],
    lastPowerupSpawn: 0,
    shieldHits: 0,
    // Crazy mode
    chaosEvents: [] as ChaosEvent[],
    lastChaosSpawn: 0,
    chaosAnnouncement: '' as string,
    chaosAnnouncementTime: 0,
    portals: [] as Portal[],
    crazyWalls: [] as Cell[],
    extraFood: [] as Cell[],
    gravityDir: 'down' as Direction,
    combo: 0,
    lastEatTime: 0,
    fallingStones: [] as FallingStone[],
  });
  const renderRef = useRef<number>(0);

  const [gameState, _setGameState] = useState<GameState>('idle');
  const gameStateRef = useRef<GameState>('idle');
  const setGameState = useCallback((s: GameState) => { gameStateRef.current = s; _setGameState(s); }, []);
  const [gameMode, _setGameMode] = useState<GameMode>('classic');
  const gameModeRef = useRef<GameMode>('classic');
  const setGameMode = useCallback((m: GameMode) => { gameModeRef.current = m; _setGameMode(m); }, []);
  const [score, setScore] = useState(0);
  const [highScore, _setHighScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CLASSIC);
    return saved ? parseInt(saved, 10) : 0;
  });
  const highScoreRef = useRef(highScore);
  const setHighScore = useCallback((s: number) => { highScoreRef.current = s; _setHighScore(s); }, []);
  const [modernHighScore, _setModernHighScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MODERN);
    return saved ? parseInt(saved, 10) : 0;
  });
  const modernHighScoreRef = useRef(modernHighScore);
  const setModernHighScore = useCallback((s: number) => { modernHighScoreRef.current = s; _setModernHighScore(s); }, []);
  const [crazyHighScore, _setCrazyHighScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CRAZY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const crazyHighScoreRef = useRef(crazyHighScore);
  const setCrazyHighScore = useCallback((s: number) => { crazyHighScoreRef.current = s; _setCrazyHighScore(s); }, []);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playerName, setPlayerName] = useState(() => {
    // Try to get player name from localStorage
    const saved = localStorage.getItem('snake-player-name');
    return saved || '';
  });
  const playerNameRef = useRef(playerName);
  playerNameRef.current = playerName;
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const soundEnabled = localStorage.getItem('snake-sound-enabled') !== 'false';
  const bgmEnabled = localStorage.getItem('snake-bgm-enabled') !== 'false';
  // Use bgmEnabled to initialize sound manager
  if (soundEnabled && bgmEnabled && gameState === 'playing') {
    snakeSoundManager.startBGM();
  }

  const currentHighScore = gameMode === 'classic' ? highScore : gameMode === 'modern' ? modernHighScore : crazyHighScore;

  useEffect(() => {
    const check = () => setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
    } catch {
      // fullscreen may not be available
    }
  }, []);

  // --- Helpers ---
  const getOccupied = useCallback((snake: Cell[], powerups?: Powerup[], walls?: Cell[], extraFood?: Cell[]) => {
    const set = new Set(snake.map(c => `${c.x},${c.y}`));
    if (powerups) powerups.forEach(p => set.add(`${p.cell.x},${p.cell.y}`));
    if (walls) walls.forEach(w => set.add(`${w.x},${w.y}`));
    if (extraFood) extraFood.forEach(f => set.add(`${f.x},${f.y}`));
    return set;
  }, []);

  const spawnCell = useCallback((occupied: Set<string>): Cell | null => {
    let attempts = 0;
    let cell: Cell;
    do {
      cell = { x: Math.floor(Math.random() * GRID_W), y: Math.floor(Math.random() * GRID_H) };
      attempts++;
      if (attempts > 200) return null;
    } while (occupied.has(`${cell.x},${cell.y}`));
    return cell;
  }, []);

  const spawnFood = useCallback((snake: Cell[], powerups?: Powerup[]): Cell => {
    const occupied = getOccupied(snake, powerups, gameRef.current.crazyWalls, gameRef.current.extraFood);
    return spawnCell(occupied) ?? { x: 0, y: 0 };
  }, [getOccupied, spawnCell]);

  const spawnPowerup = useCallback((snake: Cell[], food: Cell, existing: Powerup[]): Powerup | null => {
    const types: PowerupType[] = ['speed', 'slow', 'shield', 'double', 'ghost'];
    const type = types[Math.floor(Math.random() * types.length)];
    const occupied = getOccupied(snake, existing);
    occupied.add(`${food.x},${food.y}`);
    const cell = spawnCell(occupied);
    if (!cell) return null;
    return { type, cell, spawnTime: Date.now(), duration: 8000 + Math.random() * 4000 };
  }, [getOccupied, spawnCell]);

  const spawnEatParticles = useCallback((cx: number, cy: number, color1 = '#ef4444', color2 = '#fbbf24', count = 12) => {
    const g = gameRef.current;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
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

  const hasPowerup = useCallback((type: PowerupType): boolean => {
    return gameRef.current.activePowerups.some(ap => ap.type === type && ap.endTime > Date.now());
  }, []);

  const hasChaos = useCallback((type: ChaosType): boolean => {
    return gameRef.current.chaosEvents.some(ce => ce.type === type && ce.endTime > Date.now());
  }, []);

  const cellCenter = useCallback((c: Cell) => ({
    x: c.x * CELL_SIZE + CELL_SIZE / 2,
    y: GRID_OFFSET_Y + c.y * CELL_SIZE + CELL_SIZE / 2,
  }), []);

  // --- Trigger a chaos event ---
  const triggerChaos = useCallback(() => {
    const g = gameRef.current;
    const now = Date.now();
    const types: ChaosType[] = ['reverse', 'warp', 'portals', 'frenzy', 'walls', 'drunk', 'shrink', 'gravity', 'shake', 'rainbow'];
    // Don't spawn the same active type
    const active = new Set(g.chaosEvents.filter(e => e.endTime > now).map(e => e.type));
    const available = types.filter(t => !active.has(t));
    if (available.length === 0) return;

    const type = available[Math.floor(Math.random() * available.length)];
    const info = CHAOS_INFO[type];

    g.chaosAnnouncement = `${info.icon} ${info.label}`;
    g.chaosAnnouncementTime = now;

    if (type === 'shrink') {
      // Instant effect: chop off tail
      const chopAmount = Math.min(Math.floor(g.snake.length / 3), 5);
      if (g.snake.length > 3) {
        for (let i = 0; i < chopAmount; i++) {
          const removed = g.snake.pop();
          if (removed) {
            const cc = cellCenter(removed);
            spawnEatParticles(cc.x, cc.y, '#f97316', '#fbbf24', 6);
          }
        }
      }
      // Shrink doesn't persist as an event
      return;
    }

    const event: ChaosEvent = { type, endTime: now + info.duration };
    g.chaosEvents.push(event);

    // Side effects
    if (type === 'portals') {
      g.portals = [];
      const occupied = getOccupied(g.snake);
      occupied.add(`${g.food.x},${g.food.y}`);
      for (let i = 0; i < 2; i++) {
        const a = spawnCell(occupied);
        if (a) {
          occupied.add(`${a.x},${a.y}`);
          const b = spawnCell(occupied);
          if (b) {
            occupied.add(`${b.x},${b.y}`);
            g.portals.push({ a, b });
          }
        }
      }
    }

    if (type === 'frenzy') {
      const occupied = getOccupied(g.snake, g.powerups, g.crazyWalls, g.extraFood);
      occupied.add(`${g.food.x},${g.food.y}`);
      for (let i = 0; i < 5; i++) {
        const cell = spawnCell(occupied);
        if (cell) {
          g.extraFood.push(cell);
          occupied.add(`${cell.x},${cell.y}`);
        }
      }
    }

    if (type === 'walls') {
      g.crazyWalls = [];
      const occupied = getOccupied(g.snake);
      occupied.add(`${g.food.x},${g.food.y}`);
      g.extraFood.forEach(f => occupied.add(`${f.x},${f.y}`));
      // Spawn wall clusters
      for (let cluster = 0; cluster < 3; cluster++) {
        const origin = spawnCell(occupied);
        if (!origin) continue;
        // Make a small L or line shape
        const cells = [origin];
        occupied.add(`${origin.x},${origin.y}`);
        const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
        for (let ext = 0; ext < 2 + Math.floor(Math.random() * 3); ext++) {
          const base = cells[cells.length - 1];
          const d = dirs[Math.floor(Math.random() * dirs.length)];
          const nx = base.x + d[0];
          const ny = base.y + d[1];
          if (nx >= 0 && nx < GRID_W && ny >= 0 && ny < GRID_H && !occupied.has(`${nx},${ny}`)) {
            const wall = { x: nx, y: ny };
            cells.push(wall);
            occupied.add(`${nx},${ny}`);
          }
        }
        g.crazyWalls.push(...cells);
      }
    }

    if (type === 'gravity') {
      const gravDirs: Direction[] = ['up', 'down', 'left', 'right'];
      g.gravityDir = gravDirs[Math.floor(Math.random() * gravDirs.length)];
    }

    if (type === 'shake') {
      // Spawn falling stones with staggered delays
      const stoneCount = 4 + Math.floor(Math.random() * 4); // 4-7 stones
      const occupied = getOccupied(g.snake);
      occupied.add(`${g.food.x},${g.food.y}`);
      for (let i = 0; i < stoneCount; i++) {
        const cell = spawnCell(occupied);
        if (cell) {
          occupied.add(`${cell.x},${cell.y}`);
          const delay = 500 + i * 400 + Math.random() * 600; // staggered 0.5-4s
          const landTime = now + delay;
          g.fallingStones.push({
            cell,
            spawnTime: now + Math.max(0, delay - 2000), // shadow appears 2s before landing
            landTime,
            despawnTime: landTime + 4000, // stays for 4s after landing
            landed: false,
          });
        }
      }
    }
  }, [cellCenter, spawnEatParticles, getOccupied, spawnCell]);

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
    const mode = gameModeRef.current;
    const isCrazy = mode === 'crazy';

    // Screen shake offset
    let shakeX = 0, shakeY = 0;
    if (isCrazy && hasChaos('shake')) {
      const intensity = 4;
      shakeX = (Math.random() - 0.5) * intensity * 2;
      shakeY = (Math.random() - 0.5) * intensity * 2;
    }

    ctx.save();
    ctx.translate(shakeX, shakeY);

    // --- Background ---
    if (isCrazy) {
      // Crazy bg: subtle shifting hue
      const hue = (t * 15) % 360;
      ctx.fillStyle = `hsl(${hue}, 8%, 4%)`;
    } else {
      ctx.fillStyle = '#080810';
    }
    ctx.fillRect(-2, -2, CANVAS_W + 4, CANVAS_H + 4);

    // --- HUD area background ---
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, CANVAS_W, HUD_HEIGHT);
    ctx.strokeStyle = isCrazy
      ? `hsla(${(t * 60) % 360}, 80%, 60%, 0.5)`
      : 'rgba(68, 214, 44, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, HUD_HEIGHT);
    ctx.lineTo(CANVAS_W, HUD_HEIGHT);
    ctx.stroke();

    // --- Checkerboard ---
    for (let gx = 0; gx < GRID_W; gx++) {
      for (let gy = 0; gy < GRID_H; gy++) {
        if (isCrazy && hasChaos('rainbow')) {
          const h = ((gx + gy) * 12 + t * 80) % 360;
          ctx.fillStyle = `hsla(${h}, 60%, 50%, 0.025)`;
        } else if ((gx + gy) % 2 === 0) {
          ctx.fillStyle = isCrazy ? 'rgba(255, 100, 50, 0.015)' : 'rgba(68, 214, 44, 0.018)';
        } else {
          ctx.fillStyle = isCrazy ? 'rgba(255, 100, 50, 0.006)' : 'rgba(68, 214, 44, 0.008)';
        }
        ctx.fillRect(gx * CELL_SIZE, GRID_OFFSET_Y + gy * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    // Vignette
    const vigCy = GRID_OFFSET_Y + (GRID_H * CELL_SIZE) / 2;
    const vignette = ctx.createRadialGradient(CANVAS_W / 2, vigCy, CANVAS_W * 0.25, CANVAS_W / 2, vigCy, CANVAS_W * 0.7);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, GRID_OFFSET_Y, CANVAS_W, GRID_H * CELL_SIZE);

    // Border glow
    ctx.save();
    if (isCrazy) {
      ctx.shadowColor = `hsl(${(t * 60) % 360}, 80%, 60%)`;
      ctx.strokeStyle = `hsla(${(t * 60) % 360}, 80%, 60%, 0.6)`;
    } else {
      ctx.shadowColor = '#44D62C';
      ctx.strokeStyle = 'rgba(68, 214, 44, 0.5)';
    }
    ctx.shadowBlur = 8;
    ctx.lineWidth = 2;
    ctx.strokeRect(1, GRID_OFFSET_Y, CANVAS_W - 2, GRID_H * CELL_SIZE);
    ctx.restore();

    // Ghost mode visual (modern)
    if (hasPowerup('ghost')) {
      ctx.save();
      ctx.fillStyle = `rgba(52, 211, 153, ${0.03 + Math.sin(t * 4) * 0.02})`;
      ctx.fillRect(0, GRID_OFFSET_Y, CANVAS_W, GRID_H * CELL_SIZE);
      ctx.restore();
    }

    // Drunk visual overlay
    if (isCrazy && hasChaos('drunk')) {
      ctx.save();
      ctx.fillStyle = `rgba(52, 211, 153, ${0.04 + Math.sin(t * 3) * 0.03})`;
      ctx.fillRect(0, GRID_OFFSET_Y, CANVAS_W, GRID_H * CELL_SIZE);
      ctx.restore();
    }

    // Gravity visual - subtle arrow indicators
    if (isCrazy && hasChaos('gravity')) {
      ctx.save();
      ctx.globalAlpha = 0.06 + Math.sin(t * 4) * 0.03;
      const gd = g.gravityDir;
      for (let i = 0; i < 8; i++) {
        const bx = (CANVAS_W / 8) * i + CANVAS_W / 16;
        const by = GRID_OFFSET_Y + (GRID_H * CELL_SIZE) / 2;
        ctx.fillStyle = '#60a5fa';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const arrows: Record<Direction, string> = { up: '↑', down: '↓', left: '←', right: '→' };
        ctx.fillText(arrows[gd], bx, by + Math.sin(t * 3 + i) * 10);
      }
      ctx.restore();
    }

    // --- Crazy walls ---
    if (isCrazy) {
      for (const w of g.crazyWalls) {
        const wx = w.x * CELL_SIZE;
        const wy = GRID_OFFSET_Y + w.y * CELL_SIZE;
        ctx.save();
        ctx.shadowColor = '#6b7280';
        ctx.shadowBlur = 4;
        const wallGrad = ctx.createLinearGradient(wx, wy, wx + CELL_SIZE, wy + CELL_SIZE);
        wallGrad.addColorStop(0, '#4b5563');
        wallGrad.addColorStop(0.5, '#374151');
        wallGrad.addColorStop(1, '#1f2937');
        ctx.fillStyle = wallGrad;
        ctx.beginPath();
        ctx.roundRect(wx + 1, wy + 1, CELL_SIZE - 2, CELL_SIZE - 2, 3);
        ctx.fill();
        // Brick pattern
        ctx.strokeStyle = 'rgba(107, 114, 128, 0.4)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(wx + CELL_SIZE / 2, wy + 1);
        ctx.lineTo(wx + CELL_SIZE / 2, wy + CELL_SIZE / 2);
        ctx.moveTo(wx + 1, wy + CELL_SIZE / 2);
        ctx.lineTo(wx + CELL_SIZE - 1, wy + CELL_SIZE / 2);
        ctx.moveTo(wx + CELL_SIZE / 4, wy + CELL_SIZE / 2);
        ctx.lineTo(wx + CELL_SIZE / 4, wy + CELL_SIZE - 1);
        ctx.moveTo(wx + CELL_SIZE * 3 / 4, wy + CELL_SIZE / 2);
        ctx.lineTo(wx + CELL_SIZE * 3 / 4, wy + CELL_SIZE - 1);
        ctx.stroke();
        ctx.restore();
      }
    }

    // --- Portals ---
    if (isCrazy) {
      for (const portal of g.portals) {
        for (const cell of [portal.a, portal.b]) {
          const pcx = cell.x * CELL_SIZE + CELL_SIZE / 2;
          const pcy = GRID_OFFSET_Y + cell.y * CELL_SIZE + CELL_SIZE / 2;
          ctx.save();
          // Spinning rings
          for (let ring = 0; ring < 3; ring++) {
            const angle = t * 4 + ring * (Math.PI * 2 / 3);
            const radius = CELL_SIZE / 2.5 + ring * 2;
            ctx.strokeStyle = `hsla(${270 + ring * 30}, 80%, 65%, ${0.4 - ring * 0.1})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(pcx, pcy, radius, angle, angle + Math.PI * 1.2);
            ctx.stroke();
          }
          // Center glow
          ctx.shadowColor = '#a78bfa';
          ctx.shadowBlur = 12;
          ctx.fillStyle = 'rgba(167, 139, 250, 0.3)';
          ctx.beginPath();
          ctx.arc(pcx, pcy, CELL_SIZE / 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    // --- Falling stones ---
    if (isCrazy) {
      for (const stone of g.fallingStones) {
        if (now < stone.spawnTime) continue; // not visible yet
        const sx = stone.cell.x * CELL_SIZE;
        const sy = GRID_OFFSET_Y + stone.cell.y * CELL_SIZE;
        const scx = sx + CELL_SIZE / 2;
        const scy = sy + CELL_SIZE / 2;

        if (!stone.landed && now < stone.landTime) {
          // --- Shadow phase: growing shadow with countdown ---
          const progress = (now - stone.spawnTime) / (stone.landTime - stone.spawnTime); // 0→1
          const shadowSize = (CELL_SIZE / 2) * (0.3 + progress * 0.7);
          const shadowAlpha = 0.15 + progress * 0.4;

          // Shadow ellipse
          ctx.save();
          ctx.globalAlpha = shadowAlpha;
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.ellipse(scx, scy, shadowSize, shadowSize * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Warning indicator - pulsing ring
          ctx.save();
          ctx.globalAlpha = 0.3 + Math.sin(t * 10) * 0.2;
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(scx, scy, shadowSize + 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Countdown number
          const secsLeft = Math.ceil((stone.landTime - now) / 1000);
          if (secsLeft <= 3) {
            ctx.save();
            ctx.globalAlpha = 0.6 + Math.sin(t * 8) * 0.3;
            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 14px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = '#ef4444';
            ctx.shadowBlur = 8;
            ctx.fillText(`${secsLeft}`, scx, scy);
            ctx.restore();
          }
        } else {
          // --- Landed stone ---
          // Impact flash right when landing
          const timeSinceLand = now - stone.landTime;
          if (timeSinceLand < 200) {
            ctx.save();
            ctx.globalAlpha = 1 - timeSinceLand / 200;
            ctx.fillStyle = '#fbbf24';
            ctx.shadowColor = '#fbbf24';
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(scx, scy, CELL_SIZE, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }

          // Blink when about to despawn
          const timeUntilDespawn = stone.despawnTime - now;
          if (timeUntilDespawn < 1500 && Math.sin(t * 12) > 0.3) {
            // skip drawing (blink)
          } else {
            // Stone body
            ctx.save();
            ctx.shadowColor = '#78716c';
            ctx.shadowBlur = 6;
            const stoneGrad = ctx.createRadialGradient(scx - 2, scy - 3, 1, scx, scy, CELL_SIZE / 2);
            stoneGrad.addColorStop(0, '#a8a29e');
            stoneGrad.addColorStop(0.4, '#78716c');
            stoneGrad.addColorStop(1, '#44403c');
            ctx.fillStyle = stoneGrad;
            ctx.beginPath();
            // Jagged rock shape
            const r = CELL_SIZE / 2 - 1;
            const points = 8;
            for (let p = 0; p < points; p++) {
              const angle = (Math.PI * 2 * p) / points - Math.PI / 2;
              const jitter = 0.75 + ((Math.sin(p * 137.5) + 1) / 2) * 0.35;
              const px = scx + Math.cos(angle) * r * jitter;
              const py = scy + Math.sin(angle) * r * jitter;
              if (p === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();

            // Crack lines
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(scx - 2, scy - 4);
            ctx.lineTo(scx + 1, scy);
            ctx.lineTo(scx - 1, scy + 3);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(scx + 3, scy - 2);
            ctx.lineTo(scx + 1, scy + 2);
            ctx.stroke();

            // Highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.ellipse(scx - 2, scy - 3, 3, 2, -0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }
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

    // --- Powerups on field (modern) ---
    for (const pu of g.powerups) {
      const info = POWERUP_INFO[pu.type];
      const pcx = pu.cell.x * CELL_SIZE + CELL_SIZE / 2;
      const pcy = GRID_OFFSET_Y + pu.cell.y * CELL_SIZE + CELL_SIZE / 2;
      const timeLeft = (pu.spawnTime + pu.duration - now) / pu.duration;
      const puPulse = 1 + Math.sin(t * 5) * 0.12;
      const radius = (CELL_SIZE / 2.5) * puPulse;
      if (timeLeft < 0.3 && Math.sin(t * 12) > 0) continue;
      ctx.save();
      for (let ring = 2; ring >= 1; ring--) {
        ctx.globalAlpha = 0.08 * ring;
        ctx.fillStyle = info.glow;
        ctx.beginPath();
        ctx.arc(pcx, pcy, radius + ring * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
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
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const icons: Record<PowerupType, string> = { speed: '⚡', slow: '🕐', shield: '🛡', double: '×2', ghost: '👻' };
      ctx.fillText(icons[pu.type], pcx, pcy + 1);
      ctx.restore();
    }

    // --- Draw food helper ---
    const drawApple = (foodCell: Cell, hueShift = 0) => {
      const fcx = foodCell.x * CELL_SIZE + CELL_SIZE / 2;
      const fcy = GRID_OFFSET_Y + foodCell.y * CELL_SIZE + CELL_SIZE / 2;
      const pulse = 1 + Math.sin(t * 4 + hueShift) * 0.15;
      const foodRadius = (CELL_SIZE / 2.2) * pulse;

      ctx.save();
      for (let ring = 3; ring >= 1; ring--) {
        ctx.globalAlpha = 0.06 * ring;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(fcx, fcy, foodRadius + ring * 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

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

      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(fcx, fcy - foodRadius);
      ctx.quadraticCurveTo(fcx + 3, fcy - foodRadius - 5, fcx + 1, fcy - foodRadius - 8);
      ctx.stroke();

      ctx.save();
      ctx.fillStyle = '#22c55e';
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.ellipse(fcx + 4, fcy - foodRadius - 2, 4, 2, 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.beginPath();
      ctx.ellipse(fcx - 2.5, fcy - 3, 2.5, 1.8, -0.3, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 3; i++) {
        const angle = t * 2 + (Math.PI * 2 * i) / 3 + hueShift;
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
    };

    // Main food
    drawApple(g.food);
    // Extra food (frenzy)
    for (let i = 0; i < g.extraFood.length; i++) {
      drawApple(g.extraFood[i], i * 1.5);
    }

    // --- Snake body ---
    const snake = g.snake;
    if (snake.length === 0) { ctx.restore(); return; }

    const centers = snake.map(cellCenter);
    const isGhost = hasPowerup('ghost');
    const isShielded = hasPowerup('shield');
    const isRainbow = isCrazy && hasChaos('rainbow');

    // Body glow
    ctx.save();
    if (isRainbow) {
      ctx.shadowColor = `hsl(${(t * 120) % 360}, 80%, 60%)`;
      ctx.strokeStyle = `hsla(${(t * 120) % 360}, 80%, 60%, 0.15)`;
    } else if (isGhost) {
      ctx.shadowColor = '#34d399';
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.15)';
    } else if (isCrazy) {
      ctx.shadowColor = '#f97316';
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.15)';
    } else {
      ctx.shadowColor = isShielded ? '#a78bfa' : '#44D62C';
      ctx.strokeStyle = 'rgba(68, 214, 44, 0.15)';
    }
    ctx.shadowBlur = 16;
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

    // Body segments
    for (let i = snake.length - 1; i >= 0; i--) {
      const cx = centers[i].x;
      const cy = centers[i].y;
      const pct = i / Math.max(snake.length - 1, 1);
      const isHead = i === 0;
      const segSize = isHead ? CELL_SIZE - 1 : CELL_SIZE - 2 - pct * 4;
      const half = segSize / 2;

      if (isGhost) {
        ctx.save();
        ctx.globalAlpha = 0.5 + Math.sin(t * 6) * 0.15;
      }

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
        let headColor1: string, headColor2: string, headColor3: string;
        if (isRainbow) {
          const h = (t * 120) % 360;
          headColor1 = `hsl(${h}, 80%, 70%)`;
          headColor2 = `hsl(${h}, 80%, 55%)`;
          headColor3 = `hsl(${h}, 80%, 35%)`;
          ctx.shadowColor = headColor2;
        } else if (isCrazy) {
          headColor1 = '#ffb86a';
          headColor2 = '#f97316';
          headColor3 = '#c2410c';
          ctx.shadowColor = '#f97316';
        } else if (isGhost) {
          headColor1 = '#86efac';
          headColor2 = '#34d399';
          headColor3 = '#059669';
          ctx.shadowColor = '#34d399';
        } else {
          headColor1 = '#7df76a';
          headColor2 = '#44D62C';
          headColor3 = '#1e8c14';
          ctx.shadowColor = '#44D62C';
        }
        ctx.shadowBlur = 10;
        const headGrad = ctx.createRadialGradient(cx - 2, cy - 2, 1, cx, cy, half + 2);
        headGrad.addColorStop(0, headColor1);
        headGrad.addColorStop(0.5, headColor2);
        headGrad.addColorStop(1, headColor3);
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
        if (g.dir === 'right') { e1x = cx + eyeForward; e1y = cy - eyeOffset; e2x = cx + eyeForward; e2y = cy + eyeOffset; }
        else if (g.dir === 'left') { e1x = cx - eyeForward; e1y = cy - eyeOffset; e2x = cx - eyeForward; e2y = cy + eyeOffset; }
        else if (g.dir === 'up') { e1x = cx - eyeOffset; e1y = cy - eyeForward; e2x = cx + eyeOffset; e2y = cy - eyeForward; }
        else { e1x = cx - eyeOffset; e1y = cy + eyeForward; e2x = cx + eyeOffset; e2y = cy + eyeForward; }

        // Crazy mode: derpy eyes when drunk
        if (isCrazy && hasChaos('drunk')) {
          e1y += Math.sin(t * 8) * 2;
          e2y -= Math.sin(t * 8) * 2;
        }

        ctx.save();
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 3;
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(e1x, e1y, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(e2x, e2y, 3, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        const pd = 0.8;
        const pdx = g.dir === 'left' ? -pd : g.dir === 'right' ? pd : 0;
        const pdy = g.dir === 'up' ? -pd : g.dir === 'down' ? pd : 0;
        ctx.fillStyle = '#0a0a0a';
        ctx.beginPath(); ctx.arc(e1x + pdx, e1y + pdy, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(e2x + pdx, e2y + pdy, 1.5, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath(); ctx.arc(e1x + pdx + 0.5, e1y + pdy - 0.5, 0.6, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(e2x + pdx + 0.5, e2y + pdy - 0.5, 0.6, 0, Math.PI * 2); ctx.fill();

        // Tongue
        if (Math.sin(t * 8) > 0) {
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1.2;
          ctx.lineCap = 'round';
          let tx = cx, ty = cy, tdx = 0, tdy = 0;
          if (g.dir === 'right') { tx = cx + half + 1; tdx = 6; }
          if (g.dir === 'left') { tx = cx - half - 1; tdx = -6; }
          if (g.dir === 'up') { ty = cy - half - 1; tdy = -6; }
          if (g.dir === 'down') { ty = cy + half + 1; tdy = 6; }
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(tx + tdx, ty + tdy);
          const forkLen = 3;
          if (g.dir === 'right' || g.dir === 'left') {
            ctx.moveTo(tx + tdx, ty + tdy); ctx.lineTo(tx + tdx + (tdx > 0 ? forkLen : -forkLen), ty + tdy - forkLen);
            ctx.moveTo(tx + tdx, ty + tdy); ctx.lineTo(tx + tdx + (tdx > 0 ? forkLen : -forkLen), ty + tdy + forkLen);
          } else {
            ctx.moveTo(tx + tdx, ty + tdy); ctx.lineTo(tx + tdx - forkLen, ty + tdy + (tdy > 0 ? forkLen : -forkLen));
            ctx.moveTo(tx + tdx, ty + tdy); ctx.lineTo(tx + tdx + forkLen, ty + tdy + (tdy > 0 ? forkLen : -forkLen));
          }
          ctx.stroke();
        }
      } else {
        // Body segment
        let r: number, gv: number, b: number;
        if (isRainbow) {
          const h = ((t * 120) + i * 15) % 360;
          // Convert HSL to approximate RGB for gradient
          const c = 1 - Math.abs(2 * 0.55 - 1);
          const x = c * (1 - Math.abs((h / 60) % 2 - 1));
          const m = 0.55 - c / 2;
          let r0 = 0, g0 = 0, b0 = 0;
          if (h < 60) { r0 = c; g0 = x; } else if (h < 120) { r0 = x; g0 = c; }
          else if (h < 180) { g0 = c; b0 = x; } else if (h < 240) { g0 = x; b0 = c; }
          else if (h < 300) { r0 = x; b0 = c; } else { r0 = c; b0 = x; }
          r = Math.round((r0 + m) * 255);
          gv = Math.round((g0 + m) * 255);
          b = Math.round((b0 + m) * 255);
        } else if (isCrazy) {
          r = Math.round(249 - pct * 60);
          gv = Math.round(115 - pct * 60);
          b = Math.round(22 + pct * 30);
        } else {
          r = Math.round(68 - pct * 30);
          gv = Math.round(214 - pct * 100);
          b = Math.round(44 + pct * 30);
        }

        const segGrad = ctx.createRadialGradient(cx - 1, cy - 1, 0, cx, cy, half + 1);
        if (isGhost) {
          segGrad.addColorStop(0, `rgba(${r + 40}, ${gv + 60}, ${b + 80}, 1)`);
          segGrad.addColorStop(0.7, `rgba(${r}, ${gv + 30}, ${b + 60}, 1)`);
          segGrad.addColorStop(1, `rgba(${Math.max(0, r - 20)}, ${Math.max(0, gv)}, ${b + 40}, 1)`);
        } else {
          segGrad.addColorStop(0, `rgba(${Math.min(255, r + 40)}, ${Math.min(255, gv + 30)}, ${Math.min(255, b + 20)}, 1)`);
          segGrad.addColorStop(0.7, `rgb(${r}, ${gv}, ${b})`);
          segGrad.addColorStop(1, `rgb(${Math.max(0, r - 20)}, ${Math.max(0, gv - 30)}, ${Math.max(0, b - 10)})`);
        }
        ctx.fillStyle = segGrad;
        ctx.beginPath();
        ctx.roundRect(cx - half, cy - half, segSize, segSize, 5);
        ctx.fill();

        // Connector to next segment
        if (i < snake.length - 1) {
          const prev = centers[i + 1];
          const dx = cx - prev.x;
          const dy = cy - prev.y;
          const prevHalf = (CELL_SIZE - 2 - ((i + 1) / Math.max(snake.length - 1, 1)) * 4) / 2;
          const minHalf = Math.min(half, prevHalf);
          ctx.fillStyle = `rgb(${r}, ${gv}, ${b})`;
          if (Math.abs(dx) > 0) {
            ctx.fillRect(Math.min(cx, prev.x) + 1, cy - minHalf + 1, Math.abs(dx) - 2, minHalf * 2 - 2);
          } else if (Math.abs(dy) > 0) {
            ctx.fillRect(cx - minHalf + 1, Math.min(cy, prev.y) + 1, minHalf * 2 - 2, Math.abs(dy) - 2);
          }
        }

        // Scale pattern
        if (i % 3 === 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.08 - pct * 0.06})`;
          ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.PI / 4); ctx.fillRect(-2, -2, 4, 4); ctx.restore();
        }
        ctx.strokeStyle = `rgba(30, 140, 20, ${0.25 - pct * 0.15})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.roundRect(cx - half, cy - half, segSize, segSize, 5); ctx.stroke();
      }
      if (isGhost) ctx.restore();
    }

    // --- Chaos announcement banner ---
    if (isCrazy && g.chaosAnnouncementTime > 0) {
      const elapsed = now - g.chaosAnnouncementTime;
      if (elapsed < 1500) {
        const alpha = elapsed < 300 ? elapsed / 300 : elapsed > 1200 ? (1500 - elapsed) / 300 : 1;
        const scale = elapsed < 200 ? 0.5 + (elapsed / 200) * 0.5 : 1;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const bannerY = GRID_OFFSET_Y + (GRID_H * CELL_SIZE) / 2;

        // Background pill
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.beginPath();
        ctx.roundRect(CANVAS_W / 2 - 120 * scale, bannerY - 22 * scale, 240 * scale, 44 * scale, 22);
        ctx.fill();

        // Text
        ctx.font = `bold ${20 * scale}px Inter, sans-serif`;
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 12;
        ctx.fillText(g.chaosAnnouncement, CANVAS_W / 2, bannerY + 1);
        ctx.restore();
      }
    }

    // --- HUD ---
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath(); ctx.roundRect(10, 8, 130, 28, 14); ctx.fill();
    ctx.strokeStyle = isCrazy ? 'rgba(249, 115, 22, 0.3)' : 'rgba(68, 214, 44, 0.3)';
    ctx.lineWidth = 1; ctx.stroke();

    ctx.fillStyle = isCrazy ? '#f97316' : '#44D62C';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${g.score}`, 22, 27);

    // Best pill
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath(); ctx.roundRect(CANVAS_W - 140, 8, 130, 28, 14); ctx.fill();
    ctx.strokeStyle = 'rgba(107, 114, 128, 0.3)'; ctx.lineWidth = 1; ctx.stroke();

    const bestScore = mode === 'classic' ? Math.max(g.score, highScoreRef.current)
      : mode === 'modern' ? Math.max(g.score, modernHighScoreRef.current)
      : Math.max(g.score, crazyHighScoreRef.current);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '13px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Best: ${bestScore}`, CANVAS_W - 20, 27);

    // Length pill
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath(); ctx.roundRect(148, 8, 90, 28, 14); ctx.fill();
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Len: ${snake.length}`, 158, 27);

    // Combo indicator (crazy)
    if (isCrazy && g.combo > 1) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.beginPath(); ctx.roundRect(250, 8, 70, 28, 14); ctx.fill();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`×${g.combo}`, 285, 26);
    }

    // Active powerup indicators (modern)
    if (mode === 'modern') {
      const active = g.activePowerups.filter(ap => ap.endTime > now);
      let px = 250;
      for (const ap of active) {
        const info = POWERUP_INFO[ap.type];
        const remaining = (ap.endTime - now) / info.effectDuration;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath(); ctx.roundRect(px, 8, 56, 28, 14); ctx.fill();
        ctx.strokeStyle = `${info.color}60`; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = `${info.color}40`;
        ctx.beginPath(); ctx.roundRect(px + 2, 10, Math.max(0, 52 * remaining), 24, 12); ctx.fill();
        ctx.fillStyle = info.color;
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(info.label, px + 28, 26);
        px += 62;
      }
    }

    // Active chaos indicators (crazy) - small dots
    if (isCrazy) {
      const active = g.chaosEvents.filter(ce => ce.endTime > now);
      let dotX = 330;
      for (const ce of active) {
        const info = CHAOS_INFO[ce.type];
        ctx.fillStyle = info.color;
        ctx.shadowColor = info.color;
        ctx.shadowBlur = 4;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(info.icon, dotX, 26);
        ctx.shadowBlur = 0;
        dotX += 18;
      }
    }

    ctx.restore();
    // Restore shake translate
    ctx.restore();
  }, [cellCenter, hasPowerup, hasChaos]);

  // --- Game tick ---
  const tick = useCallback(() => {
    const g = gameRef.current;
    if (!g.running) return;
    const now = Date.now();
    const mode = gameModeRef.current;
    const isCrazy = mode === 'crazy';

    // Helper to handle game over with high score check
    const handleGameOver = () => {
      g.running = false;
      setGameState('over');
      const storageKey = mode === 'classic' ? STORAGE_KEY_CLASSIC : mode === 'modern' ? STORAGE_KEY_MODERN : STORAGE_KEY_CRAZY;
      const hs = mode === 'classic' ? highScoreRef.current : mode === 'modern' ? modernHighScoreRef.current : crazyHighScoreRef.current;
      if (g.score > hs) {
        if (mode === 'classic') setHighScore(g.score);
        else if (mode === 'modern') setModernHighScore(g.score);
        else setCrazyHighScore(g.score);
        localStorage.setItem(storageKey, g.score.toString());
      }
      submitScoreRef.current(g.score);
      draw();
    };

    // --- Crazy mode: chaos management ---
    if (isCrazy) {
      // Clean expired events
      const prevEvents = g.chaosEvents.length;
      g.chaosEvents = g.chaosEvents.filter(ce => ce.endTime > now);
      // Clean portals if event expired
      if (prevEvents !== g.chaosEvents.length) {
        if (!g.chaosEvents.some(ce => ce.type === 'portals')) g.portals = [];
        if (!g.chaosEvents.some(ce => ce.type === 'walls')) g.crazyWalls = [];
        if (!g.chaosEvents.some(ce => ce.type === 'frenzy')) g.extraFood = [];
      }

      // Spawn new chaos event
      const chaosInterval = Math.max(2500, 5000 - g.snake.length * 50);
      if (now - g.lastChaosSpawn > chaosInterval) {
        triggerChaos();
        g.lastChaosSpawn = now;
      }

      // Drunk: randomly alter direction queue
      if (hasChaos('drunk') && Math.random() < 0.15) {
        const dirs: Direction[] = ['up', 'down', 'left', 'right'];
        const opposites: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' };
        const randomDir = dirs[Math.floor(Math.random() * dirs.length)];
        if (randomDir !== opposites[g.dir] && randomDir !== g.dir) {
          dirQueue.current = [randomDir];
        }
      }

      // Gravity: bias direction toward gravity
      if (hasChaos('gravity') && dirQueue.current.length === 0 && Math.random() < 0.25) {
        const opposites: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' };
        if (g.gravityDir !== opposites[g.dir]) {
          dirQueue.current.push(g.gravityDir);
        }
      }

      // Combo decay
      if (now - g.lastEatTime > 3000) g.combo = 0;

      // Stone updates: mark landed, despawn expired, check if stone lands on snake head
      const head = g.snake[0];
      for (const stone of g.fallingStones) {
        if (!stone.landed && now >= stone.landTime) {
          stone.landed = true;
          // Impact particles
          const scx = stone.cell.x * CELL_SIZE + CELL_SIZE / 2;
          const scy = GRID_OFFSET_Y + stone.cell.y * CELL_SIZE + CELL_SIZE / 2;
          spawnEatParticles(scx, scy, '#a8a29e', '#78716c', 8);
          // Kill if stone lands directly on snake head
          if (head && stone.cell.x === head.x && stone.cell.y === head.y) {
            handleGameOver();
            // Note: handleGameOver calls draw() internally
            return;
          }
        }
      }
      g.fallingStones = g.fallingStones.filter(s => now < s.despawnTime);
    }

    // Modern mode: powerup management
    if (mode === 'modern') {
      g.powerups = g.powerups.filter(p => now - p.spawnTime < p.duration);
      g.activePowerups = g.activePowerups.filter(ap => ap.endTime > now);
      if (now - g.lastPowerupSpawn > 6000 + Math.random() * 4000 && g.powerups.length < 2) {
        const pu = spawnPowerup(g.snake, g.food, g.powerups);
        if (pu) { g.powerups.push(pu); g.lastPowerupSpawn = now; }
      }
    }

    // Process direction queue
    if (dirQueue.current.length > 0) {
      let next = dirQueue.current.shift()!;
      // Reverse controls in crazy mode
      if (isCrazy && hasChaos('reverse')) {
        const reverseMap: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' };
        next = reverseMap[next];
      }
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

    const isGhost = mode === 'modern' && hasPowerup('ghost');
    const isShielded = mode === 'modern' && hasPowerup('shield');

    // Wall collision
    if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) {
      if (isGhost) {
        // Ghost wraps around
        if (nx < 0) nx = GRID_W - 1;
        else if (nx >= GRID_W) nx = 0;
        if (ny < 0) ny = GRID_H - 1;
        else if (ny >= GRID_H) ny = 0;
      } else {
        g.running = false;
        setGameState('over');
        const storageKey = gameMode === 'classic' ? STORAGE_KEY_CLASSIC : gameMode === 'modern' ? STORAGE_KEY_MODERN : STORAGE_KEY_CRAZY;
        const hs = gameMode === 'classic' ? highScore : gameMode === 'modern' ? modernHighScore : crazyHighScore;
        if (g.score > hs) {
          if (gameMode === 'classic') setHighScore(g.score);
          else if (gameMode === 'modern') setModernHighScore(g.score);
          else setCrazyHighScore(g.score);
          localStorage.setItem(storageKey, g.score.toString());
        }
        // Auto-submit score to leaderboard
        submitScoreToLeaderboard(g.score);
        draw();
        return;
      }
    }

    // Crazy wall collision
    if (isCrazy && g.crazyWalls.some(w => w.x === nx && w.y === ny)) {
      g.running = false;
      setGameState('over');
      if (g.score > crazyHighScore) {
        setCrazyHighScore(g.score);
        localStorage.setItem(STORAGE_KEY_CRAZY, g.score.toString());
      }
      // Auto-submit score to leaderboard
      submitScoreToLeaderboard(g.score);
      draw();
      return;
    }

    // Landed stone collision
    if (isCrazy && g.fallingStones.some(s => s.landed && s.cell.x === nx && s.cell.y === ny)) {
      g.running = false;
      setGameState('over');
      if (g.score > crazyHighScore) {
        setCrazyHighScore(g.score);
        localStorage.setItem(STORAGE_KEY_CRAZY, g.score.toString());
      }
      // Auto-submit score to leaderboard
      submitScoreToLeaderboard(g.score);
      draw();
      return;
    }

    // Self collision
    let selfCollision = false;
    for (const seg of g.snake) {
      if (seg.x === nx && seg.y === ny) { selfCollision = true; break; }
    }
    if (selfCollision) {
      if (isShielded) {
        g.activePowerups = g.activePowerups.filter(ap => ap.type !== 'shield');
        g.shieldHits++;
        spawnEatParticles(nx * CELL_SIZE + CELL_SIZE / 2, GRID_OFFSET_Y + ny * CELL_SIZE + CELL_SIZE / 2, '#a78bfa', '#8b5cf6');
      } else if (isGhost) {
        // Ghost passes through itself
      } else {
        g.running = false;
        setGameState('over');
        const storageKey = gameMode === 'classic' ? STORAGE_KEY_CLASSIC : gameMode === 'modern' ? STORAGE_KEY_MODERN : STORAGE_KEY_CRAZY;
        const hs = gameMode === 'classic' ? highScore : gameMode === 'modern' ? modernHighScore : crazyHighScore;
        if (g.score > hs) {
          if (gameMode === 'classic') setHighScore(g.score);
          else if (gameMode === 'modern') setModernHighScore(g.score);
          else setCrazyHighScore(g.score);
          localStorage.setItem(storageKey, g.score.toString());
        }
        // Auto-submit score to leaderboard
        submitScoreToLeaderboard(g.score);
        draw();
        return;
      }
    }

    // Portal teleportation (crazy)
    if (isCrazy) {
      for (const portal of g.portals) {
        if (portal.a.x === nx && portal.a.y === ny) {
          nx = portal.b.x; ny = portal.b.y;
          spawnEatParticles(portal.a.x * CELL_SIZE + CELL_SIZE / 2, GRID_OFFSET_Y + portal.a.y * CELL_SIZE + CELL_SIZE / 2, '#a78bfa', '#c4b5fd', 8);
          spawnEatParticles(portal.b.x * CELL_SIZE + CELL_SIZE / 2, GRID_OFFSET_Y + portal.b.y * CELL_SIZE + CELL_SIZE / 2, '#a78bfa', '#c4b5fd', 8);
          break;
        }
        if (portal.b.x === nx && portal.b.y === ny) {
          nx = portal.a.x; ny = portal.a.y;
          spawnEatParticles(portal.b.x * CELL_SIZE + CELL_SIZE / 2, GRID_OFFSET_Y + portal.b.y * CELL_SIZE + CELL_SIZE / 2, '#a78bfa', '#c4b5fd', 8);
          spawnEatParticles(portal.a.x * CELL_SIZE + CELL_SIZE / 2, GRID_OFFSET_Y + portal.a.y * CELL_SIZE + CELL_SIZE / 2, '#a78bfa', '#c4b5fd', 8);
          break;
        }
      }
    }

    const newHead = { x: nx, y: ny };
    g.snake.unshift(newHead);

    // Eat main food
    let ate = false;
    if (nx === g.food.x && ny === g.food.y) {
      ate = true;
      const comboMult = isCrazy ? Math.max(1, g.combo) : 1;
      const pts = (hasPowerup('double') ? 20 : 10) * comboMult;
      g.score += pts;
      setScore(g.score);
      spawnEatParticles(g.food.x * CELL_SIZE + CELL_SIZE / 2, GRID_OFFSET_Y + g.food.y * CELL_SIZE + CELL_SIZE / 2);
      g.food = spawnFood(g.snake, g.powerups);
    }

    // Eat extra food (frenzy)
    if (isCrazy) {
      g.extraFood = g.extraFood.filter(ef => {
        if (ef.x === nx && ef.y === ny) {
          ate = true;
          const comboMult = Math.max(1, g.combo);
          g.score += 10 * comboMult;
          setScore(g.score);
          spawnEatParticles(ef.x * CELL_SIZE + CELL_SIZE / 2, GRID_OFFSET_Y + ef.y * CELL_SIZE + CELL_SIZE / 2, '#f472b6', '#fbbf24');
          return false;
        }
        return true;
      });
    }

    if (ate) {
      if (isCrazy) {
        g.combo++;
        g.lastEatTime = now;
      }
      // Play eat sound
      if (soundEnabled) {
        snakeSoundManager.playEat();
      }
    } else {
      g.snake.pop();
    }

    // Powerup pickup (modern)
    if (mode === 'modern') {
      g.powerups = g.powerups.filter(pu => {
        if (pu.cell.x === nx && pu.cell.y === ny) {
          const info = POWERUP_INFO[pu.type];
          g.activePowerups = g.activePowerups.filter(ap => ap.type !== pu.type);
          g.activePowerups.push({ type: pu.type, endTime: now + info.effectDuration });
          spawnEatParticles(pu.cell.x * CELL_SIZE + CELL_SIZE / 2, GRID_OFFSET_Y + pu.cell.y * CELL_SIZE + CELL_SIZE / 2, info.color, '#fff');
          // Play powerup sound
          if (soundEnabled) {
            snakeSoundManager.playPowerup();
          }
          return false;
        }
        return true;
      });
    }

    draw();

    // Speed calculation
    let speed = Math.max(MIN_TICK_MS, BASE_TICK_MS - (g.snake.length - 1) * 2);
    if (mode === 'modern') {
      if (hasPowerup('speed')) speed = Math.max(35, speed * 0.6);
      if (hasPowerup('slow')) speed = Math.min(200, speed * 1.6);
    }
    if (isCrazy) {
      if (hasChaos('warp')) speed = Math.max(25, speed * 0.4);
      // Crazy mode is inherently faster
      speed = Math.max(40, speed * 0.85);
    }
    tickRef.current = setTimeout(tick, speed);
  }, [draw, spawnFood, spawnPowerup, setGameState, setHighScore, setModernHighScore, setCrazyHighScore, hasPowerup, hasChaos, spawnEatParticles, triggerChaos]);

  const renderLoop = useCallback(() => {
    const g = gameRef.current;
    if (!g.running) return;
    draw();
    renderRef.current = requestAnimationFrame(renderLoop);
  }, [draw]);

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
    g.chaosEvents = [];
    g.lastChaosSpawn = Date.now();
    g.chaosAnnouncement = '';
    g.chaosAnnouncementTime = 0;
    g.portals = [];
    g.crazyWalls = [];
    g.extraFood = [];
    g.gravityDir = 'down';
    g.combo = 0;
    g.lastEatTime = 0;
    g.fallingStones = [];
    dirQueue.current = [];
    setScore(0);
    setGameState('playing');
    if (tickRef.current) clearTimeout(tickRef.current);
    tickRef.current = setTimeout(tick, BASE_TICK_MS);
    cancelAnimationFrame(renderRef.current);
    renderRef.current = requestAnimationFrame(renderLoop);
  }, [tick, spawnFood, renderLoop]);

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      if (gameStateRef.current !== 'playing') {
        if (e.code === 'Space' || e.code === 'Enter') startGameRef.current();
        return;
      }
      const keyMap: Record<string, Direction> = {
        ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down',
        ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
      };
      const dir = keyMap[e.code];
      if (dir && dirQueue.current.length < 2) {
        dirQueue.current.push(dir);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Swipe
  useEffect(() => {
    if (!isMobile) return;
    const handleTouchStart = (e: TouchEvent) => {
      if (gameStateRef.current !== 'playing') return;
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current || gameStateRef.current !== 'playing') return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;
      const MIN_SWIPE = 20;
      if (Math.abs(dx) < MIN_SWIPE && Math.abs(dy) < MIN_SWIPE) return;
      let dir: Direction;
      if (Math.abs(dx) > Math.abs(dy)) { dir = dx > 0 ? 'right' : 'left'; }
      else { dir = dy > 0 ? 'down' : 'up'; }
      if (dirQueue.current.length < 2) dirQueue.current.push(dir);
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  // Cleanup
  useEffect(() => {
    const game = gameRef.current;
    return () => {
      game.running = false;
      if (tickRef.current) clearTimeout(tickRef.current);
      cancelAnimationFrame(renderRef.current);
    };
  }, []);

  // Idle/game over screen
  useEffect(() => {
    if (gameState === 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const isCrazy = gameMode === 'crazy';

    let animFrame = 0;
    const drawScreen = () => {
      const t = Date.now() / 1000;

      if (isCrazy) {
        const hue = (t * 15) % 360;
        ctx.fillStyle = `hsl(${hue}, 8%, 4%)`;
      } else {
        ctx.fillStyle = '#080810';
      }
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Grid dots
      for (let gx = 0; gx < GRID_W; gx++) {
        for (let gy = 0; gy < GRID_H; gy++) {
          const dist = Math.sqrt((gx - GRID_W / 2) ** 2 + (gy - GRID_H / 2) ** 2);
          const wave = Math.sin(t * 2 - dist * 0.3) * 0.5 + 0.5;
          if (isCrazy) {
            const h = ((gx + gy) * 15 + t * 40) % 360;
            ctx.fillStyle = `hsla(${h}, 80%, 60%, ${0.02 + wave * 0.04})`;
          } else {
            ctx.fillStyle = `rgba(68, 214, 44, ${0.02 + wave * 0.03})`;
          }
          ctx.beginPath();
          ctx.arc(gx * CELL_SIZE + CELL_SIZE / 2, GRID_OFFSET_Y + gy * CELL_SIZE + CELL_SIZE / 2, 1 + wave, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const vignette = ctx.createRadialGradient(CANVAS_W / 2, CANVAS_H / 2, CANVAS_W * 0.2, CANVAS_W / 2, CANVAS_H / 2, CANVAS_W * 0.7);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      ctx.save();
      if (isCrazy) {
        ctx.shadowColor = `hsl(${(t * 60) % 360}, 80%, 60%)`;
        ctx.strokeStyle = `hsla(${(t * 60) % 360}, 80%, 60%, 0.6)`;
      } else {
        ctx.shadowColor = '#44D62C';
        ctx.strokeStyle = 'rgba(68, 214, 44, 0.5)';
      }
      ctx.shadowBlur = 10 + Math.sin(t * 2) * 4;
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, CANVAS_W - 2, CANVAS_H - 2);
      ctx.restore();

      // Animated snake path
      ctx.save();
      if (isCrazy) {
        ctx.strokeStyle = `hsla(${(t * 60) % 360}, 80%, 60%, 0.15)`;
      } else {
        ctx.strokeStyle = 'rgba(68, 214, 44, 0.15)';
      }
      ctx.lineWidth = CELL_SIZE - 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      for (let i = 0; i < 20; i++) {
        const px = CANVAS_W * 0.15 + (CANVAS_W * 0.7 * i) / 20;
        const py = CANVAS_H * 0.35 + Math.sin(t * 1.5 + i * 0.5) * 30 + (isCrazy ? Math.sin(t * 4 + i * 0.8) * 15 : 0);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
      const headX = CANVAS_W * 0.15 + CANVAS_W * 0.7;
      const headY = CANVAS_H * 0.35 + Math.sin(t * 1.5 + 20 * 0.5) * 30;
      ctx.fillStyle = isCrazy ? `hsla(${(t * 60) % 360}, 80%, 60%, 0.25)` : 'rgba(68, 214, 44, 0.25)';
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
        ctx.shadowColor = isCrazy ? '#f97316' : '#44D62C';
        ctx.shadowBlur = 10;
        ctx.fillStyle = isCrazy ? '#f97316' : '#44D62C';
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
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillText(gameMode === 'crazy' ? 'CRAZY MODE' : gameMode === 'modern' ? 'MODERN MODE' : 'CLASSIC MODE', CANVAS_W / 2, CANVAS_H * 0.68);
      } else {
        ctx.save();
        if (isCrazy) {
          ctx.shadowColor = `hsl(${(t * 60) % 360}, 80%, 60%)`;
          ctx.fillStyle = `hsl(${(t * 60) % 360}, 80%, 60%)`;
        } else {
          ctx.shadowColor = '#44D62C';
          ctx.fillStyle = '#44D62C';
        }
        ctx.shadowBlur = 24;
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.fillText('SNAKE', CANVAS_W / 2, CANVAS_H * 0.48);
        ctx.restore();

        ctx.fillStyle = '#6b7280';
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText('A CLASSIC REIMAGINED', CANVAS_W / 2, CANVAS_H * 0.53);

        if (isCrazy) {
          ctx.fillStyle = `hsl(${(t * 60) % 360}, 80%, 60%)`;
          ctx.font = 'bold 13px "JetBrains Mono", monospace';
          ctx.fillText('🔥 CRAZY MODE 🔥', CANVAS_W / 2, CANVAS_H * 0.58);
        } else {
          ctx.fillStyle = gameMode === 'modern' ? '#f472b6' : '#44D62C';
          ctx.font = 'bold 13px "JetBrains Mono", monospace';
          ctx.fillText(gameMode === 'modern' ? '✦ MODERN MODE ✦' : '◆ CLASSIC MODE ◆', CANVAS_W / 2, CANVAS_H * 0.58);
        }
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
    if (gameState !== 'playing') { e.preventDefault(); startGame(); }
  }, [gameState, startGame]);

  // --- Auto-submit score to leaderboard ---
  const submitScoreToLeaderboard = useCallback(async (finalScore: number) => {
    // Only submit if score is greater than 0
    if (finalScore <= 0) return;

    // Get the latest player name from ref
    let name = playerNameRef.current;
    if (!name) {
      // Generate a random name like "Player_1234"
      name = `Player_${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      setPlayerName(name);
      localStorage.setItem('snake-player-name', name);
    }

    try {
      await leaderboardApi.addEntry(name, finalScore, 'snake', gameModeRef.current);
      console.info(`Score submitted to leaderboard: ${name} - ${finalScore} (${gameModeRef.current})`);
    } catch (error) {
      console.error('Failed to submit score to leaderboard:', error);
    }
  }, []);
  submitScoreRef.current = submitScoreToLeaderboard;

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
            {gameMode === 'crazy' ? 'Chaos awaits. Good luck.' : 'Eat apples, grow longer, don\'t hit the walls or yourself!'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isMobile && (
            <button onClick={toggleFullscreen} className="p-2 rounded-lg border border-gray-700 active:scale-90" style={{ touchAction: 'none' }}>
              {isFullscreen ? <Minimize className="w-4 h-4 text-gray-400" /> : <Maximize className="w-4 h-4 text-gray-400" />}
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
            gameMode === 'classic' ? 'bg-802/20 text-802 border border-802/40' : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600'
          } ${gameState === 'playing' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Ribbon className="w-4 h-4" />
          Classic
        </button>
        <button
          onClick={() => { if (gameState !== 'playing') setGameMode('modern'); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            gameMode === 'modern' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40' : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600'
          } ${gameState === 'playing' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Zap className="w-4 h-4" />
          Modern
        </button>
        <button
          onClick={() => { if (gameState !== 'playing') setGameMode('crazy'); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            gameMode === 'crazy' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600'
          } ${gameState === 'playing' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Flame className="w-4 h-4" />
          Crazy
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

        {isFullscreen && (
          <button onClick={toggleFullscreen} className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 border border-gray-700 active:scale-90 z-10" style={{ touchAction: 'none' }}>
            <Minimize className="w-4 h-4 text-gray-400" />
          </button>
        )}

        <div className={`flex items-center gap-4 mt-4 ${isFullscreen ? 'hidden' : ''}`}>
          {gameState === 'idle' && (
            <button onClick={startGame} className="btn-primary flex items-center gap-2 px-6 py-2">
              <Play className="w-4 h-4" /> Start Game
            </button>
          )}
          {gameState === 'over' && (
            <button onClick={startGame} className="btn-primary flex items-center gap-2 px-6 py-2">
              <Play className="w-4 h-4" /> Play Again
            </button>
          )}
          {gameState === 'playing' && (
            <p className="text-sm text-gray-500 font-mono">
              Score: <span className="text-802 font-bold">{score}</span>
            </p>
          )}
        </div>
      </div>

      {/* Player name input - always visible */}
      <div className="card p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <span className="text-xl">👤</span>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-400 block mb-1">Player Name</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => {
                const newName = e.target.value.slice(0, 50);
                setPlayerName(newName);
                localStorage.setItem('snake-player-name', newName);
              }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                // Stop event propagation so game controls don't intercept
                e.stopPropagation();
              }}
              placeholder="Enter your name..."
              maxLength={50}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            />
          </div>
          {playerName && (
            <button
              onClick={() => {
                setPlayerName('');
                localStorage.removeItem('snake-player-name');
              }}
              className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
              title="Clear name"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">Your name will be used for the leaderboard</p>
      </div>

      {/* Leaderboard button */}
      <div className="card p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-white font-medium">Leaderboard</span>
        </div>
        <button
          onClick={() => setShowLeaderboard(true)}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded transition-colors flex items-center gap-2"
        >
          <Trophy className="w-4 h-4" />
          View Scores
        </button>
      </div>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowLeaderboard(false)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowLeaderboard(false)}
              className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <GameLeaderboard 
              game="snake" 
              mode={gameMode} 
              title={`Snake - ${gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}`}
            />
          </div>
        </div>
      )}

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
        ) : gameMode === 'modern' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
              <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
              <div><span className="text-yellow-400 font-medium">Speed Boost</span><p className="text-gray-500 text-xs">Move faster</p></div>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <div><span className="text-blue-400 font-medium">Slow Motion</span><p className="text-gray-500 text-xs">Move slower</p></div>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
              <Shield className="w-4 h-4 text-purple-400 shrink-0" />
              <div><span className="text-purple-400 font-medium">Shield</span><p className="text-gray-500 text-xs">Survive one self-hit</p></div>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
              <Star className="w-4 h-4 text-pink-400 shrink-0" />
              <div><span className="text-pink-400 font-medium">Double Points</span><p className="text-gray-500 text-xs">2x score per apple</p></div>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
              <Ghost className="w-4 h-4 text-emerald-400 shrink-0" />
              <div><span className="text-emerald-400 font-medium">Ghost Mode</span><p className="text-gray-500 text-xs">Pass through walls & self</p></div>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
              <span className="text-red-400 text-lg shrink-0">🍎</span>
              <div><span className="text-red-400 font-medium">+10 / +20</span><p className="text-gray-500 text-xs">Normal / with 2x</p></div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-orange-400 font-medium text-sm text-center">Random chaos events every few seconds. Everything kills you. Good luck.</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {(['reverse', 'warp', 'portals', 'frenzy', 'walls', 'drunk', 'shrink', 'gravity', 'shake', 'rainbow'] as ChaosType[]).map(type => {
                const info = CHAOS_INFO[type];
                return (
                  <div key={type} className="flex items-center gap-1.5 bg-gray-800/50 rounded-lg p-1.5">
                    <span>{info.icon}</span>
                    <div>
                      <span style={{ color: info.color }} className="font-medium">{info.label.replace('!', '')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 justify-center text-xs text-gray-500">
              <span>🔥 Combo multiplier for fast eating</span>
              <span>⚡ Gets faster as chaos increases</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeApp;
