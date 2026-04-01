import { MemoryRouter } from 'react-router-dom';
import App from './App';
import './index.css';

export function DaggerheartApp() {
  return (
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}
