import { describe, expect, test } from 'vitest';
import { TodoService } from './TodoService.js';

const todoService = new TodoService();

describe('Todo service', () => {
  test('can fetch all todos', async () => {
    const todos = [];
    const fetchedTodos = await todoService.fetchAll();
    expect(fetchedTodos).toEqual(todos);
  });
});
