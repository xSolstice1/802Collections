import { BASE_POOP_W } from '../constants';
import type { Poop } from '../types';

export const drawPoop = (ctx: CanvasRenderingContext2D, p: Poop) => {
  ctx.save();
  const cx = p.x + p.w / 2;
  const cy = p.y + p.h / 2;
  const s = p.w / BASE_POOP_W; // scale factor for upgrades

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
