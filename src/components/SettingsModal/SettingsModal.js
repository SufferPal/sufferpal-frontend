/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SettingsForm from '../SettingsForm/SettingsForm';

const SettingsModal = (props) => {
  return (
    <div className="SettingsModal">
      <Modal isOpen={props.isModalOpen} toggle={props.toggleSettingsModal}>
        <ModalHeader toggle={props.toggleSettingsModal}>Edit User</ModalHeader>
        <ModalBody>
          <SettingsForm />
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Submit</Button>
          <Button color="secondary" onClick={props.toggleSettingsModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SettingsModal;
