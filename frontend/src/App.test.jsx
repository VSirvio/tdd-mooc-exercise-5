import { describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import App from './App.jsx';
import TodoList from './components/TodoList.jsx';

const todoService = {
  fetchAll: vi.fn(),
  create: vi.fn(),
};

vi.mock(import('./components/TodoList.jsx'), () => ({ default: vi.fn() }));

describe('App', () => {
  test('displays todo list', async () => {
    const todoId = '69fcb2f2de7eee505d6378d1';

    let todoContent;
    todoService.create.mockImplementationOnce(todo => {
      todoContent = todo.content;
      return { id: todoId, content: todoContent };
    });
    todoService.fetchAll.mockReturnValueOnce([{ id: todoId, content: todoContent }]);

    const todoListText = 'This text is in the TodoList component';
    TodoList.mockReturnValue(<div>{todoListText}</div>);

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    const element = screen.getByText(todoListText);
    expect(element).toBeDefined();
  });
});
