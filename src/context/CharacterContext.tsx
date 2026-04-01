import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { type Character, EMPTY_CHARACTER } from '../types/character';
import { characterReducer, type CharacterAction } from './characterReducer';

interface CharacterContextValue {
  character: Character;
  dispatch: React.Dispatch<CharacterAction>;
}

const CharacterContext = createContext<CharacterContextValue | null>(null);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [character, dispatch] = useReducer(characterReducer, EMPTY_CHARACTER);
  return (
    <CharacterContext.Provider value={{ character, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const ctx = useContext(CharacterContext);
  if (!ctx) throw new Error('useCharacter must be used within CharacterProvider');
  return ctx;
}
