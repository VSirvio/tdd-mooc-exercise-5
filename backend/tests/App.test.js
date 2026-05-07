import { describe, test, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const MockTodoRepository = vi.fn(class {});

const app = createApp();

describe('App', () => {
  test('responds with status code 200 when fetching all todos', async () => {
    await request(app)
      .get('/api/todos')
      .expect(200);
  });
});
