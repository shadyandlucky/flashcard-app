import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/types';

const categoryLabels: Record<string, string> = {
  animals: 'Animals',
  food: 'Food',
  verbs: 'Verbs',
};

export default function CategorySelectionPage() {
  const { pathname } = useLocation();
  const isStudy = pathname.startsWith('/study');
  const basePath = isStudy ? '/study' : '/quiz';

  return (
    <main style={{ padding: '2rem', maxWidth: '32rem', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>
        {isStudy ? 'Study Mode' : 'Quiz Mode'} — Choose a category
      </h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        {isStudy
          ? 'Pick a category to study with flashcards.'
          : 'Pick a category for your quiz.'}
      </p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            to={`${basePath}/category/${cat}`}
            style={{
              display: 'block',
              padding: '1rem 1.5rem',
              background: '#374151',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {categoryLabels[cat] ?? cat}
          </Link>
        ))}
      </nav>
      <p style={{ marginTop: '2rem' }}>
        <Link to="/" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
          ← Back to Home
        </Link>
      </p>
    </main>
  );
}
