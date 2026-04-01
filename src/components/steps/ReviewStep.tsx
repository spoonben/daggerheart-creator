import { useCharacter } from '../../context/CharacterContext';
import { CLASSES } from '../../data/classes';
import { ANCESTRIES } from '../../data/ancestries';
import { COMMUNITIES } from '../../data/communities';
import { PRIMARY_WEAPONS, SECONDARY_WEAPONS, ARMOR } from '../../data/equipment';
import { DOMAIN_CARDS } from '../../data/domains';
import { TRAIT_NAMES, TRAIT_VERBS } from '../../types/character';
import { WizardShell } from '../WizardShell';

function SheetBox({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-dh-border rounded bg-dh-surface/50 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-1.5 bg-dh-card border-b border-dh-border">
      <h3 className="font-heading text-[10px] text-dh-gold uppercase tracking-[0.2em] font-semibold">{children}</h3>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[9px] text-dh-text-dim uppercase tracking-wider">{children}</span>;
}

function FieldValue({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`text-sm text-dh-text font-medium ${className}`}>{children}</span>;
}

function StatCircle({ value, label, color = 'text-dh-gold' }: { value: string | number; label: string; color?: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-12 h-12 rounded-full border-2 border-dh-border flex items-center justify-center bg-dh-card ${color}`}>
        <span className="text-lg font-bold">{value}</span>
      </div>
      <FieldLabel>{label}</FieldLabel>
    </div>
  );
}

function Checkbox({ checked = false }: { checked?: boolean }) {
  return (
    <div className={`w-4 h-4 rounded-sm border ${checked ? 'bg-dh-gold-dark border-dh-gold-dark' : 'border-dh-border bg-dh-card'}`} />
  );
}

function CheckboxRow({ total, filled = 0, label }: { total: number; filled?: number; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: total }, (_, i) => (
          <Checkbox key={i} checked={i < filled} />
        ))}
      </div>
    </div>
  );
}

function WeaponBlock({ label, name, trait, range, damage, damageType, feature }: {
  label: string; name: string; trait: string; range: string; damage: string; damageType: string; feature: string;
}) {
  return (
    <div className="px-3 py-2 border-b border-dh-border/30 last:border-0">
      <div className="text-[9px] text-dh-gold-dark uppercase tracking-wider mb-1 font-semibold">{label}</div>
      <div className="grid grid-cols-3 gap-2 mb-1">
        <div>
          <FieldLabel>Name</FieldLabel>
          <div className="text-xs text-dh-text font-medium">{name}</div>
        </div>
        <div>
          <FieldLabel>Trait & Range</FieldLabel>
          <div className="text-xs text-dh-text">{trait} &middot; {range}</div>
        </div>
        <div>
          <FieldLabel>Damage</FieldLabel>
          <div className="text-xs text-dh-text">{damage} <span className="text-dh-text-dim">{damageType}</span></div>
        </div>
      </div>
      {feature && (
        <div>
          <FieldLabel>Feature</FieldLabel>
          <div className="text-xs text-dh-text-muted">{feature}</div>
        </div>
      )}
    </div>
  );
}

function TierColumn({ tier, levels, intro, options, upgradeText, hasMulticlass = false, footer }: {
  tier: number; levels: string; intro: string; options: string[];
  upgradeText: string; hasMulticlass?: boolean; footer: string;
}) {
  return (
    <div className="p-3">
      <div className="text-center mb-2 pb-2 border-b-2 border-dh-gold-dark/50">
        <h4 className="font-heading text-xs text-dh-gold uppercase tracking-[0.2em] font-bold">
          Tier {tier}: <span className="text-dh-text">Levels {levels}</span>
        </h4>
      </div>
      <div className="text-center mb-2 px-1 py-1.5 bg-dh-card/50 rounded border border-dh-border/30">
        <p className="text-[9px] text-dh-text-muted leading-relaxed font-medium">{intro}</p>
      </div>
      <p className="text-[8px] text-dh-text-dim italic mb-1.5 text-center">
        Choose two options from the list below{tier > 2 ? ' or any from the previous tier' : ''} and mark them.
      </p>
      <div className="space-y-1.5">
        {options.map((opt, i) => (
          <div key={i} className="flex gap-1.5 items-start">
            <div className="flex gap-0.5 mt-0.5 shrink-0">
              <Checkbox />
              <Checkbox />
            </div>
            <p className="text-[9px] text-dh-text-muted leading-snug">{opt}</p>
          </div>
        ))}
        <div className="flex gap-1.5 items-start">
          <div className="flex gap-0.5 mt-0.5 shrink-0">
            <Checkbox />
            <Checkbox />
          </div>
          <p className="text-[9px] text-dh-text-muted leading-snug">{upgradeText}</p>
        </div>
        <div className="flex gap-1.5 items-start">
          <div className="flex gap-0.5 mt-0.5 shrink-0">
            <Checkbox />
          </div>
          <p className="text-[9px] text-dh-text-muted leading-snug">Increase your Proficiency by +1.</p>
        </div>
        {(hasMulticlass || tier === 2) && (
          <div className="flex gap-1.5 items-start">
            <div className="flex gap-0.5 mt-0.5 shrink-0">
              <Checkbox />
              <Checkbox />
            </div>
            <p className="text-[9px] text-dh-text-muted leading-snug">
              Multiclass: Choose an additional class for your character, then cross out an unused
              "Take an upgraded subclass card" and the other multiclass option on this sheet.
            </p>
          </div>
        )}
      </div>
      <div className="mt-2 pt-1.5 border-t border-dh-border/30">
        <p className="text-[8px] text-dh-text-dim leading-snug text-center">{footer}</p>
      </div>
    </div>
  );
}

export function ReviewStep() {
  const { character, dispatch } = useCharacter();

  const cls = CLASSES.find((c) => c.id === character.className);
  const sub = cls?.subclasses.find((s) => s.id === character.subclass);
  const topAnc = ANCESTRIES.find((a) => a.id === character.ancestryTopSource);
  const bottomAnc = ANCESTRIES.find((a) => a.id === character.ancestryBottomSource);
  const community = COMMUNITIES.find((c) => c.id === character.community);
  const primary = PRIMARY_WEAPONS.find((w) => w.id === character.primaryWeapon);
  const secondary = SECONDARY_WEAPONS.find((w) => w.id === character.secondaryWeapon);
  const armorData = ARMOR.find((a) => a.id === character.armor);
  const domainCards = character.domainCards.map((id) => DOMAIN_CARDS.find((c) => c.id === id)).filter(Boolean);

  const evasionMod = armorData?.feature.includes('+1 to Evasion') ? 1 : armorData?.feature.includes('-1 to Evasion') ? -1 : armorData?.feature.includes('-2 to Evasion') ? -2 : 0;
  const totalEvasion = character.evasion + evasionMod;

  const subFeatures = sub?.foundationFeatures ?? [];
  const classFeatures = cls?.classFeatures ?? [];

  const handleSave = () => {
    const data = JSON.stringify(character);
    localStorage.setItem('daggerheart-character', data);
    alert('Character saved!');
  };

  const handleReset = () => {
    if (confirm('Start over? This will clear all progress.')) {
      localStorage.removeItem('daggerheart-character');
      dispatch({ type: 'RESET' });
      window.location.hash = '/';
    }
  };

  const handlePrint = () => window.print();

  const heritage = character.ancestry === 'mixed'
    ? `Mixed (${topAnc?.name} / ${bottomAnc?.name})`
    : topAnc?.name ?? '—';

  return (
    <WizardShell step={9} title="Review Your Character" canNext={false}>
      <div className="max-w-4xl mx-auto">
        {/* ===== CHARACTER SHEET ===== */}
        <div className="border-2 border-dh-gold-dark/50 rounded-lg bg-dh-bg overflow-hidden" id="character-sheet">

          {/* HEADER */}
          <div className="px-4 py-3 bg-dh-surface border-b border-dh-border">
            <div className="flex items-baseline justify-between mb-2">
              <div>
                <h2 className="text-xl tracking-[0.15em] text-dh-gold uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                  Daggerheart
                </h2>
                <p className="text-[9px] text-dh-text-dim uppercase tracking-[0.3em]">Character Sheet</p>
              </div>
              <div className="flex items-center gap-1 bg-dh-card border border-dh-border rounded px-3 py-1">
                <FieldLabel>Level</FieldLabel>
                <span className="text-lg font-bold text-dh-gold ml-1">{character.level}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <FieldLabel>Name</FieldLabel>
                <div className="text-sm text-dh-text font-semibold border-b border-dh-border/50 pb-0.5">
                  {character.name || '—'}
                </div>
              </div>
              <div>
                <FieldLabel>Pronouns</FieldLabel>
                <div className="text-sm text-dh-text border-b border-dh-border/50 pb-0.5">
                  {character.pronouns || '—'}
                </div>
              </div>
              <div>
                <FieldLabel>Heritage</FieldLabel>
                <div className="text-sm text-dh-text border-b border-dh-border/50 pb-0.5">
                  {heritage}
                </div>
              </div>
              <div>
                <FieldLabel>Class & Subclass</FieldLabel>
                <div className="text-sm text-dh-text border-b border-dh-border/50 pb-0.5">
                  {cls?.name} ({sub?.name})
                </div>
              </div>
            </div>
          </div>

          {/* ATTRIBUTES ROW */}
          <div className="px-4 py-3 border-b border-dh-border bg-dh-card/50">
            <div className="grid grid-cols-6 gap-2">
              {TRAIT_NAMES.map((trait) => {
                const val = character.traits[trait];
                const skills = TRAIT_VERBS[trait].split(', ');
                return (
                  <div key={trait} className="text-center">
                    <div className="w-full aspect-square max-w-[56px] mx-auto rounded-lg border-2 border-dh-border bg-dh-card flex items-center justify-center mb-1">
                      <span className="text-xl font-bold text-dh-gold">
                        {val >= 0 ? `+${val}` : val}
                      </span>
                    </div>
                    <div className="text-[10px] text-dh-text font-semibold uppercase tracking-wider">{trait}</div>
                    <div className="mt-0.5 space-y-0">
                      {skills.map((s) => (
                        <div key={s} className="text-[9px] text-dh-text-dim">{s}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TWO-COLUMN LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] min-h-0">

            {/* ===== LEFT COLUMN ===== */}
            <div className="border-r border-dh-border/50 space-y-0">

              {/* DEFENSES */}
              <div className="px-3 py-3 border-b border-dh-border flex gap-4">
                <StatCircle value={totalEvasion} label="Evasion" color="text-dh-blue" />
                <StatCircle value={armorData?.baseScore ?? '—'} label="Armor" color="text-dh-text-muted" />
                <StatCircle value={character.proficiency} label="Prof." color="text-dh-gold-dark" />
              </div>

              {/* DAMAGE & HEALTH */}
              <SheetBox className="m-2">
                <SectionHeader>Damage & Health</SectionHeader>
                <div className="px-3 py-2 text-[9px] text-dh-text-dim italic">
                  Add your current level to your damage thresholds.
                </div>
                {armorData && (
                  <div className="grid grid-cols-3 gap-0 px-3 pb-2">
                    <div className="text-center border-r border-dh-border/30">
                      <div className="text-[9px] text-dh-text-dim uppercase mb-0.5">Minor</div>
                      <div className="text-sm text-dh-text font-bold">&lt; {armorData.baseThresholds.minor + character.level}</div>
                      <div className="text-[8px] text-dh-red/80 mt-0.5">Mark 1 HP</div>
                    </div>
                    <div className="text-center border-r border-dh-border/30">
                      <div className="text-[9px] text-dh-text-dim uppercase mb-0.5">Major</div>
                      <div className="text-sm text-dh-text font-bold">{armorData.baseThresholds.minor + character.level}–{armorData.baseThresholds.major + character.level - 1}</div>
                      <div className="text-[8px] text-dh-red/80 mt-0.5">Mark 2 HP</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[9px] text-dh-text-dim uppercase mb-0.5">Severe</div>
                      <div className="text-sm text-dh-text font-bold">{armorData.baseThresholds.major + character.level}+</div>
                      <div className="text-[8px] text-dh-red/80 mt-0.5">Mark 3 HP</div>
                    </div>
                  </div>
                )}
              </SheetBox>

              {/* HP */}
              <SheetBox className="m-2">
                <CheckboxRow total={character.hp} filled={0} label="HP" />
              </SheetBox>

              {/* STRESS */}
              <SheetBox className="m-2">
                <CheckboxRow total={character.stress} filled={0} label="Stress" />
              </SheetBox>

              {/* HOPE */}
              <SheetBox className="m-2">
                <SectionHeader>Hope</SectionHeader>
                <div className="px-3 py-1 text-[9px] text-dh-text-dim italic">
                  Spend a Hope to use an experience or help an ally.
                </div>
                <CheckboxRow total={6} filled={character.hope} label="" />
              </SheetBox>

              {/* EXPERIENCE */}
              <SheetBox className="m-2">
                <SectionHeader>Experience</SectionHeader>
                <div className="px-3 py-2 space-y-1">
                  {character.experiences.map((exp, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-dh-border/20 pb-1">
                      <span className="text-xs text-dh-text">{exp.name || `Experience ${i + 1}`}</span>
                      <span className="text-xs font-bold text-dh-gold bg-dh-card px-2 py-0.5 rounded">+{exp.modifier}</span>
                    </div>
                  ))}
                </div>
              </SheetBox>

              {/* GOLD */}
              <SheetBox className="m-2">
                <SectionHeader>Gold</SectionHeader>
                <div className="px-3 py-2 flex gap-4">
                  <div>
                    <FieldLabel>Handfuls</FieldLabel>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }, (_, i) => <Checkbox key={i} checked={i < 1} />)}
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Bags</FieldLabel>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }, (_, i) => <Checkbox key={i} />)}
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Chests</FieldLabel>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }, (_, i) => <Checkbox key={i} />)}
                    </div>
                  </div>
                </div>
              </SheetBox>

              {/* CLASS FEATURE */}
              <SheetBox className="m-2">
                <SectionHeader>Class Feature</SectionHeader>
                <div className="px-3 py-2 space-y-2">
                  {classFeatures.map((f, i) => (
                    <div key={i}>
                      <div className="text-[10px] text-dh-gold-dark font-semibold">{f.name}</div>
                      <p className="text-[10px] text-dh-text-muted leading-relaxed">{f.description}</p>
                    </div>
                  ))}
                  {subFeatures.map((f, i) => (
                    <div key={`sub-${i}`}>
                      <div className="text-[10px] text-dh-gold-dark font-semibold">{f.name} <span className="text-dh-text-dim">({sub?.name})</span></div>
                      <p className="text-[10px] text-dh-text-muted leading-relaxed">{f.description}</p>
                    </div>
                  ))}
                </div>
              </SheetBox>
            </div>

            {/* ===== RIGHT COLUMN ===== */}
            <div className="space-y-0">

              {/* ACTIVE WEAPONS */}
              <SheetBox className="m-2">
                <SectionHeader>Active Weapons</SectionHeader>
                {primary && (
                  <WeaponBlock
                    label="Primary"
                    name={primary.name}
                    trait={primary.trait}
                    range={primary.range}
                    damage={primary.damage}
                    damageType={primary.damageType}
                    feature={primary.feature}
                  />
                )}
                {secondary && (
                  <WeaponBlock
                    label="Secondary"
                    name={secondary.name}
                    trait={secondary.trait}
                    range={secondary.range}
                    damage={secondary.damage}
                    damageType={secondary.damageType}
                    feature={secondary.feature}
                  />
                )}
              </SheetBox>

              {/* ACTIVE ARMOR */}
              <SheetBox className="m-2">
                <SectionHeader>Active Armor</SectionHeader>
                {armorData && (
                  <div className="px-3 py-2">
                    <div className="grid grid-cols-3 gap-2 mb-1">
                      <div>
                        <FieldLabel>Name</FieldLabel>
                        <div className="text-xs text-dh-text font-medium">{armorData.name}</div>
                      </div>
                      <div>
                        <FieldLabel>Base Thresholds</FieldLabel>
                        <div className="text-xs text-dh-text">{armorData.baseThresholds.minor} / {armorData.baseThresholds.major}</div>
                      </div>
                      <div>
                        <FieldLabel>Base Score</FieldLabel>
                        <div className="text-xs text-dh-text">{armorData.baseScore}</div>
                      </div>
                    </div>
                    {armorData.feature && (
                      <div>
                        <FieldLabel>Feature</FieldLabel>
                        <div className="text-xs text-dh-text-muted">{armorData.feature}</div>
                      </div>
                    )}
                  </div>
                )}
              </SheetBox>

              {/* DOMAIN CARDS */}
              <SheetBox className="m-2">
                <SectionHeader>Domain Cards</SectionHeader>
                <div className="px-3 py-2 space-y-2">
                  {domainCards.map((card) => card && (
                    <div key={card.id} className="border-b border-dh-border/20 pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs text-dh-text font-semibold">{card.name}</span>
                        <div className="flex gap-1">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-dh-card border border-dh-border/50 text-dh-text-dim">{card.domain}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-dh-card border border-dh-border/50 text-dh-text-dim">{card.type}</span>
                        </div>
                      </div>
                      {card.recallCost > 0 && (
                        <div className="text-[9px] text-dh-gold-dark mb-0.5">Recall Cost: {card.recallCost}</div>
                      )}
                      <p className="text-[10px] text-dh-text-muted leading-relaxed">{card.description}</p>
                    </div>
                  ))}
                </div>
              </SheetBox>

              {/* HERITAGE FEATURES */}
              <SheetBox className="m-2">
                <SectionHeader>Heritage Features</SectionHeader>
                <div className="px-3 py-2 space-y-1.5">
                  <div>
                    <FieldLabel>Community &mdash; {community?.name}</FieldLabel>
                    <div className="text-[10px] text-dh-gold-dark font-semibold mt-0.5">{community?.feature.name}</div>
                    <p className="text-[10px] text-dh-text-muted leading-relaxed">{community?.feature.description}</p>
                  </div>
                  <div className="border-t border-dh-border/20 pt-1.5">
                    <FieldLabel>Ancestry &mdash; {heritage}</FieldLabel>
                    <div className="text-[10px] text-dh-gold-dark font-semibold mt-0.5">{topAnc?.topFeature.name}</div>
                    <p className="text-[10px] text-dh-text-muted leading-relaxed">{topAnc?.topFeature.description}</p>
                  </div>
                  <div className="border-t border-dh-border/20 pt-1.5">
                    <div className="text-[10px] text-dh-gold-dark font-semibold">{(bottomAnc ?? topAnc)?.bottomFeature.name}</div>
                    <p className="text-[10px] text-dh-text-muted leading-relaxed">{(bottomAnc ?? topAnc)?.bottomFeature.description}</p>
                  </div>
                </div>
              </SheetBox>

              {/* INVENTORY */}
              <SheetBox className="m-2">
                <SectionHeader>Inventory</SectionHeader>
                <div className="px-3 py-2">
                  <div className="text-xs text-dh-text-muted leading-relaxed space-y-0.5">
                    <div>Torch</div>
                    <div>50 feet of rope</div>
                    <div>Basic supplies (tent, bedroll, tinderbox, rations)</div>
                    <div>{character.potionChoice === 'health' ? 'Minor Health Potion (clear 1d4 HP)' : character.potionChoice === 'stamina' ? 'Minor Stamina Potion (clear 1d4 Stress)' : '—'}</div>
                    {character.classItem && <div>{character.classItem}</div>}
                  </div>
                </div>
              </SheetBox>

              {/* BACKGROUND */}
              {(character.characterDescription || character.background) && (
                <SheetBox className="m-2">
                  <SectionHeader>Background</SectionHeader>
                  <div className="px-3 py-2 space-y-1.5">
                    {character.characterDescription && (
                      <p className="text-[10px] text-dh-text-muted leading-relaxed">{character.characterDescription}</p>
                    )}
                    {character.background && (
                      <p className="text-[10px] text-dh-text-muted leading-relaxed">{character.background}</p>
                    )}
                  </div>
                </SheetBox>
              )}
            </div>
          </div>

          {/* TIER PROGRESSION */}
          <div className="border-t border-dh-border">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-dh-border">
              {/* TIER 2 */}
              <TierColumn
                tier={2}
                levels="2–4"
                intro="At level 2, gain an additional Experience at +2 and gain a +1 bonus to your Proficiency."
                options={[
                  'Gain a +1 bonus to two unmarked character traits and mark them.',
                  'Permanently gain one Hit Point slot.',
                  'Permanently gain one Stress slot.',
                  'Permanently gain a +1 bonus to two Experiences.',
                  'Choose an additional domain card of your level or lower from a domain you have access to (up to level 4).',
                  'Permanently gain a +1 bonus to your Evasion.',
                ]}
                upgradeText="Take an upgraded subclass card. Then cross out the multiclass option for this tier."
                footer="Update your level and adjust your damage thresholds accordingly. Take an additional domain card of your level or lower from a domain you have access to."
              />
              {/* TIER 3 */}
              <TierColumn
                tier={3}
                levels="5–7"
                intro="At level 5, gain an additional Experience at +2 and clear all marks on character traits. Then gain a +1 bonus to your Proficiency."
                options={[
                  'Gain a +1 bonus to two unmarked character traits and mark them.',
                  'Permanently gain one Hit Point slot.',
                  'Permanently gain one Stress slot.',
                  'Permanently gain a +1 bonus to two Experiences.',
                  'Choose an additional domain card of your level or lower from a domain you have access to (up to level 7).',
                  'Permanently gain a +1 bonus to your Evasion.',
                ]}
                upgradeText="Take an upgraded subclass card. Then cross out the multiclass option for this tier."
                hasMulticlass
                footer="Update your level and adjust your damage thresholds accordingly. Take an additional domain card of your level or lower from a domain you have access to."
              />
              {/* TIER 4 */}
              <TierColumn
                tier={4}
                levels="8–10"
                intro="At level 8, gain an additional Experience at +2 and clear all marks on character traits. Then gain a +1 bonus to your Proficiency."
                options={[
                  'Gain a +1 bonus to two unmarked character traits and mark them.',
                  'Permanently gain one Hit Point slot.',
                  'Permanently gain one Stress slot.',
                  'Permanently gain a +1 bonus to two Experiences.',
                  'Choose an additional domain card of your level or lower from a domain you have access to.',
                  'Permanently gain a +1 bonus to your Evasion.',
                ]}
                upgradeText="Take an upgraded subclass card. Then cross out the multiclass option for this tier."
                hasMulticlass
                footer="Update your level and adjust your damage thresholds accordingly. Take an additional domain card of your level or lower from a domain you have access to."
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-4 py-2 border-t border-dh-border text-center">
            <p className="text-[8px] text-dh-text-dim">Daggerheart &copy; Darrington Press 2025</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 pt-4 no-print">
          <button onClick={handleSave} className="flex-1 py-2.5 rounded bg-gradient-to-b from-dh-gold-light to-dh-gold text-dh-bg font-semibold hover:from-dh-gold hover:to-dh-gold-dark transition-all tracking-wider text-sm shadow-[0_2px_10px_rgba(196,164,78,0.2)]">
            Save Character
          </button>
          <button onClick={handlePrint} className="flex-1 py-2.5 rounded border border-dh-gold text-dh-gold hover:bg-dh-selected transition-colors tracking-wider text-sm">
            Print
          </button>
          <button onClick={handleReset} className="py-2.5 px-4 rounded border border-dh-red/50 text-dh-red hover:bg-dh-red/10 transition-colors text-sm">
            Start Over
          </button>
        </div>
      </div>
    </WizardShell>
  );
}
