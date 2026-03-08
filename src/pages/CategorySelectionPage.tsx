import { Link, useLocation } from 'react-router-dom';
import { ROUTES, categorySessionPath } from '../constants';
import { CATEGORIES, CATEGORY_LABELS } from '../data/types';
import { pageMain, heading, subtext, navColumn, buttonLink, linkSecondary, topSpacer } from '../styles';

/**
 * Lets the user pick a category (Animals, Food, Verbs) for study or quiz.
 * Mode (study vs quiz) is inferred from the current path.
 */
export default function CategorySelectionPage() {
  const { pathname } = useLocation();
  const isStudy = pathname.startsWith('/study');
  const mode = isStudy ? 'study' : 'quiz';

  return (
    <main style={pageMain}>
      <h1 style={heading}>
        {isStudy ? 'Study Mode' : 'Quiz Mode'} — Choose a category
      </h1>
      <p style={subtext}>
        {isStudy
          ? 'Pick a category to study with flashcards.'
          : 'Pick a category for your quiz.'}
      </p>
      <nav style={navColumn}>
        {CATEGORIES.map((cat) => (
          <Link key={cat} to={categorySessionPath(mode, cat)} style={buttonLink}>
            {CATEGORY_LABELS[cat]}
          </Link>
        ))}
      </nav>
      <p style={topSpacer}>
        <Link to={ROUTES.HOME} style={linkSecondary}>
          ← Back to Home
        </Link>
      </p>
    </main>
  );
}
