const STEPS = [
  'Class',
  'Subclass',
  'Heritage',
  'Traits',
  'Domains',
  'Equipment',
  'Background',
  'Experiences',
  'Review',
];

export function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full px-4 py-3 bg-dh-surface/80 border-b border-dh-border no-print">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-0">
          {STEPS.map((label, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === currentStep;
            const isComplete = stepNum < currentStep;
            return (
              <div key={label} className="flex flex-col items-center flex-1 min-w-0 relative">
                {/* Connector line */}
                {i > 0 && (
                  <div
                    className={`absolute top-4 right-1/2 w-full h-px ${
                      isComplete || isActive ? 'bg-dh-gold-dark/50' : 'bg-dh-border/50'
                    }`}
                  />
                )}
                <div
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${
                    isActive
                      ? 'bg-dh-gold text-dh-bg border-dh-gold shadow-[0_0_12px_rgba(196,164,78,0.3)]'
                      : isComplete
                        ? 'bg-dh-gold-dark/30 text-dh-gold border-dh-gold-dark'
                        : 'bg-dh-card text-dh-text-dim border-dh-border'
                  }`}
                >
                  {isComplete ? '✓' : stepNum}
                </div>
                <span
                  className={`text-[10px] mt-1.5 hidden sm:block truncate tracking-wide ${
                    isActive ? 'text-dh-gold font-medium' : isComplete ? 'text-dh-gold-dark' : 'text-dh-text-dim'
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
