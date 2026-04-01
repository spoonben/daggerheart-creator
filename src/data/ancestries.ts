import type { AncestryData } from '../types/character';

export const ANCESTRIES: AncestryData[] = [
  {
    id: 'clank',
    name: 'Clank',
    description: 'Sentient mechanical beings built from metal, wood, and stone. Their bodies come in a wide array of sizes and configurations.',
    topFeature: {
      name: 'Purposeful Design',
      description: 'Decide who made you and for what purpose. Choose one Experience that aligns with this purpose and gain a permanent +1 bonus to it.',
    },
    bottomFeature: {
      name: 'Efficient',
      description: 'When you take a short rest, you can choose a long rest move instead of a short rest move.',
    },
  },
  {
    id: 'drakona',
    name: 'Drakona',
    description: 'Wingless dragons in humanoid form with thick scales and powerful elemental breath.',
    topFeature: {
      name: 'Scales',
      description: 'When you would take Severe damage, you can mark a Stress to mark 1 fewer Hit Point.',
    },
    bottomFeature: {
      name: 'Elemental Breath',
      description: 'Choose an element for your breath. Use it against targets within Very Close range as an Instinct weapon that deals d8 magic damage.',
    },
  },
  {
    id: 'dwarf',
    name: 'Dwarf',
    description: 'Short humanoids with square frames, dense musculature, and naturally resilient skin.',
    topFeature: {
      name: 'Thick Skin',
      description: 'When you take Minor damage, you can mark 2 Stress instead of marking a Hit Point.',
    },
    bottomFeature: {
      name: 'Increased Fortitude',
      description: 'Spend 3 Hope to halve incoming physical damage.',
    },
  },
  {
    id: 'elf',
    name: 'Elf',
    description: 'Tall humanoids with pointed ears and acutely attuned senses who can enter a celestial trance.',
    topFeature: {
      name: 'Quick Reactions',
      description: 'Mark a Stress to gain advantage on a reaction roll.',
    },
    bottomFeature: {
      name: 'Celestial Trance',
      description: 'During a rest, you can drop into a trance to choose an additional downtime move.',
    },
  },
  {
    id: 'faerie',
    name: 'Faerie',
    description: 'Winged humanoid creatures with insectile features who go through metamorphosis.',
    topFeature: {
      name: 'Luckbender',
      description: 'Once per session, after you or an ally within Close range makes an action roll, spend 3 Hope to reroll the Duality Dice.',
    },
    bottomFeature: {
      name: 'Wings',
      description: 'You can fly. While flying, mark a Stress after an attack to gain +2 to Evasion against it.',
    },
  },
  {
    id: 'faun',
    name: 'Faun',
    description: 'Goat-like humanoids with curving horns, square pupils, and cloven hooves.',
    topFeature: {
      name: 'Caprine Leap',
      description: 'You can leap anywhere within Close range as normal movement, vaulting obstacles and scaling barriers with ease.',
    },
    bottomFeature: {
      name: 'Kick',
      description: 'When you succeed on a Melee attack, mark a Stress to deal an extra 2d6 damage and knock back to Very Close range.',
    },
  },
  {
    id: 'firbolg',
    name: 'Firbolg',
    description: 'Bovine humanoids with broad noses, long ears, and remarkable strength.',
    topFeature: {
      name: 'Charge',
      description: 'When you move from Far range into Melee range, mark a Stress to deal 1d12 physical damage to all targets within Melee range.',
    },
    bottomFeature: {
      name: 'Unshakable',
      description: "When you would mark a Stress, roll a d6. On a 6, don't mark it.",
    },
  },
  {
    id: 'fungril',
    name: 'Fungril',
    description: 'Humanoid mushroom folk with incredible variety of shapes and colors.',
    topFeature: {
      name: 'Fungril Network',
      description: 'Make an Instinct Roll (12) to use your mycelial array to communicate with others of your ancestry across any distance.',
    },
    bottomFeature: {
      name: 'Death Connection',
      description: 'While touching a recent corpse, mark a Stress to extract one memory related to a specific emotion or sensation.',
    },
  },
  {
    id: 'galapa',
    name: 'Galapa',
    description: 'Anthropomorphic turtles with large domed shells for protection.',
    topFeature: {
      name: 'Shell',
      description: 'Gain a bonus to your damage thresholds equal to your Proficiency.',
    },
    bottomFeature: {
      name: 'Retract',
      description: "Mark a Stress to retract into your shell. While retracted, resist physical damage but have disadvantage on action rolls and can't move.",
    },
  },
  {
    id: 'giant',
    name: 'Giant',
    description: 'Towering humanoids with broad shoulders, long arms, and one to three eyes.',
    topFeature: {
      name: 'Endurance',
      description: 'Gain an additional Hit Point slot at character creation.',
    },
    bottomFeature: {
      name: 'Reach',
      description: 'Treat any Melee range weapon, ability, or spell as though it has Very Close range instead.',
    },
  },
  {
    id: 'goblin',
    name: 'Goblin',
    description: 'Small humanoids with large eyes and massive membranous ears. Keen hearing and sharp eyesight.',
    topFeature: {
      name: 'Surefooted',
      description: 'You ignore disadvantage on Agility Rolls.',
    },
    bottomFeature: {
      name: 'Danger Sense',
      description: 'Once per rest, mark a Stress to force an adversary to reroll an attack against you or an ally within Very Close range.',
    },
  },
  {
    id: 'halfling',
    name: 'Halfling',
    description: 'Small humanoids with large hairy feet and a naturally attuned internal compass.',
    topFeature: {
      name: 'Luckbringer',
      description: 'At the start of each session, everyone in your party gains a Hope.',
    },
    bottomFeature: {
      name: 'Internal Compass',
      description: 'When you roll a 1 on your Hope Die, you can reroll it.',
    },
  },
  {
    id: 'human',
    name: 'Human',
    description: 'Adaptable humanoids with dexterous hands and bodies built for endurance.',
    topFeature: {
      name: 'High Stamina',
      description: 'Gain an additional Stress slot at character creation.',
    },
    bottomFeature: {
      name: 'Adaptability',
      description: 'When you fail a roll that utilized one of your Experiences, mark a Stress to reroll.',
    },
  },
  {
    id: 'infernis',
    name: 'Infernis',
    description: 'Humanoids with sharp teeth, pointed ears, and horns — descendants of demons.',
    topFeature: {
      name: 'Fearless',
      description: 'When you roll with Fear, you can mark 2 Stress to change it into a roll with Hope instead.',
    },
    bottomFeature: {
      name: 'Dread Visage',
      description: 'You have advantage on rolls to intimidate hostile creatures.',
    },
  },
  {
    id: 'katari',
    name: 'Katari',
    description: 'Feline humanoids with retractable claws, slit pupils, and triangular ears.',
    topFeature: {
      name: 'Feline Instincts',
      description: 'When you make an Agility Roll, you can spend 2 Hope to reroll your Hope Die.',
    },
    bottomFeature: {
      name: 'Retracting Claws',
      description: 'Make an Agility Roll to scratch a target within Melee range. On a success, they become temporarily Vulnerable.',
    },
  },
  {
    id: 'orc',
    name: 'Orc',
    description: 'Humanoids with square features and boar-like tusks, known for endurance.',
    topFeature: {
      name: 'Sturdy',
      description: 'When you have 1 Hit Point remaining, attacks against you have disadvantage.',
    },
    bottomFeature: {
      name: 'Tusks',
      description: 'When you succeed on a Melee attack, spend a Hope to gore with your tusks for an extra 1d6 damage.',
    },
  },
  {
    id: 'ribbet',
    name: 'Ribbet',
    description: 'Anthropomorphic frogs with protruding eyes and webbed appendages.',
    topFeature: {
      name: 'Amphibious',
      description: 'You can breathe and move naturally underwater.',
    },
    bottomFeature: {
      name: 'Long Tongue',
      description: 'You can grab things within Close range. Mark a Stress to use your tongue as a Finesse Close weapon dealing d12 physical damage.',
    },
  },
  {
    id: 'simiah',
    name: 'Simiah',
    description: 'Anthropomorphic primates with long limbs and prehensile feet.',
    topFeature: {
      name: 'Natural Climber',
      description: 'You have advantage on Agility Rolls that involve balancing and climbing.',
    },
    bottomFeature: {
      name: 'Nimble',
      description: 'Gain a permanent +1 bonus to your Evasion at character creation.',
    },
  },
];
