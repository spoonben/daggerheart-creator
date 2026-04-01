import { useCharacter } from '../../context/CharacterContext';
import { CLASSES } from '../../data/classes';
import { WizardShell } from '../WizardShell';

export function SubclassStep() {
  const { character, dispatch } = useCharacter();
  const cls = CLASSES.find((c) => c.id === character.className);

  if (!cls) {
    return (
      <WizardShell step={2} title="Choose Your Subclass" canNext={false}>
        <p className="text-dh-text-muted">Please select a class first.</p>
      </WizardShell>
    );
  }

  return (
    <WizardShell
      step={2}
      title="Choose Your Subclass"
      subtitle={`Choose a subclass for your ${cls.name}. Each subclass defines your unique abilities.`}
      canNext={!!character.subclass}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cls.subclasses.map((sub) => {
          const isSelected = character.subclass === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => dispatch({ type: 'SET_SUBCLASS', subclass: sub.id })}
              className={`text-left p-5 rounded-lg border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-dh-gold bg-dh-selected shadow-[0_0_12px_rgba(196,164,78,0.15)]'
                  : 'border-dh-border bg-dh-card hover:border-dh-gold-dark hover:bg-dh-card-hover'
              }`}
            >
              <h3 className={`font-heading text-lg font-semibold mb-1 ${isSelected ? 'text-dh-gold' : 'text-dh-text'}`}>
                {sub.name}
              </h3>
              {sub.spellcastTrait && (
                <p className="text-xs text-dh-text-dim mb-3">
                  Spellcast Trait: <span className="text-dh-gold-dark">{sub.spellcastTrait}</span>
                </p>
              )}
              <div className="space-y-3">
                {sub.foundationFeatures.map((feat) => (
                  <div key={feat.name}>
                    <h4 className="text-sm font-medium text-dh-gold-dark mb-0.5">{feat.name}</h4>
                    <p className="text-sm text-dh-text-muted leading-relaxed">{feat.description}</p>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-dh-surface border border-dh-border">
        <h3 className="font-heading text-lg text-dh-gold-dark mb-3">Class Features</h3>
        <div className="space-y-3">
          {cls.classFeatures.map((feat) => (
            <div key={feat.name}>
              <h4 className="text-sm font-medium text-dh-text">{feat.name}</h4>
              <p className="text-sm text-dh-text-muted">{feat.description}</p>
            </div>
          ))}
          <div>
            <h4 className="text-sm font-medium text-dh-text">
              Hope Feature: {cls.hopeFeature.name}
            </h4>
            <p className="text-sm text-dh-text-muted">{cls.hopeFeature.description}</p>
          </div>
        </div>
      </div>
    </WizardShell>
  );
}
