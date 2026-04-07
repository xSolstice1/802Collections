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
const BASE_BULLET_SPEED = 6;
const HUNTER_W = 24;
const HUNTER_H = 40;
const BASE_SPAWN_INTERVAL_PED = 100;
const BASE_SPAWN_INTERVAL_HUNTER = 250;
const BASE_HUNTER_SHOOT_INTERVAL = 90;
const POOP_COOLDOWN_FRAMES = 12;
const GRAVITY = 0.02;
const POOP_GRAVITY = 0.1;
const COUNTDOWN_FRAMES = 180; // 3 seconds at 60fps
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
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const joystickThumbRef = useRef<HTMLDivElement>(null);
  const joystickTouchId = useRef<number | null>(null);
  const joystickOrigin = useRef<{ x: number; y: number } | null>(null);
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
    countdownTimer: 0,
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
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [portraitDismissed, setPortraitDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    const cx = x + BIRD_W / 2;
    const cy = y + BIRD_H / 2;

    // Tail feathers
    ctx.fillStyle = '#2d8a1e';
    ctx.beginPath();
    ctx.moveTo(x - 2, cy - 2);
    ctx.lineTo(x - 10, cy - 6);
    ctx.lineTo(x - 8, cy);
    ctx.lineTo(x - 11, cy + 4);
    ctx.lineTo(x - 2, cy + 2);
    ctx.closePath();
    ctx.fill();

    // Body shadow
    ctx.fillStyle = '#2d9e1a';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 2, BIRD_W / 2 - 1, BIRD_H / 2 - 1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Main body with gradient
    const bodyGrad = ctx.createRadialGradient(cx - 3, cy - 3, 2, cx, cy, BIRD_W / 2);
    bodyGrad.addColorStop(0, '#6ef54e');
    bodyGrad.addColorStop(0.6, '#44D62C');
    bodyGrad.addColorStop(1, '#2d9e1a');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body outline
    ctx.strokeStyle = '#1e7a12';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Belly highlight
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();
    ctx.ellipse(cx + 2, cy + 4, 10, 6, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Wing with detail
    ctx.save();
    if (wingUp) {
      // Wing up
      const wingGrad = ctx.createLinearGradient(cx - 14, y - 10, cx + 10, y + 2);
      wingGrad.addColorStop(0, '#37ad24');
      wingGrad.addColorStop(1, '#2d8a1e');
      ctx.fillStyle = wingGrad;
      ctx.beginPath();
      ctx.ellipse(cx - 2, y - 3, 13, 7, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1e7a12';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      // Wing feather lines
      ctx.strokeStyle = 'rgba(30,122,18,0.4)';
      ctx.lineWidth = 0.6;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(cx - 10 + i * 5, y - 7 + i);
        ctx.lineTo(cx - 4 + i * 4, y + 1);
        ctx.stroke();
      }
    } else {
      // Wing down
      const wingGrad = ctx.createLinearGradient(cx - 14, cy, cx + 10, y + BIRD_H + 4);
      wingGrad.addColorStop(0, '#37ad24');
      wingGrad.addColorStop(1, '#2d8a1e');
      ctx.fillStyle = wingGrad;
      ctx.beginPath();
      ctx.ellipse(cx - 2, y + BIRD_H - 1, 13, 6, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1e7a12';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.strokeStyle = 'rgba(30,122,18,0.4)';
      ctx.lineWidth = 0.6;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(cx - 10 + i * 5, y + BIRD_H + 3 - i);
        ctx.lineTo(cx - 4 + i * 4, y + BIRD_H - 5);
        ctx.stroke();
      }
    }
    ctx.restore();

    // Eye white with slight shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.arc(x + BIRD_W - 8, y + 9, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x + BIRD_W - 8, y + 8, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1e7a12';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Iris
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(x + BIRD_W - 6, y + 8, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Eye shine
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x + BIRD_W - 5.5, y + 7, 1, 0, Math.PI * 2);
    ctx.fill();

    // Beak with gradient
    const beakGrad = ctx.createLinearGradient(x + BIRD_W, y + 10, x + BIRD_W + 9, y + 14);
    beakGrad.addColorStop(0, '#fbbf24');
    beakGrad.addColorStop(1, '#d97706');
    ctx.fillStyle = beakGrad;
    ctx.beginPath();
    ctx.moveTo(x + BIRD_W - 1, y + 10);
    ctx.quadraticCurveTo(x + BIRD_W + 10, y + 12, x + BIRD_W + 9, y + 14);
    ctx.lineTo(x + BIRD_W - 1, y + 16);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 0.6;
    ctx.stroke();
    // Beak divider line
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x + BIRD_W - 1, y + 13);
    ctx.lineTo(x + BIRD_W + 8, y + 13);
    ctx.stroke();

    // Tiny blush mark
    ctx.fillStyle = 'rgba(255,130,130,0.2)';
    ctx.beginPath();
    ctx.ellipse(x + BIRD_W - 4, y + 14, 3, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const drawPedestrian = (ctx: CanvasRenderingContext2D, p: Pedestrian) => {
    ctx.save();
    const cx = p.x + PED_W / 2;
    const legOffset = Math.sin(p.x * 0.1) * 3;

    // Poop splat on head if hit
    if (p.hit) {
      // Dripping poop on head
      ctx.fillStyle = '#6b3a0a';
      ctx.beginPath();
      ctx.ellipse(cx, p.y - 1, 9, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#854d0e';
      ctx.beginPath();
      ctx.ellipse(cx, p.y - 2, 7, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Drip
      ctx.fillStyle = '#854d0e';
      ctx.beginPath();
      ctx.ellipse(cx + 5, p.y + 5, 2, 4, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#a16207';
      ctx.beginPath();
      ctx.ellipse(cx, p.y - 3, 3, 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Shadow on ground
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(cx, p.y + PED_H + 1, 8, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs with shoes
    ctx.strokeStyle = p.hit ? '#555' : '#4b5563';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(p.x + 7, p.y + 26);
    ctx.lineTo(p.x + 5 + legOffset, p.y + PED_H - 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x + 13, p.y + 26);
    ctx.lineTo(p.x + 15 - legOffset, p.y + PED_H - 2);
    ctx.stroke();
    // Shoes
    ctx.fillStyle = p.hit ? '#444' : '#374151';
    ctx.beginPath();
    ctx.ellipse(p.x + 5 + legOffset, p.y + PED_H - 1, 3, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(p.x + 15 - legOffset, p.y + PED_H - 1, 3, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body (torso with gradient)
    const torsoGrad = ctx.createLinearGradient(p.x + 3, p.y + 12, p.x + 17, p.y + 27);
    if (p.hit) {
      torsoGrad.addColorStop(0, '#555');
      torsoGrad.addColorStop(1, '#444');
    } else {
      torsoGrad.addColorStop(0, '#60a5fa');
      torsoGrad.addColorStop(1, '#3b82f6');
    }
    ctx.fillStyle = torsoGrad;
    // Rounded torso
    ctx.beginPath();
    ctx.moveTo(p.x + 4, p.y + 14);
    ctx.quadraticCurveTo(p.x + 3, p.y + 12, p.x + 6, p.y + 12);
    ctx.lineTo(p.x + 14, p.y + 12);
    ctx.quadraticCurveTo(p.x + 17, p.y + 12, p.x + 16, p.y + 14);
    ctx.lineTo(p.x + 16, p.y + 26);
    ctx.lineTo(p.x + 4, p.y + 26);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = p.hit ? '#333' : '#2563eb';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Arms
    ctx.strokeStyle = p.hit ? '#888' : '#e5c9a8';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    const armSwing = Math.sin(p.x * 0.1) * 4;
    ctx.beginPath();
    ctx.moveTo(p.x + 4, p.y + 15);
    ctx.lineTo(p.x + 1, p.y + 22 + armSwing);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x + 16, p.y + 15);
    ctx.lineTo(p.x + 19, p.y + 22 - armSwing);
    ctx.stroke();

    // Head with skin tone
    const headGrad = ctx.createRadialGradient(cx - 1, p.y + 5, 1, cx, p.y + 6, 7);
    if (p.hit) {
      headGrad.addColorStop(0, '#aaa');
      headGrad.addColorStop(1, '#888');
    } else {
      headGrad.addColorStop(0, '#fcd9b6');
      headGrad.addColorStop(1, '#e5c9a8');
    }
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.arc(cx, p.y + 6, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = p.hit ? '#666' : '#c9a87c';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Hair
    ctx.fillStyle = p.hit ? '#555' : '#4a3728';
    ctx.beginPath();
    ctx.arc(cx, p.y + 4, 6, Math.PI, Math.PI * 2);
    ctx.fill();

    // Eyes (different expression when hit)
    if (p.hit) {
      // X eyes when hit
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 4, p.y + 4);
      ctx.lineTo(cx - 2, p.y + 6);
      ctx.moveTo(cx - 2, p.y + 4);
      ctx.lineTo(cx - 4, p.y + 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 2, p.y + 4);
      ctx.lineTo(cx + 4, p.y + 6);
      ctx.moveTo(cx + 4, p.y + 4);
      ctx.lineTo(cx + 2, p.y + 6);
      ctx.stroke();
      // Frown
      ctx.beginPath();
      ctx.arc(cx, p.y + 11, 2, Math.PI, 0);
      ctx.stroke();
    } else {
      // Normal eyes
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.arc(cx - 2.5, p.y + 5.5, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + 2.5, p.y + 5.5, 1, 0, Math.PI * 2);
      ctx.fill();
      // Smile
      ctx.strokeStyle = '#a0845e';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.arc(cx, p.y + 7, 2, 0.1, Math.PI - 0.1);
      ctx.stroke();
    }

    ctx.restore();
  };

  const drawHunter = (ctx: CanvasRenderingContext2D, h: Hunter) => {
    ctx.save();
    const cx = h.x + HUNTER_W / 2;
    const legOffset = Math.sin(h.x * 0.08) * 3;

    // Shadow on ground
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(cx, h.y + HUNTER_H + 1, 10, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs with boots
    ctx.strokeStyle = '#4a3728';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(h.x + 8, h.y + 29);
    ctx.lineTo(h.x + 6 + legOffset, h.y + HUNTER_H - 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(h.x + 16, h.y + 29);
    ctx.lineTo(h.x + 18 - legOffset, h.y + HUNTER_H - 2);
    ctx.stroke();
    // Heavy boots
    ctx.fillStyle = '#3a2a1a';
    ctx.beginPath();
    ctx.ellipse(h.x + 6 + legOffset, h.y + HUNTER_H - 1, 4, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(h.x + 18 - legOffset, h.y + HUNTER_H - 1, 4, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Vest / torso with gradient
    const vestGrad = ctx.createLinearGradient(h.x + 3, h.y + 13, h.x + 21, h.y + 30);
    vestGrad.addColorStop(0, '#8b4513');
    vestGrad.addColorStop(0.5, '#6b3410');
    vestGrad.addColorStop(1, '#5a2d0e');
    ctx.fillStyle = vestGrad;
    ctx.beginPath();
    ctx.moveTo(h.x + 4, h.y + 13);
    ctx.lineTo(h.x + 20, h.y + 13);
    ctx.lineTo(h.x + 20, h.y + 30);
    ctx.lineTo(h.x + 4, h.y + 30);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#4a2508';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Vest pockets
    ctx.strokeStyle = '#4a2508';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(h.x + 6, h.y + 20, 5, 4);
    ctx.strokeRect(h.x + 13, h.y + 20, 5, 4);

    // Ammo belt
    ctx.fillStyle = '#654321';
    ctx.fillRect(h.x + 3, h.y + 17, 18, 3);
    ctx.fillStyle = '#fbbf24';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(h.x + 5 + i * 4, h.y + 17.5, 2, 2);
    }

    // Gun arm (back arm with rifle)
    ctx.strokeStyle = '#8b7355';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx + 2, h.y + 16);
    ctx.lineTo(cx + 12, h.y + 6);
    ctx.stroke();

    // Rifle
    ctx.fillStyle = '#5a4a3a';
    ctx.save();
    ctx.translate(cx + 12, h.y + 6);
    ctx.rotate(-0.8);
    ctx.fillRect(-2, -12, 3, 16);
    // Rifle barrel
    ctx.fillStyle = '#6b7280';
    ctx.fillRect(-1.5, -18, 2, 8);
    // Rifle stock
    ctx.fillStyle = '#4a3a2a';
    ctx.fillRect(-2.5, 2, 4, 5);
    ctx.restore();

    // Front arm
    ctx.strokeStyle = '#e5c9a8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(h.x + 6, h.y + 16);
    ctx.lineTo(h.x + 2, h.y + 24);
    ctx.stroke();

    // Head with skin
    const headGrad = ctx.createRadialGradient(cx - 1, h.y + 5, 1, cx, h.y + 6, 8);
    headGrad.addColorStop(0, '#f0d0a8');
    headGrad.addColorStop(1, '#d4aa78');
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.arc(cx, h.y + 6, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#b8956a';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Hat (safari/hunter hat with brim)
    ctx.fillStyle = '#5a4a2a';
    // Brim
    ctx.beginPath();
    ctx.ellipse(cx, h.y - 2, 13, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    // Crown
    ctx.fillStyle = '#6b5a3a';
    ctx.beginPath();
    ctx.moveTo(h.x + 4, h.y - 2);
    ctx.quadraticCurveTo(cx, h.y - 14, h.x + HUNTER_W - 4, h.y - 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#4a3a1a';
    ctx.lineWidth = 0.6;
    ctx.stroke();
    // Hat band
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(h.x + 5, h.y - 4, HUNTER_W - 10, 2);

    // Angry eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx - 3, h.y + 5, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 3, h.y + 5, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Pupils
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(cx - 2.5, h.y + 5.5, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 3.5, h.y + 5.5, 1.2, 0, Math.PI * 2);
    ctx.fill();
    // Angry eyebrows
    ctx.strokeStyle = '#4a3728';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 5, h.y + 1);
    ctx.lineTo(cx - 1, h.y + 2.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 5, h.y + 1);
    ctx.lineTo(cx + 1, h.y + 2.5);
    ctx.stroke();
    // Grim mouth
    ctx.strokeStyle = '#8b6a4a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 3, h.y + 10);
    ctx.lineTo(cx + 3, h.y + 10);
    ctx.stroke();

    // Stubble dots
    ctx.fillStyle = 'rgba(74,55,40,0.3)';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(cx - 3 + i * 1.5, h.y + 11 + (i % 2) * 0.5, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const drawBullet = (ctx: CanvasRenderingContext2D, b: Bullet) => {
    ctx.save();
    // Bullet trail
    const angle = Math.atan2(b.vy, b.vx);
    ctx.strokeStyle = 'rgba(239,68,68,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(b.x + BULLET_W / 2, b.y + BULLET_H / 2);
    ctx.lineTo(b.x + BULLET_W / 2 - Math.cos(angle) * 12, b.y + BULLET_H / 2 - Math.sin(angle) * 12);
    ctx.stroke();

    // Outer glow
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 8;
    // Bullet body
    ctx.fillStyle = '#fbbf24';
    ctx.translate(b.x + BULLET_W / 2, b.y + BULLET_H / 2);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, BULLET_W / 2, BULLET_H / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    // Bullet tip highlight
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(2, 0, 1.5, 1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawPoop = (ctx: CanvasRenderingContext2D, p: Poop) => {
    ctx.save();
    const cx = p.x + p.w / 2;
    const cy = p.y + p.h / 2;
    const s = p.w / BASE_POOP_W; // scale factor for upgrades

    // Classic swirl poop shape - stacked blobs
    // Bottom blob (widest)
    const poopGrad = ctx.createRadialGradient(cx - 1 * s, cy + 1 * s, 0, cx, cy, p.w / 1.5);
    poopGrad.addColorStop(0, '#a0722b');
    poopGrad.addColorStop(1, '#6b3a0a');
    ctx.fillStyle = poopGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 2 * s, p.w / 2, p.h / 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Middle blob
    ctx.fillStyle = '#854d0e';
    ctx.beginPath();
    ctx.ellipse(cx, cy - 1 * s, p.w / 2.5, p.h / 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Top blob (smallest - the tip)
    ctx.fillStyle = '#996322';
    ctx.beginPath();
    ctx.ellipse(cx + 0.5 * s, cy - 3.5 * s, p.w / 4, p.h / 4.5, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.ellipse(cx - 1 * s, cy - 2 * s, 1.5 * s, 1 * s, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Stink lines when moving fast
    ctx.strokeStyle = 'rgba(120,100,50,0.3)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 2; i++) {
      const sx = cx - 3 * s + i * 6 * s;
      ctx.beginPath();
      ctx.moveTo(sx, p.y - 1 * s);
      ctx.quadraticCurveTo(sx + 1.5 * s, p.y - 3 * s, sx, p.y - 5 * s);
      ctx.stroke();
    }

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
        vy: ps * 0.35, // start slow, gravity accelerates
        vx,
      });
    }
  }, [getPoopW, getPoopH, getPoopSpeed]);

  // --- Floating joystick handlers ---
  const JOYSTICK_SIZE = 120;
  const THUMB_SIZE = 50;
  const MAX_DIST = (JOYSTICK_SIZE - THUMB_SIZE) / 2;
  const DEAD_ZONE = 0.3;

  const updateJoystickFromOrigin = useCallback((clientX: number, clientY: number) => {
    const origin = joystickOrigin.current;
    if (!origin) return;

    let dx = clientX - origin.x;
    let dy = clientY - origin.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > MAX_DIST) {
      dx = (dx / dist) * MAX_DIST;
      dy = (dy / dist) * MAX_DIST;
    }

    if (joystickThumbRef.current) {
      joystickThumbRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }

    const threshold = MAX_DIST * DEAD_ZONE;
    const keys = keysRef.current;
    if (dx < -threshold) keys.add('ArrowLeft'); else keys.delete('ArrowLeft');
    if (dx > threshold) keys.add('ArrowRight'); else keys.delete('ArrowRight');
    if (dy < -threshold) keys.add('ArrowUp'); else keys.delete('ArrowUp');
    if (dy > threshold) keys.add('ArrowDown'); else keys.delete('ArrowDown');
  }, []);

  const handleJoystickZoneStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (joystickTouchId.current !== null) return; // already tracking
    const touch = e.changedTouches[0];
    joystickTouchId.current = touch.identifier;
    joystickOrigin.current = { x: touch.clientX, y: touch.clientY };

    // Position the joystick base at the touch point
    if (joystickBaseRef.current) {
      joystickBaseRef.current.style.left = `${touch.clientX - JOYSTICK_SIZE / 2}px`;
      joystickBaseRef.current.style.top = `${touch.clientY - JOYSTICK_SIZE / 2}px`;
      joystickBaseRef.current.style.opacity = '1';
    }
    if (joystickThumbRef.current) {
      joystickThumbRef.current.style.transform = 'translate(0px, 0px)';
    }
  }, []);

  const handleJoystickZoneMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (joystickTouchId.current === null) return;
    for (let i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === joystickTouchId.current) {
        updateJoystickFromOrigin(e.touches[i].clientX, e.touches[i].clientY);
        return;
      }
    }
  }, [updateJoystickFromOrigin]);

  const handleJoystickZoneEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === joystickTouchId.current) {
        joystickTouchId.current = null;
        joystickOrigin.current = null;
        if (joystickBaseRef.current) {
          joystickBaseRef.current.style.opacity = '0';
        }
        if (joystickThumbRef.current) {
          joystickThumbRef.current.style.transform = 'translate(0px, 0px)';
        }
        keysRef.current.delete('ArrowLeft');
        keysRef.current.delete('ArrowRight');
        keysRef.current.delete('ArrowUp');
        keysRef.current.delete('ArrowDown');
        return;
      }
    }
  }, []);

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

    const inCountdown = g.countdownTimer > 0;
    if (inCountdown) g.countdownTimer--;

    // --- Check level up (not during countdown) ---
    const nextThreshold = getLevelThreshold(g.level);
    if (!inCountdown && g.score >= nextThreshold) {
      g.running = false;
      g.level++;
      setLevel(g.level);
      setDifficulty(g, g.level);
      setGameState('upgrading');
      return;
    }

    // --- Bird free movement (always allowed, even during countdown) ---
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

    // --- Spawning & combat only when not in countdown ---
    if (!inCountdown) {
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

      // Spawn hunters
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
    }

    // Homing poop logic
    const homingStr = getHomingStrength(g.upgrades);

    // Update poops (gravity-accelerated)
    g.poops = g.poops.filter(p => {
      // Apply gravity to poop - accelerates downward
      p.vy += POOP_GRAVITY;
      p.y += p.vy;
      p.x += p.vx;
      // Air resistance on horizontal movement
      p.vx *= 0.99;

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

    // Update hunters & shooting (no shooting during countdown)
    g.hunters = g.hunters.filter(h => {
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

    // Update bullets (gravity-affected)
    const birdEntity: Entity = { x: g.birdX + 4, y: g.birdY + 4, w: BIRD_W - 8, h: BIRD_H - 8 };
    g.bullets = g.bullets.filter(b => {
      // Apply gravity - bullets arc downward over time
      b.vy += GRAVITY;
      b.x += b.vx;
      b.y += b.vy;
      // No collision during countdown
      if (!inCountdown && g.hitFlash === 0 && collides(b, birdEntity)) {
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

    // --- Countdown overlay ---
    if (inCountdown) {
      // Semi-transparent overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      const secondsLeft = Math.ceil(g.countdownTimer / 60);
      const frameInSecond = g.countdownTimer % 60;
      const scale = 1 + (frameInSecond / 60) * 0.3; // pulse effect

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (secondsLeft > 0) {
        // Number countdown
        ctx.font = `bold ${Math.round(72 * scale)}px Inter, sans-serif`;
        ctx.fillStyle = '#44D62C';
        ctx.shadowColor = '#44D62C';
        ctx.shadowBlur = 20;
        ctx.fillText(`${secondsLeft}`, CANVAS_W / 2, CANVAS_H / 2 - 20);
        ctx.shadowBlur = 0;

        // Level label
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
    // Clear bullets for a fresh start to the new level
    g.bullets = [];
    g.countdownTimer = COUNTDOWN_FRAMES;
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
    g.countdownTimer = COUNTDOWN_FRAMES;
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

  // Detect mobile + portrait orientation
  useEffect(() => {
    const checkMobileAndOrientation = () => {
      const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) {
        const portrait = window.innerHeight > window.innerWidth;
        setIsPortrait(portrait);
        if (!portrait) setPortraitDismissed(false);
      } else {
        setIsPortrait(false);
      }
    };
    checkMobileAndOrientation();
    window.addEventListener('resize', checkMobileAndOrientation);
    window.addEventListener('orientationchange', checkMobileAndOrientation);
    return () => {
      window.removeEventListener('resize', checkMobileAndOrientation);
      window.removeEventListener('orientationchange', checkMobileAndOrientation);
    };
  }, []);

  // Clear stuck controls when window loses focus or visibility changes
  useEffect(() => {
    const clearControls = () => {
      keysRef.current.clear();
      joystickTouchId.current = null;
      joystickOrigin.current = null;
      if (joystickBaseRef.current) joystickBaseRef.current.style.opacity = '0';
      if (joystickThumbRef.current) joystickThumbRef.current.style.transform = 'translate(0px, 0px)';
    };

    // Also catch touchend/touchcancel at window level as a safety net
    const handleGlobalTouchEnd = (e: TouchEvent) => {
      if (joystickTouchId.current === null) return;
      let found = false;
      for (let i = 0; i < e.touches.length; i++) {
        if (e.touches[i].identifier === joystickTouchId.current) {
          found = true;
          break;
        }
      }
      if (!found) {
        clearControls();
      }
    };

    window.addEventListener('blur', clearControls);
    document.addEventListener('visibilitychange', clearControls);
    window.addEventListener('touchend', handleGlobalTouchEnd);
    window.addEventListener('touchcancel', handleGlobalTouchEnd);
    return () => {
      window.removeEventListener('blur', clearControls);
      document.removeEventListener('visibilitychange', clearControls);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
      window.removeEventListener('touchcancel', handleGlobalTouchEnd);
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

  // Convert client coords to canvas coords, accounting for object-fit: contain
  const clientToCanvas = useCallback((clientX: number, clientY: number): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    // Calculate the actual rendered size of the canvas content within the element
    const elemAspect = rect.width / rect.height;
    const canvasAspect = CANVAS_W / CANVAS_H;
    let renderW: number, renderH: number, offsetX: number, offsetY: number;

    if (elemAspect > canvasAspect) {
      // Letterboxed horizontally (black bars on sides)
      renderH = rect.height;
      renderW = rect.height * canvasAspect;
      offsetX = (rect.width - renderW) / 2;
      offsetY = 0;
    } else {
      // Letterboxed vertically (black bars on top/bottom)
      renderW = rect.width;
      renderH = rect.width / canvasAspect;
      offsetX = 0;
      offsetY = (rect.height - renderH) / 2;
    }

    const localX = clientX - rect.left - offsetX;
    const localY = clientY - rect.top - offsetY;

    if (localX < 0 || localX > renderW || localY < 0 || localY > renderH) return null;

    return {
      x: (localX / renderW) * CANVAS_W,
      y: (localY / renderH) * CANVAS_H,
    };
  }, []);

  // Handle canvas interaction (click or touch) for upgrade screen + other states
  const handleCanvasInteraction = useCallback((clientX: number, clientY: number) => {
    if (gameState === 'upgrading') {
      const pos = clientToCanvas(clientX, clientY);
      if (!pos) return;

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

        if (pos.x >= x && pos.x <= x + boxW && pos.y >= y && pos.y <= y + boxH) {
          buyUpgrade(i);
          return;
        }
      }
      return;
    }

    if (gameState === 'playing') dropPoop();
    else startGame();
  }, [gameState, dropPoop, startGame, buyUpgrade, clientToCanvas]);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    handleCanvasInteraction(e.clientX, e.clientY);
  }, [handleCanvasInteraction]);

  const handleCanvasTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    // Only handle touch for non-playing states (during play, overlay handles input)
    if (gameState === 'playing') return;
    e.preventDefault();
    const touch = e.changedTouches[0];
    handleCanvasInteraction(touch.clientX, touch.clientY);
  }, [gameState, handleCanvasInteraction]);

  // Whether we're in mobile gameplay mode (fullscreen overlay)
  const mobilePlay = isMobile && gameState !== 'idle';

  return (
    <div
      ref={containerRef}
      className={mobilePlay
        ? 'fixed inset-0 z-40 bg-black'
        : 'max-w-4xl mx-auto space-y-6'
      }
      style={mobilePlay ? { height: '100dvh', width: '100dvw' } : undefined}
    >
      {/* Portrait orientation overlay */}
      {isPortrait && gameState !== 'idle' && !portraitDismissed && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4"
          style={{ background: 'rgba(10, 10, 14, 0.92)' }}
        >
          <div className="text-6xl" style={{ animation: 'bss-rotate 2s ease-in-out infinite' }}>
            📱
          </div>
          <p className="text-lg font-bold text-white">Rotate your device</p>
          <p className="text-sm text-gray-400 text-center px-8">
            Bird Shit Simulator plays best in landscape mode
          </p>
          <button
            onClick={() => setPortraitDismissed(true)}
            className="mt-2 px-5 py-2 text-sm text-gray-300 border border-gray-600 rounded-lg active:bg-gray-800"
          >
            Continue anyway
          </button>
          <style>{`
            @keyframes bss-rotate {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(90deg); }
            }
          `}</style>
        </div>
      )}

      {/* Header - hidden on mobile gameplay */}
      {!mobilePlay && (
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
      )}

      {/* Game area */}
      <div className={mobilePlay
        ? 'relative w-full h-full'
        : 'card p-4 flex flex-col items-center'
      }>
        {/* Canvas - fills entire screen on mobile */}
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className={mobilePlay ? '' : 'rounded-lg border border-gray-800 w-full'}
          style={mobilePlay
            ? { width: '100dvw', height: '100dvh', objectFit: 'contain', background: '#000', imageRendering: 'pixelated', touchAction: 'none', userSelect: 'none', WebkitTouchCallout: 'none' } as React.CSSProperties
            : { maxWidth: CANVAS_W, imageRendering: 'pixelated', touchAction: 'none', userSelect: 'none', WebkitTouchCallout: 'none' } as React.CSSProperties
          }
          onClick={handleCanvasClick}
          onTouchStart={handleCanvasTouchStart}
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* === Mobile overlay controls === */}
        {gameState === 'playing' && mobilePlay && (
          <>
            {/* Left half: joystick touch zone */}
            <div
              className="absolute top-0 left-0"
              style={{
                width: '50%', height: '100%',
                touchAction: 'none', userSelect: 'none', WebkitTouchCallout: 'none',
              } as React.CSSProperties}
              onTouchStart={handleJoystickZoneStart}
              onTouchMove={handleJoystickZoneMove}
              onTouchEnd={handleJoystickZoneEnd}
              onTouchCancel={handleJoystickZoneEnd}
              onContextMenu={(e) => e.preventDefault()}
            />

            {/* Floating joystick base (positioned dynamically via ref) */}
            <div
              ref={joystickBaseRef}
              className="fixed pointer-events-none flex items-center justify-center"
              style={{
                width: JOYSTICK_SIZE,
                height: JOYSTICK_SIZE,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(68,214,44,0.12) 0%, rgba(68,214,44,0.04) 70%, transparent 100%)',
                border: '2px solid rgba(68,214,44,0.3)',
                opacity: 0,
                transition: 'opacity 0.1s',
              }}
            >
              {/* Crosshair lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div style={{ width: '40%', height: 1, background: 'rgba(68,214,44,0.15)' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div style={{ width: 1, height: '40%', background: 'rgba(68,214,44,0.15)' }} />
              </div>
              {/* Thumb */}
              <div
                ref={joystickThumbRef}
                style={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 40% 38%, rgba(68,214,44,0.6), rgba(68,214,44,0.25))',
                  border: '2px solid rgba(68,214,44,0.7)',
                  boxShadow: '0 0 12px rgba(68,214,44,0.2)',
                }}
              />
            </div>

            {/* Right side: Poop button */}
            <div
              onTouchStart={(e) => { e.preventDefault(); dropPoop(); }}
              onContextMenu={(e) => e.preventDefault()}
              className="absolute flex items-center justify-center active:scale-90"
              style={{
                right: '5dvw',
                bottom: '5dvh',
                width: '20dvh',
                height: '20dvh',
                maxWidth: 100,
                maxHeight: 100,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 40% 38%, rgba(133,77,14,0.85), rgba(107,58,10,0.85))',
                border: '3px solid rgba(161,98,7,0.7)',
                boxShadow: '0 0 20px rgba(133,77,14,0.3), inset 0 -3px 6px rgba(0,0,0,0.3)',
                touchAction: 'none',
                userSelect: 'none',
                WebkitTouchCallout: 'none',
              } as React.CSSProperties}
            >
              <span className="text-3xl select-none" style={{ lineHeight: 1 }}>💩</span>
            </div>
          </>
        )}

        {/* Mobile: overlay buttons for non-playing states */}
        {mobilePlay && gameState !== 'playing' && (
          <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none">
            {gameState === 'over' && (
              <button onClick={startGame} className="btn-primary flex items-center gap-2 px-6 py-3 text-lg pointer-events-auto">
                <Play className="w-5 h-5" />
                Play Again
              </button>
            )}
            {gameState === 'upgrading' && (
              <button onClick={continueFromUpgrade} className="btn-primary flex items-center gap-2 px-6 py-3 text-lg pointer-events-auto">
                <Play className="w-5 h-5" />
                Continue to Level {level}
              </button>
            )}
          </div>
        )}

        {/* Desktop controls bar */}
        {!mobilePlay && (
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
        )}
      </div>

      {/* Instructions - desktop only */}
      {!mobilePlay && (
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
      )}
    </div>
  );
};

export default BirdShitApp;
