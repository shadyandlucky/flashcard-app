import { test, expect } from '@playwright/test';

test.describe('Study flow', () => {
  test('first card shows Spanish by default', async ({ page }) => {
    await page.goto('/study/category/animals');
    await expect(page.getByText(/Animals — Card 1 of/)).toBeVisible();
    await expect(page.getByText('el gato')).toBeVisible();
    await expect(page.getByRole('button', { name: '✅ Right' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: '❌ Wrong' })).not.toBeVisible();
  });

  test('clicking card flips to English and shows Right/Wrong buttons', async ({ page }) => {
    await page.goto('/study/category/animals');
    await page.getByRole('button').first().click();
    await expect(page.getByText('the cat')).toBeVisible();
    await expect(page.getByRole('button', { name: '✅ Right' })).toBeVisible();
    await expect(page.getByRole('button', { name: '❌ Wrong' })).toBeVisible();
  });

  test('clicking Right advances to next card', async ({ page }) => {
    await page.goto('/study/category/animals');
    await page.getByRole('button').first().click();
    await page.getByRole('button', { name: '✅ Right' }).click();
    await expect(page.getByText(/Card 2 of/)).toBeVisible();
    await expect(page.getByText('el perro')).toBeVisible();
  });

  test('clicking Wrong advances to next card', async ({ page }) => {
    await page.goto('/study/category/animals');
    await page.getByRole('button').first().click();
    await page.getByRole('button', { name: '❌ Wrong' }).click();
    await expect(page.getByText(/Card 2 of/)).toBeVisible();
  });

  test('can complete a category and see session complete', async ({ page }) => {
    await page.goto('/study/category/animals');
    const animalsCardCount = 4;
    for (let i = 0; i < animalsCardCount; i++) {
      await page.getByRole('button').first().click();
      await page.getByRole('button', { name: '✅ Right' }).click();
    }
    await expect(page.getByRole('heading', { name: 'Session complete' })).toBeVisible();
    await expect(page.getByText(/You reviewed all 4 cards/)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Study another category' })).toBeVisible();
    await expect(page.getByRole('link', { name: '← Back to Home' })).toBeVisible();
  });

  test('Back to categories from study returns to category selection', async ({ page }) => {
    await page.goto('/study/category/animals');
    await page.getByRole('link', { name: '← Back to categories' }).click();
    await expect(page).toHaveURL('/study/category');
    await expect(page.getByRole('heading', { name: /Study Mode.*Choose a category/ })).toBeVisible();
  });
});
