import React from 'react';
import { render } from '@testing-library/react';
import ViewGearModal from './ViewGearModal';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const fetchUser = jest.fn();
const toggleViewGearModal = jest.fn();
const isModalOpen = true;

test('renders ViewGearModal', () => {
  const { getByText } = render(
    <Provider store={store}>
      <ViewGearModal fetchUser={fetchUser} toggleViewGearModal={toggleViewGearModal} isModalOpen={isModalOpen} />
    </Provider>
  );
  const ViewGearModalText = getByText(/view gear/i);
  expect(ViewGearModalText).toBeInTheDocument();
});
