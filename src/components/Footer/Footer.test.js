import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('renders Footer', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router history={createMemoryHistory({})}>
        <Footer />
      </Router>
    </Provider>
  );
  const createActivityFormText = getByText(/calendar/i);
  expect(createActivityFormText).toBeInTheDocument();
});
