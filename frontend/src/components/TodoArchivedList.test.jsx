import { render, screen } from '@testing-library/react';
import TodoArchivedList from './TodoArchivedList.jsx';

describe('TodoArchivedList', () => {
  test('displays its header', () => {
    render(<TodoArchivedList />);

    const header = screen.getByRole('heading', { name: 'Archived items' });
    expect(header).toBeVisible();
  });

  test('displays all of its items', () => {
    const todos = [
      { id: '69fd8a21f5342f5fb8a8fa82', content: 'Take out the trash' },
      { id: '69fd8a874e0072ca38992d4a', content: 'Pay the bills' },
    ];

    render(<TodoArchivedList items={todos} />);

    expect(screen.getByText(todos[0].content)).toBeVisible();
    expect(screen.getByText(todos[1].content)).toBeVisible();
  });
});
