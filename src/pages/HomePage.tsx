import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useWrongCards } from '../context/WrongCardsContext';
import {
  pageMain,
  heading,
  subtext,
  navColumn,
  buttonLinkStudy,
  buttonLinkQuiz,
  buttonLinkStats,
  linkSecondary,
} from '../styles';

/** Landing page: app title and links to Study, Quiz, Stats; reset wrong cards when list exists. */
export default function HomePage() {
  const { wrongCards, clearWrongCards } = useWrongCards();

  return (
    <main style={pageMain}>
      <h1 style={heading}>Spanish Flashcards</h1>
      <p style={subtext}>Choose how you want to practice.</p>
      <nav style={navColumn}>
        <Link to={ROUTES.STUDY_CATEGORY} style={buttonLinkStudy}>
          Study Mode
        </Link>
        <Link to={ROUTES.QUIZ_CATEGORY} style={buttonLinkQuiz}>
          Quiz Mode
        </Link>
        <Link to={ROUTES.STATS} style={buttonLinkStats}>
          Stats Page
        </Link>
      </nav>
      {wrongCards.length > 0 && (
        <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>
          You have {wrongCards.length} wrong card(s) saved.{' '}
          <Link to={ROUTES.STUDY_REDO} style={linkSecondary}>
            Redo wrong cards
          </Link>
          {' · '}
          <button
            type="button"
            onClick={clearWrongCards}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              color: 'inherit',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Reset wrong cards list
          </button>
        </p>
      )}
    </main>
  );
}
