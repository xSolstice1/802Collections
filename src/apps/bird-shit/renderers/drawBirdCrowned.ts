// Cockatiel — grey body, yellow face, orange cheek spot, erect yellow crest
import { BIRD_W, BIRD_H } from '../constants';

export const drawBirdCrowned = (
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

  // Tail feathers (dark grey)
  ctx.fillStyle = '#6b7280';
  ctx.beginPath();
  ctx.moveTo(x - 2, cy - 2);
  ctx.lineTo(x - 12, cy - 5);
  ctx.lineTo(x - 10, cy);
  ctx.lineTo(x - 12, cy + 4);
  ctx.lineTo(x - 2, cy + 2);
  ctx.closePath();
  ctx.fill();

  // Body shadow
  ctx.fillStyle = '#4b5563';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 2, BIRD_W / 2 - 1, BIRD_H / 2 - 1, 0, 0, Math.PI * 2);
  ctx.fill();

  // Main grey body
  const bodyGrad = ctx.createRadialGradient(cx - 3, cy - 3, 2, cx, cy, BIRD_W / 2);
  bodyGrad.addColorStop(0, '#9ca3af');
  bodyGrad.addColorStop(0.6, '#6b7280');
  bodyGrad.addColorStop(1, '#4b5563');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(cx, cy, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Yellow face patch
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.ellipse(x + BIRD_W - 10, cy - 1, 9, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Orange cheek spot
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.ellipse(x + BIRD_W - 9, cy + 2, 4, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Wing (grey)
  ctx.save();
  if (wingUp) {
    const wGrad = ctx.createLinearGradient(cx - 14, y - 10, cx + 10, y + 2);
    wGrad.addColorStop(0, '#9ca3af');
    wGrad.addColorStop(1, '#4b5563');
    ctx.fillStyle = wGrad;
    ctx.beginPath();
    ctx.ellipse(cx - 2, y - 3, 13, 7, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  } else {
    const wGrad = ctx.createLinearGradient(cx - 14, cy, cx + 10, y + BIRD_H + 4);
    wGrad.addColorStop(0, '#9ca3af');
    wGrad.addColorStop(1, '#4b5563');
    ctx.fillStyle = wGrad;
    ctx.beginPath();
    ctx.ellipse(cx - 2, y + BIRD_H - 1, 13, 6, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
  ctx.restore();

  // Erect yellow crest feathers
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = i < 2 ? '#fde047' : '#facc15';
    const startX = x + BIRD_W - 16 + i * 3.5;
    ctx.beginPath();
    ctx.moveTo(startX, y + 4);
    ctx.quadraticCurveTo(startX - 2 + i, y - 7 - i * 1.5, startX + 1, y - 10 - i * 2);
    ctx.stroke();
  }

  // Eye
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 9, y + 7, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 7, y + 7, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x + BIRD_W - 6.5, y + 6, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // Short hooked beak (dark grey)
  ctx.fillStyle = '#374151';
  ctx.beginPath();
  ctx.moveTo(x + BIRD_W - 1, y + 9);
  ctx.quadraticCurveTo(x + BIRD_W + 7, y + 11, x + BIRD_W + 5, y + 14);
  ctx.lineTo(x + BIRD_W - 1, y + 14);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 0.6;
  ctx.stroke();

  ctx.restore();
};
