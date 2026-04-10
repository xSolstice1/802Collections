// Building obstacle — rises from ground, scrolls left
import { GROUND_Y } from '../constants';
import type { Obstacle } from '../types';

export const drawObstacle = (ctx: CanvasRenderingContext2D, o: Obstacle) => {
  ctx.save();

  const { x, y, w, h } = o; // y = GROUND_Y - h (top of building)

  // Body gradient (dark charcoal)
  const bodyGrad = ctx.createLinearGradient(x, y, x + w, y);
  bodyGrad.addColorStop(0, '#1f2937');
  bodyGrad.addColorStop(0.5, '#374151');
  bodyGrad.addColorStop(1, '#1f2937');
  ctx.fillStyle = bodyGrad;
  ctx.fillRect(x, y, w, h);

  // Roof strip (slightly lighter)
  ctx.fillStyle = '#4b5563';
  ctx.fillRect(x, y, w, 4);

  // Left edge shadow
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(x, y, 3, h);

  // Windows — 3 columns, rows spaced every 14px
  const winW = 6;
  const winH = 7;
  const colX = [x + 6, x + 18, x + 30];
  const rowSpacing = 14;
  const firstRow = y + 10;

  for (let row = 0; firstRow + row * rowSpacing + winH < GROUND_Y - 4; row++) {
    const wy = firstRow + row * rowSpacing;
    for (let col = 0; col < 3; col++) {
      // Stagger lit/unlit windows using windowOffset as a seed
      const lit = ((row * 3 + col + o.windowOffset) % 5) !== 0;
      ctx.fillStyle = lit ? 'rgba(255,220,100,0.75)' : 'rgba(30,40,55,0.9)';
      ctx.fillRect(colX[col], wy, winW, winH);
    }
  }

  // Outline
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, h);

  // Antenna on taller buildings (h > 120)
  if (h > 120) {
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w / 2, y - 14);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(x + w / 2, y - 15, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
};
