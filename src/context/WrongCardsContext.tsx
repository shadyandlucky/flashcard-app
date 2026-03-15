import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Flashcard } from '../data/types';

type WrongCardsContextValue = {
  wrongCards: Flashcard[];
  setWrongCardsFromSession: (cards: Flashcard[]) => void;
  clearWrongCards: () => void;
};

const WrongCardsContext = createContext<WrongCardsContextValue | null>(null);

export function WrongCardsProvider({ children }: { children: ReactNode }) {
  const [wrongCards, setWrongCards] = useState<Flashcard[]>([]);

  const setWrongCardsFromSession = useCallback((cards: Flashcard[]) => {
    setWrongCards(cards);
  }, []);

  const clearWrongCards = useCallback(() => {
    setWrongCards([]);
  }, []);

  return (
    <WrongCardsContext.Provider value={{ wrongCards, setWrongCardsFromSession, clearWrongCards }}>
      {children}
    </WrongCardsContext.Provider>
  );
}

export function useWrongCards() {
  const ctx = useContext(WrongCardsContext);
  if (!ctx) throw new Error('useWrongCards must be used within WrongCardsProvider');
  return ctx;
}
