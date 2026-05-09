import { test, describe, expect } from '@playwright/test';

describe('Todo App', () => {
  test('contains the message from the database', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await expect(page.getByText('To the database and back again').first()).toBeVisible();
  });

  test('can create a new todo and then view it in the list', async ({ page }) => {
    const todoContent = 'Do something';

    await page.goto('http://localhost:5173');

    await page.getByRole('textbox').fill(todoContent);
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByText(todoContent).waitFor();
  });
});
