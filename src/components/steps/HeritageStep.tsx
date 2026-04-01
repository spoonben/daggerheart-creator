import { useState } from 'react';
import { useCharacter } from '../../context/CharacterContext';
import { ANCESTRIES } from '../../data/ancestries';
import { COMMUNITIES } from '../../data/communities';
import { CardSelect } from '../CardSelect';
import { WizardShell } from '../WizardShell';
import type { AncestryData, CommunityData } from '../../types/character';

export function HeritageStep() {
  const { character, dispatch } = useCharacter();
  const [mixedMode, setMixedMode] = useState(character.ancestryTopSource !== character.ancestryBottomSource && character.ancestry === 'mixed');
  const [topSource, setTopSource] = useState(character.ancestryTopSource || '');
  const [bottomSource, setBottomSource] = useState(character.ancestryBottomSource || '');

  const handleAncestrySelect = (id: string) => {
    if (mixedMode) return;
    dispatch({ type: 'SET_ANCESTRY', ancestry: id, topSource: id, bottomSource: id });
  };

  const handleTopSelect = (id: string) => {
    setTopSource(id);
    dispatch({ type: 'SET_ANCESTRY', ancestry: 'mixed', topSource: id, bottomSource: bottomSource });
  };

  const handleBottomSelect = (id: string) => {
    setBottomSource(id);
    dispatch({ type: 'SET_ANCESTRY', ancestry: 'mixed', topSource: topSource, bottomSource: id });
  };

  const toggleMixed = () => {
    const newMixed = !mixedMode;
    setMixedMode(newMixed);
    if (!newMixed && topSource) {
      dispatch({ type: 'SET_ANCESTRY', ancestry: topSource, topSource, bottomSource: topSource });
      setBottomSource(topSource);
    }
  };

  const handleCommunitySelect = (id: string) => {
    dispatch({ type: 'SET_COMMUNITY', community: id });
  };

  const hasAncestry = mixedMode ? (topSource && bottomSource) : !!character.ancestry;

  return (
    <WizardShell
      step={3}
      title="Choose Your Heritage"
      subtitle="Select your ancestry and community. Together they form your heritage."
      canNext={!!(hasAncestry && character.community)}
    >
      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg text-dh-gold-dark">Ancestry</h3>
            <button
              onClick={toggleMixed}
              className={`text-xs px-3 py-1 rounded border transition-colors ${
                mixedMode ? 'border-dh-gold text-dh-gold bg-dh-selected' : 'border-dh-border text-dh-text-muted hover:text-dh-text'
              }`}
            >
              {mixedMode ? 'Mixed Ancestry: ON' : 'Mixed Ancestry'}
            </button>
          </div>

          {mixedMode ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-dh-text-muted mb-2">Choose Top Feature From:</h4>
                <CardSelect
                  items={ANCESTRIES}
                  selectedId={topSource}
                  onSelect={handleTopSelect}
                  getId={(a) => a.id}
                  columns={4}
                  renderCard={(a: AncestryData, sel) => (
                    <div>
                      <h4 className={`font-heading text-sm font-semibold ${sel ? 'text-dh-gold' : 'text-dh-text'}`}>{a.name}</h4>
                      <p className="text-xs text-dh-gold-dark mt-1">{a.topFeature.name}</p>
                      <p className="text-xs text-dh-text-muted mt-0.5">{a.topFeature.description}</p>
                    </div>
                  )}
                />
              </div>
              <div>
                <h4 className="text-sm text-dh-text-muted mb-2">Choose Bottom Feature From:</h4>
                <CardSelect
                  items={ANCESTRIES}
                  selectedId={bottomSource}
                  onSelect={handleBottomSelect}
                  getId={(a) => a.id}
                  columns={4}
                  renderCard={(a: AncestryData, sel) => (
                    <div>
                      <h4 className={`font-heading text-sm font-semibold ${sel ? 'text-dh-gold' : 'text-dh-text'}`}>{a.name}</h4>
                      <p className="text-xs text-dh-gold-dark mt-1">{a.bottomFeature.name}</p>
                      <p className="text-xs text-dh-text-muted mt-0.5">{a.bottomFeature.description}</p>
                    </div>
                  )}
                />
              </div>
            </div>
          ) : (
            <CardSelect
              items={ANCESTRIES}
              selectedId={character.ancestry}
              onSelect={handleAncestrySelect}
              getId={(a) => a.id}
              renderCard={(a: AncestryData, sel) => (
                <div>
                  <h4 className={`font-heading font-semibold mb-1 ${sel ? 'text-dh-gold' : 'text-dh-text'}`}>{a.name}</h4>
                  <p className="text-xs text-dh-text-muted mb-2">{a.description}</p>
                  <div className="space-y-1.5">
                    <div>
                      <span className="text-xs font-medium text-dh-gold-dark">{a.topFeature.name}: </span>
                      <span className="text-xs text-dh-text-dim">{a.topFeature.description}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-dh-gold-dark">{a.bottomFeature.name}: </span>
                      <span className="text-xs text-dh-text-dim">{a.bottomFeature.description}</span>
                    </div>
                  </div>
                </div>
              )}
            />
          )}
        </section>

        <section>
          <h3 className="font-heading text-lg text-dh-gold-dark mb-4">Community</h3>
          <CardSelect
            items={COMMUNITIES}
            selectedId={character.community}
            onSelect={handleCommunitySelect}
            getId={(c) => c.id}
            renderCard={(c: CommunityData, sel) => (
              <div>
                <h4 className={`font-heading font-semibold mb-1 ${sel ? 'text-dh-gold' : 'text-dh-text'}`}>{c.name}</h4>
                <p className="text-xs text-dh-text-muted mb-2">{c.description}</p>
                <div>
                  <span className="text-xs font-medium text-dh-gold-dark">{c.feature.name}: </span>
                  <span className="text-xs text-dh-text-dim">{c.feature.description}</span>
                </div>
              </div>
            )}
          />
        </section>
      </div>
    </WizardShell>
  );
}
