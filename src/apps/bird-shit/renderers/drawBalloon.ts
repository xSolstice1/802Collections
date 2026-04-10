// Balloon sky obstacle — bobbing, colorful, poppable by poop
import { BALLOON_W, BALLOON_H, BALLOON_COLORS } from '../constants';
import type { Balloon } from '../types';

export const drawBalloon = (ctx: CanvasRenderingContext2D, b: Balloon, frame: number) => {
  ctx.save();

  const displayY = b.baseY + Math.sin(frame * 0.025 + b.driftPhase) * b.driftAmp;
  // Sync entity y for collision (caller updates b.y each frame)
  const cx = b.x + BALLOON_W / 2;
  const cy = displayY + BALLOON_H / 2;
  const color = BALLOON_COLORS[b.colorIndex % BALLOON_COLORS.length];

  // String (from bottom of balloon downward)
  ctx.strokeStyle = 'rgba(200,200,200,0.7)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, displayY + BALLOON_H);
  ctx.quadraticCurveTo(cx + 4, displayY + BALLOON_H + 10, cx - 2, displayY + BALLOON_H + 20);
  ctx.stroke();

  // Shadow/depth ellipse
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath();
  ctx.ellipse(cx + 2, cy + 2, BALLOON_W / 2, BALLOON_H / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Main balloon body
  const bodyGrad = ctx.createRadialGradient(cx - 4, cy - 5, 2, cx, cy, BALLOON_W / 2 + 2);
  bodyGrad.addColorStop(0, lighten(color));
  bodyGrad.addColorStop(0.5, color);
  bodyGrad.addColorStop(1, darken(color));
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, BALLOON_W / 2, BALLOON_H / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Outline
  ctx.strokeStyle = darken(color);
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Highlight (upper-left gleam)
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.beginPath();
  ctx.ellipse(cx - 5, cy - 6, 5, 3.5, -0.4, 0, Math.PI * 2);
  ctx.fill();

  // Knot at bottom
  ctx.fillStyle = darken(color);
  ctx.beginPath();
  ctx.ellipse(cx, displayY + BALLOON_H - 1, 3, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

function lighten(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + 70);
  const g = Math.min(255, ((n >> 8) & 0xff) + 70);
  const bl = Math.min(255, (n & 0xff) + 70);
  return `rgb(${r},${g},${bl})`;
}

function darken(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 0xff) - 60);
  const g = Math.max(0, ((n >> 8) & 0xff) - 60);
  const bl = Math.max(0, (n & 0xff) - 60);
  return `rgb(${r},${g},${bl})`;
}
