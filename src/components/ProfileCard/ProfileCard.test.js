import React from 'react';
import { render } from '@testing-library/react';
import ProfileCard from './ProfileCard';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const fetchUser = jest.fn();

test('renders ProfileCard', () => {
  const { getByText } = render(
    <Provider store={store}>
      <ProfileCard fetchUser={fetchUser} />
    </Provider>
  );
  const profileCardText = getByText(/user settings/i);
  expect(profileCardText).toBeInTheDocument();
});
