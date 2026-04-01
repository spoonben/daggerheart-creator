import type { CommunityData } from '../types/character';

export const COMMUNITIES: CommunityData[] = [
  {
    id: 'highborne',
    name: 'Highborne',
    description: 'Accustomed to elegance, opulence, and prestige within the upper echelons of society.',
    feature: {
      name: 'Privilege',
      description: 'You have advantage on rolls to consort with nobles, negotiate prices, or leverage your reputation.',
    },
  },
  {
    id: 'loreborne',
    name: 'Loreborne',
    description: 'From a society that favors strong academic or political prowess and values knowledge.',
    feature: {
      name: 'Well-Read',
      description: 'You have advantage on rolls involving the history, culture, or politics of a prominent person or place.',
    },
  },
  {
    id: 'orderborne',
    name: 'Orderborne',
    description: 'From a collective focused on discipline or faith, upholding a set of principles.',
    feature: {
      name: 'Dedicated',
      description: 'Record three sayings or values. Once per rest, when embodying one through action, roll a d20 as your Hope Die.',
    },
  },
  {
    id: 'ridgeborne',
    name: 'Ridgeborne',
    description: 'Called the rocky peaks and sharp cliffs of the mountainside home. Hardy and adaptable.',
    feature: {
      name: 'Steady',
      description: 'You have advantage on rolls to traverse dangerous cliffs, navigate harsh environments, and use survival knowledge.',
    },
  },
  {
    id: 'seaborne',
    name: 'Seaborne',
    description: 'Lived on or near a large body of water, built physically and culturally around the sea.',
    feature: {
      name: 'Know the Tide',
      description: 'When you roll with Fear, place a token on this card. Before an action roll, spend tokens for +1 each.',
    },
  },
  {
    id: 'slyborne',
    name: 'Slyborne',
    description: 'From a group that operates outside the law — criminals, grifters, and con artists.',
    feature: {
      name: 'Scoundrel',
      description: 'You have advantage on rolls to negotiate with criminals, detect lies, or find a safe place to hide.',
    },
  },
  {
    id: 'underborne',
    name: 'Underborne',
    description: 'From a subterranean society, recognized for incredible boldness and engineering skill.',
    feature: {
      name: 'Low-Light Living',
      description: 'In low light or heavy shadow, you have advantage on rolls to hide, investigate, or perceive details.',
    },
  },
  {
    id: 'wanderborne',
    name: 'Wanderborne',
    description: 'Lived as a nomad, experiencing a wide variety of cultures and valuing connections.',
    feature: {
      name: 'Nomadic Pack',
      description: 'Add a Nomadic Pack to inventory. Once per session, spend a Hope to pull out a useful mundane item.',
    },
  },
  {
    id: 'wildborne',
    name: 'Wildborne',
    description: 'Lived deep within the forest, dedicated to conservation with strong ties to nature.',
    feature: {
      name: 'Lightfoot',
      description: 'Your movement is naturally silent. You have advantage on rolls to move without being heard.',
    },
  },
];
