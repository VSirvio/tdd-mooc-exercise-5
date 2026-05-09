import { afterEach, describe, expect, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { TodoService } from './TodoService.js';

const API_URL = 'http://localhost/api/todos';

const todoService = new TodoService(API_URL);

const mockServer = setupServer();
mockServer.listen();

describe('Todo service', () => {
  afterEach(() => {
    mockServer.resetHandlers();
  });

  test('can fetch all todos', async () => {
    const todos = [
      { id: '69fcd8b9414992d62f01fc7c', content: 'Get the birthday present' },
    ];

    mockServer.use(
      http.get(API_URL, () => {
        return HttpResponse.json(todos);
      })
    );

    const fetchedTodos = await todoService.fetchAll();
    expect(fetchedTodos).toEqual(todos);
  });

  test('can create new todo', async () => {
    const todo = { id: '69fcde5bf74fcbdccf1661d8', content: 'Fix the car' };
    const newTodoData = { content: todo.content };

    let requestBody;
    mockServer.use(
      http.post(API_URL, async ({ request }) => {
        requestBody = await request.clone().json();
        return HttpResponse.json(todo);
      })
    );

    const createdTodo = await todoService.create(newTodoData);
    expect(requestBody).toEqual(newTodoData);
    expect(createdTodo).toEqual(todo);
  });

  test('can edit a todo', async () => {
    const todoEditData = { id: '69ff230d6dc59b0a6816edf0', content: 'Buy potatoes' };

    const editedTodo = await todoService.update(todoEditData);
    expect(editedTodo).toEqual(todoEditData);
  });
});
