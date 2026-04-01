import { MemoryRouter } from 'react-router-dom';
import App from './App';
import './index.css';

export function DaggerheartApp() {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-dh-bg)',
        backgroundImage:
          'radial-gradient(ellipse at 50% 0%, rgba(196, 164, 78, 0.03) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(139, 32, 48, 0.02) 0%, transparent 60%)',
        color: 'var(--color-dh-text)',
        fontFamily: 'var(--font-body)',
        minHeight: '100vh',
      }}
    >
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </div>
  );
}
