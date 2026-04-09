# Spec: Board Data

Source file: `data/board.ts`

---

## Board Layout (40 Spaces)

The board is a standard Monopoly square with 40 positions numbered 0–39. Positions are read counterclockwise starting from GO at the bottom-right corner.

| Side | Positions | Direction |
|---|---|---|
| Bottom | 0–10 | Right to left |
| Left | 11–19 | Bottom to top |
| Top | 20–30 | Left to right |
| Right | 31–39 | Top to bottom |

### Corner Spaces

| Position | Name | Type |
|---|---|---|
| 0 | GO | `go` |
| 10 | Razer Headquarters | `jail` |
| 20 | Free Parking | `free_parking` |
| 30 | Go To HQ | `go_to_jail` |

---

## Properties by Color Group

### Brown (Cheap Tier)
| Position | Name | Price | Rent | HQ Rent | Upgrade Cost |
|---|---|---|---|---|---|
| 1 | DeathAdder | 60 | 2 | 250 | 50 |
| 3 | Cynosa | 60 | 4 | 450 | 50 |

### Light Blue (Cheap Tier)
| Position | Name | Price | Rent | HQ Rent | Upgrade Cost |
|---|---|---|---|---|---|
| 6 | Goliathus | 100 | 6 | 550 | 50 |
| 8 | Kiyo | 100 | 6 | 550 | 50 |
| 9 | Mamba | 120 | 8 | 600 | 50 |

### Pink / Magenta (Mid Tier)
| Position | Name | Price | Rent | HQ Rent | Upgrade Cost |
|---|---|---|---|---|---|
| 11 | Naga | 140 | 10 | 750 | 100 |
| 13 | Orochi | 140 | 10 | 750 | 100 |
| 14 | Taipan | 160 | 12 | 900 | 100 |

### Orange (Mid Tier)
| Position | Name | Price | Rent | HQ Rent | Upgrade Cost |
|---|---|---|---|---|---|
| 16 | Tarantula | 180 | 14 | 950 | 100 |
| 18 | Atheris | 180 | 14 | 950 | 100 |
| 19 | Blackshark | 200 | 16 | 1000 | 100 |

### Red (Expensive Tier)
| Position | Name | Price | Rent | HQ Rent | Upgrade Cost |
|---|---|---|---|---|---|
| 21 | Enki | 220 | 18 | 1050 | 150 |
| 23 | Hammerhead | 220 | 18 | 1050 | 150 |
| 24 | Kaira | 240 | 20 | 1100 | 150 |

### Yellow (Expensive Tier)
| Position | Name | Price | Rent | HQ Rent | Upgrade Cost |
|---|---|---|---|---|---|
| 26 | Kishi | 260 | 22 | 1150 | 150 |
| 27 | Ornata | 260 | 22 | 1150 | 150 |
| 29 | Panthera | 280 | 24 | 1200 | 150 |

### Green (Expensive Tier)
| Position | Name | Price | Rent | HQ Rent | Upgrade Cost |
|---|---|---|---|---|---|
| 31 | Raiju | 300 | 26 | 1275 | 200 |
| 32 | Raptor | 300 | 26 | 1275 | 200 |
| 34 | Thresher | 320 | 28 | 1350 | 200 |

### Dark Blue (Expensive Tier)
| Position | Name | Price | Rent | HQ Rent | Upgrade Cost |
|---|---|---|---|---|---|
| 37 | Blackwidow | 350 | 35 | 1500 | 200 |
| 39 | Kraken | 400 | 50 | 2000 | 200 |

---

## Railroads

| Position | Name | Price | Base Rent |
|---|---|---|---|
| 5 | North Distribution Network | 200 | 25 |
| 15 | East Distribution Network | 200 | 25 |
| 25 | South Distribution Network | 200 | 25 |
| 35 | West Distribution Network | 200 | 25 |

Rent scales by count owned: 25 → 50 → 100 → 200.

---

## Utilities

| Position | Name | Price |
|---|---|---|
| 12 | Power Grid | 150 |
| 28 | Cooling System | 150 |

Rent: 4× dice total (1 owned), 10× dice total (2 owned).

---

## Special Spaces

| Position | Name | Type | Effect |
|---|---|---|---|
| 2 | Corporate Actions | `community_chest` | Draw Corporate Actions card |
| 4 | Income Tax | `tax` | Pay $200 |
| 7 | Market Events | `chance` | Draw Market Events card |
| 17 | Corporate Actions | `community_chest` | Draw Corporate Actions card |
| 22 | Market Events | `chance` | Draw Market Events card |
| 33 | Corporate Actions | `community_chest` | Draw Corporate Actions card |
| 36 | Market Events | `chance` | Draw Market Events card |
| 38 | Luxury Tax | `tax` | Pay $100 |

---

## Market Events Cards (12)

| # | Text | Effect |
|---|---|---|
| 1 | Advance to GO | Move to position 0, collect salary |
| 2 | Product recall costs | Pay $15 |
| 3 | Server maintenance fee | Pay $50 |
| 4 | Patent licensing deal | Collect $150 |
| 5 | Market volatility | Go to jail |
| 6 | Advance to Blackwidow | Move to position 37 |
| 7 | Supply chain disruption | Move back 3 spaces |
| 8 | Cybersecurity breach | Pay each player $50 |
| 9 | Trade show success | Collect $50 from each player |
| 10 | Quarterly dividend | Collect $100 |
| 11 | Property repairs | Pay $25 per house, $100 per HQ |
| 12 | Emergency contract | Collect $200 |

---

## Corporate Actions Cards (12)

| # | Text | Effect |
|---|---|---|
| 1 | Annual bonus | Collect $200 |
| 2 | Tax refund | Collect $100 |
| 3 | Office renovation | Pay $150 |
| 4 | Employee of the month | Collect $25 from each player |
| 5 | Corporate retreat | Pay $50 |
| 6 | Stock options vested | Collect $250 |
| 7 | Legal settlement | Pay $100 |
| 8 | Advance to GO | Move to position 0, collect salary |
| 9 | Equipment upgrade | Pay $75 |
| 10 | Merger bonus | Collect $150 |
| 11 | Regulatory fine | Pay $100 |
| 12 | Get Out of Jail Free | Receive card; use to leave jail |
