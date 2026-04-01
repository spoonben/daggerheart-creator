export interface AncestryFeature {
  name: string;
  description: string;
}

export interface AncestryData {
  id: string;
  name: string;
  description: string;
  topFeature: AncestryFeature;
  bottomFeature: AncestryFeature;
}

export interface CommunityData {
  id: string;
  name: string;
  description: string;
  feature: { name: string; description: string };
}

export interface SubclassData {
  id: string;
  name: string;
  spellcastTrait: string | null;
  foundationFeatures: { name: string; description: string }[];
}

export interface ClassData {
  id: string;
  name: string;
  description: string;
  domains: [string, string];
  evasion: number;
  hp: number;
  stress: number;
  subclasses: [SubclassData, SubclassData];
  classFeatures: { name: string; description: string }[];
  hopeFeature: { name: string; description: string };
  classItems: [string, string];
  suggestedTraits: Record<TraitName, number>;
}

export type TraitName = 'agility' | 'strength' | 'finesse' | 'instinct' | 'presence' | 'knowledge';

export type DamageType = 'physical' | 'magic';

export interface WeaponData {
  id: string;
  name: string;
  trait: string;
  range: string;
  damage: string;
  damageType: DamageType;
  hands: '1H' | '2H';
  feature: string;
  category: 'primary-physical' | 'primary-magic' | 'secondary';
}

export interface ArmorData {
  id: string;
  name: string;
  baseThresholds: { minor: number; major: number };
  baseScore: number;
  feature: string;
}

export interface DomainCardData {
  id: string;
  name: string;
  domain: string;
  level: number;
  type: string;
  recallCost: number;
  description: string;
}

export interface Character {
  name: string;
  pronouns: string;
  level: number;
  tier: number;
  className: string;
  subclass: string;
  ancestry: string;
  ancestryTopSource: string;
  ancestryBottomSource: string;
  community: string;
  traits: Record<TraitName, number>;
  hp: number;
  stress: number;
  evasion: number;
  proficiency: number;
  primaryWeapon: string;
  secondaryWeapon: string;
  armor: string;
  domainCards: string[];
  experiences: { name: string; modifier: number }[];
  background: string;
  characterDescription: string;
  inventory: string[];
  gold: number;
  hope: number;
  classItem: string;
  potionChoice: 'health' | 'stamina' | '';
}

export const EMPTY_CHARACTER: Character = {
  name: '',
  pronouns: '',
  level: 1,
  tier: 1,
  className: '',
  subclass: '',
  ancestry: '',
  ancestryTopSource: '',
  ancestryBottomSource: '',
  community: '',
  traits: { agility: 0, strength: 0, finesse: 0, instinct: 0, presence: 0, knowledge: 0 },
  hp: 0,
  stress: 6,
  evasion: 0,
  proficiency: 1,
  primaryWeapon: '',
  secondaryWeapon: '',
  armor: '',
  domainCards: [],
  experiences: [{ name: '', modifier: 2 }, { name: '', modifier: 2 }],
  background: '',
  characterDescription: '',
  inventory: ['Torch', '50 feet of rope', 'Basic supplies (tent, bedroll, tinderbox, rations)'],
  gold: 1,
  hope: 2,
  classItem: '',
  potionChoice: '',
};

export const TRAIT_MODIFIER_SET = [2, 1, 1, 0, 0, -1];

export const TRAIT_NAMES: TraitName[] = ['agility', 'strength', 'finesse', 'instinct', 'presence', 'knowledge'];

export const TRAIT_VERBS: Record<TraitName, string> = {
  agility: 'Sprint, Leap, Maneuver',
  strength: 'Lift, Smash, Grapple',
  finesse: 'Control, Hide, Tinker',
  instinct: 'Perceive, Sense, Navigate',
  presence: 'Charm, Perform, Deceive',
  knowledge: 'Recall, Analyze, Comprehend',
};
