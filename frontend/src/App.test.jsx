import { describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import App from './App.jsx';
import TodoList from './components/TodoList.jsx';
import TodoCreationForm from './components/TodoCreationForm.jsx';

const todoService = {
  fetchAll: vi.fn(),
  create: vi.fn(),
};

vi.mock(import('./components/TodoList.jsx'), () => ({ default: vi.fn() }));
vi.mock(import('./components/TodoCreationForm.jsx'), () => ({ default: vi.fn() }));

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

  test('populates the todo list', async () => {
    const todoId = '69fcb2f2de7eee505d6378d1';

    const todo = { id: '69fd8a21f5342f5fb8a8fa82', content: 'Take a nap' };

    let todoContent;
    todoService.create.mockImplementationOnce(todo => {
      todoContent = todo.content;
      return { id: todoId, content: todoContent };
    });
    todoService.fetchAll.mockReturnValue([
      { id: todoId, content: todoContent },
      todo,
    ]);

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    expect(TodoList.mock.calls).toSatisfy(calls => calls.some(call =>
      call[0].todos.some(t => t.id === todo.id && t.content === todo.content)
    ));
  });

  test('displays todo creation form', async () => {
    const todoId = '69fcb2f2de7eee505d6378d1';

    let todoContent;
    todoService.create.mockImplementationOnce(todo => {
      todoContent = todo.content;
      return { id: todoId, content: todoContent };
    });
    todoService.fetchAll.mockReturnValueOnce([{ id: todoId, content: todoContent }]);

    const todoCreationFormText = 'This text is in the TodoCreationForm component';
    TodoCreationForm.mockReturnValue(<div>{todoCreationFormText}</div>);

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    const element = screen.getByText(todoCreationFormText);
    expect(element).toBeDefined();
  });
});
