import type { Flashcard as FlashcardType } from '../data/types';

interface FlashcardProps {
  card: FlashcardType;
  isFlipped: boolean;
  onFlip: () => void;
  onRight: () => void;
  onWrong: () => void;
}

/**
 * Single flashcard: front (Spanish), back (English). Click to flip; then Right/Wrong buttons.
 */
export default function Flashcard({ card, isFlipped, onFlip, onRight, onWrong }: FlashcardProps) {
  return (
    <div style={{ perspective: '1000px', marginBottom: '1.5rem' }}>
      {/* Flip trigger: click or Enter/Space to reveal English; keyboard keeps it accessible. */}
      <div
        role="button"
        tabIndex={0}
        onClick={onFlip}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onFlip()}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '160px',
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.4s ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            background: '#374151',
            borderRadius: '12px',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #4b5563',
          }}
        >
          <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>{card.spanish}</span>
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#1e3a5f',
            borderRadius: '12px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            border: '1px solid #2563eb',
          }}
        >
          <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>{card.english}</span>
        </div>
      </div>
      {/* Right/Wrong only after flip; stopPropagation so clicking them doesn't flip again. */}
      {isFlipped && (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRight();
            }}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ✅ Right
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onWrong();
            }}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ❌ Wrong
          </button>
        </div>
      )}
    </div>
  );
}
