import { describe, test } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('App', () => {
  test('responds with status code 200 when fetching all todos', async () => {
    await request(app)
      .get('/api/todos')
      .expect(200);
  });
});
