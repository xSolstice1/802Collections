import { CANVAS_W, CANVAS_H } from '../constants';
import { UPGRADE_DEFS } from '../upgrades';
import type { GameData } from '../types';

export const drawHeart = (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) => {
  ctx.save();
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(cx, cy + size * 0.3);
  ctx.bezierCurveTo(cx, cy - size * 0.3, cx - size, cy - size * 0.3, cx - size, cy + size * 0.1);
  ctx.bezierCurveTo(cx - size, cy + size * 0.6, cx, cy + size, cx, cy + size);
  ctx.bezierCurveTo(cx, cy + size, cx + size, cy + size * 0.6, cx + size, cy + size * 0.1);
  ctx.bezierCurveTo(cx + size, cy - size * 0.3, cx, cy - size * 0.3, cx, cy + size * 0.3);
  ctx.fill();
  ctx.restore();
};

export const drawCoin = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
  ctx.save();
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#b45309';
  ctx.font = `bold ${r}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('$', cx, cy + 1);
  ctx.restore();
};

export const drawUpgradeScreen = (ctx: CanvasRenderingContext2D, g: GameData) => {
  // Dark background
  const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
  skyGrad.addColorStop(0, '#0a0a0a');
  skyGrad.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Border glow
  ctx.strokeStyle = '#44D62C';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 10, CANVAS_W - 40, CANVAS_H - 20);

  // Header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 28px Inter, sans-serif';
  ctx.fillText(`LEVEL ${g.level} COMPLETE!`, CANVAS_W / 2, 48);

  // Coins display
  drawCoin(ctx, CANVAS_W / 2 - 50, 72, 8);
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`${g.coins} coins`, CANVAS_W / 2 - 38, 77);

  // Upgrades grid (2 columns, 3 rows)
  const startX = 50;
  const startY = 100;
  const colW = 360;
  const rowH = 80;

  for (let i = 0; i < UPGRADE_DEFS.length; i++) {
    const def = UPGRADE_DEFS[i];
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * colW;
    const y = startY + row * rowH;
    const currentLevel = g.upgrades[def.key];
    const isMaxed = currentLevel >= def.maxLevel;
    const cost = isMaxed ? 0 : def.costs[currentLevel];
    const canAfford = !isMaxed && g.coins >= cost;

    // Background box
    ctx.fillStyle = canAfford ? 'rgba(68, 214, 44, 0.08)' : 'rgba(255,255,255,0.03)';
    ctx.strokeStyle = canAfford ? '#44D62C' : '#374151';
    ctx.lineWidth = 1;
    const boxW = colW - 20;
    const boxH = rowH - 12;
    ctx.fillRect(x, y, boxW, boxH);
    ctx.strokeRect(x, y, boxW, boxH);

    // Key number
    ctx.fillStyle = canAfford ? '#44D62C' : '#4b5563';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`[${i + 1}]`, x + 22, y + 28);

    // Name
    ctx.fillStyle = isMaxed ? '#6b7280' : '#e5e7eb';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(def.name, x + 44, y + 22);

    // Level pips
    for (let j = 0; j < def.maxLevel; j++) {
      ctx.fillStyle = j < currentLevel ? '#44D62C' : '#374151';
      ctx.fillRect(x + 44 + j * 16, y + 30, 12, 4);
    }

    // Description or MAXED
    ctx.font = '12px Inter, sans-serif';
    if (isMaxed) {
      ctx.fillStyle = '#6b7280';
      ctx.fillText('MAXED', x + 44, y + 54);
    } else {
      ctx.fillStyle = '#9ca3af';
      ctx.fillText(def.desc[currentLevel], x + 44, y + 54);
      // Cost
      drawCoin(ctx, x + boxW - 50, y + 26, 6);
      ctx.fillStyle = canAfford ? '#fbbf24' : '#6b7280';
      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${cost}`, x + boxW - 12, y + 30);
    }
  }

  // Hint
  ctx.textAlign = 'center';
  ctx.font = '12px Inter, sans-serif';
  ctx.fillStyle = '#6b7280';
  ctx.fillText('Press 1-6 or click to buy upgrades', CANVAS_W / 2, CANVAS_H - 12);
};
