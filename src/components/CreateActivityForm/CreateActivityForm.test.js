import React from 'react';
import { render } from '@testing-library/react';
import CreateActivityForm from '../CreateActivityForm/CreateActivityForm';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

test('renders CreateActivityForm', () => {
  const { getByText } = render(
    <Provider store={store}>
      <CreateActivityForm />
    </Provider>
  );
  const createActivityFormText = getByText(/fit file dropbox/i);
  expect(createActivityFormText).toBeInTheDocument();
});
