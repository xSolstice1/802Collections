import { drawBird } from './renderers/drawBird';
import { drawBirdMagpie } from './renderers/drawBirdMagpie';
import { drawBirdCrowned } from './renderers/drawBirdCrowned';
import { drawBirdOwl } from './renderers/drawBirdOwl';
import { drawBirdToucan } from './renderers/drawBirdToucan';
import { drawBirdEagle } from './renderers/drawBirdEagle';

export type DrawBirdFn = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  wingUp: boolean,
  flash: boolean
) => void;

export interface BirdSkin {
  id: string;
  name: string;
  draw: DrawBirdFn;
  unlockScore: number;
}

export const BIRD_SKINS: BirdSkin[] = [
  { id: 'classic',   name: 'Parakeet',  draw: drawBird,         unlockScore: 0    },
  { id: 'magpie',    name: 'Magpie',    draw: drawBirdMagpie,   unlockScore: 0    },
  { id: 'cockatiel', name: 'Cockatiel', draw: drawBirdCrowned,  unlockScore: 250  },
  { id: 'owl',       name: 'Owl',       draw: drawBirdOwl,      unlockScore: 500  },
  { id: 'toucan',    name: 'Toucan',    draw: drawBirdToucan,   unlockScore: 1500 },
  { id: 'eagle',     name: 'Eagle',     draw: drawBirdEagle,    unlockScore: 3000 },
];

export const DEFAULT_SKIN = BIRD_SKINS[0];
export const getSkinById = (id: string): BirdSkin => BIRD_SKINS.find(s => s.id === id) ?? DEFAULT_SKIN;
