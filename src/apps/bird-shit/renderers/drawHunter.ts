import { HUNTER_W, HUNTER_H } from '../constants';
import type { Hunter } from '../types';

export const drawHunter = (ctx: CanvasRenderingContext2D, h: Hunter) => {
  ctx.save();
  const cx = h.x + HUNTER_W / 2;
  const legOffset = Math.sin(h.x * 0.08) * 3;

  // Shadow on ground
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.ellipse(cx, h.y + HUNTER_H + 1, 10, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs with boots
  ctx.strokeStyle = '#4a3728';
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(h.x + 8, h.y + 29);
  ctx.lineTo(h.x + 6 + legOffset, h.y + HUNTER_H - 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(h.x + 16, h.y + 29);
  ctx.lineTo(h.x + 18 - legOffset, h.y + HUNTER_H - 2);
  ctx.stroke();
  // Heavy boots
  ctx.fillStyle = '#3a2a1a';
  ctx.beginPath();
  ctx.ellipse(h.x + 6 + legOffset, h.y + HUNTER_H - 1, 4, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(h.x + 18 - legOffset, h.y + HUNTER_H - 1, 4, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Vest / torso with gradient
  const vestGrad = ctx.createLinearGradient(h.x + 3, h.y + 13, h.x + 21, h.y + 30);
  vestGrad.addColorStop(0, '#8b4513');
  vestGrad.addColorStop(0.5, '#6b3410');
  vestGrad.addColorStop(1, '#5a2d0e');
  ctx.fillStyle = vestGrad;
  ctx.beginPath();
  ctx.moveTo(h.x + 4, h.y + 13);
  ctx.lineTo(h.x + 20, h.y + 13);
  ctx.lineTo(h.x + 20, h.y + 30);
  ctx.lineTo(h.x + 4, h.y + 30);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#4a2508';
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Vest pockets
  ctx.strokeStyle = '#4a2508';
  ctx.lineWidth = 0.5;
  ctx.strokeRect(h.x + 6, h.y + 20, 5, 4);
  ctx.strokeRect(h.x + 13, h.y + 20, 5, 4);

  // Ammo belt
  ctx.fillStyle = '#654321';
  ctx.fillRect(h.x + 3, h.y + 17, 18, 3);
  ctx.fillStyle = '#fbbf24';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(h.x + 5 + i * 4, h.y + 17.5, 2, 2);
  }

  // Gun arm (back arm with rifle)
  ctx.strokeStyle = '#8b7355';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx + 2, h.y + 16);
  ctx.lineTo(cx + 12, h.y + 6);
  ctx.stroke();

  // Rifle
  ctx.fillStyle = '#5a4a3a';
  ctx.save();
  ctx.translate(cx + 12, h.y + 6);
  ctx.rotate(-0.8);
  ctx.fillRect(-2, -12, 3, 16);
  // Rifle barrel
  ctx.fillStyle = '#6b7280';
  ctx.fillRect(-1.5, -18, 2, 8);
  // Rifle stock
  ctx.fillStyle = '#4a3a2a';
  ctx.fillRect(-2.5, 2, 4, 5);
  ctx.restore();

  // Front arm
  ctx.strokeStyle = '#e5c9a8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(h.x + 6, h.y + 16);
  ctx.lineTo(h.x + 2, h.y + 24);
  ctx.stroke();

  // Head with skin
  const headGrad = ctx.createRadialGradient(cx - 1, h.y + 5, 1, cx, h.y + 6, 8);
  headGrad.addColorStop(0, '#f0d0a8');
  headGrad.addColorStop(1, '#d4aa78');
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.arc(cx, h.y + 6, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#b8956a';
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Hat (safari/hunter hat with brim)
  ctx.fillStyle = '#5a4a2a';
  // Brim
  ctx.beginPath();
  ctx.ellipse(cx, h.y - 2, 13, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  // Crown
  ctx.fillStyle = '#6b5a3a';
  ctx.beginPath();
  ctx.moveTo(h.x + 4, h.y - 2);
  ctx.quadraticCurveTo(cx, h.y - 14, h.x + HUNTER_W - 4, h.y - 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#4a3a1a';
  ctx.lineWidth = 0.6;
  ctx.stroke();
  // Hat band
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(h.x + 5, h.y - 4, HUNTER_W - 10, 2);

  // Angry eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(cx - 3, h.y + 5, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + 3, h.y + 5, 2.5, 0, Math.PI * 2);
  ctx.fill();
  // Pupils
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(cx - 2.5, h.y + 5.5, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + 3.5, h.y + 5.5, 1.2, 0, Math.PI * 2);
  ctx.fill();
  // Angry eyebrows
  ctx.strokeStyle = '#4a3728';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 5, h.y + 1);
  ctx.lineTo(cx - 1, h.y + 2.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + 5, h.y + 1);
  ctx.lineTo(cx + 1, h.y + 2.5);
  ctx.stroke();
  // Grim mouth
  ctx.strokeStyle = '#8b6a4a';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 3, h.y + 10);
  ctx.lineTo(cx + 3, h.y + 10);
  ctx.stroke();

  // Stubble dots
  ctx.fillStyle = 'rgba(74,55,40,0.3)';
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(cx - 3 + i * 1.5, h.y + 11 + (i % 2) * 0.5, 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
};
