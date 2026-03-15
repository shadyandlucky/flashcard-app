import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useStats } from '../context/StatsContext';
import { CATEGORIES, CATEGORY_LABELS } from '../data/types';
import type { Category } from '../data/types';
import { pageMain, heading, subtext, linkSecondary } from '../styles';

function studied(stats: { correct: number; incorrect: number }) {
  return stats.correct + stats.incorrect;
}

export default function StatsPage() {
  const { stats } = useStats();

  const totalStudied = CATEGORIES.reduce((sum, cat) => sum + studied(stats[cat]), 0);
  const totalCorrect = CATEGORIES.reduce((sum, cat) => sum + stats[cat].correct, 0);
  const totalIncorrect = CATEGORIES.reduce((sum, cat) => sum + stats[cat].incorrect, 0);
  const accuracyPct =
    totalStudied > 0 ? Math.round((totalCorrect / totalStudied) * 100) : null;

  return (
    <main style={pageMain}>
      <h1 style={heading}>Statistics</h1>
      <p style={subtext}>
        Summary of your study and quiz sessions. Data is saved in this browser.
      </p>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#94a3b8' }}>
          Overall
        </h2>
        <p style={{ marginBottom: '0.25rem' }}>
          <strong>Total cards studied:</strong> {totalStudied}
        </p>
        <p style={{ marginBottom: '0.25rem' }}>
          <strong>Correct:</strong> {totalCorrect} &nbsp; <strong>Incorrect:</strong> {totalIncorrect}
        </p>
        <p>
          <strong>Accuracy:</strong>{' '}
          {accuracyPct !== null ? `${accuracyPct}%` : '—'}
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#94a3b8' }}>
          By category
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {CATEGORIES.map((cat: Category) => {
            const s = stats[cat];
            const n = studied(s);
            const pct = n > 0 ? Math.round((s.correct / n) * 100) : null;
            return (
              <li
                key={cat}
                style={{
                  padding: '0.75rem 0',
                  borderBottom: '1px solid #374151',
                }}
              >
                <strong>{CATEGORY_LABELS[cat]}:</strong>{' '}
                {n} studied, {s.correct} correct, {s.incorrect} incorrect
                {pct !== null ? ` — ${pct}% correct` : ' — —'}
              </li>
            );
          })}
        </ul>
      </section>

      <p style={{ marginTop: '2rem' }}>
        <Link to={ROUTES.HOME} style={linkSecondary}>
          ← Back to Home
        </Link>
      </p>
    </main>
  );
}
