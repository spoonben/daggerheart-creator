interface CardSelectProps<T> {
  items: T[];
  selectedId: string;
  onSelect: (id: string) => void;
  getId: (item: T) => string;
  renderCard: (item: T, isSelected: boolean) => React.ReactNode;
  columns?: 2 | 3 | 4;
}

export function CardSelect<T>({ items, selectedId, onSelect, getId, renderCard, columns = 3 }: CardSelectProps<T>) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-3`}>
      {items.map((item) => {
        const id = getId(item);
        const isSelected = id === selectedId;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`text-left p-4 rounded-lg border-2 transition-all cursor-pointer dh-card-interactive ${
              isSelected
                ? 'border-dh-gold bg-dh-selected dh-glow'
                : 'border-dh-border bg-dh-card hover:border-dh-gold-dark hover:bg-dh-card-hover'
            }`}
          >
            {renderCard(item, isSelected)}
          </button>
        );
      })}
    </div>
  );
}
