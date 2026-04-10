export type { BossState, BossDefinition } from './types';
export { constructionBoss } from './constructionBoss';
export { sniperHunter } from './sniperHunter';
export { droneSwarm } from './droneSwarm';

import { constructionBoss } from './constructionBoss';
import { sniperHunter } from './sniperHunter';
import { droneSwarm } from './droneSwarm';
import type { BossDefinition } from './types';

// Bosses cycle: level 5 = construction, 10 = sniper, 15 = drones, 20 = construction again...
const BOSS_ROTATION: BossDefinition[] = [constructionBoss, sniperHunter, droneSwarm];

export function getBossForLevel(level: number): BossDefinition | null {
  if (level % 5 !== 0) return null;
  const index = (level / 5 - 1) % BOSS_ROTATION.length;
  return BOSS_ROTATION[index];
}
