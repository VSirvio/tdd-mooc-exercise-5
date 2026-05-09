import { beforeEach, describe, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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
    createButton = screen.getByText('Create');
  });

  test('can submit new todo', async () => {
    const todoContent = 'Go jogging';

    fireEvent.change(inputField, { target: { value: todoContent } });
    await user.click(createButton);

    const todoContent2 = 'Go fill up the car';

    fireEvent.change(inputField, { target: { value: todoContent2 } });
    await user.click(createButton);

    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(1, todoContent);
    expect(handler).toHaveBeenNthCalledWith(2, todoContent2);
  });

  test('does not accept empty content for todo', async () => {
    await user.click(createButton);
    expect(inputField).toBeInvalid();
  });

  test('does not accept too long content for todo', async () => {
    await user.click(inputField);
    await user.paste('a'.repeat(1000));
    expect(inputField.value.length).toBeLessThan(1000);
  });
});
