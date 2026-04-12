# Spec: Upgrade System

## Overview

Three upgrade layers, each with a different scope:

| Layer | Scope | Source | Persistence |
|---|---|---|---|
| **Cards** | Current run | Level-up card picks | Reset on new game |
| **Relics** | Current run | Post-boss reward | Reset on new game |
| **Meta** | Cross-run | Meta currency shop | Saved to localStorage |

The legacy coin-gated shop (`UPGRADE_DEFS`) is defined in `upgrades.ts` but the
primary upgrade flow is now card-based (roguelite).

---

## Card System

### Flow

1. Level-up triggers `rollCards(pickedCards, count)` → 3 cards offered (all in dev mode)
2. Player picks one via `CardSelectionOverlay`
3. `card.apply(g, stacks)` modifies `g.upgrades` or `g.lives` directly
4. `g.pickedCards` map tracks stacks per card ID (used to enforce `maxStacks`)

### Card Pool (`cards.ts`)

| ID | Name | Rarity | Max Stacks | Effect |
|---|---|---|---|---|
| `swift_droppings` | Swift Droppings | common | 3 | `poopSpeed++` |
| `bigger_load` | Bigger Load | common | 3 | `poopSize++` |
| `tailwind` | Tailwind | common | 3 | `birdSpeed++` |
| `extra_plumage` | Extra Plumage | common | 5 | `lives++` |
| `shiny_finder` | Shiny Finder | common | 3 | `coinBonus++` |
| `sharp_droppings` | Sharp Droppings | common | 4 | `damage++` |
| `split_shot` | Split Shot | rare | 2 | `splitPoop++` |
| `homing_droppings` | Homing Droppings | rare | 2 | `homingPoop++` |
| `heavy_payload` | Heavy Payload | rare | 2 | `damage += 3` |
| `toxic_poop` | Toxic Poop | rare | 2 | `toxicPoop++` |
| `scatter_bomb` | Scatter Bomb | epic | 1 | `scatterBomb = 1` |
| `feather_shield` | Feather Shield | epic | 1 | `featherShield = 1` |
| `golden_gut` | Golden Digestive System | legendary | 1 | `goldenGut = 1` |
| `storm_gut` | Storm Gut | legendary | 1 | `stormGut = 1` |

### Rarity Weights

| Rarity | Weight |
|---|---|
| common | 60 |
| rare | 25 |
| epic | 12 |
| legendary | 3 |

---

## Relic System

Offered after boss defeat. Player picks one from 3 choices.
Relics apply immediately via `relic.apply(g)`.
After relic pick, card selection follows.

### Relic Pool (`relics.ts`)

| ID | Name | Effect |
|---|---|---|
| `golden_gut` | Golden Digestive System | `goldenGut = 1` |
| `storm_gut` | Storm Gut | `stormGut = 1` |
| `magnetic` | Magnetic Droppings | `homingPoop = max(1, current)` |
| `iron_feathers` | Iron Feathers | `lives += 3` |
| *(more in RELIC_POOL)* | | |

---

## Meta Upgrade System

Cross-run progression. Currency earned at rate `floor(score / 50)` per run.
Stored in `localStorage` key `birdshit-meta` via `loadMeta`/`saveMeta`.

Bonuses applied at game start via `getMetaBonuses(meta)`:

| ID | Name | Max Level | Costs | Bonus |
|---|---|---|---|---|
| `meta_speed` | Aerodynamics | 3 | 50, 100, 200 | +5% bird speed per level |
| `meta_hp` | Thick Feathers | 2 | 75, 150 | +1 starting life per level |
| `meta_coins` | Keen Eye | 3 | 40, 80, 160 | +10% coin multiplier per level |
| `meta_damage` | Corrosive Diet | 2 | 60, 120 | +1 starting poop damage per level |

---

## All Upgrade Keys (`types.ts → Upgrades`)

| Key | Type | Default | Effect |
|---|---|---|---|
| `poopSpeed` | number | 0 | `getPoopSpeed = BASE (180) + level × 60` px/s |
| `poopSize` | number | 0 | `getPoopW = BASE (8) + level × 3`, `getPoopH = BASE (10) + level × 2` |
| `birdSpeed` | number | 0 | `getBirdSpeed = BASE (150) + level × 36` px/s |
| `extraLife` | number | 0 | *(legacy shop; use extra_plumage card instead)* |
| `splitPoop` | number | 0 | Level 1 = 2 projectiles, Level 2 = 3 |
| `homingPoop` | number | 0 | Level 1 = 24 px/s² nudge, Level 2 = 54 |
| `damage` | number | 0 | `getPoopDamage = 1 + damage` |
| `coinBonus` | number | 0 | Extra coins per hit |
| `toxicPoop` | number | 0 | Spawns puddle on direct hit; puddle size/duration scales |
| `scatterBomb` | number | 0 | AoE explosion on any poop impact (radius 80px) |
| `featherShield` | number | 0 | Block 1 hit every 15s |
| `goldenGut` | number | 0 | Drop damaging ground trails while poop is in flight |
| `stormGut` | number | 0 | Chain lightning to up to 3 nearby enemies on hit |

---

## Scatter Bomb Behaviour

When `scatterBomb > 0`, on ANY poop impact (ped, hunter, or ground):
1. Push `SplashEffect` (orange expanding ring, radius 80, duration 0.35s)
2. Check all unhit pedestrians within 80px — mark hit, award score/coins
3. Check all hunters within 80px — remove, award score/coins

The hit entity (the direct collision target) is already removed/marked before `scatterAoE` runs.

---

## Feather Shield Behaviour

- Activates when `featherShield > 0` and shield has recharged (`shieldActive = true`)
- On hit: blocks damage, `shieldActive = false`, starts 15s recharge (`shieldTimer = 15`)
- Brief hit flash still plays to show the block
- Dev mode bypasses shield check entirely (no HP lost regardless)

---

## Stat Calculators (`upgrades.ts`)

```ts
getPoopSpeed(upgrades)   = 180 + upgrades.poopSpeed * 60        // px/s
getPoopW(upgrades)       = 8   + upgrades.poopSize  * 3         // px
getPoopH(upgrades)       = 10  + upgrades.poopSize  * 2         // px
getBirdSpeed(upgrades)   = 150 + upgrades.birdSpeed * 36        // px/s
getPoopDamage(upgrades)  = 1   + upgrades.damage               // multiplier
getHomingStrength(upgrades)  = 0 | 24 | 54                     // px/s² nudge
```
