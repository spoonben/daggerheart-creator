import { useNavigate } from 'react-router-dom';
import { ProgressBar } from './ProgressBar';

interface WizardShellProps {
  step: number;
  title: string;
  subtitle?: string;
  canNext?: boolean;
  onNext?: () => void;
  children: React.ReactNode;
}

export function WizardShell({ step, title, subtitle, canNext = true, onNext, children }: WizardShellProps) {
  const navigate = useNavigate();

  const ROUTES = ['/', '/subclass', '/heritage', '/traits', '/domains', '/equipment', '/background', '/experiences', '/review'];

  const handleNext = () => {
    if (onNext) onNext();
    if (step < 9) navigate(ROUTES[step]);
  };

  const handleBack = () => {
    if (step > 1) navigate(ROUTES[step - 2]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative bg-dh-surface border-b border-dh-border px-6 py-5 overflow-hidden no-print">
        <div className="absolute inset-0 bg-gradient-to-b from-dh-gold/[0.03] to-transparent pointer-events-none" />
        <h1 className="relative text-2xl sm:text-3xl text-center text-dh-gold tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-display)' }}>
          Daggerheart
        </h1>
        <p className="relative text-center text-dh-text-dim text-xs tracking-[0.3em] uppercase mt-1">Character Creator</p>
        <div className="dh-separator mt-3">
          <div className="dh-separator-diamond" />
        </div>
      </header>

      <ProgressBar currentStep={step} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
        <div className="mb-6 no-print">
          <h2 className="text-xl sm:text-2xl text-dh-gold-light mb-1 tracking-wide">
            Step {step}: {title}
          </h2>
          {subtitle && <p className="text-dh-text-muted text-sm">{subtitle}</p>}
        </div>

        {children}
      </main>

      <footer className="sticky bottom-0 bg-dh-surface/95 backdrop-blur-sm border-t border-dh-border px-4 py-3 no-print">
        <div className="max-w-4xl mx-auto flex justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-6 py-2.5 rounded border border-dh-border text-dh-text-muted hover:text-dh-text hover:border-dh-gold-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed tracking-wide text-sm"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canNext}
            className="px-8 py-2.5 rounded bg-gradient-to-b from-dh-gold-light to-dh-gold text-dh-bg font-semibold hover:from-dh-gold hover:to-dh-gold-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed tracking-wider text-sm shadow-[0_2px_10px_rgba(196,164,78,0.2)]"
          >
            {step === 9 ? 'Finish' : 'Next'}
          </button>
        </div>
      </footer>
    </div>
  );
}
