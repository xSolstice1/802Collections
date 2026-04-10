import {
  CANVAS_W, GROUND_Y, SKY_MIN,
  PED_W, PED_H, HUNTER_W, HUNTER_H,
  OBSTACLE_W, OBSTACLE_MIN_H, getObstacleSpawnInterval, getObstacleMaxHeight,
  BALLOON_W, BALLOON_H, getBalloonSpawnInterval,
} from '../constants';
import type { GameData, Obstacle, Balloon } from '../types';

export function updateSpawning(g: GameData, dt: number) {
  // Pedestrian spawning
  g.spawnTimerPed += dt;
  while (g.spawnTimerPed >= g.spawnIntervalPed) {
    g.spawnTimerPed -= g.spawnIntervalPed;
    g.pedestrians.push({
      x: CANVAS_W + Math.random() * 100,
      y: GROUND_Y - PED_H,
      w: PED_W,
      h: PED_H,
      hit: false,
      speed: g.scrollSpeed + Math.random() * 30,
    });
  }

  // Hunter spawning (after 2 seconds)
  if (g.time > 2) {
    g.spawnTimerHunter += dt;
    while (g.spawnTimerHunter >= g.spawnIntervalHunter) {
      g.spawnTimerHunter -= g.spawnIntervalHunter;
      g.hunters.push({
        x: CANVAS_W + Math.random() * 60,
        y: GROUND_Y - HUNTER_H,
        w: HUNTER_W,
        h: HUNTER_H,
        speed: g.scrollSpeed * 0.7 + Math.random() * 18,
        shootTimer: 0.5 + Math.random() * 0.667,
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
        speed: g.scrollSpeed * 0.7 + Math.random() * 24,
        baseY,
        driftPhase: Math.random() * Math.PI * 2,
        driftAmp: 8 + Math.random() * 12,
        colorIndex: Math.floor(Math.random() * 6),
      };
      g.balloons.push(bal);
    }
  }
}
