import { beforeAll, describe, expect, test } from 'vitest';
import { TodoRepository } from '../src/TodoRepository.js';

describe('Database', () => {
  let todoRepository;
  beforeAll(() => {
    todoRepository = new TodoRepository();
  });

  test('returns an empty array of todos when nothing has been added yet', async () => {
    expect(await todoRepository.fetchAll()).toEqual([]);
  });

  test('the "content" field of a created todo has the correct value', async () => {
    const todo = { content: 'Do something' };
    const createdTodo = await todoRepository.create(todo);
  });
});
