// Classic green parakeet
import { BIRD_W, BIRD_H } from '../constants';

export const drawBird = (
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

  // Main body
  const bodyGrad = ctx.createRadialGradient(cx - 3, cy - 3, 2, cx, cy, BIRD_W / 2);
  bodyGrad.addColorStop(0, '#6ef54e');
  bodyGrad.addColorStop(0.6, '#44D62C');
  bodyGrad.addColorStop(1, '#2d9e1a');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#1e7a12';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Belly highlight
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.beginPath();
  ctx.ellipse(cx + 2, cy + 4, 10, 6, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Wing
  ctx.save();
  if (wingUp) {
    const wGrad = ctx.createLinearGradient(cx - 14, y - 10, cx + 10, y + 2);
    wGrad.addColorStop(0, '#37ad24');
    wGrad.addColorStop(1, '#2d8a1e');
    ctx.fillStyle = wGrad;
    ctx.beginPath();
    ctx.ellipse(cx - 2, y - 3, 13, 7, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1e7a12';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(30,122,18,0.4)';
    ctx.lineWidth = 0.6;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(cx - 10 + i * 5, y - 7 + i);
      ctx.lineTo(cx - 4 + i * 4, y + 1);
      ctx.stroke();
    }
  } else {
    const wGrad = ctx.createLinearGradient(cx - 14, cy, cx + 10, y + BIRD_H + 4);
    wGrad.addColorStop(0, '#37ad24');
    wGrad.addColorStop(1, '#2d8a1e');
    ctx.fillStyle = wGrad;
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

  // Eye
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
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 6, y + 8, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 5.5, y + 7, 1, 0, Math.PI * 2);
  ctx.fill();

  // Beak
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
  ctx.beginPath();
  ctx.moveTo(x + BIRD_W - 1, y + 13);
  ctx.lineTo(x + BIRD_W + 8, y + 13);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255,130,130,0.2)';
  ctx.beginPath();
  ctx.ellipse(x + BIRD_W - 4, y + 14, 3, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};
