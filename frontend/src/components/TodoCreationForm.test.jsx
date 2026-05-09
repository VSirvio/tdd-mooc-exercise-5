import { beforeEach, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoCreationForm from './TodoCreationForm.jsx';

describe('TodoCreationForm', () => {
  let user;
  let handler;
  beforeEach(() => {
    user = userEvent.setup();

    handler = vi.fn();
  });

  test('can submit new todo', async () => {
    const handler = vi.fn();

    render(<TodoCreationForm handler={handler} />);

    const inputField = screen.getByPlaceholderText('Write a new todo here');
    const createButton = screen.getByText('Create');

    const todoContent = 'Go jogging';

    await user.type(inputField, todoContent);
    await user.click(createButton);

    const todoContent2 = 'Go fill up the car';

    await user.type(inputField, todoContent2);
    await user.click(createButton);

    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(1, todoContent);
    expect(handler).toHaveBeenNthCalledWith(2, todoContent2);
  });
});
