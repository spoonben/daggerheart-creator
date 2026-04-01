import { useCharacter } from '../../context/CharacterContext';
import { CLASSES } from '../../data/classes';
import { CardSelect } from '../CardSelect';
import { WizardShell } from '../WizardShell';
import type { ClassData } from '../../types/character';

export function ClassStep() {
  const { character, dispatch } = useCharacter();

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

  return (
    <WizardShell
      step={1}
      title="Choose Your Class"
      subtitle="Your class determines your role, abilities, and domains."
      canNext={!!character.className}
    >
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
