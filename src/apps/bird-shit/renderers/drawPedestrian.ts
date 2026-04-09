import { PED_W, PED_H } from '../constants';
import type { Pedestrian } from '../types';

export const drawPedestrian = (ctx: CanvasRenderingContext2D, p: Pedestrian) => {
  ctx.save();
  const cx = p.x + PED_W / 2;
  const legOffset = Math.sin(p.x * 0.1) * 3;

  // Poop splat on head if hit
  if (p.hit) {
    ctx.fillStyle = '#6b3a0a';
    ctx.beginPath();
    ctx.ellipse(cx, p.y - 1, 9, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#854d0e';
    ctx.beginPath();
    ctx.ellipse(cx, p.y - 2, 7, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    // Drip
    ctx.fillStyle = '#854d0e';
    ctx.beginPath();
    ctx.ellipse(cx + 5, p.y + 5, 2, 4, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#a16207';
    ctx.beginPath();
    ctx.ellipse(cx, p.y - 3, 3, 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Shadow on ground
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(cx, p.y + PED_H + 1, 8, 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs with shoes
  ctx.strokeStyle = p.hit ? '#555' : '#4b5563';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(p.x + 7, p.y + 26);
  ctx.lineTo(p.x + 5 + legOffset, p.y + PED_H - 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(p.x + 13, p.y + 26);
  ctx.lineTo(p.x + 15 - legOffset, p.y + PED_H - 2);
  ctx.stroke();
  // Shoes
  ctx.fillStyle = p.hit ? '#444' : '#374151';
  ctx.beginPath();
  ctx.ellipse(p.x + 5 + legOffset, p.y + PED_H - 1, 3, 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(p.x + 15 - legOffset, p.y + PED_H - 1, 3, 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body (torso with gradient)
  const torsoGrad = ctx.createLinearGradient(p.x + 3, p.y + 12, p.x + 17, p.y + 27);
  if (p.hit) {
    torsoGrad.addColorStop(0, '#555');
    torsoGrad.addColorStop(1, '#444');
  } else {
    torsoGrad.addColorStop(0, '#60a5fa');
    torsoGrad.addColorStop(1, '#3b82f6');
  }
  ctx.fillStyle = torsoGrad;
  ctx.beginPath();
  ctx.moveTo(p.x + 4, p.y + 14);
  ctx.quadraticCurveTo(p.x + 3, p.y + 12, p.x + 6, p.y + 12);
  ctx.lineTo(p.x + 14, p.y + 12);
  ctx.quadraticCurveTo(p.x + 17, p.y + 12, p.x + 16, p.y + 14);
  ctx.lineTo(p.x + 16, p.y + 26);
  ctx.lineTo(p.x + 4, p.y + 26);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = p.hit ? '#333' : '#2563eb';
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Arms
  ctx.strokeStyle = p.hit ? '#888' : '#e5c9a8';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  const armSwing = Math.sin(p.x * 0.1) * 4;
  ctx.beginPath();
  ctx.moveTo(p.x + 4, p.y + 15);
  ctx.lineTo(p.x + 1, p.y + 22 + armSwing);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(p.x + 16, p.y + 15);
  ctx.lineTo(p.x + 19, p.y + 22 - armSwing);
  ctx.stroke();

  // Head with skin tone
  const headGrad = ctx.createRadialGradient(cx - 1, p.y + 5, 1, cx, p.y + 6, 7);
  if (p.hit) {
    headGrad.addColorStop(0, '#aaa');
    headGrad.addColorStop(1, '#888');
  } else {
    headGrad.addColorStop(0, '#fcd9b6');
    headGrad.addColorStop(1, '#e5c9a8');
  }
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.arc(cx, p.y + 6, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = p.hit ? '#666' : '#c9a87c';
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Hair
  ctx.fillStyle = p.hit ? '#555' : '#4a3728';
  ctx.beginPath();
  ctx.arc(cx, p.y + 4, 6, Math.PI, Math.PI * 2);
  ctx.fill();

  // Eyes (different expression when hit)
  if (p.hit) {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 4, p.y + 4);
    ctx.lineTo(cx - 2, p.y + 6);
    ctx.moveTo(cx - 2, p.y + 4);
    ctx.lineTo(cx - 4, p.y + 6);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 2, p.y + 4);
    ctx.lineTo(cx + 4, p.y + 6);
    ctx.moveTo(cx + 4, p.y + 4);
    ctx.lineTo(cx + 2, p.y + 6);
    ctx.stroke();
    // Frown
    ctx.beginPath();
    ctx.arc(cx, p.y + 11, 2, Math.PI, 0);
    ctx.stroke();
  } else {
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(cx - 2.5, p.y + 5.5, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 2.5, p.y + 5.5, 1, 0, Math.PI * 2);
    ctx.fill();
    // Smile
    ctx.strokeStyle = '#a0845e';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.arc(cx, p.y + 7, 2, 0.1, Math.PI - 0.1);
    ctx.stroke();
  }

  ctx.restore();
};
