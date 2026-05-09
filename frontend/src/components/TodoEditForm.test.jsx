import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoEditForm from './TodoEditForm.jsx';

describe('TodoEditForm', () => {
  test('can submit an edit for a todo', () => {
    render(<TodoEditForm />);

    const inputField = screen.getByRole('textbox');
    const saveButton = screen.getByRole('button', { name: 'Save' });
  });
});
