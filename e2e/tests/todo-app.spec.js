import { test, describe, expect } from '@playwright/test';

describe('Todo App', () => {
  test('contains the message from the database', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await expect(page.getByText('Hello from database')).toBeVisible();
  });
});
