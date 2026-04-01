import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';
import { CLASSES } from '../../data/classes';
import { CardSelect } from '../CardSelect';
import { WizardShell } from '../WizardShell';
import type { Character, ClassData } from '../../types/character';

function getSavedCharacter(): Character | null {
  try {
    const raw = localStorage.getItem('daggerheart-character');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.className) return parsed as Character;
    return null;
  } catch {
    return null;
  }
}

export function ClassStep() {
  const { character, dispatch } = useCharacter();
  const navigate = useNavigate();
  const [savedChar] = useState(getSavedCharacter);
  const [dismissed, setDismissed] = useState(false);

  const handleLoad = () => {
    if (!savedChar) return;
    dispatch({ type: 'LOAD_CHARACTER', character: savedChar });
    navigate('/review');
  };

  const handleSelect = (id: string) => {
    const cls = CLASSES.find((c) => c.id === id)!;
    dispatch({
      type: 'SET_CLASS',
      className: cls.id,
      hp: cls.hp,
      evasion: cls.evasion,
      stress: cls.stress,
    });
  };

  const savedClassName = savedChar ? CLASSES.find((c) => c.id === savedChar.className)?.name : null;

  return (
    <WizardShell
      step={1}
      title="Choose Your Class"
      subtitle="Your class determines your role, abilities, and domains."
      canNext={!!character.className}
    >
      {savedChar && !dismissed && (
        <div className="mb-6 border border-dh-gold/30 rounded-lg bg-dh-surface/80 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-dh-text font-medium">
              Saved character found: <span className="text-dh-gold font-semibold">{savedChar.name || 'Unnamed'}</span>
              {savedClassName && (
                <span className="text-dh-text-muted"> — {savedClassName}</span>
              )}
            </p>
            <p className="text-xs text-dh-text-dim mt-0.5">Pick up where you left off by loading your saved character.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleLoad}
              className="px-4 py-2 rounded bg-gradient-to-b from-dh-gold-light to-dh-gold text-dh-bg font-semibold hover:from-dh-gold hover:to-dh-gold-dark transition-all text-sm shadow-[0_2px_10px_rgba(196,164,78,0.2)]"
            >
              Load Character
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="px-3 py-2 rounded border border-dh-border text-dh-text-muted hover:bg-dh-card transition-colors text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      <CardSelect
        items={CLASSES}
        selectedId={character.className}
        onSelect={handleSelect}
        getId={(c) => c.id}
        renderCard={(cls: ClassData, isSelected) => (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-heading text-lg font-semibold ${isSelected ? 'text-dh-gold' : 'text-dh-text'}`}>
                {cls.name}
              </h3>
              <div className="flex gap-1">
                {cls.domains.map((d) => (
                  <span key={d} className="text-xs px-2 py-0.5 rounded bg-dh-border/50 text-dh-text-muted">
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-dh-text-muted mb-3">{cls.description}</p>
            <div className="flex gap-4 text-xs text-dh-text-dim">
              <span>HP: <span className="text-dh-red-light font-medium">{cls.hp}</span></span>
              <span>Evasion: <span className="text-dh-blue font-medium">{cls.evasion}</span></span>
              <span>Stress: <span className="text-dh-text-muted font-medium">{cls.stress}</span></span>
            </div>
          </div>
        )}
      />
    </WizardShell>
  );
}
