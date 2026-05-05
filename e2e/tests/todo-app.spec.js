import { test, describe, expect } from '@playwright/test';

describe('Todo App', () => {
  test('contains heading "Todos"', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await expect(page.getByRole('heading', { name: 'Todos' })).toBeVisible();
  });
});
