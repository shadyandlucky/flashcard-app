/**
 * Category identifiers for flashcard grouping (animals, food, verbs).
 */
export type Category = 'animals' | 'food' | 'verbs';

export const CATEGORIES: Category[] = ['animals', 'food', 'verbs'];

/** Display labels for each category. */
export const CATEGORY_LABELS: Record<Category, string> = {
  animals: 'Animals',
  food: 'Food',
  verbs: 'Verbs',
};

/** Type guard: returns true if value is a valid Category. */
export function isCategory(value: string | undefined): value is Category {
  return value !== undefined && (CATEGORIES as readonly string[]).includes(value);
}

export interface Flashcard {
  category: Category;
  spanish: string;
  english: string;
  quiz: {
    type: 'multiple-choice';
    options: string[];
  };
}
