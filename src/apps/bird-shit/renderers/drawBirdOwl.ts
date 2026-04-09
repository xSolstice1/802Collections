// Owl — round brown body, facial disk, ear tufts, two large forward-facing eyes
import { BIRD_W, BIRD_H } from '../constants';

export const drawBirdOwl = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  wingUp: boolean,
  flash: boolean
) => {
  ctx.save();
  if (flash) ctx.globalAlpha = 0.5;
  const cx = x + BIRD_W / 2;
  const cy = y + BIRD_H / 2;

  // Short stubby tail
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.moveTo(x - 2, cy - 2);
  ctx.lineTo(x - 9, cy - 4);
  ctx.lineTo(x - 8, cy);
  ctx.lineTo(x - 9, cy + 3);
  ctx.lineTo(x - 2, cy + 2);
  ctx.closePath();
  ctx.fill();

  // Body shadow
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 2, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Warm brown body
  const bodyGrad = ctx.createRadialGradient(cx - 2, cy - 2, 2, cx, cy, BIRD_W / 2);
  bodyGrad.addColorStop(0, '#d97706');
  bodyGrad.addColorStop(0.5, '#b45309');
  bodyGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#6b280a';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Wing
  ctx.save();
  if (wingUp) {
    const wGrad = ctx.createLinearGradient(cx - 14, y - 10, cx + 10, y + 2);
    wGrad.addColorStop(0, '#b45309');
    wGrad.addColorStop(1, '#78350f');
    ctx.fillStyle = wGrad;
    ctx.beginPath();
    ctx.ellipse(cx - 2, y - 3, 13, 7, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#6b280a';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  } else {
    const wGrad = ctx.createLinearGradient(cx - 14, cy, cx + 10, y + BIRD_H + 4);
    wGrad.addColorStop(0, '#b45309');
    wGrad.addColorStop(1, '#78350f');
    ctx.fillStyle = wGrad;
    ctx.beginPath();
    ctx.ellipse(cx - 2, y + BIRD_H - 1, 13, 6, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#6b280a';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
  ctx.restore();

  // Pale facial disk
  ctx.fillStyle = '#fef3c7';
  ctx.beginPath();
  ctx.ellipse(x + BIRD_W - 10, cy - 1, 11, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Ear tufts (two dark pointed bits above head)
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.moveTo(x + BIRD_W - 16, y + 2);
  ctx.lineTo(x + BIRD_W - 19, y - 7);
  ctx.lineTo(x + BIRD_W - 13, y + 1);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + BIRD_W - 9, y + 2);
  ctx.lineTo(x + BIRD_W - 9, y - 7);
  ctx.lineTo(x + BIRD_W - 5, y + 1);
  ctx.closePath();
  ctx.fill();

  // Left eye (further from beak)
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 14, y + 8, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 14, y + 8, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 13, y + 7, 1, 0, Math.PI * 2);
  ctx.fill();

  // Right eye (closer to beak)
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 7, y + 8, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 7, y + 8, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 6, y + 7, 1, 0, Math.PI * 2);
  ctx.fill();

  // Small hooked beak (between the two eyes)
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.moveTo(x + BIRD_W - 1, y + 12);
  ctx.quadraticCurveTo(x + BIRD_W + 5, y + 13, x + BIRD_W + 4, y + 16);
  ctx.lineTo(x + BIRD_W - 1, y + 16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 0.6;
  ctx.stroke();

  ctx.restore();
};
