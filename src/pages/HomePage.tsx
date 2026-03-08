import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '32rem', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Spanish Flashcards</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        Welcome! Choose how you want to practice.
      </p>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Link
          to="/study/category"
          style={{
            display: 'block',
            padding: '1rem 1.5rem',
            background: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Study Mode
        </Link>
        <Link
          to="/quiz/category"
          style={{
            display: 'block',
            padding: '1rem 1.5rem',
            background: '#8b5cf6',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Quiz Mode
        </Link>
        <Link
          to="/stats"
          style={{
            display: 'block',
            padding: '1rem 1.5rem',
            background: '#059669',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Stats Page
        </Link>
      </nav>
    </main>
  );
}
