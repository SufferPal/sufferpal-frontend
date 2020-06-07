import React from 'react';
import { render } from '@testing-library/react';
import SettingsForm from './SettingsForm';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const fetchUser = jest.fn();
const toggleSettingsModal = jest.fn();

test('renders SettingsForm', () => {
  const { getByText } = render(
    <Provider store={store}>
      <SettingsForm fetchUser={fetchUser} toggleSettingsModal={toggleSettingsModal} />
    </Provider>
  );
  const settingsFormText = getByText(/profile picture/i);
  expect(settingsFormText).toBeInTheDocument();
});
