import { type Character, EMPTY_CHARACTER, type TraitName } from '../types/character';

export type CharacterAction =
  | { type: 'SET_CLASS'; className: string; hp: number; evasion: number; stress: number }
  | { type: 'SET_SUBCLASS'; subclass: string }
  | { type: 'SET_ANCESTRY'; ancestry: string; topSource: string; bottomSource: string }
  | { type: 'SET_COMMUNITY'; community: string }
  | { type: 'SET_TRAITS'; traits: Record<TraitName, number> }
  | { type: 'SET_DOMAIN_CARDS'; cards: string[] }
  | { type: 'SET_PRIMARY_WEAPON'; weapon: string }
  | { type: 'SET_SECONDARY_WEAPON'; weapon: string }
  | { type: 'SET_ARMOR'; armor: string }
  | { type: 'SET_CLASS_ITEM'; item: string }
  | { type: 'SET_POTION'; choice: 'health' | 'stamina' }
  | { type: 'SET_NAME'; name: string }
  | { type: 'SET_PRONOUNS'; pronouns: string }
  | { type: 'SET_BACKGROUND'; background: string }
  | { type: 'SET_DESCRIPTION'; description: string }
  | { type: 'SET_EXPERIENCE'; index: number; name: string }
  | { type: 'LOAD_CHARACTER'; character: Character }
  | { type: 'RESET' };

export function characterReducer(state: Character, action: CharacterAction): Character {
  switch (action.type) {
    case 'SET_CLASS':
      return {
        ...EMPTY_CHARACTER,
        name: state.name,
        pronouns: state.pronouns,
        className: action.className,
        hp: action.hp,
        evasion: action.evasion,
        stress: action.stress,
      };
    case 'SET_SUBCLASS':
      return { ...state, subclass: action.subclass };
    case 'SET_ANCESTRY':
      return {
        ...state,
        ancestry: action.ancestry,
        ancestryTopSource: action.topSource,
        ancestryBottomSource: action.bottomSource,
      };
    case 'SET_COMMUNITY':
      return { ...state, community: action.community };
    case 'SET_TRAITS':
      return { ...state, traits: action.traits };
    case 'SET_DOMAIN_CARDS':
      return { ...state, domainCards: action.cards };
    case 'SET_PRIMARY_WEAPON':
      return { ...state, primaryWeapon: action.weapon };
    case 'SET_SECONDARY_WEAPON':
      return { ...state, secondaryWeapon: action.weapon };
    case 'SET_ARMOR':
      return { ...state, armor: action.armor };
    case 'SET_CLASS_ITEM':
      return { ...state, classItem: action.item };
    case 'SET_POTION':
      return { ...state, potionChoice: action.choice };
    case 'SET_NAME':
      return { ...state, name: action.name };
    case 'SET_PRONOUNS':
      return { ...state, pronouns: action.pronouns };
    case 'SET_BACKGROUND':
      return { ...state, background: action.background };
    case 'SET_DESCRIPTION':
      return { ...state, characterDescription: action.description };
    case 'SET_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.map((exp, i) =>
          i === action.index ? { ...exp, name: action.name } : exp
        ),
      };
    case 'LOAD_CHARACTER':
      return { ...EMPTY_CHARACTER, ...action.character };
    case 'RESET':
      return EMPTY_CHARACTER;
    default:
      return state;
  }
}
