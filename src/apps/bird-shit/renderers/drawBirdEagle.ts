// Bald Eagle — dark brown body, white head & tail, large hooked yellow beak
import { BIRD_W, BIRD_H } from '../constants';

export const drawBirdEagle = (
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

  // White tail (bald eagle's signature white tail)
  ctx.fillStyle = '#f0f0f0';
  ctx.beginPath();
  ctx.moveTo(x - 2, cy - 2);
  ctx.lineTo(x - 13, cy - 4);
  ctx.lineTo(x - 11, cy);
  ctx.lineTo(x - 13, cy + 4);
  ctx.lineTo(x - 2, cy + 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#d1d5db';
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // Dark brown body shadow
  ctx.fillStyle = '#431407';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 2, BIRD_W / 2 - 1, BIRD_H / 2 - 1, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dark brown main body
  const bodyGrad = ctx.createRadialGradient(cx - 3, cy - 3, 2, cx, cy, BIRD_W / 2);
  bodyGrad.addColorStop(0, '#92400e');
  bodyGrad.addColorStop(0.6, '#78350f');
  bodyGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#3b1108';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Wing
  ctx.save();
  if (wingUp) {
    const wGrad = ctx.createLinearGradient(cx - 14, y - 10, cx + 10, y + 2);
    wGrad.addColorStop(0, '#92400e');
    wGrad.addColorStop(1, '#451a03');
    ctx.fillStyle = wGrad;
    ctx.beginPath();
    ctx.ellipse(cx - 2, y - 3, 13, 7, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3b1108';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 0.6;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(cx - 10 + i * 5, y - 7 + i);
      ctx.lineTo(cx - 4 + i * 4, y + 1);
      ctx.stroke();
    }
  } else {
    const wGrad = ctx.createLinearGradient(cx - 14, cy, cx + 10, y + BIRD_H + 4);
    wGrad.addColorStop(0, '#92400e');
    wGrad.addColorStop(1, '#451a03');
    ctx.fillStyle = wGrad;
    ctx.beginPath();
    ctx.ellipse(cx - 2, y + BIRD_H - 1, 13, 6, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3b1108';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
  ctx.restore();

  // White head (the iconic bald eagle feature)
  ctx.fillStyle = '#f9fafb';
  ctx.beginPath();
  ctx.ellipse(x + BIRD_W - 9, y + 8, 10, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eye (bright amber/yellow)
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 8, y + 8, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 6.5, y + 8, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 6, y + 7, 1, 0, Math.PI * 2);
  ctx.fill();

  // Large hooked yellow beak
  const beakGrad = ctx.createLinearGradient(x + BIRD_W, y + 9, x + BIRD_W + 11, y + 17);
  beakGrad.addColorStop(0, '#fbbf24');
  beakGrad.addColorStop(1, '#d97706');
  ctx.fillStyle = beakGrad;
  ctx.beginPath();
  ctx.moveTo(x + BIRD_W - 1, y + 9);
  ctx.quadraticCurveTo(x + BIRD_W + 12, y + 11, x + BIRD_W + 10, y + 15);
  ctx.quadraticCurveTo(x + BIRD_W + 7, y + 18, x + BIRD_W - 1, y + 16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Dark hook tip
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.arc(x + BIRD_W + 10, y + 15, 2.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};
