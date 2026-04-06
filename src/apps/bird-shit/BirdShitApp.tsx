import { useState, useRef, useEffect, useCallback } from 'react';
import { Bird, Play } from 'lucide-react';

// --- Game Constants ---
const CANVAS_W = 800;
const CANVAS_H = 400;
const GROUND_Y = 350;
const SKY_MIN = 20;
const BIRD_SPEED = 2.5;
const SCROLL_SPEED = 1.5;
const POOP_SPEED = 3;
const BIRD_W = 36;
const BIRD_H = 28;
const PED_W = 20;
const PED_H = 36;
const POOP_W = 8;
const POOP_H = 10;
const BULLET_W = 8;
const BULLET_H = 4;
const BULLET_SPEED = 3.5;
const HUNTER_W = 24;
const HUNTER_H = 40;
const SPAWN_INTERVAL_PED = 100;
const SPAWN_INTERVAL_HUNTER = 250;
const HUNTER_SHOOT_INTERVAL = 90;
const STORAGE_KEY = 'bird-shit-highscore';

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
}
interface Bullet extends Entity {
  vx: number;
  vy: number;
}

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
    poops: [] as Poop[],
    pedestrians: [] as Pedestrian[],
    hunters: [] as Hunter[],
    bullets: [] as Bullet[],
    frame: 0,
    wingUp: false,
    hitFlash: 0,
    poopCooldown: 0,
  });

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  // --- Drawing helpers ---
  const drawBird = (ctx: CanvasRenderingContext2D, x: number, y: number, wingUp: boolean, flash: boolean) => {
    ctx.save();
    if (flash) ctx.globalAlpha = 0.5;
    // Body
    ctx.fillStyle = '#44D62C';
    ctx.beginPath();
    ctx.ellipse(x + BIRD_W / 2, y + BIRD_H / 2, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    // Wing
    ctx.fillStyle = '#37ad24';
    ctx.beginPath();
    if (wingUp) {
      ctx.ellipse(x + BIRD_W / 2 - 2, y - 4, 12, 6, -0.3, 0, Math.PI * 2);
    } else {
      ctx.ellipse(x + BIRD_W / 2 - 2, y + BIRD_H - 2, 12, 5, 0.3, 0, Math.PI * 2);
    }
    ctx.fill();
    // Eye
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x + BIRD_W - 8, y + 8, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x + BIRD_W - 7, y + 8, 2, 0, Math.PI * 2);
    ctx.fill();
    // Beak
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
    // Head
    ctx.fillStyle = p.hit ? '#999' : '#e5e7eb';
    ctx.beginPath();
    ctx.arc(p.x + PED_W / 2, p.y + 6, 6, 0, Math.PI * 2);
    ctx.fill();
    // Body
    ctx.fillStyle = p.hit ? '#666' : '#9ca3af';
    ctx.fillRect(p.x + 4, p.y + 12, 12, 14);
    // Legs
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
    // Head
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(h.x + HUNTER_W / 2, h.y + 6, 7, 0, Math.PI * 2);
    ctx.fill();
    // Hat
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(h.x + 2, h.y - 4, HUNTER_W - 4, 8);
    ctx.fillRect(h.x + 6, h.y - 10, HUNTER_W - 12, 8);
    // Body
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(h.x + 4, h.y + 13, 16, 16);
    // Gun arm pointing up
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(h.x + HUNTER_W / 2, h.y + 16);
    ctx.lineTo(h.x + HUNTER_W / 2 + 10, h.y + 4);
    ctx.stroke();
    // Gun
    ctx.fillStyle = '#374151';
    ctx.fillRect(h.x + HUNTER_W / 2 + 6, h.y - 2, 4, 10);
    // Legs
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
    ctx.ellipse(p.x + POOP_W / 2, p.y + POOP_H / 2, POOP_W / 2, POOP_H / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#a16207';
    ctx.beginPath();
    ctx.ellipse(p.x + POOP_W / 2, p.y + 2, 3, 2, 0, 0, Math.PI * 2);
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

  // --- Collision detection ---
  const collides = (a: Entity, b: Entity) =>
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

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

    // --- Bird free movement ---
    const keys = keysRef.current;
    if (keys.has('ArrowUp') || keys.has('KeyW')) g.birdY -= BIRD_SPEED;
    if (keys.has('ArrowDown') || keys.has('KeyS')) g.birdY += BIRD_SPEED;
    if (keys.has('ArrowLeft') || keys.has('KeyA')) g.birdX -= BIRD_SPEED;
    if (keys.has('ArrowRight') || keys.has('KeyD')) g.birdX += BIRD_SPEED;

    // Clamp bird position
    if (g.birdX < 0) g.birdX = 0;
    if (g.birdX > CANVAS_W - BIRD_W) g.birdX = CANVAS_W - BIRD_W;
    if (g.birdY < SKY_MIN) g.birdY = SKY_MIN;
    if (g.birdY > GROUND_Y - BIRD_H - 10) g.birdY = GROUND_Y - BIRD_H - 10;

    // Spawn pedestrians
    if (g.frame % SPAWN_INTERVAL_PED === 0) {
      g.pedestrians.push({
        x: CANVAS_W + Math.random() * 100,
        y: GROUND_Y - PED_H,
        w: PED_W,
        h: PED_H,
        hit: false,
        speed: SCROLL_SPEED + Math.random() * 0.5,
      });
    }

    // Spawn hunters
    if (g.frame % SPAWN_INTERVAL_HUNTER === 0 && g.frame > 120) {
      g.hunters.push({
        x: CANVAS_W + Math.random() * 60,
        y: GROUND_Y - HUNTER_H,
        w: HUNTER_W,
        h: HUNTER_H,
        speed: SCROLL_SPEED * 0.7 + Math.random() * 0.3,
        shootTimer: 30 + Math.floor(Math.random() * 40),
      });
    }

    // Update poops
    g.poops = g.poops.filter(p => {
      p.y += p.vy;
      // Check poop-pedestrian collision
      for (const ped of g.pedestrians) {
        if (!ped.hit && collides(p, ped)) {
          ped.hit = true;
          g.score += 10;
          setScore(g.score);
          return false;
        }
      }
      // Check poop-hunter collision (bonus points!)
      for (let i = g.hunters.length - 1; i >= 0; i--) {
        if (collides(p, g.hunters[i])) {
          g.hunters.splice(i, 1);
          g.score += 25;
          setScore(g.score);
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
        // Shoot towards the bird
        const dx = g.birdX - (h.x + HUNTER_W / 2);
        const dy = g.birdY - (h.y - 10);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          g.bullets.push({
            x: h.x + HUNTER_W / 2,
            y: h.y - 4,
            w: BULLET_W,
            h: BULLET_H,
            vx: (dx / dist) * BULLET_SPEED,
            vy: (dy / dist) * BULLET_SPEED,
          });
        }
        h.shootTimer = HUNTER_SHOOT_INTERVAL + Math.floor(Math.random() * 40);
      }
      return h.x > -HUNTER_W - 10;
    });

    // Update bullets
    const birdEntity: Entity = { x: g.birdX + 4, y: g.birdY + 4, w: BIRD_W - 8, h: BIRD_H - 8 };
    g.bullets = g.bullets.filter(b => {
      b.x += b.vx;
      b.y += b.vy;
      // Check bullet-bird collision
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
    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    skyGrad.addColorStop(0, '#0a0a0a');
    skyGrad.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, CANVAS_W, GROUND_Y);

    // Ground
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y);
    ctx.strokeStyle = '#44D62C';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(CANVAS_W, GROUND_Y);
    ctx.stroke();

    // Ground dashes (scrolling)
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    const dashOffset = (g.frame * SCROLL_SPEED) % 40;
    for (let dx = -dashOffset; dx < CANVAS_W; dx += 40) {
      ctx.beginPath();
      ctx.moveTo(dx, GROUND_Y + 15);
      ctx.lineTo(dx + 20, GROUND_Y + 15);
      ctx.stroke();
    }

    // Draw pedestrians
    g.pedestrians.forEach(p => drawPedestrian(ctx, p));

    // Draw hunters
    g.hunters.forEach(h => drawHunter(ctx, h));

    // Draw bullets
    g.bullets.forEach(b => drawBullet(ctx, b));

    // Draw poops
    g.poops.forEach(p => drawPoop(ctx, p));

    // Draw bird
    drawBird(ctx, g.birdX, g.birdY, g.wingUp, g.hitFlash > 0 && g.hitFlash % 4 < 2);

    // HUD
    ctx.fillStyle = '#44D62C';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${g.score}`, 16, 30);

    // Lives (hearts)
    for (let i = 0; i < g.lives; i++) {
      drawHeart(ctx, CANVAS_W / 2 - 30 + i * 24, 16, 8);
    }

    ctx.textAlign = 'right';
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px "JetBrains Mono", monospace';
    ctx.fillText(`Best: ${Math.max(g.score, highScore)}`, CANVAS_W - 16, 30);

    frameRef.current = requestAnimationFrame(gameLoop);
  }, [highScore]);

  // --- Input handling ---
  const dropPoop = useCallback(() => {
    const g = gameRef.current;
    if (!g.running || g.poopCooldown > 0) return;
    g.poopCooldown = 12;
    g.poops.push({
      x: g.birdX + BIRD_W / 2 - POOP_W / 2,
      y: g.birdY + BIRD_H,
      w: POOP_W,
      h: POOP_H,
      vy: POOP_SPEED,
    });
  }, []);

  const startGame = useCallback(() => {
    const g = gameRef.current;
    g.running = true;
    g.birdX = 120;
    g.birdY = 150;
    g.score = 0;
    g.lives = 3;
    g.poops = [];
    g.pedestrians = [];
    g.hunters = [];
    g.bullets = [];
    g.frame = 0;
    g.hitFlash = 0;
    g.poopCooldown = 0;
    setScore(0);
    setLives(3);
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
        e.preventDefault();
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
  }, [gameState, startGame, dropPoop]);

  // Cleanup
  useEffect(() => {
    return () => {
      gameRef.current.running = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Draw idle/game over screen
  useEffect(() => {
    if (gameState === 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
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

    // Bird in center
    drawBird(ctx, CANVAS_W / 2 - BIRD_W / 2, 140, true, false);

    ctx.textAlign = 'center';

    if (gameState === 'over') {
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 36px Inter, sans-serif';
      ctx.fillText('GAME OVER', CANVAS_W / 2, 100);
      ctx.fillStyle = '#44D62C';
      ctx.font = 'bold 24px "JetBrains Mono", monospace';
      ctx.fillText(`Score: ${score}`, CANVAS_W / 2, 210);
      if (score >= highScore && score > 0) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = '16px Inter, sans-serif';
        ctx.fillText('New High Score!', CANVAS_W / 2, 240);
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
  }, [gameState, score, highScore]);

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
          onClick={() => {
            if (gameState === 'playing') dropPoop();
            else startGame();
          }}
        />

        {/* Mobile Controls */}
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

        {/* Controls bar */}
        <div className="flex items-center gap-4 mt-4">
          {gameState !== 'playing' && (
            <button onClick={startGame} className="btn-primary flex items-center gap-2 px-6 py-2">
              <Play className="w-4 h-4" />
              {gameState === 'over' ? 'Play Again' : 'Start Game'}
            </button>
          )}
          {gameState === 'playing' && (
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-500 font-mono">
                Score: <span className="text-802 font-bold">{score}</span>
              </p>
              <p className="text-sm text-gray-500 font-mono">
                Lives: <span className="text-red-400 font-bold">{lives}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="card p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
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
        </div>
      </div>
    </div>
  );
};

export default BirdShitApp;
