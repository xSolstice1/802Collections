/**
 * Monopoly Board Data
 * 
 * Razer-themed board configuration with corporate universe properties
 */

import type { Property, BoardSpace, Card } from '../types';

// ============================================================================
// Property Definitions - Razer Corporate Universe Theme
// ============================================================================

export const PROPERTIES: Property[] = [
  // ============================================================================
  // Brown/Cheap Tier (Positions 1, 3)
  // ============================================================================
  {
    id: 'deathadder',
    name: 'DeathAdder',
    type: 'property',
    tier: 'cheap',
    price: 60,
    rent: 2,
    rentWithHq: 10,
    upgradeCost: 50,
    position: 1,
    color: '#8B4513',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'cynosa',
    name: 'Cynosa',
    type: 'property',
    tier: 'cheap',
    price: 60,
    rent: 4,
    rentWithHq: 20,
    upgradeCost: 50,
    position: 3,
    color: '#8B4513',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },

  // ============================================================================
  // Light Blue/Cheap Tier (Positions 6, 8, 9)
  // ============================================================================
  {
    id: 'goliathus',
    name: 'Goliathus',
    type: 'property',
    tier: 'cheap',
    price: 100,
    rent: 6,
    rentWithHq: 30,
    upgradeCost: 50,
    position: 6,
    color: '#87CEEB',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'kiyo',
    name: 'Kiyo',
    type: 'property',
    tier: 'cheap',
    price: 100,
    rent: 6,
    rentWithHq: 30,
    upgradeCost: 50,
    position: 8,
    color: '#87CEEB',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'mamba',
    name: 'Mamba',
    type: 'property',
    tier: 'cheap',
    price: 120,
    rent: 8,
    rentWithHq: 36,
    upgradeCost: 50,
    position: 9,
    color: '#87CEEB',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },

  // ============================================================================
  // Pink/Mid Tier (Positions 11, 13, 14)
  // ============================================================================
  {
    id: 'naga',
    name: 'Naga',
    type: 'property',
    tier: 'mid',
    price: 140,
    rent: 10,
    rentWithHq: 50,
    upgradeCost: 100,
    position: 11,
    color: '#FF69B4',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'orochi',
    name: 'Orochi',
    type: 'property',
    tier: 'mid',
    price: 140,
    rent: 10,
    rentWithHq: 50,
    upgradeCost: 100,
    position: 13,
    color: '#FF69B4',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'taipan',
    name: 'Taipan',
    type: 'property',
    tier: 'mid',
    price: 160,
    rent: 12,
    rentWithHq: 60,
    upgradeCost: 100,
    position: 14,
    color: '#FF69B4',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },

  // ============================================================================
  // Orange/Mid Tier (Positions 16, 18, 19)
  // ============================================================================
  {
    id: 'tarantula',
    name: 'Tarantula',
    type: 'property',
    tier: 'mid',
    price: 180,
    rent: 14,
    rentWithHq: 70,
    upgradeCost: 100,
    position: 16,
    color: '#FF8C00',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'atheris',
    name: 'Atheris',
    type: 'property',
    tier: 'mid',
    price: 180,
    rent: 14,
    rentWithHq: 70,
    upgradeCost: 100,
    position: 18,
    color: '#FF8C00',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'blackshark',
    name: 'Blackshark',
    type: 'property',
    tier: 'mid',
    price: 200,
    rent: 16,
    rentWithHq: 80,
    upgradeCost: 100,
    position: 19,
    color: '#FF8C00',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },

  // ============================================================================
  // Red/Expensive Tier (Positions 21, 23, 24)
  // ============================================================================
  {
    id: 'enki',
    name: 'Enki',
    type: 'property',
    tier: 'expensive',
    price: 220,
    rent: 18,
    rentWithHq: 90,
    upgradeCost: 150,
    position: 21,
    color: '#FF0000',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'hammerhead',
    name: 'Hammerhead',
    type: 'property',
    tier: 'expensive',
    price: 220,
    rent: 18,
    rentWithHq: 90,
    upgradeCost: 150,
    position: 23,
    color: '#FF0000',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'kaira',
    name: 'Kaira',
    type: 'property',
    tier: 'expensive',
    price: 240,
    rent: 20,
    rentWithHq: 100,
    upgradeCost: 150,
    position: 24,
    color: '#FF0000',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },

  // ============================================================================
  // Yellow/Expensive Tier (Positions 26, 27, 29)
  // ============================================================================
  {
    id: 'kishi',
    name: 'Kishi',
    type: 'property',
    tier: 'expensive',
    price: 260,
    rent: 22,
    rentWithHq: 110,
    upgradeCost: 150,
    position: 26,
    color: '#FFD700',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'ornata',
    name: 'Ornata',
    type: 'property',
    tier: 'expensive',
    price: 260,
    rent: 22,
    rentWithHq: 110,
    upgradeCost: 150,
    position: 27,
    color: '#FFD700',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'panthera',
    name: 'Panthera',
    type: 'property',
    tier: 'expensive',
    price: 280,
    rent: 24,
    rentWithHq: 120,
    upgradeCost: 150,
    position: 29,
    color: '#FFD700',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },

  // ============================================================================
  // Green/Expensive Tier (Positions 31, 32, 34)
  // ============================================================================
  {
    id: 'raiju',
    name: 'Raiju',
    type: 'property',
    tier: 'expensive',
    price: 300,
    rent: 26,
    rentWithHq: 130,
    upgradeCost: 200,
    position: 31,
    color: '#00AA00',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'raptor',
    name: 'Raptor',
    type: 'property',
    tier: 'expensive',
    price: 300,
    rent: 26,
    rentWithHq: 130,
    upgradeCost: 200,
    position: 32,
    color: '#00AA00',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'thresher',
    name: 'Thresher',
    type: 'property',
    tier: 'expensive',
    price: 320,
    rent: 28,
    rentWithHq: 150,
    upgradeCost: 200,
    position: 34,
    color: '#00AA00',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },

  // ============================================================================
  // Blue/Expensive Tier (Positions 37, 39)
  // ============================================================================
  {
    id: 'blackwidow',
    name: 'Blackwidow',
    type: 'property',
    tier: 'expensive',
    price: 350,
    rent: 35,
    rentWithHq: 175,
    upgradeCost: 200,
    position: 37,
    color: '#0066FF',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'kraken',
    name: 'Kraken',
    type: 'property',
    tier: 'expensive',
    price: 400,
    rent: 50,
    rentWithHq: 200,
    upgradeCost: 200,
    position: 39,
    color: '#0066FF',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },

  // ============================================================================
  // Railroads (Distribution Networks)
  // ============================================================================
  {
    id: 'rail_north',
    name: 'North Distribution',
    type: 'railroad',
    tier: 'mid',
    price: 200,
    rent: 25,
    rentWithHq: 200,
    upgradeCost: 0,
    position: 5,
    color: '#666666',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'rail_east',
    name: 'East Distribution',
    type: 'railroad',
    tier: 'mid',
    price: 200,
    rent: 25,
    rentWithHq: 200,
    upgradeCost: 0,
    position: 15,
    color: '#666666',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'rail_south',
    name: 'South Distribution',
    type: 'railroad',
    tier: 'mid',
    price: 200,
    rent: 25,
    rentWithHq: 200,
    upgradeCost: 0,
    position: 25,
    color: '#666666',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'rail_west',
    name: 'West Distribution',
    type: 'railroad',
    tier: 'mid',
    price: 200,
    rent: 25,
    rentWithHq: 200,
    upgradeCost: 0,
    position: 35,
    color: '#666666',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },

  // ============================================================================
  // Utilities (Core Systems)
  // ============================================================================
  {
    id: 'util_electric',
    name: 'Power Grid',
    type: 'utility',
    tier: 'mid',
    price: 150,
    rent: 20,
    rentWithHq: 100,
    upgradeCost: 0,
    position: 12,
    color: '#AAAAAA',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
  {
    id: 'util_water',
    name: 'Cooling System',
    type: 'utility',
    tier: 'mid',
    price: 150,
    rent: 20,
    rentWithHq: 100,
    upgradeCost: 0,
    position: 28,
    color: '#AAAAAA',
    owner: null,
    upgrades: 0,
    mortgaged: false,
  },
];

// ============================================================================
// Board Spaces Definition
// ============================================================================

export const BOARD_SPACES: BoardSpace[] = [
  // Position 0 - GO
  { position: 0, name: 'GO', type: 'corner' },
  
  // Position 1 - DeathAdder
  { position: 1, name: 'DeathAdder', type: 'property', propertyId: 'deathadder' },
  
  // Position 2 - Community Chest
  { position: 2, name: 'Corporate Actions', type: 'communityChest' },
  
  // Position 3 - Cynosa
  { position: 3, name: 'Cynosa', type: 'property', propertyId: 'cynosa' },
  
  // Position 4 - Income Tax
  { position: 4, name: 'Income Tax', type: 'tax' },
  
  // Position 5 - North Distribution
  { position: 5, name: 'North Distribution', type: 'railroad', propertyId: 'rail_north' },
  
  // Position 6 - Goliathus
  { position: 6, name: 'Goliathus', type: 'property', propertyId: 'goliathus' },
  
  // Position 7 - Chance
  { position: 7, name: 'Market Events', type: 'chance' },
  
  // Position 8 - Kiyo
  { position: 8, name: 'Kiyo', type: 'property', propertyId: 'kiyo' },
  
  // Position 9 - Mamba
  { position: 9, name: 'Mamba', type: 'property', propertyId: 'mamba' },
  
  // Position 10 - Jail/Just Visiting
  { position: 10, name: 'Headquarters', type: 'corner' },
  
  // Position 11 - Naga
  { position: 11, name: 'Naga', type: 'property', propertyId: 'naga' },
  
  // Position 12 - Power Grid
  { position: 12, name: 'Power Grid', type: 'utility', propertyId: 'util_electric' },
  
  // Position 13 - Orochi
  { position: 13, name: 'Orochi', type: 'property', propertyId: 'orochi' },
  
  // Position 14 - Taipan
  { position: 14, name: 'Taipan', type: 'property', propertyId: 'taipan' },
  
  // Position 15 - East Distribution
  { position: 15, name: 'East Distribution', type: 'railroad', propertyId: 'rail_east' },
  
  // Position 16 - Tarantula
  { position: 16, name: 'Tarantula', type: 'property', propertyId: 'tarantula' },
  
  // Position 17 - Community Chest
  { position: 17, name: 'Corporate Actions', type: 'communityChest' },
  
  // Position 18 - Atheris
  { position: 18, name: 'Atheris', type: 'property', propertyId: 'atheris' },
  
  // Position 19 - Blackshark
  { position: 19, name: 'Blackshark', type: 'property', propertyId: 'blackshark' },
  
  // Position 20 - Free Parking
  { position: 20, name: 'Free Parking', type: 'corner' },
  
  // Position 21 - Enki
  { position: 21, name: 'Enki', type: 'property', propertyId: 'enki' },
  
  // Position 22 - Chance
  { position: 22, name: 'Market Events', type: 'chance' },
  
  // Position 23 - Hammerhead
  { position: 23, name: 'Hammerhead', type: 'property', propertyId: 'hammerhead' },
  
  // Position 24 - Kaira
  { position: 24, name: 'Kaira', type: 'property', propertyId: 'kaira' },
  
  // Position 25 - South Distribution
  { position: 25, name: 'South Distribution', type: 'railroad', propertyId: 'rail_south' },
  
  // Position 26 - Kishi
  { position: 26, name: 'Kishi', type: 'property', propertyId: 'kishi' },
  
  // Position 27 - Ornata
  { position: 27, name: 'Ornata', type: 'property', propertyId: 'ornata' },
  
  // Position 28 - Cooling System
  { position: 28, name: 'Cooling System', type: 'utility', propertyId: 'util_water' },
  
  // Position 29 - Panthera
  { position: 29, name: 'Panthera', type: 'property', propertyId: 'panthera' },
  
  // Position 30 - Go To Jail
  { position: 30, name: 'Go To HQ', type: 'corner' },
  
  // Position 31 - Raiju
  { position: 31, name: 'Raiju', type: 'property', propertyId: 'raiju' },
  
  // Position 32 - Raptor
  { position: 32, name: 'Raptor', type: 'property', propertyId: 'raptor' },
  
  // Position 33 - Community Chest
  { position: 33, name: 'Corporate Actions', type: 'communityChest' },
  
  // Position 34 - Thresher
  { position: 34, name: 'Thresher', type: 'property', propertyId: 'thresher' },
  
  // Position 35 - West Distribution
  { position: 35, name: 'West Distribution', type: 'railroad', propertyId: 'rail_west' },
  
  // Position 36 - Chance
  { position: 36, name: 'Market Events', type: 'chance' },
  
  // Position 37 - Blackwidow
  { position: 37, name: 'Blackwidow', type: 'property', propertyId: 'blackwidow' },
  
  // Position 38 - Luxury Tax
  { position: 38, name: 'Luxury Tax', type: 'tax' },
  
  // Position 39 - Kraken
  { position: 39, name: 'Kraken', type: 'property', propertyId: 'kraken' },
];

// ============================================================================
// Cards - Market Events (Chance) & Corporate Actions (Community Chest)
// ============================================================================

export const MARKET_EVENT_CARDS: Card[] = [
  {
    id: 'me_1',
    type: 'marketEvent',
    title: 'Product Launch Success',
    description: 'Your new product went viral! Collect $200 from the bank.',
    effect: { type: 'collect', value: 200 },
  },
  {
    id: 'me_2',
    type: 'marketEvent',
    title: 'Supply Chain Disruption',
    description: 'Global chip shortage. Pay $100 for each property you own.',
    effect: { type: 'pay', value: 100 },
  },
  {
    id: 'me_3',
    type: 'marketEvent',
    title: 'Stock Market Boom',
    description: 'Your stocks doubled! Collect $150.',
    effect: { type: 'collect', value: 150 },
  },
  {
    id: 'me_4',
    type: 'marketEvent',
    title: 'Regulatory Fine',
    description: 'FDA investigation. Pay $75.',
    effect: { type: 'pay', value: 75 },
  },
  {
    id: 'me_5',
    type: 'marketEvent',
    title: 'Move to R&D',
    description: 'Advance to the nearest Distribution Network. If unowned, you may buy it.',
    effect: { type: 'moveToNearest', target: 'railroad' },
  },
  {
    id: 'me_6',
    type: 'marketEvent',
    title: 'Corporate Retreat',
    description: 'Go to Headquarters (Jail). Do not pass GO.',
    effect: { type: 'jail' },
  },
  {
    id: 'me_7',
    type: 'marketEvent',
    title: 'Patent Royalty',
    description: 'Collect $50 from each player for patent licensing.',
    effect: { type: 'collect', value: 50 },
  },
  {
    id: 'me_8',
    type: 'marketEvent',
    title: 'Server Outage',
    description: 'Pay $50 per upgrade and $100 per HQ for emergency repairs.',
    effect: { type: 'repair' },
  },
  {
    id: 'me_9',
    type: 'marketEvent',
    title: 'Back to Office',
    description: 'Return to GO. Collect $200.',
    effect: { type: 'moveTo', value: 0 },
  },
  {
    id: 'me_10',
    type: 'marketEvent',
    title: 'Get Out of HQ Free',
    description: 'Keep this card until needed to escape Headquarters.',
    effect: { type: 'getOutOfJail' },
  },
  {
    id: 'me_11',
    type: 'marketEvent',
    title: 'Competitor Bankruptcy',
    description: 'Steal $100 from the richest player.',
    effect: { type: 'steal', value: 100 },
  },
  {
    id: 'me_12',
    type: 'marketEvent',
    title: 'Viral Marketing',
    description: 'Collect $10 from each player.',
    effect: { type: 'collect', value: 10 },
  },
];

export const CORPORATE_ACTION_CARDS: Card[] = [
  {
    id: 'ca_1',
    type: 'corporateAction',
    title: 'Quarterly Dividend',
    description: 'Receive quarterly dividends of $100.',
    effect: { type: 'collect', value: 100 },
  },
  {
    id: 'ca_2',
    type: 'corporateAction',
    title: 'Office Renovation',
    description: 'Pay $50 for each property you own.',
    effect: { type: 'pay', value: 50 },
  },
  {
    id: 'ca_3',
    type: 'corporateAction',
    title: 'Employee Bonus',
    description: 'Collect $25 from the bank for each player.',
    effect: { type: 'collect', value: 25 },
  },
  {
    id: 'ca_4',
    type: 'corporateAction',
    title: 'Tax Audit',
    description: 'Pay $150 in back taxes.',
    effect: { type: 'pay', value: 150 },
  },
  {
    id: 'ca_5',
    type: 'corporateAction',
    title: 'Team Building Event',
    description: 'Advance to GO. Collect $200.',
    effect: { type: 'moveTo', value: 0 },
  },
  {
    id: 'ca_6',
    type: 'corporateAction',
    title: 'Board Meeting',
    description: 'Go to Headquarters. Do not pass GO.',
    effect: { type: 'jail' },
  },
  {
    id: 'ca_7',
    type: 'corporateAction',
    title: 'Insurance Payout',
    description: 'Collect $100 insurance claim.',
    effect: { type: 'collect', value: 100 },
  },
  {
    id: 'ca_8',
    type: 'corporateAction',
    title: 'Equipment Upgrade',
    description: 'Pay $40 per upgrade and $80 per HQ.',
    effect: { type: 'repair' },
  },
  {
    id: 'ca_9',
    type: 'corporateAction',
    title: 'Merger Announcement',
    description: 'Your stock value increased! Collect $150.',
    effect: { type: 'collect', value: 150 },
  },
  {
    id: 'ca_10',
    type: 'corporateAction',
    title: 'Get Out of HQ Free',
    description: 'Keep this card until needed to escape Headquarters.',
    effect: { type: 'getOutOfJail' },
  },
  {
    id: 'ca_11',
    type: 'corporateAction',
    title: 'Holiday Bonus',
    description: 'Collect $200 holiday bonus.',
    effect: { type: 'collect', value: 200 },
  },
  {
    id: 'ca_12',
    type: 'corporateAction',
    title: 'Software License',
    description: 'Pay $30 for software licensing fees.',
    effect: { type: 'pay', value: 30 },
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

export const getPropertiesByPosition = (): Record<number, Property> => {
  const map: Record<number, Property> = {};
  PROPERTIES.forEach((prop) => {
    map[prop.position] = prop;
  });
  return map;
};

export const getCardsByType = (type: 'marketEvent' | 'corporateAction'): Card[] => {
  return type === 'marketEvent' ? MARKET_EVENT_CARDS : CORPORATE_ACTION_CARDS;
};

export const shuffleCards = (cards: Card[]): Card[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};