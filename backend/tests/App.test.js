import { describe, expect, test, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const MockTodoRepository = vi.fn(class {
  fetchAll = vi.fn()
});

const todoRepository = new MockTodoRepository();
const app = createApp(todoRepository);

describe('App', () => {
  test('responds with status code 200 when fetching all todos', async () => {
    await request(app)
      .get('/api/todos')
      .expect(200);
  });

  test('can fetch all todos', async () => {
    const todos = [
      { id: '69fcb2f2de7eee505d6378d1', content: 'Learn Chinese' },
      { id: '69fcb331be7431c61c810f44', content: 'Clean the house' },
      { id: '69fcb38256a328505119948e', content: 'Start a new project' },
    ];
    todoRepository.fetchAll.mockReturnValueOnce(todos);

    const response = await request(app).get('/api/todos');

    expect(todoRepository.fetchAll).toHaveBeenCalledExactlyOnceWith();
    expect(response.body).toEqual(todos);
  });
});
