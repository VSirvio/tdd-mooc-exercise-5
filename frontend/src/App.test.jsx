import { describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act, useEffect } from 'react';
import App from './App.jsx';
import TodoList from './components/TodoList.jsx';
import TodoCreationForm from './components/TodoCreationForm.jsx';
import TodoEditForm from './components/TodoEditForm.jsx';

const todoService = {
  fetchAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
};

vi.mock(import('./components/TodoList.jsx'), () => ({ default: vi.fn() }));
vi.mock(import('./components/TodoCreationForm.jsx'), () => ({ default: vi.fn() }));
vi.mock(import('./components/TodoEditForm.jsx'), () => ({ default: vi.fn() }));

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

    expect(TodoList.mock.calls[0][0].todos).toContainEqual(todo);
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

  test('opens the edit view when a todo is selected for editing', async () => {
    const todoId = '69ff8e937b5ddc9a44e96940';
    const todoListText = 'This text is in the TodoList component';
    const todoEditFormText = 'This text is in the TodoEditForm component';

    TodoList.mockImplementation(({ editTodo }) => {
      useEffect(() => {
        editTodo(todoId);
      }, []);
      return <div>{todoListText}</div>;
    });

    TodoEditForm.mockImplementation(() => <div>{todoEditFormText}</div>);

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    expect(screen.queryByText(todoListText)).not.toBeInTheDocument();
    expect(screen.getByText(todoEditFormText)).toBeVisible();
  });

  test('returns to the list view when an edit is submitted', async () => {
    const todoId = '69ff8e937b5ddc9a44e96940';
    const editedContent = 'Water the flowers';
    const todoListText = 'This text is in the TodoList component';
    const todoEditFormText = 'This text is in the TodoEditForm component';

    let editFormVisited = false;
    TodoList.mockImplementation(({ editTodo }) => {
      useEffect(() => {
        if (!editFormVisited) {
          editTodo(todoId);
        }
      }, []);
      return <div>{todoListText}</div>;
    });

    TodoEditForm.mockImplementation(({ handler }) => {
      useEffect(() => {
        editFormVisited = true;
        handler(editedContent);
      }, []);
      return <div>{todoEditFormText}</div>;
    });

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    expect(screen.queryByText(todoEditFormText)).not.toBeInTheDocument();
    expect(screen.getByText(todoListText)).toBeVisible();
  });

  test('edits a todo when an edit is initiated in the edit view', async () => {
    const todoEditData = { id: '69ff8e937b5ddc9a44e96940', content: 'Water the flowers' };

    let editFormVisited = false;
    TodoList.mockImplementation(({ editTodo }) => {
      useEffect(() => {
        if (!editFormVisited) {
          editTodo(todoEditData.id);
        }
      }, []);
    });

    TodoEditForm.mockImplementation(({ handler }) => {
      useEffect(() => {
        editFormVisited = true;
        handler(todoEditData.content);
      }, []);
    });

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    expect(todoService.update).toHaveBeenCalledExactlyOnceWith(todoEditData);
  });

  test('passes the original content of the todo to the edit view', async () => {
    const todo = { id: '69ff8e937b5ddc9a44e96940', content: 'Water the flowers' };

    todoService.fetchAll.mockReturnValue([todo]);

    TodoList.mockImplementation(({ editTodo }) => {
      useEffect(() => {
          editTodo(todo.id);
      }, []);
    });

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    expect(TodoEditForm.mock.calls[0][0].content).toBe(todo.content);
  });

  test('refreshes the todo list after editing a todo', async () => {
    const todoEditData = { id: '69ff8e937b5ddc9a44e96940', content: 'Water the flowers' };

    let editFormVisited = false;
    TodoList.mockImplementation(({ editTodo }) => {
      useEffect(() => {
        if (!editFormVisited) {
          editTodo(todoEditData.id);
        }
      }, []);
    });

    TodoEditForm.mockImplementation(({ handler }) => {
      useEffect(() => {
        editFormVisited = true;
        handler(todoEditData.content);
      }, []);
    });

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    expect(todoService.fetchAll).toHaveBeenCalledTimes(2);
  });

  test('toggles the completed state of a todo when its "Complete" button is pressed', async () => {
    const todo = { id: '69ff8e937b5ddc9a44e96940', content: 'Water the flowers' };

    TodoList.mockImplementation(({ completeTodo }) => {
      useEffect(() => {
        completeTodo(todo.id);
      }, []);
    });

    todoService.fetchAll.mockReturnValue([todo]);

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    expect(todoService.update)
      .toHaveBeenCalledExactlyOnceWith({ id: todo.id, state: 'completed' });

    todoService.fetchAll.mockReturnValue([{ ...todo, state: 'completed' }]);

    await act(async () => {
      render(<App todoService={todoService} />);
    });

    expect(todoService.update).toHaveBeenCalledTimes(2);
    expect(todoService.update)
      .toHaveBeenNthCalledWith(2, { id: todo.id, state: undefined });
  });
});
