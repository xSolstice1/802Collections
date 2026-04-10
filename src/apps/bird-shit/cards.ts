import type { GameData } from './types';

export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface UpgradeCard {
  id: string;
  name: string;
  description: string;
  rarity: CardRarity;
  icon: string;
  maxStacks: number;
  apply: (g: GameData, stacks: number) => void;
}

export const RARITY_COLORS: Record<CardRarity, string> = {
  common: '#9ca3af',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#fbbf24',
};

export const RARITY_BG: Record<CardRarity, string> = {
  common: 'rgba(156,163,175,0.1)',
  rare: 'rgba(59,130,246,0.1)',
  epic: 'rgba(168,85,247,0.1)',
  legendary: 'rgba(251,191,36,0.15)',
};

const RARITY_WEIGHTS: Record<CardRarity, number> = {
  common: 60,
  rare: 25,
  epic: 12,
  legendary: 3,
};

export const CARD_POOL: UpgradeCard[] = [
  // ── Common ──
  {
    id: 'swift_droppings', name: 'Swift Droppings', description: '+15% poop speed',
    rarity: 'common', icon: '💨', maxStacks: 3,
    apply: (g) => { g.upgrades.poopSpeed++; },
  },
  {
    id: 'bigger_load', name: 'Bigger Load', description: '+20% poop size',
    rarity: 'common', icon: '💩', maxStacks: 3,
    apply: (g) => { g.upgrades.poopSize++; },
  },
  {
    id: 'tailwind', name: 'Tailwind', description: '+12% bird speed',
    rarity: 'common', icon: '🌬️', maxStacks: 3,
    apply: (g) => { g.upgrades.birdSpeed++; },
  },
  {
    id: 'extra_plumage', name: 'Extra Plumage', description: '+1 life',
    rarity: 'common', icon: '❤️', maxStacks: 5,
    apply: (g) => { g.lives++; },
  },
  {
    id: 'shiny_finder', name: 'Shiny Finder', description: '+1 coin per hit',
    rarity: 'common', icon: '🪙', maxStacks: 3,
    apply: (g) => { g.upgrades.coinBonus = (g.upgrades.coinBonus ?? 0) + 1; },
  },

  // ── Rare ──
  {
    id: 'split_shot', name: 'Split Shot', description: 'Poop splits into +1 projectile',
    rarity: 'rare', icon: '🔀', maxStacks: 2,
    apply: (g) => { g.upgrades.splitPoop++; },
  },
  {
    id: 'homing_droppings', name: 'Homing Droppings', description: 'Poop tracks nearest target',
    rarity: 'rare', icon: '🎯', maxStacks: 2,
    apply: (g) => { g.upgrades.homingPoop++; },
  },
  {
    id: 'toxic_poop', name: 'Toxic Poop', description: 'Poop leaves damaging puddle',
    rarity: 'rare', icon: '☠️', maxStacks: 2,
    apply: (g) => { g.upgrades.toxicPoop = (g.upgrades.toxicPoop ?? 0) + 1; },
  },

  // ── Epic ──
  {
    id: 'scatter_bomb', name: 'Scatter Bomb', description: 'Poop explodes on impact (AoE)',
    rarity: 'epic', icon: '💥', maxStacks: 1,
    apply: (g) => { g.upgrades.scatterBomb = 1; },
  },
  {
    id: 'feather_shield', name: 'Feather Shield', description: 'Block 1 hit every 15s',
    rarity: 'epic', icon: '🛡️', maxStacks: 1,
    apply: (g) => { g.upgrades.featherShield = 1; },
  },

  // ── Legendary ──
  {
    id: 'golden_gut', name: 'Golden Digestive System', description: 'Droppings leave damaging ground trails',
    rarity: 'legendary', icon: '✨', maxStacks: 1,
    apply: (g) => { g.upgrades.goldenGut = 1; },
  },
  {
    id: 'storm_gut', name: 'Storm Gut', description: 'Hits chain lightning to nearby enemies',
    rarity: 'legendary', icon: '⚡', maxStacks: 1,
    apply: (g) => { g.upgrades.stormGut = 1; },
  },
];

/**
 * Roll `count` random upgrade cards from the pool.
 * Weighted by rarity. Respects maxStacks based on current pickedCards.
 */
export function rollCards(
  pickedCards: Map<string, number>,
  count: number,
): UpgradeCard[] {
  // Filter out maxed cards
  const available = CARD_POOL.filter((card) => {
    const picked = pickedCards.get(card.id) ?? 0;
    return picked < card.maxStacks;
  });

  if (available.length === 0) return [];

  // Build weighted pool
  const weighted: { card: UpgradeCard; weight: number }[] = available.map((card) => ({
    card,
    weight: RARITY_WEIGHTS[card.rarity],
  }));
  const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);

  const result: UpgradeCard[] = [];
  const used = new Set<string>();

  for (let n = 0; n < count && weighted.length > 0; n++) {
    let roll = Math.random() * totalWeight;
    let picked: UpgradeCard | null = null;
    for (const w of weighted) {
      if (used.has(w.card.id)) continue;
      roll -= w.weight;
      if (roll <= 0) {
        picked = w.card;
        break;
      }
    }
    // Fallback: pick first unused
    if (!picked) {
      for (const w of weighted) {
        if (!used.has(w.card.id)) { picked = w.card; break; }
      }
    }
    if (picked) {
      result.push(picked);
      used.add(picked.id);
    }
  }

  return result;
}
