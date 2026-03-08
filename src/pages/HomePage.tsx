import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import {
  pageMain,
  heading,
  subtext,
  navColumn,
  buttonLinkStudy,
  buttonLinkQuiz,
  buttonLinkStats,
} from '../styles';

/** Landing page: app title and links to Study, Quiz, and Stats. */
export default function HomePage() {
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
    </main>
  );
}
