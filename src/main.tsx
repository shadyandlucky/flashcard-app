import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { WrongCardsProvider } from './context/WrongCardsContext';
import { StatsProvider } from './context/StatsContext';
import App from './App.tsx';

// Mount React app with router; future flags opt in to React Router v7 behavior.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <StatsProvider>
        <WrongCardsProvider>
          <App />
        </WrongCardsProvider>
      </StatsProvider>
    </BrowserRouter>
  </StrictMode>,
);
