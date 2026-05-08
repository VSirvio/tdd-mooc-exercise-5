import { describe, test } from 'vitest';
import { render } from '@testing-library/react';
import TodoCreationForm from './TodoCreationForm.jsx';

describe('TodoCreationForm', () => {
  test('can submit new todo', () => {
    render(<TodoCreationForm />);
  });
});
