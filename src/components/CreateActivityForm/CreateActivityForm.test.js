import React from 'react';
import { render } from '@testing-library/react';
import CreateActivityForm from './CreateActivityForm';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

test('renders CreateActivityForm', () => {
  const fetchUser = jest.fn();

  const { getByText } = render(
    <Provider store={store}>
      <CreateActivityForm fetchUser={fetchUser} />
    </Provider>
  );
  const createActivityFormText = getByText(/fit file dropbox/i);
  expect(createActivityFormText).toBeInTheDocument();
});
