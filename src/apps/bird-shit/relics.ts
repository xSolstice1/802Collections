import type { GameData } from './types';

export interface Relic {
  id: string;
  name: string;
  description: string;
  icon: string;
  apply: (g: GameData) => void;
}

export const RELIC_POOL: Relic[] = [
  {
    id: 'golden_gut',
    name: 'Golden Digestive System',
    description: 'Droppings leave damaging ground trails',
    icon: '✨',
    apply: (g) => { g.upgrades.goldenGut = 1; },
  },
  {
    id: 'storm_gut',
    name: 'Storm Gut',
    description: 'Hits chain lightning to nearby enemies',
    icon: '⚡',
    apply: (g) => { g.upgrades.stormGut = 1; },
  },
  {
    id: 'magnetic',
    name: 'Magnetic Droppings',
    description: 'All poop has mild auto-aim',
    icon: '🧲',
    apply: (g) => {
      if (g.upgrades.homingPoop < 1) g.upgrades.homingPoop = 1;
    },
  },
  {
    id: 'iron_feathers',
    name: 'Iron Feathers',
    description: '+3 max lives and heal to full',
    icon: '🪶',
    apply: (g) => { g.lives += 3; },
  },
  {
    id: 'rapid_fire',
    name: 'Rapid Fire Gut',
    description: 'Poop cooldown reduced by 50%',
    icon: '🔥',
    apply: (g) => { g.upgrades.poopSpeed += 2; },
  },
];

/**
 * Roll 2 random relics for selection after boss defeat.
 * Excludes already-held relics.
 */
export function rollRelics(heldRelicIds: string[]): Relic[] {
  const available = RELIC_POOL.filter((r) => !heldRelicIds.includes(r.id));
  if (available.length <= 2) return available;

  const result: Relic[] = [];
  const used = new Set<number>();
  while (result.length < 2) {
    const idx = Math.floor(Math.random() * available.length);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(available[idx]);
    }
  }
  return result;
}
