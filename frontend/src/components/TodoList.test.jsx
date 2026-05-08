import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  });
});
