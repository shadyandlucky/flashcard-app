import { Link } from 'react-router-dom';

export default function StatsPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '32rem', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Statistics</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        Your study and quiz stats will appear here. (Phase 5)
      </p>
      <p>
        <Link to="/" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
          ← Back to Home
        </Link>
      </p>
    </main>
  );
}
