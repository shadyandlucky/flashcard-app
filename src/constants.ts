/**
 * Application route paths. Centralizing avoids typos and makes refactors easier.
 */
export const ROUTES = {
  HOME: '/',
  STUDY_CATEGORY: '/study/category',
  STUDY_CATEGORY_PARAM: '/study/category/:category',
  STUDY_REDO: '/study/redo',
  QUIZ_CATEGORY: '/quiz/category',
  QUIZ_CATEGORY_PARAM: '/quiz/category/:category',
  STATS: '/stats',
} as const;

/** Builds study or quiz session URL for a category (e.g. "/study/category/animals"). */
export function categorySessionPath(mode: 'study' | 'quiz', category: string): string {
  const base = mode === 'study' ? ROUTES.STUDY_CATEGORY : ROUTES.QUIZ_CATEGORY;
  return `${base}/${category}`;
}
