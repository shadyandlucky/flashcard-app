import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useWrongCards } from '../context/WrongCardsContext';
import FlashcardComponent from '../components/Flashcard';
import {
  pageMain,
  pageMainNarrow,
  heading,
  subtextTight,
  subtextSmall,
  navColumnTight,
  buttonLinkSmall,
  linkSecondary,
} from '../styles';

/**
 * Redo session: study only the cards marked wrong in the previous round.
 * Reuses the same Flashcard component as StudyPage.
 */
export default function RedoPage() {
  const { wrongCards, clearWrongCards } = useWrongCards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = wrongCards[currentIndex];
  const isDone = wrongCards.length > 0 && currentIndex >= wrongCards.length;

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [wrongCards.length]);

  const handleRight = () => {
    setIsFlipped(false);
    setCurrentIndex((i) => i + 1);
  };

  const handleWrong = () => {
    setIsFlipped(false);
    setCurrentIndex((i) => i + 1);
  };

  if (wrongCards.length === 0) {
    return (
      <main style={pageMain}>
        <h1 style={heading}>Redo Wrong Cards</h1>
        <p style={subtextTight}>
          No wrong cards to redo. Complete a study session and mark some cards as wrong to see them here.
        </p>
        <Link to={ROUTES.HOME} style={linkSecondary}>← Back to Home</Link>
      </main>
    );
  }

  if (isDone) {
    return (
      <main style={pageMain}>
        <h1 style={heading}>Redo complete</h1>
        <p style={subtextTight}>
          You reviewed all {wrongCards.length} wrong cards.
        </p>
        <div style={navColumnTight}>
          <Link to={ROUTES.STUDY_CATEGORY} style={buttonLinkSmall}>
            Study a category
          </Link>
          <Link to={ROUTES.HOME} style={linkSecondary}>
            ← Back to Home
          </Link>
          <button
            type="button"
            onClick={clearWrongCards}
            style={{
              ...buttonLinkSmall,
              background: '#6b7280',
            }}
          >
            Reset wrong cards list
          </button>
        </div>
      </main>
    );
  }

  if (!currentCard) {
    return (
      <main style={pageMain}>
        <Link to={ROUTES.HOME} style={linkSecondary}>← Back to Home</Link>
      </main>
    );
  }

  return (
    <main style={pageMainNarrow}>
      <p style={subtextSmall}>
        Redo wrong cards — Card {currentIndex + 1} of {wrongCards.length}
      </p>
      <FlashcardComponent
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(true)}
        onRight={handleRight}
        onWrong={handleWrong}
      />
      <p>
        <Link to={ROUTES.HOME} style={linkSecondary}>
          ← Back to Home
        </Link>
      </p>
    </main>
  );
}
