import { render, screen } from '@testing-library/react';
import TodoArchivedList from './TodoArchivedList.jsx';

describe('TodoArchivedList', () => {
  test('displays its header', () => {
    render(<TodoArchivedList />);

    const header = screen.getByRole('heading', { name: 'Archived items' });
    expect(header).toBeVisible();
  });
});
