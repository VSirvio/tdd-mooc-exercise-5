import { beforeEach, describe, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoEditForm from './TodoEditForm.jsx';

describe('TodoEditForm', () => {
  const origTodoContent = 'Do housework';
  let user;
  let handler;
  let inputField;
  beforeEach(() => {
    user = userEvent.setup();

    handler = vi.fn();

    render(<TodoEditForm content={origTodoContent} handler={handler} />);
  });

  test('can submit an edit for a todo', async () => {
    const inputField = screen.getByRole('textbox');
    const saveButton = screen.getByRole('button', { name: 'Save' });

    const todoContent = 'Do homework';

    fireEvent.change(inputField, { target: { value: todoContent } });
    await user.click(saveButton);

    expect(handler).toHaveBeenCalledExactlyOnceWith(todoContent);
  });

  test('sets the text field initially to the current todo content value', async () => {
    const inputField = screen.getByRole('textbox');
    expect(inputField.value).toBe(origTodoContent);
  });
});
