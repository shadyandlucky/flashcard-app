export type Category = 'animals' | 'food' | 'verbs';

export interface Flashcard {
  category: Category;
  spanish: string;
  english: string;
  quiz: {
    type: 'multiple-choice';
    options: string[];
  };
}

export const CATEGORIES: Category[] = ['animals', 'food', 'verbs'];
