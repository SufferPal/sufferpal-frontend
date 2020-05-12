import React from 'react';
import { render } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('renders learn react link', () => {
  const { getByText } = render(
    <Router history={createMemoryHistory({ initialEntries: ['/profile'] })}>
      <ProfilePage />
    </Router>
  );
  const mainPageText = getByText(/profilepage/i);
  expect(mainPageText).toBeInTheDocument();
});
