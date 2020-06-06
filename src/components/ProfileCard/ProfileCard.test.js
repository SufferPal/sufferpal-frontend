import React from 'react';
import { render } from '@testing-library/react';
import ProfileCard from './ProfileCard';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

test('renders ProfileCard', () => {
  const { getByText } = render(
    <Provider store={store}>
      <ProfileCard />
    </Provider>
  );
  const createActivityFormText = getByText(/user settings/i);
  expect(createActivityFormText).toBeInTheDocument();
});
