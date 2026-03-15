import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCardsByCategory } from '../data/flashcards';
import { isCategory } from '../data/types';
import { useStats } from '../context/StatsContext';
import type { QuizTypeSlug } from '../constants';
import { ROUTES } from '../constants';
import {
  pageMain,
  heading,
  subtext,
  navColumn,
  buttonLink,
  linkSecondary,
  topSpacer,
} from '../styles';

const QUIZ_TYPE_SLUGS: QuizTypeSlug[] = ['multiple-choice', 'fill-in'];

function isQuizType(value: string | undefined): value is QuizTypeSlug {
  return value !== undefined && (QUIZ_TYPE_SLUGS as readonly string[]).includes(value);
}

/** Fisher–Yates shuffle (mutates array). */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function QuizPage() {
  const { category, quizType } = useParams<{ category: string; quizType: string }>();
  const { recordResult } = useStats();
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; correctAnswer: string } | null>(null);
  const [fillInput, setFillInput] = useState('');

  if (!isCategory(category) || !isQuizType(quizType)) {
    return (
      <main style={pageMain}>
        <h1 style={heading}>Invalid quiz</h1>
        <p style={subtext}>Category or quiz type is missing.</p>
        <Link to={ROUTES.QUIZ_CATEGORY} style={linkSecondary}>← Back to quiz selection</Link>
      </main>
    );
  }

  const cards = getCardsByCategory(category);
  if (cards.length === 0) {
    return (
      <main style={pageMain}>
        <h1 style={heading}>No cards</h1>
        <p style={subtext}>There are no cards in this category.</p>
        <Link to={ROUTES.QUIZ_CATEGORY} style={linkSecondary}>← Back to quiz selection</Link>
      </main>
    );
  }

  const done = index >= cards.length;
  const card = cards[index];
  const isMultipleChoice = quizType === 'multiple-choice';
  // Use a valid card for useMemo so we always call the same hooks (Rules of Hooks).
  const cardForOptions = card ?? cards[0];
  const shuffledOptions = useMemo(
    () =>
      cardForOptions &&
      isMultipleChoice &&
      cardForOptions.quiz.type === 'multiple-choice'
        ? shuffle([...cardForOptions.quiz.options])
        : [],
    [cardForOptions?.spanish, isMultipleChoice]
  );

  if (done || !card) {
    return (
      <main style={pageMain}>
        <h1 style={heading}>Quiz complete</h1>
        <p style={subtext}>
          You&apos;ve gone through all {cards.length} cards. Great job!
        </p>
        <nav style={navColumn}>
          <Link to={ROUTES.HOME} style={buttonLink}>
            ← Back to Main Page
          </Link>
          <Link to={ROUTES.QUIZ_CATEGORY} style={linkSecondary}>
            Choose another quiz
          </Link>
        </nav>
      </main>
    );
  }

  const handleNext = () => {
    setFeedback(null);
    setFillInput('');
    setIndex((i) => i + 1);
  };

  const handleMultipleChoiceClick = (option: string) => {
    if (feedback) return;
    const correct = option === card.english;
    recordResult(category, correct);
    setFeedback({ correct, correctAnswer: card.english });
  };

  const handleFillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback) return;
    const normalized = fillInput.trim().toLowerCase();
    const correct = normalized === card.english.toLowerCase();
    recordResult(category, correct);
    setFeedback({ correct, correctAnswer: card.english });
  };

  return (
    <main style={pageMain}>
      <p style={subtext}>
        Question {index + 1} of {cards.length}
      </p>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{card.spanish}</h2>

      {isMultipleChoice ? (
        <>
          <nav style={navColumn}>
            {shuffledOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleMultipleChoiceClick(option)}
                disabled={!!feedback}
                style={{
                  ...buttonLink,
                  cursor: feedback ? 'default' : 'pointer',
                  background: feedback && option === card.english ? '#059669' : '#374151',
                }}
              >
                {option}
              </button>
            ))}
          </nav>
          {feedback && (
            <p style={{ marginTop: '1rem', fontWeight: 600, color: feedback.correct ? '#059669' : '#dc2626' }}>
              {feedback.correct ? 'Correct!' : `Wrong — the answer was: ${feedback.correctAnswer}`}
            </p>
          )}
        </>
      ) : (
        <form onSubmit={handleFillSubmit}>
          <input
            type="text"
            value={fillInput}
            onChange={(e) => setFillInput(e.target.value)}
            placeholder="Type the English translation"
            disabled={!!feedback}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #374151',
              marginBottom: '1rem',
            }}
            autoFocus
          />
          <button type="submit" disabled={!!feedback} style={buttonLink}>
            Submit
          </button>
          {feedback && (
            <p style={{ marginTop: '1rem', fontWeight: 600, color: feedback.correct ? '#059669' : '#dc2626' }}>
              {feedback.correct ? 'Correct!' : `Wrong — the answer was: ${feedback.correctAnswer}`}
            </p>
          )}
        </form>
      )}

      {feedback && (
        <p style={topSpacer}>
          <button type="button" onClick={handleNext} style={buttonLink}>
            Next
          </button>
        </p>
      )}

      <p style={{ ...topSpacer, marginTop: '1.5rem' }}>
        <Link to={ROUTES.QUIZ_CATEGORY} style={linkSecondary}>← Cancel and choose another quiz</Link>
      </p>
    </main>
  );
}
