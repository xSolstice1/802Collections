import type { Upgrades, UpgradeDef } from './types';
import { BASE_POOP_SPEED, BASE_POOP_W, BASE_POOP_H, BASE_BIRD_SPEED } from './constants';

export const DEFAULT_UPGRADES: Upgrades = {
  poopSpeed: 0,
  poopSize: 0,
  birdSpeed: 0,
  extraLife: 0,
  splitPoop: 0,
  homingPoop: 0,
  damage: 0,
  coinBonus: 0,
  toxicPoop: 0,
  scatterBomb: 0,
  featherShield: 0,
  goldenGut: 0,
  stormGut: 0,
};

export const UPGRADE_DEFS: UpgradeDef[] = [
  { key: 'poopSpeed', name: 'Poop Speed', desc: ['Faster poop', 'Even faster', 'Maximum velocity'], maxLevel: 3, costs: [5, 10, 18] },
  { key: 'poopSize', name: 'Poop Size', desc: ['Bigger poop', 'Huge poop', 'Mega poop'], maxLevel: 3, costs: [5, 10, 18] },
  { key: 'birdSpeed', name: 'Bird Speed', desc: ['Faster flight', 'Swift bird', 'Lightning bird'], maxLevel: 3, costs: [4, 8, 14] },
  { key: 'extraLife', name: 'Extra Life', desc: ['+1 HP', '+1 HP', '+1 HP', '+1 HP', '+1 HP'], maxLevel: 5, costs: [8, 12, 18, 25, 35] },
  { key: 'splitPoop', name: 'Split Poop', desc: ['Double drop', 'Triple drop'], maxLevel: 2, costs: [15, 28] },
  { key: 'homingPoop', name: 'Homing Poop', desc: ['Weak tracking', 'Strong tracking'], maxLevel: 2, costs: [18, 32] },
];

// All speed values in px/s
export const getPoopSpeed = (upgrades: Upgrades) => BASE_POOP_SPEED + upgrades.poopSpeed * 60;
export const getPoopW = (upgrades: Upgrades) => BASE_POOP_W + upgrades.poopSize * 3;
export const getPoopH = (upgrades: Upgrades) => BASE_POOP_H + upgrades.poopSize * 2;
export const getBirdSpeed = (upgrades: Upgrades) => BASE_BIRD_SPEED + upgrades.birdSpeed * 36;
export const getHomingStrength = (upgrades: Upgrades) =>
  upgrades.homingPoop === 0 ? 0 : upgrades.homingPoop === 1 ? 24 : 54;
export const getPoopDamage = (upgrades: Upgrades) => 1 + upgrades.damage;
