import type { ClassData } from '../types/character';

export const CLASSES: ClassData[] = [
  {
    id: 'bard',
    name: 'Bard',
    description: 'A performer and storyteller who uses music and words to bolster allies and control the battlefield.',
    domains: ['Grace', 'Codex'],
    evasion: 10,
    hp: 5,
    stress: 6,
    subclasses: [
      {
        id: 'troubadour',
        name: 'Troubadour',
        spellcastTrait: 'Presence',
        foundationFeatures: [
          {
            name: 'Gifted Performer',
            description: 'Once per long rest, play a song: Relaxing Song (clear a HP on an ally), Epic Song (make target Vulnerable), or Heartbreaking Song (all allies gain a Hope).',
          },
        ],
      },
      {
        id: 'wordsmith',
        name: 'Wordsmith',
        spellcastTrait: 'Presence',
        foundationFeatures: [
          {
            name: 'Rousing Speech',
            description: 'Once per long rest, allies in Far range clear 2 Stress.',
          },
          {
            name: 'Heart of a Poet',
            description: 'Spend Hope to add d4 after a roll to impress, persuade, or offend.',
          },
        ],
      },
    ],
    classFeatures: [
      {
        name: 'Rally',
        description: 'Once per session, give yourself and allies within Far range a Rally Die (d6). Can be spent to add to action/reaction/damage rolls or clear Stress equal to the result.',
      },
    ],
    hopeFeature: {
      name: 'Make a Scene',
      description: 'Spend 3 Hope to Distract a target within Close range.',
    },
    classItems: ['Romance novel', 'Letter never opened'],
    suggestedTraits: { agility: 0, strength: -1, finesse: 0, instinct: 1, presence: 2, knowledge: 1 },
  },
  {
    id: 'druid',
    name: 'Druid',
    description: 'A shapeshifter attuned to the natural world who transforms into powerful beasts and wields primal magic.',
    domains: ['Sage', 'Arcana'],
    evasion: 10,
    hp: 6,
    stress: 6,
    subclasses: [
      {
        id: 'warden-of-the-elements',
        name: 'Warden of the Elements',
        spellcastTrait: 'Instinct',
        foundationFeatures: [
          {
            name: 'Elemental Incarnation',
            description: 'Mark a Stress to Channel fire, earth, water, or air, each with unique combat benefits.',
          },
        ],
      },
      {
        id: 'warden-of-renewal',
        name: 'Warden of Renewal',
        spellcastTrait: 'Instinct',
        foundationFeatures: [
          {
            name: 'Clarity of Nature',
            description: 'Create a serene space, allies clear Stress equal to your Instinct.',
          },
          {
            name: 'Regeneration',
            description: 'Spend 3 Hope, target clears 1d4 HP.',
          },
        ],
      },
    ],
    classFeatures: [
      {
        name: 'Beastform',
        description: 'Mark a Stress to transform into a creature of your tier or lower. Gain Beastform features and a specified attack trait. Cannot use weapons or cast spells while transformed.',
      },
      {
        name: 'Wildtouch',
        description: 'Perform harmless nature effects at will — grow flowers, create a gust of wind, start a campfire.',
      },
    ],
    hopeFeature: {
      name: 'Evolution',
      description: 'Spend 3 Hope to transform into Beastform without marking Stress; choose one trait to raise by +1.',
    },
    classItems: ['Small bag of rocks and bones', 'Strange pendant found in the dirt'],
    suggestedTraits: { agility: 1, strength: 0, finesse: 0, instinct: 2, presence: 1, knowledge: -1 },
  },
  {
    id: 'guardian',
    name: 'Guardian',
    description: 'An unstoppable defender who charges into battle headfirst and protects allies with their own life.',
    domains: ['Valor', 'Blade'],
    evasion: 9,
    hp: 7,
    stress: 6,
    subclasses: [
      {
        id: 'stalwart',
        name: 'Stalwart',
        spellcastTrait: null,
        foundationFeatures: [
          {
            name: 'Unwavering',
            description: '+1 to damage thresholds.',
          },
          {
            name: 'Iron Will',
            description: 'Mark an additional Armor Slot to reduce severity of physical damage by one threshold.',
          },
        ],
      },
      {
        id: 'vengeance',
        name: 'Vengeance',
        spellcastTrait: null,
        foundationFeatures: [
          {
            name: 'At Ease',
            description: 'Gain an additional Stress slot.',
          },
          {
            name: 'Revenge',
            description: 'When adversary in Melee succeeds on attack against you, mark 2 Stress to force them to mark a HP.',
          },
        ],
      },
    ],
    classFeatures: [
      {
        name: 'Unstoppable',
        description: 'Once per long rest, become Unstoppable with an Unstoppable Die (d4). After dealing 1+ HP damage, increase die value. While Unstoppable: reduce physical damage severity by one threshold, add die to damage, immune to Restrained/Vulnerable.',
      },
    ],
    hopeFeature: {
      name: 'Frontline Tank',
      description: 'Spend 3 Hope to clear 2 Armor Slots.',
    },
    classItems: ['Totem from your mentor', 'Secret key'],
    suggestedTraits: { agility: 0, strength: 2, finesse: -1, instinct: 1, presence: 0, knowledge: 1 },
  },
  {
    id: 'ranger',
    name: 'Ranger',
    description: 'A cunning hunter who tracks prey and strikes with deadly precision from range or up close.',
    domains: ['Bone', 'Sage'],
    evasion: 12,
    hp: 6,
    stress: 6,
    subclasses: [
      {
        id: 'beastbound',
        name: 'Beastbound',
        spellcastTrait: 'Agility',
        foundationFeatures: [
          {
            name: 'Companion',
            description: 'You have an animal companion that stays by your side with its own stats and leveling system.',
          },
        ],
      },
      {
        id: 'wayfinder',
        name: 'Wayfinder',
        spellcastTrait: 'Agility',
        foundationFeatures: [
          {
            name: 'Ruthless Predator',
            description: 'Mark Stress for +1 Proficiency on damage; Severe damage forces adversary to mark Stress.',
          },
          {
            name: 'Path Forward',
            description: 'You can always identify the shortest path to previously visited locations.',
          },
        ],
      },
    ],
    classFeatures: [
      {
        name: "Ranger's Focus",
        description: 'Spend a Hope and attack a target. On success, deal damage and make them your Focus. Know their direction, they mark Stress when you deal damage, on a failed attack you can end Focus to reroll.',
      },
    ],
    hopeFeature: {
      name: 'Hold Them Off',
      description: 'Spend 3 Hope on a successful weapon attack to use the same roll against two additional adversaries in range.',
    },
    classItems: ['Trophy from your first kill', 'Seemingly broken compass'],
    suggestedTraits: { agility: 2, strength: 0, finesse: 1, instinct: 1, presence: -1, knowledge: 0 },
  },
  {
    id: 'rogue',
    name: 'Rogue',
    description: 'A shadow-wielding trickster who strikes from the darkness and manipulates the world through stealth and cunning.',
    domains: ['Midnight', 'Grace'],
    evasion: 12,
    hp: 6,
    stress: 6,
    subclasses: [
      {
        id: 'nightwalker',
        name: 'Nightwalker',
        spellcastTrait: 'Finesse',
        foundationFeatures: [
          {
            name: 'Shadow Stepper',
            description: 'Mark a Stress to disappear and reappear in another shadow within Far range, becoming Cloaked.',
          },
        ],
      },
      {
        id: 'syndicate',
        name: 'Syndicate',
        spellcastTrait: 'Finesse',
        foundationFeatures: [
          {
            name: 'Well-Connected',
            description: 'When arriving in a prominent town, you know somebody there. Name them, note their usefulness, choose a complication.',
          },
        ],
      },
    ],
    classFeatures: [
      {
        name: 'Cloaked',
        description: 'When you would be Hidden, you are Cloaked instead — remain unseen even if adversary moves to your position, as long as you are stationary.',
      },
      {
        name: 'Sneak Attack',
        description: 'On a successful attack while Cloaked or while an ally is in Melee range of target, add d6s equal to your tier to damage.',
      },
    ],
    hopeFeature: {
      name: "Rogue's Dodge",
      description: 'Spend 3 Hope for +2 Evasion until an attack succeeds against you or until next rest.',
    },
    classItems: ['Set of forgery tools', 'Grappling hook'],
    suggestedTraits: { agility: 1, strength: -1, finesse: 2, instinct: 1, presence: 0, knowledge: 0 },
  },
  {
    id: 'seraph',
    name: 'Seraph',
    description: 'A divine warrior empowered by prayer who channels holy magic to heal allies and smite foes.',
    domains: ['Splendor', 'Valor'],
    evasion: 9,
    hp: 7,
    stress: 6,
    subclasses: [
      {
        id: 'divine-wielder',
        name: 'Divine Wielder',
        spellcastTrait: 'Strength',
        foundationFeatures: [
          {
            name: 'Spirit Weapon',
            description: 'Your equipped Melee weapon can fly to attack at Close range and return. Mark Stress to hit an additional target.',
          },
          {
            name: 'Sparing Touch',
            description: 'Once per long rest, clear 2 HP or 2 Stress from a touched creature.',
          },
        ],
      },
      {
        id: 'winged-sentinel',
        name: 'Winged Sentinel',
        spellcastTrait: 'Strength',
        foundationFeatures: [
          {
            name: 'Wings of Light',
            description: 'You can fly. While flying: mark Stress to carry a willing creature; spend Hope for extra 1d8 damage on successful attack.',
          },
        ],
      },
    ],
    classFeatures: [
      {
        name: 'Prayer Dice',
        description: 'At session start, roll d4s equal to your Spellcast trait. Spend any number to: reduce incoming damage, add to a roll result, or gain Hope equal to the value.',
      },
    ],
    hopeFeature: {
      name: 'Life Support',
      description: 'Spend 3 Hope to clear a Hit Point on an ally within Close range.',
    },
    classItems: ['Bundle of offerings', 'Sigil of your god'],
    suggestedTraits: { agility: 0, strength: 2, finesse: -1, instinct: 0, presence: 1, knowledge: 1 },
  },
  {
    id: 'sorcerer',
    name: 'Sorcerer',
    description: "A wielder of raw, volatile magic born with innate power that they've learned to channel and unleash.",
    domains: ['Arcana', 'Midnight'],
    evasion: 10,
    hp: 6,
    stress: 6,
    subclasses: [
      {
        id: 'elemental-origin',
        name: 'Elemental Origin',
        spellcastTrait: 'Instinct',
        foundationFeatures: [
          {
            name: 'Elementalist',
            description: 'Choose an element (air/earth/fire/lightning/water). Spend Hope for +2 to a roll or +3 to damage when describing elemental aid.',
          },
        ],
      },
      {
        id: 'primal-origin',
        name: 'Primal Origin',
        spellcastTrait: 'Instinct',
        foundationFeatures: [
          {
            name: 'Manipulate Magic',
            description: 'After casting a spell or magic weapon attack, mark Stress to: extend range, +2 to roll, double a damage die, or hit additional target.',
          },
        ],
      },
    ],
    classFeatures: [
      {
        name: 'Arcane Sense',
        description: 'You can sense the presence of magical people and objects within Close range.',
      },
      {
        name: 'Minor Illusion',
        description: 'Make a Spellcast Roll (10). On a success, create a minor visual illusion within Close range.',
      },
      {
        name: 'Channel Raw Power',
        description: 'Once per long rest, vault a domain card to gain Hope equal to card level OR bonus to damage equal to 2x card level.',
      },
    ],
    hopeFeature: {
      name: 'Volatile Magic',
      description: 'Spend 3 Hope to reroll any number of damage dice on a magic damage attack.',
    },
    classItems: ['Whispering orb', 'Family heirloom'],
    suggestedTraits: { agility: 0, strength: -1, finesse: 1, instinct: 2, presence: 1, knowledge: 0 },
  },
  {
    id: 'warrior',
    name: 'Warrior',
    description: 'A master of weapons and combat tactics who dominates the battlefield through sheer martial prowess.',
    domains: ['Blade', 'Bone'],
    evasion: 11,
    hp: 6,
    stress: 6,
    subclasses: [
      {
        id: 'call-of-the-brave',
        name: 'Call of the Brave',
        spellcastTrait: null,
        foundationFeatures: [
          {
            name: 'Courage',
            description: 'Gain Hope on Fear rolls.',
          },
          {
            name: 'Battle Ritual',
            description: 'Once per long rest, before danger, clear 2 Stress and gain 2 Hope.',
          },
        ],
      },
      {
        id: 'call-of-the-slayer',
        name: 'Call of the Slayer',
        spellcastTrait: null,
        foundationFeatures: [
          {
            name: 'Slayer',
            description: 'Pool of Slayer Dice. On Hope rolls, place d6 in pool instead of gaining Hope (max = Proficiency). Spend dice on attack/damage rolls.',
          },
        ],
      },
    ],
    classFeatures: [
      {
        name: 'Attack of Opportunity',
        description: 'When adversary in Melee tries to leave, reaction roll vs Difficulty. On success choose: stop movement, deal primary weapon damage, or move with them.',
      },
      {
        name: 'Combat Training',
        description: 'Ignore burden on weapons. Add your level as bonus to physical damage rolls.',
      },
    ],
    hopeFeature: {
      name: 'No Mercy',
      description: 'Spend 3 Hope for +1 to attack rolls until next rest.',
    },
    classItems: ['Drawing of a lover', 'Sharpening stone'],
    suggestedTraits: { agility: 1, strength: 2, finesse: 1, instinct: 0, presence: 0, knowledge: -1 },
  },
  {
    id: 'wizard',
    name: 'Wizard',
    description: 'A studious practitioner of arcane knowledge who wields powerful spells from ancient tomes and grimoires.',
    domains: ['Codex', 'Splendor'],
    evasion: 11,
    hp: 5,
    stress: 6,
    subclasses: [
      {
        id: 'school-of-knowledge',
        name: 'School of Knowledge',
        spellcastTrait: 'Knowledge',
        foundationFeatures: [
          {
            name: 'Prepared',
            description: 'Take an additional domain card at character creation.',
          },
          {
            name: 'Adept',
            description: 'Mark Stress instead of spending Hope on Experience to double the modifier.',
          },
        ],
      },
      {
        id: 'school-of-war',
        name: 'School of War',
        spellcastTrait: 'Knowledge',
        foundationFeatures: [
          {
            name: 'Battle Magic',
            description: 'When you deal damage with a spell, add your Knowledge to the damage roll.',
          },
          {
            name: 'Tactical Mind',
            description: 'Once per rest, when an ally within Close range makes an action roll, you can add your Knowledge to their result.',
          },
        ],
      },
    ],
    classFeatures: [
      {
        name: 'Prestidigitation',
        description: 'Harmless subtle magical effects at will — change color, light candle, float tiny object, repair small object.',
      },
      {
        name: 'Strange Patterns',
        description: 'Choose a number 1-12. When you roll it on a Duality Die, gain Hope or clear Stress. Change on long rest.',
      },
    ],
    hopeFeature: {
      name: 'Not This Time',
      description: 'Spend 3 Hope to force an adversary within Far range to reroll an attack or damage roll.',
    },
    classItems: ["Book you're trying to translate", 'Tiny, harmless elemental pet'],
    suggestedTraits: { agility: -1, strength: 0, finesse: 0, instinct: 1, presence: 1, knowledge: 2 },
  },
];
