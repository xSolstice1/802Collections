// Eurasian Magpie — black/white contrast, long iridescent tail
import { BIRD_W, BIRD_H } from '../constants';

export const drawBirdMagpie = (
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

  // Long iridescent tail
  const tailGrad = ctx.createLinearGradient(x - 14, cy, x - 2, cy);
  tailGrad.addColorStop(0, '#0d5c3a');
  tailGrad.addColorStop(0.4, '#1a4a6a');
  tailGrad.addColorStop(1, '#1a1a2a');
  ctx.fillStyle = tailGrad;
  ctx.beginPath();
  ctx.moveTo(x - 2, cy - 3);
  ctx.lineTo(x - 18, cy - 7);
  ctx.lineTo(x - 14, cy);
  ctx.lineTo(x - 18, cy + 5);
  ctx.lineTo(x - 2, cy + 3);
  ctx.closePath();
  ctx.fill();

  // White belly (lower body)
  ctx.fillStyle = '#f0f0f0';
  ctx.beginPath();
  ctx.ellipse(cx + 2, cy + 3, BIRD_W / 2 - 2, BIRD_H / 2 - 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Black upper body
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.ellipse(cx, cy, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // White scapular patch on lower body
  ctx.fillStyle = '#f0f0f0';
  ctx.beginPath();
  ctx.ellipse(cx - 4, cy + 4, 11, 6, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Body outline
  ctx.strokeStyle = '#0a0a0a';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(cx, cy, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Wing
  ctx.save();
  if (wingUp) {
    const wGrad = ctx.createLinearGradient(cx - 14, y - 10, cx + 10, y + 2);
    wGrad.addColorStop(0, '#1a3a5a');
    wGrad.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = wGrad;
    ctx.beginPath();
    ctx.ellipse(cx - 2, y - 3, 13, 7, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0a0a0a';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  } else {
    const wGrad = ctx.createLinearGradient(cx - 14, cy, cx + 10, y + BIRD_H + 4);
    wGrad.addColorStop(0, '#0d4a6a');
    wGrad.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = wGrad;
    ctx.beginPath();
    ctx.ellipse(cx - 2, y + BIRD_H - 1, 13, 6, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0a0a0a';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
  ctx.restore();

  // Black head
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.ellipse(x + BIRD_W - 8, y + 8, 10, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eye — white sclera, black pupil
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 8, y + 8, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0a0a0a';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 6, y + 8, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 5.5, y + 7, 1, 0, Math.PI * 2);
  ctx.fill();

  // Beak — black, shorter & pointed
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.moveTo(x + BIRD_W - 1, y + 10);
  ctx.quadraticCurveTo(x + BIRD_W + 8, y + 12, x + BIRD_W + 7, y + 14);
  ctx.lineTo(x + BIRD_W - 1, y + 15);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 0.5;
  ctx.stroke();

  ctx.restore();
};
