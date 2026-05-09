import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList.jsx';

describe('TodoList', () => {
  test('can display todos', () => {
    const todos = [
      { id: '69fd8a21f5342f5fb8a8fa82', content: 'Take out the trash' },
      { id: '69fd8a874e0072ca38992d4a', content: 'Pay the bills' },
    ];

    render(<TodoList todos={todos} />);

    const element = screen.getByText(todos[0].content);
    expect(element).toBeDefined();

    const element2 = screen.getByText(todos[1].content);
    expect(element2).toBeDefined();
  });

  test('informs its parent when an "Edit" button is pressed', async () => {
    const user = userEvent.setup();

    const todos = [
      { id: '69fd8a21f5342f5fb8a8fa82', content: 'Take out the trash' },
      { id: '69fd8a874e0072ca38992d4a', content: 'Pay the bills' },
    ];

    const editTodo = vi.fn();

    render(<TodoList todos={todos} editTodo={editTodo} />);

    const editButtons = screen.getAllByRole('button', { name: 'Edit' });
    await user.click(editButtons[1]);

    expect(editTodo).toHaveBeenCalledExactlyOnceWith(todos[1].id);
  });

  test('informs its parent when a "Complete" button is pressed', async () => {
    const user = userEvent.setup();

    const todos = [
      { id: '69fd8a21f5342f5fb8a8fa82', content: 'Take out the trash' },
      { id: '69fd8a874e0072ca38992d4a', content: 'Pay the bills' },
    ];

    const completeTodo = vi.fn();

    render(<TodoList todos={todos} completeTodo={completeTodo} />);

    const completeButtons = screen.getAllByRole('button', { name: 'Complete' });
    await user.click(completeButtons[1]);

    expect(completeTodo).toHaveBeenCalledExactlyOnceWith(todos[1].id);
  });

  test('strikes through the todos that have been completed', async () => {
    const todos = [
      { id: '69fd8a21f5342f5fb8a8fa82', content: 'Take out the trash' },
      { id: '69fd8a874e0072ca38992d4a', content: 'Pay the bills', state: 'completed' },
    ];

    render(<TodoList todos={todos} />);

    const element = screen.getByText(todos[1].content);
    expect(element).toHaveStyle({ textDecoration: 'line-through' });
  });
});
