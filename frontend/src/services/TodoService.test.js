import { describe, expect, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { TodoService } from './TodoService.js';

const API_URL = 'http://localhost/api/todos';

const todoService = new TodoService(API_URL);

const mockServer = setupServer();
mockServer.listen();

describe('Todo service', () => {
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
});
