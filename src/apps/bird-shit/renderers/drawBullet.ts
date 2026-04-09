import { BULLET_W, BULLET_H } from '../constants';
import type { Bullet } from '../types';

export const drawBullet = (ctx: CanvasRenderingContext2D, b: Bullet) => {
  ctx.save();
  const angle = Math.atan2(b.vy, b.vx);

  // Bullet trail
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
