import { Link } from 'react-router-dom';
import { ROUTES, quizSessionPath } from '../constants';
import { CATEGORIES, CATEGORY_LABELS } from '../data/types';
import { pageMain, heading, subtext, navColumn, buttonLink, linkSecondary, topSpacer } from '../styles';

const QUIZ_TYPES: { slug: 'multiple-choice' | 'fill-in'; label: string }[] = [
  { slug: 'multiple-choice', label: 'Multiple Choice' },
  { slug: 'fill-in', label: 'Fill in the Blank' },
];

/**
 * Lets the user pick a quiz type (Multiple Choice, Fill in the Blank) and a category
 * to start the quiz. Shows all combinations.
 */
export default function QuizSelectionPage() {
  return (
    <main style={pageMain}>
      <h1 style={heading}>Quiz Mode — Choose quiz type and category</h1>
      <p style={subtext}>
        Pick a quiz type and a category to start.
      </p>
      {QUIZ_TYPES.map(({ slug, label }) => (
        <section key={slug} style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#94a3b8' }}>
            {label}
          </h2>
          <nav style={navColumn}>
            {CATEGORIES.map((cat) => (
              <Link
                key={`${slug}-${cat}`}
                to={quizSessionPath(cat, slug)}
                style={buttonLink}
              >
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </nav>
        </section>
      ))}
      <p style={topSpacer}>
        <Link to={ROUTES.HOME} style={linkSecondary}>
          ← Back to Home
        </Link>
      </p>
    </main>
  );
}
