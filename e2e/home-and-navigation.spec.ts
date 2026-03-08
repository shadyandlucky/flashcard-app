import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('displays welcome and navigation options', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Spanish Flashcards' })).toBeVisible();
    await expect(page.getByText('Choose how you want to practice.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Study Mode' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Quiz Mode' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Stats Page' })).toBeVisible();
  });

  test('Study Mode link navigates to category selection for study', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Study Mode' }).click();
    await expect(page).toHaveURL('/study/category');
    await expect(page.getByRole('heading', { name: /Study Mode.*Choose a category/ })).toBeVisible();
  });

  test('Quiz Mode link navigates to category selection for quiz', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Quiz Mode' }).click();
    await expect(page).toHaveURL('/quiz/category');
    await expect(page.getByRole('heading', { name: /Quiz Mode.*Choose a category/ })).toBeVisible();
  });

  test('Stats Page link navigates to statistics page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Stats Page' }).click();
    await expect(page).toHaveURL('/stats');
    await expect(page.getByRole('heading', { name: 'Statistics' })).toBeVisible();
  });
});

test.describe('Category selection', () => {
  test('study category page lists all three categories', async ({ page }) => {
    await page.goto('/study/category');
    await expect(page.getByRole('link', { name: 'Animals' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Food' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Verbs' })).toBeVisible();
  });

  test('clicking Animals in study mode goes to study session for animals', async ({ page }) => {
    await page.goto('/study/category');
    await page.getByRole('link', { name: 'Animals' }).click();
    await expect(page).toHaveURL('/study/category/animals');
    await expect(page.getByText(/Animals — Card 1 of/)).toBeVisible();
  });

  test('Back to Home from category selection returns to home', async ({ page }) => {
    await page.goto('/study/category');
    await page.getByRole('link', { name: '← Back to Home' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Spanish Flashcards' })).toBeVisible();
  });
});
