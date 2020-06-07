/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import SettingsForm from '../SettingsForm/SettingsForm';

const SettingsModal = ({ fetchUser, firstName, lastName, weight, toggleSettingsModal, isModalOpen }) => {
  return (
    <div className="SettingsModal">
      <Modal isOpen={isModalOpen} toggle={toggleSettingsModal}>
        <ModalHeader toggle={toggleSettingsModal}>Edit User</ModalHeader>
        <ModalBody>
          <SettingsForm
            toggleSettingsModal={toggleSettingsModal}
            firstName={firstName}
            lastName={lastName}
            weight={weight}
            fetchUser={fetchUser}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

SettingsModal.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  weight: PropTypes.number,
  gear: PropTypes.shape({
    items: PropTypes.array,
  }),
  toggleSettingsModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

SettingsModal.defaultProps = {
  firstName: '',
  lastName: '',
  weight: 0,
  gear: {},
};

export default SettingsModal;
