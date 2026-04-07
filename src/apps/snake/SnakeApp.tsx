import { useState, useRef, useEffect, useCallback } from 'react';
import { Ribbon, Play, Maximize, Minimize } from 'lucide-react';

// --- Game Constants ---
const CANVAS_W = 600;
const CANVAS_H = 600;
const CELL_SIZE = 20;
const GRID_W = CANVAS_W / CELL_SIZE;
const GRID_H = CANVAS_H / CELL_SIZE;
const BASE_TICK_MS = 120;
const MIN_TICK_MS = 50;
const STORAGE_KEY = 'snake-highscore';

type Direction = 'up' | 'down' | 'left' | 'right';
type GameState = 'idle' | 'playing' | 'over';
interface Cell { x: number; y: number; }

const SnakeApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
  });
  const renderRef = useRef<number>(0);

  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
        const el = containerRef.current ?? document.documentElement;
        await el.requestFullscreen();
      }
    } catch {}
  }, []);

  // --- Spawn food not on snake ---
  const spawnFood = useCallback((snake: Cell[]): Cell => {
    const occupied = new Set(snake.map(c => `${c.x},${c.y}`));
    let cell: Cell;
    do {
      cell = { x: Math.floor(Math.random() * GRID_W), y: Math.floor(Math.random() * GRID_H) };
    } while (occupied.has(`${cell.x},${cell.y}`));
    return cell;
  }, []);

  // --- Spawn particles on eat ---
  const spawnEatParticles = useCallback((cx: number, cy: number) => {
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
        color: Math.random() > 0.5 ? '#ef4444' : '#fbbf24',
      });
    }
  }, []);

  // --- Helper: get cell center ---
  const cellCenter = (c: Cell) => ({ x: c.x * CELL_SIZE + CELL_SIZE / 2, y: c.y * CELL_SIZE + CELL_SIZE / 2 });

  // --- Drawing ---
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const g = gameRef.current;
    g.frame++;
    const t = Date.now() / 1000;

    // --- Background: dark with subtle checkerboard ---
    ctx.fillStyle = '#080810';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Checkerboard tiles
    for (let gx = 0; gx < GRID_W; gx++) {
      for (let gy = 0; gy < GRID_H; gy++) {
        if ((gx + gy) % 2 === 0) {
          ctx.fillStyle = 'rgba(68, 214, 44, 0.018)';
        } else {
          ctx.fillStyle = 'rgba(68, 214, 44, 0.008)';
        }
        ctx.fillRect(gx * CELL_SIZE, gy * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    // Subtle corner vignette
    const vignette = ctx.createRadialGradient(CANVAS_W / 2, CANVAS_H / 2, CANVAS_W * 0.25, CANVAS_W / 2, CANVAS_H / 2, CANVAS_W * 0.7);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Border glow
    ctx.save();
    ctx.shadowColor = '#44D62C';
    ctx.shadowBlur = 8;
    ctx.strokeStyle = 'rgba(68, 214, 44, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, CANVAS_W - 2, CANVAS_H - 2);
    ctx.restore();
    ctx.strokeStyle = 'rgba(68, 214, 44, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, CANVAS_W, CANVAS_H);

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

    // --- Food: animated pulsing glow ---
    const fcx = g.food.x * CELL_SIZE + CELL_SIZE / 2;
    const fcy = g.food.y * CELL_SIZE + CELL_SIZE / 2;
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

    // Compute center points for each segment
    const centers = snake.map(cellCenter);

    // Draw body glow underneath
    ctx.save();
    ctx.shadowColor = '#44D62C';
    ctx.shadowBlur = 16;
    ctx.strokeStyle = 'rgba(68, 214, 44, 0.15)';
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
      const pct = i / Math.max(snake.length - 1, 1); // 0 = head, 1 = tail
      const isHead = i === 0;

      // Segment thickness tapers toward tail
      const segSize = isHead ? CELL_SIZE - 1 : CELL_SIZE - 2 - pct * 4;
      const half = segSize / 2;

      if (isHead) {
        // --- Head ---
        ctx.save();
        ctx.shadowColor = '#44D62C';
        ctx.shadowBlur = 10;

        const headGrad = ctx.createRadialGradient(cx - 2, cy - 2, 1, cx, cy, half + 2);
        headGrad.addColorStop(0, '#7df76a');
        headGrad.addColorStop(0.5, '#44D62C');
        headGrad.addColorStop(1, '#1e8c14');
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.roundRect(cx - half, cy - half, segSize, segSize, 7);
        ctx.fill();

        // Subtle head outline
        ctx.strokeStyle = 'rgba(30, 140, 20, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        // Eyes - positioned based on direction
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

        // Eye whites with glow
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

        // Pupils
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

        // Eye shine
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath();
        ctx.arc(e1x + pdx + 0.5, e1y + pdy - 0.5, 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(e2x + pdx + 0.5, e2y + pdy - 0.5, 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Tongue (flickers)
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
          // Fork
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
        // --- Body segment ---
        // Color gradient: bright green -> darker teal toward tail
        const r = Math.round(68 - pct * 30);
        const gv = Math.round(214 - pct * 100);
        const b = Math.round(44 + pct * 30);

        const segGrad = ctx.createRadialGradient(cx - 1, cy - 1, 0, cx, cy, half + 1);
        segGrad.addColorStop(0, `rgba(${r + 40}, ${gv + 30}, ${b}, 1)`);
        segGrad.addColorStop(0.7, `rgb(${r}, ${gv}, ${b})`);
        segGrad.addColorStop(1, `rgb(${Math.max(0, r - 20)}, ${Math.max(0, gv - 30)}, ${b})`);
        ctx.fillStyle = segGrad;

        // Connected body: draw rounded rect, but bridge the gap between segments
        ctx.beginPath();
        ctx.roundRect(cx - half, cy - half, segSize, segSize, 5);
        ctx.fill();

        // Connect to previous segment (fill the gap)
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

        // Scale pattern - diamond shapes
        if (i % 3 === 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.08 - pct * 0.06})`;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-2, -2, 4, 4);
          ctx.restore();
        }

        // Subtle segment outline
        ctx.strokeStyle = `rgba(30, 140, 20, ${0.25 - pct * 0.15})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.roundRect(cx - half, cy - half, segSize, segSize, 5);
        ctx.stroke();
      }
    }

    // --- HUD: glassmorphism pills ---
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

    ctx.fillStyle = '#9ca3af';
    ctx.font = '13px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Best: ${Math.max(g.score, highScore)}`, CANVAS_W - 20, 27);

    // Length pill
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.roundRect(10, 40, 100, 24, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Length: ${snake.length}`, 20, 56);
    ctx.restore();
  }, [highScore]);

  // --- Game tick ---
  const tick = useCallback(() => {
    const g = gameRef.current;
    if (!g.running) return;

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

    // Wall collision
    if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) {
      g.running = false;
      setGameState('over');
      if (g.score > highScore) {
        setHighScore(g.score);
        localStorage.setItem(STORAGE_KEY, g.score.toString());
      }
      draw();
      return;
    }

    // Self collision
    for (const seg of g.snake) {
      if (seg.x === nx && seg.y === ny) {
        g.running = false;
        setGameState('over');
        if (g.score > highScore) {
          setHighScore(g.score);
          localStorage.setItem(STORAGE_KEY, g.score.toString());
        }
        draw();
        return;
      }
    }

    const newHead = { x: nx, y: ny };
    g.snake.unshift(newHead);

    // Eat food?
    if (nx === g.food.x && ny === g.food.y) {
      g.score += 10;
      setScore(g.score);
      spawnEatParticles(g.food.x * CELL_SIZE + CELL_SIZE / 2, g.food.y * CELL_SIZE + CELL_SIZE / 2);
      g.food = spawnFood(g.snake);
    } else {
      g.snake.pop();
    }

    draw();

    // Speed up as snake grows
    const speed = Math.max(MIN_TICK_MS, BASE_TICK_MS - (g.snake.length - 1) * 2);
    tickRef.current = setTimeout(tick, speed);
  }, [draw, spawnFood, highScore]);

  // --- Render loop for smooth animations (particles, food pulse) ---
  const renderLoop = useCallback(() => {
    const g = gameRef.current;
    if (!g.running) return;
    // Only redraw particles & food glow between ticks
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
        // Queue max 2 directions to allow quick turns
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

      // Background
      ctx.fillStyle = '#080810';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Animated grid dots
      for (let gx = 0; gx < GRID_W; gx++) {
        for (let gy = 0; gy < GRID_H; gy++) {
          const dist = Math.sqrt((gx - GRID_W / 2) ** 2 + (gy - GRID_H / 2) ** 2);
          const wave = Math.sin(t * 2 - dist * 0.3) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(68, 214, 44, ${0.02 + wave * 0.03})`;
          ctx.beginPath();
          ctx.arc(gx * CELL_SIZE + CELL_SIZE / 2, gy * CELL_SIZE + CELL_SIZE / 2, 1 + wave, 0, Math.PI * 2);
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
      // Snake head on the path
      const headX = CANVAS_W * 0.15 + CANVAS_W * 0.7;
      const headY = CANVAS_H * 0.35 + Math.sin(t * 1.5 + 20 * 0.5) * 30;
      ctx.fillStyle = 'rgba(68, 214, 44, 0.25)';
      ctx.beginPath();
      ctx.arc(headX, headY, CELL_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.textAlign = 'center';

      if (gameState === 'over') {
        // Game over title with glow
        ctx.save();
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 42px Inter, sans-serif';
        ctx.fillText('GAME OVER', CANVAS_W / 2, CANVAS_H * 0.42);
        ctx.restore();

        // Score
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

        if (score >= highScore && score > 0) {
          ctx.save();
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 12;
          ctx.fillStyle = '#fbbf24';
          ctx.font = 'bold 16px Inter, sans-serif';
          ctx.fillText('NEW HIGH SCORE!', CANVAS_W / 2, CANVAS_H * 0.63);
          ctx.restore();
        }
      } else {
        // Title with glow
        ctx.save();
        ctx.shadowColor = '#44D62C';
        ctx.shadowBlur = 24;
        ctx.fillStyle = '#44D62C';
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.fillText('SNAKE', CANVAS_W / 2, CANVAS_H * 0.5);
        ctx.restore();

        ctx.fillStyle = '#6b7280';
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText('A CLASSIC REIMAGINED', CANVAS_W / 2, CANVAS_H * 0.55);
      }

      // Controls hint with pulsing opacity
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
  }, [gameState, score, highScore, isMobile]);

  const mobilePlay = isMobile && gameState !== 'idle';

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
    <div
      ref={containerRef}
      className={mobilePlay
        ? 'fixed inset-0 z-40 bg-black'
        : 'max-w-4xl mx-auto space-y-6'
      }
      style={mobilePlay ? { height: '100dvh', width: '100dvw' } : undefined}
    >
      {/* Header - hidden on mobile gameplay */}
      {!mobilePlay && (
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
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className={mobilePlay ? '' : 'rounded-lg border border-gray-800 w-full'}
          style={mobilePlay
            ? { width: '100dvw', height: '100dvh', objectFit: 'contain', background: '#000', imageRendering: 'pixelated', touchAction: 'none', userSelect: 'none', WebkitTouchCallout: 'none' } as React.CSSProperties
            : { maxWidth: CANVAS_W, imageRendering: 'pixelated' }
          }
          onClick={handleCanvasClick}
          onTouchStart={handleCanvasTouchStart}
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Fullscreen toggle - mobile */}
        {mobilePlay && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-2 right-2 z-10 p-2 rounded-lg active:scale-90"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', touchAction: 'none' }}
          >
            {isFullscreen
              ? <Minimize className="w-5 h-5 text-white/70" />
              : <Maximize className="w-5 h-5 text-white/70" />
            }
          </button>
        )}

        {/* Mobile overlay buttons for non-playing states */}
        {mobilePlay && gameState !== 'playing' && (
          <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none">
            <button onClick={startGame} className="btn-primary flex items-center gap-2 px-6 py-3 text-lg pointer-events-auto">
              <Play className="w-5 h-5" />
              {gameState === 'over' ? 'Play Again' : 'Start Game'}
            </button>
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
            {gameState === 'playing' && (
              <div className="flex items-center gap-6">
                <p className="text-sm text-gray-500 font-mono">
                  Score: <span className="text-802 font-bold">{score}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Instructions - desktop only */}
      {!mobilePlay && (
        <div className="card p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <kbd className="px-2 py-1 bg-gray-800 rounded text-802 font-mono text-xs">WASD / Arrows</kbd>
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
        </div>
      )}
    </div>
  );
};

export default SnakeApp;
