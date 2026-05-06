import { describe, expect, test } from 'vitest';
import { TodoRepository } from '../src/TodoRepository.js';

describe('Database', () => {
  test('returns an empty array of todos when nothing has been added yet', async () => {
    const todoRepository = new TodoRepository();
  });
});
