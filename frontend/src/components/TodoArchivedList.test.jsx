import { render } from '@testing-library/react';
import TodoArchivedList from './TodoArchivedList.jsx';

describe('TodoArchivedList', () => {
  test('displays its header', () => {
    render(<TodoArchivedList />);
  });
});
