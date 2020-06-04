/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import SettingsForm from '../SettingsForm/SettingsForm';

const SettingsModal = (props) => {
  const { userData, fetchUser } = props;

  return (
    <div className="SettingsModal">
      <Modal isOpen={props.isModalOpen} toggle={props.toggleSettingsModal}>
        <ModalHeader toggle={props.toggleSettingsModal}>Edit User</ModalHeader>
        <ModalBody>
          <SettingsForm toggleSettingsModal={props.toggleSettingsModal} userData={userData} fetchUser={fetchUser} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SettingsModal;
