import React from 'react';
import { render } from '@testing-library/react';
import SettingsModal from './SettingsModal';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const fetchUser = jest.fn();
const toggleSettingsModal = jest.fn();
const isModalOpen = true;

test('renders SettingsModal', () => {
  const { getByText } = render(
    <Provider store={store}>
      <SettingsModal fetchUser={fetchUser} toggleSettingsModal={toggleSettingsModal} isModalOpen={isModalOpen} />
    </Provider>
  );
  const settingsModalText = getByText(/edit user/i);
  expect(settingsModalText).toBeInTheDocument();
});
