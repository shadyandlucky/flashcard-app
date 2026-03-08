import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { pageMain, heading, subtext, linkSecondary } from '../styles';

/** Placeholder for Phase 5: session stats (cards studied, accuracy, etc.). */
export default function StatsPage() {
  return (
    <main style={pageMain}>
      <h1 style={heading}>Statistics</h1>
      <p style={subtext}>
        Your study and quiz stats will appear here. (Phase 5)
      </p>
      <p>
        <Link to={ROUTES.HOME} style={linkSecondary}>
          ← Back to Home
        </Link>
      </p>
    </main>
  );
}
