import { beforeEach, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoEditForm from './TodoEditForm.jsx';

describe('TodoEditForm', () => {
  test('can submit an edit for a todo', async () => {
    const user = userEvent.setup();

    const handler = vi.fn();

    render(<TodoEditForm handler={handler} />);

    const inputField = screen.getByRole('textbox');
    const saveButton = screen.getByRole('button', { name: 'Save' });

    const todoContent = 'Do homework';

    await user.type(inputField, todoContent);
    await user.click(saveButton);

    expect(handler).toHaveBeenCalledExactlyOnceWith(todoContent);
  });
});
