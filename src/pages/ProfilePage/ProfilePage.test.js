import React from 'react';
import { render } from '@testing-library/react';
import ProfilePage from './ProfilePage';

test('renders learn react link', () => {
  const { getByText } = render(<ProfilePage />);
  const mainPageText = getByText(/profilepage/i);
  expect(mainPageText).toBeInTheDocument();
});
