import React from 'react';
import { render } from '@testing-library/react';
import AddGearModal from './AddGearModal';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const fetchUser = jest.fn();
const toggleAddGearModal = jest.fn();
const isModalOpen = true;

test('renders AddGearModal', () => {
  const { getByText } = render(
    <Provider store={store}>
      <AddGearModal fetchUser={fetchUser} toggleAddGearModal={toggleAddGearModal} isModalOpen={isModalOpen} />
    </Provider>
  );
  const addGearModalText = getByText(/add gear/i);
  expect(addGearModalText).toBeInTheDocument();
});
