import {
  BIRD_W, BIRD_H, BALLOON_W, BALLOON_H,
  HIT_FLASH_TIME, STORAGE_KEY,
  collides,
} from '../constants';
import { birdShitSound } from '../sound';
import type { GameData, GameState, Entity } from '../types';

interface CollisionCallbacks {
  setLives: (n: number) => void;
  setGameState: (s: GameState) => void;
  setHighScore: (n: number) => void;
  highScoreRef: React.MutableRefObject<number>;
  submitScoreRef: React.MutableRefObject<(score: number) => void>;
}

/**
 * Check bird collisions with bullets, obstacles, and balloons.
 * Handles shield, damage, and game over.
 */
export function updateBirdCollisions(g: GameData, callbacks: CollisionCallbacks) {
  const { setLives, setGameState, setHighScore, highScoreRef, submitScoreRef } = callbacks;
  const inCountdown = g.countdownTimer > 0;

  if (inCountdown || g.hitFlash > 0) return;

  const birdEntity: Entity = {
    x: g.birdX + 4,
    y: g.birdY + 4,
    w: BIRD_W - 8,
    h: BIRD_H - 8,
  };

  const takeDamage = () => {
    if (g.shieldActive) {
      g.shieldActive = false;
      g.shieldTimer = 15;
      g.hitFlash = HIT_FLASH_TIME * 0.3;
      return;
    }
    g.lives--;
    g.hitFlash = HIT_FLASH_TIME;
    setLives(g.lives);
    birdShitSound.play('bullet_hit');
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

  // Bullet → bird
  g.bullets = g.bullets.filter((b) => {
    if (collides(b, birdEntity)) {
      takeDamage();
      return false;
    }
    return true;
  });

  // Obstacle → bird
  for (const obs of g.obstacles) {
    if (g.hitFlash === 0 && collides(birdEntity, obs)) {
      takeDamage();
      break;
    }
  }

  // Balloon → bird
  g.balloons = g.balloons.filter((bal) => {
    const balEntity = { x: bal.x + 3, y: bal.y + 3, w: BALLOON_W - 6, h: BALLOON_H - 6 };
    if (g.hitFlash === 0 && collides(birdEntity, balEntity)) {
      takeDamage();
      return false;
    }
    return true;
  });
}
