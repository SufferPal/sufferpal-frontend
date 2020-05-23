import React from 'react';
import { render } from '@testing-library/react';
import TimelinePage from '../TimelinePage/TimelinePage';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('renders learn react link', () => {
  const { getByText } = render(
    <Router history={createMemoryHistory({ initialEntries: ['/timeline'] })}>
      <TimelinePage />
    </Router>
  );
  const mainPageText = getByText(/timelinepage/i);
  expect(mainPageText).toBeInTheDocument();
});
