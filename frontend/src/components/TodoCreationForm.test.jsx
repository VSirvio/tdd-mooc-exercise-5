import { beforeEach, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoCreationForm from './TodoCreationForm.jsx';

describe('TodoCreationForm', () => {
  let user;
  let handler;
  let inputField;
  let createButton;
  beforeEach(() => {
    user = userEvent.setup();

    handler = vi.fn();

    render(<TodoCreationForm handler={handler} />);

    inputField = screen.getByPlaceholderText('Write a new todo here');
  });

  test('can submit new todo', async () => {
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
