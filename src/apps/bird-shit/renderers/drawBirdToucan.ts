// Toucan — black body, white bib, massive multicolour bill
import { BIRD_W, BIRD_H } from '../constants';

export const drawBirdToucan = (
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

  // Short black tail
  ctx.fillStyle = '#111';
  ctx.beginPath();
  ctx.moveTo(x - 2, cy - 2);
  ctx.lineTo(x - 10, cy - 5);
  ctx.lineTo(x - 8, cy);
  ctx.lineTo(x - 10, cy + 4);
  ctx.lineTo(x - 2, cy + 2);
  ctx.closePath();
  ctx.fill();

  // Body shadow
  ctx.fillStyle = '#0a0a0a';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 2, BIRD_W / 2 - 1, BIRD_H / 2 - 1, 0, 0, Math.PI * 2);
  ctx.fill();

  // Glossy black body
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.ellipse(cx, cy, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1;
  ctx.stroke();

  // White bib / throat
  ctx.fillStyle = '#f8f8f8';
  ctx.beginPath();
  ctx.ellipse(cx + 4, cy + 1, 10, 9, -0.15, 0, Math.PI * 2);
  ctx.fill();

  // Wing
  ctx.save();
  if (wingUp) {
    const wGrad = ctx.createLinearGradient(cx - 14, y - 10, cx + 10, y + 2);
    wGrad.addColorStop(0, '#2a2a3a');
    wGrad.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = wGrad;
    ctx.beginPath();
    ctx.ellipse(cx - 2, y - 3, 13, 7, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  } else {
    const wGrad = ctx.createLinearGradient(cx - 14, cy, cx + 10, y + BIRD_H + 4);
    wGrad.addColorStop(0, '#2a2a3a');
    wGrad.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = wGrad;
    ctx.beginPath();
    ctx.ellipse(cx - 2, y + BIRD_H - 1, 13, 6, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
  ctx.restore();

  // Eye with blue orbital ring
  ctx.fillStyle = '#93c5fd';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 8, y + 9, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 8, y + 9, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 7, y + 8, 1, 0, Math.PI * 2);
  ctx.fill();

  // Massive multicolour bill
  const billGrad = ctx.createLinearGradient(x + BIRD_W - 2, y + 7, x + BIRD_W + 17, y + 16);
  billGrad.addColorStop(0, '#16a34a');   // green at base
  billGrad.addColorStop(0.3, '#ca8a04'); // yellow
  billGrad.addColorStop(0.65, '#ea580c'); // orange
  billGrad.addColorStop(1, '#dc2626');   // red at tip
  ctx.fillStyle = billGrad;
  ctx.beginPath();
  ctx.moveTo(x + BIRD_W - 2, y + 7);
  ctx.quadraticCurveTo(x + BIRD_W + 18, y + 8, x + BIRD_W + 17, y + 14);
  ctx.quadraticCurveTo(x + BIRD_W + 13, y + 18, x + BIRD_W - 2, y + 17);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#065f46';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Bill ridge line
  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(x + BIRD_W - 2, y + 12);
  ctx.quadraticCurveTo(x + BIRD_W + 13, y + 12, x + BIRD_W + 17, y + 14);
  ctx.stroke();

  ctx.restore();
};
