import { describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act, useEffect } from 'react';
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
    const todoListText = 'This text is in the TodoList component';
    TodoList.mockReturnValue(<div>{todoListText}</div>);

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    const element = screen.getByText(todoListText);
    expect(element).toBeDefined();
  });

  test('populates the todo list', async () => {
    const todo = { id: '69fd8a21f5342f5fb8a8fa82', content: 'Take a nap' };

    todoService.fetchAll.mockReturnValue([todo]);

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    expect(TodoList).toHaveBeenCalledWith({ todos: [todo] }, undefined);
  });

  test('displays todo creation form', async () => {
    const todoCreationFormText = 'This text is in the TodoCreationForm component';
    TodoCreationForm.mockReturnValue(<div>{todoCreationFormText}</div>);

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    const element = screen.getByText(todoCreationFormText);
    expect(element).toBeDefined();
  });

  test('creates a new todo when the todo creation form is submitted', async () => {
    const newTodoContent = 'Practice playing piano';

    let newTodoCreated = false;
    todoService.create.mockImplementation(async todo => {
      newTodoCreated = todo.content === newTodoContent;
    });

    TodoCreationForm.mockImplementation(({ handler }) => {
      useEffect(() => {
        handler(newTodoContent);
      }, []);
    });

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    expect(newTodoCreated).toBe(true);
    expect(todoService.fetchAll).toHaveBeenCalledTimes(2);
  });
});
