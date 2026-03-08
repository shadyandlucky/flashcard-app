import type { Flashcard } from './types';
import { isCategory } from './types';

/** Static flashcard set: animals, food, verbs. Used by study and (later) quiz. */
export const flashcards: Flashcard[] = [
  // Animals
  {
    category: 'animals',
    spanish: 'el gato',
    english: 'the cat',
    quiz: {
      type: 'multiple-choice',
      options: ['the dog', 'the house', 'the cat', 'the bird'],
    },
  },
  {
    category: 'animals',
    spanish: 'el perro',
    english: 'the dog',
    quiz: {
      type: 'multiple-choice',
      options: ['the cat', 'the dog', 'the fish', 'the horse'],
    },
  },
  {
    category: 'animals',
    spanish: 'el pájaro',
    english: 'the bird',
    quiz: {
      type: 'multiple-choice',
      options: ['the bird', 'the snake', 'the mouse', 'the cow'],
    },
  },
  {
    category: 'animals',
    spanish: 'el caballo',
    english: 'the horse',
    quiz: {
      type: 'multiple-choice',
      options: ['the pig', 'the horse', 'the goat', 'the sheep'],
    },
  },
  // Food
  {
    category: 'food',
    spanish: 'la manzana',
    english: 'the apple',
    quiz: {
      type: 'multiple-choice',
      options: ['the orange', 'the apple', 'the bread', 'the milk'],
    },
  },
  {
    category: 'food',
    spanish: 'el pan',
    english: 'the bread',
    quiz: {
      type: 'multiple-choice',
      options: ['the bread', 'the water', 'the cheese', 'the rice'],
    },
  },
  {
    category: 'food',
    spanish: 'la leche',
    english: 'the milk',
    quiz: {
      type: 'multiple-choice',
      options: ['the milk', 'the coffee', 'the tea', 'the juice'],
    },
  },
  {
    category: 'food',
    spanish: 'el agua',
    english: 'the water',
    quiz: {
      type: 'multiple-choice',
      options: ['the water', 'the wine', 'the beer', 'the soda'],
    },
  },
  // Verbs
  {
    category: 'verbs',
    spanish: 'comer',
    english: 'to eat',
    quiz: {
      type: 'multiple-choice',
      options: ['to drink', 'to eat', 'to run', 'to sleep'],
    },
  },
  {
    category: 'verbs',
    spanish: 'beber',
    english: 'to drink',
    quiz: {
      type: 'multiple-choice',
      options: ['to eat', 'to drink', 'to read', 'to write'],
    },
  },
  {
    category: 'verbs',
    spanish: 'dormir',
    english: 'to sleep',
    quiz: {
      type: 'multiple-choice',
      options: ['to sleep', 'to wake', 'to walk', 'to sit'],
    },
  },
  {
    category: 'verbs',
    spanish: 'hablar',
    english: 'to speak',
    quiz: {
      type: 'multiple-choice',
      options: ['to listen', 'to speak', 'to think', 'to know'],
    },
  },
];

/** Returns flashcards for the given category, or empty array if category is invalid. */
export function getCardsByCategory(category: string | undefined): Flashcard[] {
  return isCategory(category) ? flashcards.filter((c) => c.category === category) : [];
}
