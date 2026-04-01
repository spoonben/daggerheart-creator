import { useCharacter } from '../../context/CharacterContext';
import { CLASSES } from '../../data/classes';
import { PRIMARY_WEAPONS, SECONDARY_WEAPONS, ARMOR } from '../../data/equipment';
import { WizardShell } from '../WizardShell';
import type { WeaponData, ArmorData } from '../../types/character';

function WeaponCard({ weapon, isSelected, onClick }: { weapon: WeaponData; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-3 rounded-lg border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-dh-gold bg-dh-selected'
          : 'border-dh-border bg-dh-card hover:border-dh-gold-dark hover:bg-dh-card-hover'
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className={`text-sm font-medium ${isSelected ? 'text-dh-gold' : 'text-dh-text'}`}>{weapon.name}</h4>
        <span className="text-xs px-1.5 py-0.5 rounded bg-dh-border/50 text-dh-text-dim">{weapon.hands}</span>
      </div>
      <div className="flex gap-3 text-xs text-dh-text-muted">
        <span>{weapon.trait}</span>
        <span>{weapon.range}</span>
        <span className="text-dh-red-light">{weapon.damage} {weapon.damageType === 'magic' ? 'mag' : 'phys'}</span>
      </div>
      {weapon.feature && <p className="text-xs text-dh-text-dim mt-1">{weapon.feature}</p>}
    </button>
  );
}

export function EquipmentStep() {
  const { character, dispatch } = useCharacter();
  const cls = CLASSES.find((c) => c.id === character.className);
  const hasSpellcast = cls?.subclasses.some((s) => s.id === character.subclass && s.spellcastTrait);

  const primaryWeapon = PRIMARY_WEAPONS.find((w) => w.id === character.primaryWeapon);
  const needsSecondary = primaryWeapon?.hands === '1H';

  const physicalWeapons = PRIMARY_WEAPONS.filter((w) => w.category === 'primary-physical');
  const magicWeapons = PRIMARY_WEAPONS.filter((w) => w.category === 'primary-magic');

  const canNext = !!character.primaryWeapon && !!character.armor &&
    (!needsSecondary || !!character.secondaryWeapon) &&
    !!character.potionChoice && !!character.classItem;

  return (
    <WizardShell
      step={6}
      title="Choose Starting Equipment"
      subtitle="Select your weapons, armor, and starting items."
      canNext={canNext}
    >
      <div className="space-y-8">
        <section>
          <h3 className="font-heading text-lg text-dh-gold-dark mb-3">Primary Weapon</h3>
          <p className="text-xs text-dh-text-dim mb-3">Choose a two-handed weapon, or a one-handed weapon (then pick a secondary).</p>
          <h4 className="text-sm text-dh-text-muted mb-2">Physical Weapons</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
            {physicalWeapons.map((w) => (
              <WeaponCard
                key={w.id}
                weapon={w}
                isSelected={character.primaryWeapon === w.id}
                onClick={() => {
                  dispatch({ type: 'SET_PRIMARY_WEAPON', weapon: w.id });
                  if (w.hands === '2H') dispatch({ type: 'SET_SECONDARY_WEAPON', weapon: '' });
                }}
              />
            ))}
          </div>

          {hasSpellcast && (
            <>
              <h4 className="text-sm text-dh-text-muted mb-2">Magic Weapons</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {magicWeapons.map((w) => (
                  <WeaponCard
                    key={w.id}
                    weapon={w}
                    isSelected={character.primaryWeapon === w.id}
                    onClick={() => {
                      dispatch({ type: 'SET_PRIMARY_WEAPON', weapon: w.id });
                      if (w.hands === '2H') dispatch({ type: 'SET_SECONDARY_WEAPON', weapon: '' });
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {needsSecondary && (
          <section>
            <h3 className="font-heading text-lg text-dh-gold-dark mb-3">Secondary Weapon</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SECONDARY_WEAPONS.map((w) => (
                <WeaponCard
                  key={w.id}
                  weapon={w}
                  isSelected={character.secondaryWeapon === w.id}
                  onClick={() => dispatch({ type: 'SET_SECONDARY_WEAPON', weapon: w.id })}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="font-heading text-lg text-dh-gold-dark mb-3">Armor</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ARMOR.map((a: ArmorData) => {
              const isSelected = character.armor === a.id;
              const minorT = a.baseThresholds.minor + character.level;
              const majorT = a.baseThresholds.major + character.level;
              return (
                <button
                  key={a.id}
                  onClick={() => dispatch({ type: 'SET_ARMOR', armor: a.id })}
                  className={`text-left p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-dh-gold bg-dh-selected'
                      : 'border-dh-border bg-dh-card hover:border-dh-gold-dark hover:bg-dh-card-hover'
                  }`}
                >
                  <h4 className={`font-medium mb-1 ${isSelected ? 'text-dh-gold' : 'text-dh-text'}`}>{a.name}</h4>
                  <div className="flex gap-4 text-xs text-dh-text-muted">
                    <span>Minor: &lt;{minorT}</span>
                    <span>Major: {minorT}-{majorT - 1}</span>
                    <span>Severe: {majorT}+</span>
                    <span>Score: {a.baseScore}</span>
                  </div>
                  {a.feature && <p className="text-xs text-dh-text-dim mt-1">{a.feature}</p>}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="font-heading text-lg text-dh-gold-dark mb-3">Starting Items</h3>
          <div className="p-3 rounded bg-dh-surface border border-dh-border text-sm text-dh-text-muted mb-4">
            Included: Torch, 50 feet of rope, Basic supplies, A handful of gold
          </div>

          <h4 className="text-sm text-dh-text-muted mb-2">Choose a Potion</h4>
          <div className="flex gap-3 mb-4">
            {(['health', 'stamina'] as const).map((p) => (
              <button
                key={p}
                onClick={() => dispatch({ type: 'SET_POTION', choice: p })}
                className={`flex-1 p-3 rounded-lg border-2 transition-all cursor-pointer text-sm ${
                  character.potionChoice === p
                    ? 'border-dh-gold bg-dh-selected text-dh-gold'
                    : 'border-dh-border bg-dh-card text-dh-text-muted hover:border-dh-gold-dark'
                }`}
              >
                {p === 'health' ? 'Minor Health Potion (clear 1d4 HP)' : 'Minor Stamina Potion (clear 1d4 Stress)'}
              </button>
            ))}
          </div>

          {cls && (
            <>
              <h4 className="text-sm text-dh-text-muted mb-2">Choose a Class Item</h4>
              <div className="flex gap-3">
                {cls.classItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => dispatch({ type: 'SET_CLASS_ITEM', item })}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all cursor-pointer text-sm ${
                      character.classItem === item
                        ? 'border-dh-gold bg-dh-selected text-dh-gold'
                        : 'border-dh-border bg-dh-card text-dh-text-muted hover:border-dh-gold-dark'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </WizardShell>
  );
}
