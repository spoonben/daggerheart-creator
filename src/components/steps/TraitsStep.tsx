import { useState, useEffect } from 'react';
import { useCharacter } from '../../context/CharacterContext';
import { CLASSES } from '../../data/classes';
import { WizardShell } from '../WizardShell';
import { TRAIT_NAMES, TRAIT_VERBS, type TraitName } from '../../types/character';

const MODIFIER_OPTIONS = [2, 1, 1, 0, 0, -1];

export function TraitsStep() {
  const { character, dispatch } = useCharacter();
  const cls = CLASSES.find((c) => c.id === character.className);
  const suggested = cls?.suggestedTraits;

  const [assignments, setAssignments] = useState<Record<TraitName, number | null>>(() => {
    const sum = Object.values(character.traits).reduce((a, b) => a + b, 0);
    if (sum === 3) {
      return character.traits as Record<TraitName, number>;
    }
    return { agility: null, strength: null, finesse: null, instinct: null, presence: null, knowledge: null };
  });

  const assignedValues = TRAIT_NAMES.map((t) => assignments[t]).filter((v) => v !== null) as number[];

  const isModifierAvailable = (value: number, currentTrait: TraitName) => {
    const pool = [...MODIFIER_OPTIONS];
    for (const t of TRAIT_NAMES) {
      if (t === currentTrait) continue;
      const assigned = assignments[t];
      if (assigned !== null) {
        const idx = pool.indexOf(assigned);
        if (idx !== -1) pool.splice(idx, 1);
      }
    }
    return pool.includes(value);
  };

  const handleAssign = (trait: TraitName, value: number | null) => {
    setAssignments((prev) => ({ ...prev, [trait]: value }));
  };

  const allAssigned = TRAIT_NAMES.every((t) => assignments[t] !== null);
  const sum = allAssigned ? Object.values(assignments).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) : null;
  const isValid = allAssigned && sum === 3;

  useEffect(() => {
    if (isValid) {
      dispatch({ type: 'SET_TRAITS', traits: assignments as Record<TraitName, number> });
    }
  }, [isValid, assignments, dispatch]);

  const applySuggested = () => {
    if (suggested) {
      setAssignments(suggested as Record<TraitName, number>);
    }
  };

  const uniqueModifiers = [...new Set(MODIFIER_OPTIONS)].sort((a, b) => b - a);

  return (
    <WizardShell
      step={4}
      title="Assign Character Traits"
      subtitle="Distribute modifiers (+2, +1, +1, 0, 0, -1) across your six traits."
      canNext={isValid}
    >
      {suggested && (
        <button
          onClick={applySuggested}
          className="mb-4 text-sm px-4 py-2 rounded border border-dh-gold-dark text-dh-gold-dark hover:bg-dh-selected transition-colors"
        >
          Use Suggested ({cls?.name})
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRAIT_NAMES.map((trait) => {
          const value = assignments[trait];
          return (
            <div
              key={trait}
              className={`p-4 rounded-lg border-2 transition-colors ${
                value !== null ? 'border-dh-gold-dark/50 bg-dh-selected' : 'border-dh-border bg-dh-card'
              }`}
            >
              <h4 className="font-heading text-sm font-semibold text-dh-gold capitalize mb-0.5">
                {trait}
              </h4>
              <p className="text-xs text-dh-text-dim mb-3">{TRAIT_VERBS[trait]}</p>

              <div className="flex gap-2 flex-wrap">
                {uniqueModifiers.map((mod) => {
                  const isSelected = value === mod;
                  const available = isModifierAvailable(mod, trait);
                  const count = MODIFIER_OPTIONS.filter((m) => m === mod).length;
                  const usedCount = TRAIT_NAMES.filter((t) => t !== trait && assignments[t] === mod).length;
                  const remaining = count - usedCount;

                  return (
                    <button
                      key={mod}
                      onClick={() => handleAssign(trait, isSelected ? null : mod)}
                      disabled={!isSelected && (!available || remaining <= 0)}
                      className={`w-12 h-10 rounded text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-dh-gold text-dh-bg'
                          : available && remaining > 0
                            ? 'bg-dh-card-hover text-dh-text border border-dh-border hover:border-dh-gold-dark'
                            : 'bg-dh-card text-dh-text-dim opacity-40 cursor-not-allowed'
                      }`}
                    >
                      {mod >= 0 ? `+${mod}` : mod}
                    </button>
                  );
                })}
              </div>

              {value !== null && (
                <p className="text-xs text-dh-gold mt-2">
                  Modifier: {value >= 0 ? `+${value}` : value}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-dh-surface border border-dh-border">
        <div className="flex justify-between text-sm">
          <span className="text-dh-text-muted">
            Assigned: {assignedValues.length}/6
          </span>
          {allAssigned && (
            <span className={sum === 3 ? 'text-dh-gold' : 'text-dh-red-light'}>
              Total: {sum} {sum === 3 ? '(Valid)' : '(Should be 3)'}
            </span>
          )}
        </div>
        {character.className && (
          <div className="mt-2 text-xs text-dh-text-dim">
            Base Evasion: {cls?.evasion} | Base HP: {cls?.hp}
          </div>
        )}
      </div>
    </WizardShell>
  );
}
