import {
  afterEach,
  beforeAll,
  describe,
  expect,
  request,
  test,
} from '@playwright/test';

describe('Todo App', () => {
  beforeAll(async () => {
    const api = await request.newContext();
    await api.post('http://localhost:5173/api/testing/reset');
  });

  afterEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset');
  });

  test('can create a new todo and then view it in the list', async ({ page }) => {
    const todoContent = 'Do something';

    await page.goto('http://localhost:5173');

    await page.getByRole('textbox').fill(todoContent);
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByText(todoContent).waitFor();
  });
});
