import { useCharacter } from '../../context/CharacterContext';
import { CLASSES } from '../../data/classes';
import { DOMAIN_CARDS } from '../../data/domains';
import { WizardShell } from '../WizardShell';

export function DomainsStep() {
  const { character, dispatch } = useCharacter();
  const cls = CLASSES.find((c) => c.id === character.className);

  if (!cls) {
    return (
      <WizardShell step={5} title="Choose Domain Cards" canNext={false}>
        <p className="text-dh-text-muted">Please select a class first.</p>
      </WizardShell>
    );
  }

  const availableCards = DOMAIN_CARDS.filter(
    (card) => card.level === 1 && cls.domains.includes(card.domain)
  );

  const toggleCard = (cardId: string) => {
    const current = character.domainCards;
    if (current.includes(cardId)) {
      dispatch({ type: 'SET_DOMAIN_CARDS', cards: current.filter((c) => c !== cardId) });
    } else if (current.length < 2) {
      dispatch({ type: 'SET_DOMAIN_CARDS', cards: [...current, cardId] });
    }
  };

  return (
    <WizardShell
      step={5}
      title="Choose Domain Cards"
      subtitle={`Pick 2 cards from your domains: ${cls.domains[0]} and ${cls.domains[1]}. You can take from one or both.`}
      canNext={character.domainCards.length === 2}
    >
      {cls.domains.map((domain) => {
        const domainCards = availableCards.filter((c) => c.domain === domain);
        return (
          <div key={domain} className="mb-6">
            <h3 className="font-heading text-lg text-dh-gold-dark mb-3">{domain}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {domainCards.map((card) => {
                const isSelected = character.domainCards.includes(card.id);
                const isFull = character.domainCards.length >= 2 && !isSelected;
                return (
                  <button
                    key={card.id}
                    onClick={() => !isFull && toggleCard(card.id)}
                    disabled={isFull}
                    className={`text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-dh-gold bg-dh-selected shadow-[0_0_12px_rgba(196,164,78,0.15)]'
                        : isFull
                          ? 'border-dh-border bg-dh-card opacity-40 cursor-not-allowed'
                          : 'border-dh-border bg-dh-card hover:border-dh-gold-dark hover:bg-dh-card-hover cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-heading text-sm font-semibold ${isSelected ? 'text-dh-gold' : 'text-dh-text'}`}>
                        {card.name}
                      </h4>
                      <span className="text-xs px-2 py-0.5 rounded bg-dh-border/50 text-dh-text-dim">
                        {card.type}
                      </span>
                    </div>
                    {card.recallCost > 0 && (
                      <p className="text-xs text-dh-text-dim mb-2">Recall Cost: {card.recallCost}</p>
                    )}
                    <p className="text-xs text-dh-text-muted leading-relaxed">{card.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <p className="text-sm text-dh-text-dim mt-2">
        Selected: {character.domainCards.length}/2
      </p>
    </WizardShell>
  );
}
