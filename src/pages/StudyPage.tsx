import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useWrongCards } from '../context/WrongCardsContext';
import { useStats } from '../context/StatsContext';
import { getCardsByCategory } from '../data/flashcards';
import { isCategory, CATEGORY_LABELS, type Flashcard } from '../data/types';
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
 * Study session for one category: flip cards, mark Right/Wrong, track wrong cards.
 * Shows invalid state, session-complete state, or the current card.
 */
export default function StudyPage() {
  const { category } = useParams<{ category: string }>();
  const { setWrongCardsFromSession } = useWrongCards();
  const { recordResult } = useStats();
  const [wrongCards, setWrongCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setWrongCards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [category]);

  const categoryCards = getCardsByCategory(category);
  const isValidCategory = isCategory(category);
  const currentCard = isValidCategory ? categoryCards[currentIndex] : undefined;
  const isDone = isValidCategory && currentIndex >= categoryCards.length;

  const handleRight = () => {
    if (currentCard) recordResult(currentCard.category, true);
    setIsFlipped(false);
    setCurrentIndex((i) => i + 1);
  };

  const handleWrong = () => {
    if (currentCard) {
      setWrongCards((prev) => [...prev, currentCard]);
      recordResult(currentCard.category, false);
    }
    setIsFlipped(false);
    setCurrentIndex((i) => i + 1);
  };

  if (!isValidCategory) {
    return (
      <main style={pageMain}>
        <p>Invalid category.</p>
        <Link to={ROUTES.STUDY_CATEGORY} style={linkSecondary}>
          ← Back to categories
        </Link>
      </main>
    );
  }

  useEffect(() => {
    if (isDone && wrongCards.length > 0) {
      setWrongCardsFromSession(wrongCards);
    }
  }, [isDone, wrongCards, setWrongCardsFromSession]);

  if (isDone) {
    const label = CATEGORY_LABELS[category];
    return (
      <main style={pageMain}>
        <h1 style={heading}>Session complete</h1>
        <p style={subtextTight}>
          You reviewed all {categoryCards.length} cards in {label}.
          {wrongCards.length > 0 && (
            <span> {wrongCards.length} marked as wrong.</span>
          )}
        </p>
        <div style={navColumnTight}>
          {wrongCards.length > 0 && (
            <Link to={ROUTES.STUDY_REDO} style={buttonLinkSmall}>
              Redo Wrong Cards
            </Link>
          )}
          <Link to={ROUTES.STUDY_CATEGORY} style={buttonLinkSmall}>
            Study another category
          </Link>
          <Link to={ROUTES.HOME} style={linkSecondary}>
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // No card at current index (e.g. empty category)
  if (!currentCard) {
    return (
      <main style={pageMain}>
        <p>No cards in this category.</p>
        <Link to={ROUTES.STUDY_CATEGORY} style={linkSecondary}>← Back to categories</Link>
      </main>
    );
  }

  return (
    <main style={pageMainNarrow}>
      <p style={subtextSmall}>
        {CATEGORY_LABELS[category]} — Card {currentIndex + 1} of {categoryCards.length}
      </p>
      <FlashcardComponent
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(true)}
        onRight={handleRight}
        onWrong={handleWrong}
      />
      <p>
        <Link to={ROUTES.STUDY_CATEGORY} style={linkSecondary}>
          ← Back to categories
        </Link>
      </p>
    </main>
  );
}
