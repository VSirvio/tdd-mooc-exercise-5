import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoCreationForm from './TodoCreationForm.jsx';

describe('TodoCreationForm', () => {
  test('can submit new todo', () => {
    render(<TodoCreationForm />);

    const createButton = screen.getByText('Create');
  });
});
