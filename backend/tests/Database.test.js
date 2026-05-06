import { beforeAll, describe, expect, test } from 'vitest';
import { MongoClient } from 'mongodb';
import { TodoRepository } from '../src/TodoRepository.js';
import { DbTestHelper } from './utils.js';

const DATABASE_URI = 'mongodb://localhost:27018/test';

describe('Database', () => {
  let mongoClient;
  let dbTestHelper;
  let todoRepository;
  beforeAll(() => {
    mongoClient = new MongoClient(DATABASE_URI);
    todoRepository = new TodoRepository(mongoClient);
  });

  test('returns an empty array of todos when nothing has been added yet', async () => {
    expect(await todoRepository.fetchAll()).toEqual([]);
  });

  test('the "content" field of a created todo has the correct value', async () => {
    const todo = { content: 'Do something' };
    const createdTodo = await todoRepository.create(todo);
    expect(createdTodo.content).toBe(todo.content);

    const todo2 = { content: 'Finish the TDD course' };
    const createdTodo2 = await todoRepository.create(todo2);
    expect(createdTodo2.content).toBe(todo2.content);
  });

  test('a created todo has an ID', async () => {
    const todo = { content: 'Learn Rust' };
    const createdTodo = await todoRepository.create(todo);
    expect(createdTodo).toHaveProperty('id');
  });

  test('contains a created todo', async () => {
    const todo = { content: 'Go for a walk' };
    const createdTodo = await todoRepository.create(todo);
    const todoInDb = await mongoClient.db().collection('todos').findOne({ _id: createdTodo.id });
    expect(todoInDb).toEqual({ _id: createdTodo.id, ...todo });
  });
});
