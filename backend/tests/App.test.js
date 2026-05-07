import { describe, test } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app2 = createApp();

describe('App', () => {
  test('responds with status code 200 when fetching all todos', async () => {
    await request(app2)
      .get('/api/todos')
      .expect(200);
  });
});
