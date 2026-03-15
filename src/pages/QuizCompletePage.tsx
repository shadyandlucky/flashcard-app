import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants';
import { pageMain, heading, subtext, navColumn, buttonLink, linkSecondary, topSpacer } from '../styles';

/**
 * Dedicated completion page shown after finishing a quiz. Reached via navigation
 * from QuizPage so the user always lands on a real page with a link back home.
 */
export default function QuizCompletePage() {
  const location = useLocation();
  const state = location.state as { count?: number } | null;
  const count = state?.count ?? 0;

  return (
    <main style={pageMain}>
      <h1 style={heading}>Quiz complete</h1>
      <p style={subtext}>
        {count > 0
          ? `You've gone through all ${count} cards. Great job!`
          : "You've finished the quiz. Great job!"}
      </p>
      <nav style={navColumn}>
        <Link to={ROUTES.HOME} style={buttonLink}>
          ← Back to Main Page
        </Link>
        <Link to={ROUTES.QUIZ_CATEGORY} style={linkSecondary}>
          Choose another quiz
        </Link>
      </nav>
      <p style={topSpacer}>
        <Link to={ROUTES.HOME} style={linkSecondary}>
          Home
        </Link>
      </p>
    </main>
  );
}
