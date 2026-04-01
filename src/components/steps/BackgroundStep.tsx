import { useCharacter } from '../../context/CharacterContext';
import { WizardShell } from '../WizardShell';

const DESCRIPTION_OPTIONS = {
  clothes: ['always moving', 'flamboyant', 'inconspicuous', 'layered', 'ornate', 'tight'],
  eyes: ['carnations', 'earth', 'endless ocean', 'fire', 'ivy', 'lilacs', 'night', 'seafoam', 'winter'],
  body: ['broad', 'carved', 'curvy', 'lanky', 'rotund', 'short', 'stocky', 'tall', 'thin', 'tiny', 'toned'],
  skin: ['ashes', 'clover', 'falling snow', 'fine sand', 'obsidian', 'rose', 'sapphire', 'wisteria'],
  attitude: ['a celebrity', 'a commander', 'a politician', 'a prankster', 'a wolf in sheep\'s clothing'],
};

export function BackgroundStep() {
  const { character, dispatch } = useCharacter();

  return (
    <WizardShell
      step={7}
      title="Background & Description"
      subtitle="Name your character and describe who they are."
      canNext={!!character.name}
    >
      <div className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-dh-text-muted mb-1">Character Name</label>
            <input
              type="text"
              value={character.name}
              onChange={(e) => dispatch({ type: 'SET_NAME', name: e.target.value })}
              placeholder="Enter name..."
              className="w-full px-3 py-2 rounded bg-dh-card border border-dh-border text-dh-text placeholder:text-dh-text-dim focus:outline-none focus:border-dh-gold"
            />
          </div>
          <div>
            <label className="block text-sm text-dh-text-muted mb-1">Pronouns</label>
            <input
              type="text"
              value={character.pronouns}
              onChange={(e) => dispatch({ type: 'SET_PRONOUNS', pronouns: e.target.value })}
              placeholder="e.g. She/Her, He/Him, They/Them"
              className="w-full px-3 py-2 rounded bg-dh-card border border-dh-border text-dh-text placeholder:text-dh-text-dim focus:outline-none focus:border-dh-gold"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-dh-text-muted mb-1">Character Description</label>
          <textarea
            value={character.characterDescription}
            onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', description: e.target.value })}
            placeholder="Describe your character's appearance..."
            rows={3}
            className="w-full px-3 py-2 rounded bg-dh-card border border-dh-border text-dh-text placeholder:text-dh-text-dim focus:outline-none focus:border-dh-gold resize-y"
          />
          <div className="mt-2 space-y-2">
            {Object.entries(DESCRIPTION_OPTIONS).map(([category, options]) => (
              <div key={category} className="flex flex-wrap gap-1.5 items-center">
                <span className="text-xs text-dh-text-dim capitalize w-16">{category}:</span>
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      const current = character.characterDescription;
                      const addition = current ? `, ${opt}` : opt;
                      dispatch({ type: 'SET_DESCRIPTION', description: current + addition });
                    }}
                    className="text-xs px-2 py-0.5 rounded border border-dh-border text-dh-text-muted hover:text-dh-gold hover:border-dh-gold-dark transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-dh-text-muted mb-1">Background / Backstory</label>
          <textarea
            value={character.background}
            onChange={(e) => dispatch({ type: 'SET_BACKGROUND', background: e.target.value })}
            placeholder="What is your character's story? Where did they come from? What drives them?"
            rows={5}
            className="w-full px-3 py-2 rounded bg-dh-card border border-dh-border text-dh-text placeholder:text-dh-text-dim focus:outline-none focus:border-dh-gold resize-y"
          />
        </div>
      </div>
    </WizardShell>
  );
}
