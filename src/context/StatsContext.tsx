import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Category } from '../data/types';
import { CATEGORIES } from '../data/types';

const STORAGE_KEY = 'flashcard-stats';

export type CategoryStats = {
  correct: number;
  incorrect: number;
};

export type StatsState = Record<Category, CategoryStats>;

const defaultStats: StatsState = Object.fromEntries(
  CATEGORIES.map((c) => [c, { correct: 0, incorrect: 0 }])
) as StatsState;

function loadStats(): StatsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultStats };
    const parsed = JSON.parse(raw) as Record<string, { correct?: number; incorrect?: number }>;
    const state: StatsState = { ...defaultStats };
    for (const cat of CATEGORIES) {
      const p = parsed[cat];
      if (p && typeof p.correct === 'number' && typeof p.incorrect === 'number') {
        state[cat] = { correct: p.correct, incorrect: p.incorrect };
      }
    }
    return state;
  } catch {
    return { ...defaultStats };
  }
}

function saveStats(stats: StatsState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

type StatsContextValue = {
  stats: StatsState;
  recordResult: (category: Category, correct: boolean) => void;
};

const StatsContext = createContext<StatsContextValue | null>(null);

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<StatsState>(loadStats);

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  const recordResult = useCallback((category: Category, correct: boolean) => {
    setStats((prev) => ({
      ...prev,
      [category]: {
        correct: prev[category].correct + (correct ? 1 : 0),
        incorrect: prev[category].incorrect + (correct ? 0 : 1),
      },
    }));
  }, []);

  return (
    <StatsContext.Provider value={{ stats, recordResult }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error('useStats must be used within StatsProvider');
  return ctx;
}
