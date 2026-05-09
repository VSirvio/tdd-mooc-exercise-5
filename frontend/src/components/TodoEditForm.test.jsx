import { beforeEach, describe, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoEditForm from './TodoEditForm.jsx';

describe('TodoEditForm', () => {
  const origTodoContent = 'Do housework';
  let user;
  let handler;
  let inputField;
  let saveButton;
  beforeEach(() => {
    user = userEvent.setup();

    handler = vi.fn();

    render(<TodoEditForm content={origTodoContent} handler={handler} />);

    inputField = screen.getByRole('textbox');
    saveButton = screen.getByRole('button', { name: 'Save' });
  });

  test('can submit an edit for a todo', async () => {
    const todoContent = 'Do homework';

    fireEvent.change(inputField, { target: { value: todoContent } });
    await user.click(saveButton);

    expect(handler).toHaveBeenCalledExactlyOnceWith(todoContent);
  });

  test('sets the text field initially to the current todo content value', async () => {
    expect(inputField.value).toBe(origTodoContent);
  });

  test('does not accept empty content for todo', async () => {
    await user.clear(inputField);
    await user.click(saveButton);
    expect(inputField).toBeInvalid();
  });

  test('does not accept too long content for todo', async () => {
    await user.click(inputField);
    await user.paste('a'.repeat(1000));
    expect(inputField.value.length).toBeLessThan(1000);
  });
});
