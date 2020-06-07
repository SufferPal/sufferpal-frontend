import React from 'react';
import { render } from '@testing-library/react';
import AddGearForm from './AddGearForm';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const fetchUser = jest.fn();
const toggleAddGearModal = jest.fn();

test('renders AddGearForm', () => {
  const { getByText } = render(
    <Provider store={store}>
      <AddGearForm fetchUser={fetchUser} toggleAddGearModal={toggleAddGearModal} />
    </Provider>
  );
  const addGearFormText = getByText(/brand/i);
  expect(addGearFormText).toBeInTheDocument();
});
