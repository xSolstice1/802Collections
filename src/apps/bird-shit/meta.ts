const META_STORAGE_KEY = 'birdshit-meta';

export interface MetaUpgrade {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  costs: number[];
}

export const META_UPGRADES: MetaUpgrade[] = [
  {
    id: 'meta_speed',
    name: 'Aerodynamics',
    description: '+5% base speed per level',
    maxLevel: 3,
    costs: [50, 100, 200],
  },
  {
    id: 'meta_hp',
    name: 'Thick Feathers',
    description: '+1 starting life',
    maxLevel: 2,
    costs: [75, 150],
  },
  {
    id: 'meta_coins',
    name: 'Keen Eye',
    description: '+10% coin multiplier',
    maxLevel: 3,
    costs: [40, 80, 160],
  },
];

export interface MetaState {
  currency: number;
  upgrades: Record<string, number>; // upgrade id → level
}

export function loadMeta(): MetaState {
  try {
    const raw = localStorage.getItem(META_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* corrupted data */ }
  return { currency: 0, upgrades: {} };
}

export function saveMeta(state: MetaState) {
  localStorage.setItem(META_STORAGE_KEY, JSON.stringify(state));
}

export function earnMetaCurrency(runScore: number, state: MetaState): MetaState {
  const earned = Math.floor(runScore / 50);
  return { ...state, currency: state.currency + earned };
}

export function buyMetaUpgrade(id: string, state: MetaState): MetaState | null {
  const def = META_UPGRADES.find((u) => u.id === id);
  if (!def) return null;
  const currentLevel = state.upgrades[id] ?? 0;
  if (currentLevel >= def.maxLevel) return null;
  const cost = def.costs[currentLevel];
  if (state.currency < cost) return null;

  return {
    currency: state.currency - cost,
    upgrades: { ...state.upgrades, [id]: currentLevel + 1 },
  };
}

/** Get starting stat bonuses from meta upgrades */
export function getMetaBonuses(state: MetaState) {
  const speedLevel = state.upgrades['meta_speed'] ?? 0;
  const hpLevel = state.upgrades['meta_hp'] ?? 0;
  const coinsLevel = state.upgrades['meta_coins'] ?? 0;

  return {
    speedMultiplier: 1 + speedLevel * 0.05,
    extraLives: hpLevel,
    coinMultiplier: 1 + coinsLevel * 0.1,
  };
}
