import { describe, expect, test, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const MockTodoRepository = vi.fn(class {
  fetchAll = vi.fn()
  create = vi.fn()
  update = vi.fn()
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

  test('responds with status code 201 after creating a new todo', async () => {
    await request(app)
      .post('/api/todos')
      .send({ content: 'Do something' })
      .expect(201);
  });

  test('can create new todo', async () => {
    const todo = { id: '69fcb75675199230e2d3ce25', content: 'Update my PC' };
    const newTodoData = { content: todo.content };
    todoRepository.create.mockReturnValueOnce(todo);

    const response = await request(app)
      .post('/api/todos')
      .send(newTodoData);

    expect(todoRepository.create).toHaveBeenCalledExactlyOnceWith(newTodoData);
    expect(response.body).toEqual(todo);
  });

  test('responds with error when trying to create a new todo with invalid content', async () => {
    await request(app).post('/api/todos').send({}).expect(400);
    await request(app).post('/api/todos').send('a').expect(400);
    await request(app).post('/api/todos').send({ content: 7 }).expect(400);
    await request(app).post('/api/todos').send({ content: 'a'.repeat(1000) }).expect(400);
  });

  test('can edit a todo', async () => {
    const editedTodo = { id: '69ff129e6dc59b0a6816edee', content: 'Book the trip to Rome' };
    todoRepository.update.mockReturnValueOnce(editedTodo);

    const response = await request(app)
      .put('/api/todos')
      .send(editedTodo)
      .expect(200);

    expect(response.body).toEqual(editedTodo);
    expect(todoRepository.update).toHaveBeenCalledExactlyOnceWith(editedTodo);
  });

  test('responds with error when trying to edit a todo that does not exist', async () => {
    const editedTodo = { id: '69ff1b366dc59b0a6816edef', content: 'Book the trip to Paris' };
    todoRepository.update.mockReturnValueOnce(null);
    await request(app).put('/api/todos').send(editedTodo).expect(404);
  });

  test('responds with error when trying to edit a todo using invalid data', async () => {
    await request(app).put('/api/todos').send('a').expect(400);
  });
});
