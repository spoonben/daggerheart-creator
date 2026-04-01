import { useCharacter } from '../../context/CharacterContext';
import { WizardShell } from '../WizardShell';

const EXAMPLES = {
  Backgrounds: ['Assassin', 'Blacksmith', 'Bodyguard', 'Bounty Hunter', 'Chef to the Royal Family', 'Circus Performer', 'Con Artist', 'Fallen Monarch', 'Field Medic', 'High Priestess', 'Merchant', 'Noble', 'Pirate', 'Politician', 'Scholar', 'Sellsword', 'Soldier', 'Storyteller', 'Thief', 'World Traveler'],
  Characteristics: ['Affable', 'Battle-Hardened', 'Bookworm', 'Charming', 'Cowardly', 'Friend to All', 'Helpful', 'Intimidating Presence', 'Leader', 'Lone Wolf', 'Loyal', 'Observant', 'Silver Tongue', 'Stubborn to a Fault', 'Survivor'],
  Specialties: ['Acrobat', 'Gambler', 'Healer', 'Inventor', 'Magical Historian', 'Mapmaker', 'Master of Disguise', 'Navigator', 'Sharpshooter', 'Survivalist', 'Swashbuckler', 'Tactician'],
  Skills: ['Animal Whisperer', 'Barter', 'Deadly Aim', 'Fast Learner', 'Incredible Strength', 'Light Feet', 'Negotiator', 'Photographic Memory', 'Quick Hands', 'Repair', 'Scavenger', 'Tracker'],
  Phrases: ['Catch Me If You Can', 'Hold the Line', 'I Won\'t Let You Down', 'I\'ve Got Your Back', 'Knowledge Is Power', 'Never Again', 'No One Left Behind', 'The Show Must Go On'],
};

export function ExperiencesStep() {
  const { character, dispatch } = useCharacter();
  const canNext = character.experiences.every((e) => e.name.trim().length > 0);

  return (
    <WizardShell
      step={8}
      title="Create Your Experiences"
      subtitle="Experiences represent your character's expertise. Each has a +2 modifier you can apply by spending Hope."
      canNext={canNext}
    >
      <div className="space-y-6 max-w-2xl">
        {character.experiences.map((exp, i) => (
          <div key={i}>
            <label className="block text-sm text-dh-text-muted mb-1">
              Experience {i + 1} <span className="text-dh-gold-dark">(+{exp.modifier})</span>
            </label>
            <input
              type="text"
              value={exp.name}
              onChange={(e) => dispatch({ type: 'SET_EXPERIENCE', index: i, name: e.target.value })}
              placeholder="e.g. Assassin of the Sapphire Syndicate"
              className="w-full px-3 py-2 rounded bg-dh-card border border-dh-border text-dh-text placeholder:text-dh-text-dim focus:outline-none focus:border-dh-gold"
            />
          </div>
        ))}

        <div className="p-4 rounded-lg bg-dh-surface border border-dh-border">
          <h4 className="text-sm font-medium text-dh-gold-dark mb-3">Example Experiences</h4>
          <p className="text-xs text-dh-text-dim mb-3">Click to use as inspiration. Add flavor to make them unique!</p>
          {Object.entries(EXAMPLES).map(([category, examples]) => (
            <div key={category} className="mb-3">
              <h5 className="text-xs text-dh-text-muted mb-1">{category}</h5>
              <div className="flex flex-wrap gap-1.5">
                {examples.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => {
                      const emptyIdx = character.experiences.findIndex((e) => !e.name.trim());
                      if (emptyIdx !== -1) {
                        dispatch({ type: 'SET_EXPERIENCE', index: emptyIdx, name: ex });
                      }
                    }}
                    className="text-xs px-2 py-0.5 rounded border border-dh-border text-dh-text-muted hover:text-dh-gold hover:border-dh-gold-dark transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </WizardShell>
  );
}
