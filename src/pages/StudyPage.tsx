import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { flashcards } from '../data/flashcards';
import type { Flashcard } from '../data/types';
import FlashcardComponent from '../components/Flashcard';

const categoryLabels: Record<string, string> = {
  animals: 'Animals',
  food: 'Food',
  verbs: 'Verbs',
};

export default function StudyPage() {
  const { category } = useParams<{ category: string }>();
  const [wrongCards, setWrongCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categoryCards = flashcards.filter((c) => c.category === category);
  const isValidCategory = category && ['animals', 'food', 'verbs'].includes(category);
  const currentCard = isValidCategory ? categoryCards[currentIndex] : undefined;
  const isDone = isValidCategory && currentIndex >= categoryCards.length;

  const handleRight = () => {
    setIsFlipped(false);
    setCurrentIndex((i) => i + 1);
  };

  const handleWrong = () => {
    if (currentCard) setWrongCards((prev) => [...prev, currentCard]);
    setIsFlipped(false);
    setCurrentIndex((i) => i + 1);
  };

  if (!isValidCategory) {
    return (
      <main style={{ padding: '2rem', maxWidth: '32rem', margin: '0 auto' }}>
        <p>Invalid category.</p>
        <Link to="/study/category" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
          ← Back to categories
        </Link>
      </main>
    );
  }

  if (isDone) {
    return (
      <main style={{ padding: '2rem', maxWidth: '32rem', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Session complete</h1>
        <p style={{ color: '#888', marginBottom: '1.5rem' }}>
          You reviewed all {categoryCards.length} cards in {categoryLabels[category] ?? category}.
          {wrongCards.length > 0 && (
            <span> {wrongCards.length} marked as wrong (Redo mode in Phase 3).</span>
          )}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link
            to="/study/category"
            style={{
              display: 'block',
              padding: '0.75rem 1.25rem',
              background: '#374151',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            Study another category
          </Link>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '28rem', margin: '0 auto' }}>
      <p style={{ color: '#888', marginBottom: '1rem' }}>
        {categoryLabels[category] ?? category} — Card {currentIndex + 1} of {categoryCards.length}
      </p>
      <FlashcardComponent
        card={currentCard!}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(true)}
        onRight={handleRight}
        onWrong={handleWrong}
      />
      <p>
        <Link to="/study/category" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
          ← Back to categories
        </Link>
      </p>
    </main>
  );
}
