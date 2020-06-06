import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('renders Header', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router history={createMemoryHistory({})}>
        <Header />
      </Router>
    </Provider>
  );
  const headerText = getByText(/calendar/i);
  expect(headerText).toBeInTheDocument();
});
