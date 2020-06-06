import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddGearForm from '../AddGearForm/AddGearForm';

const AddGearModal = ({ isModalOpen, toggleAddGearModal, fetchUser }) => {
  return (
    <div className="AddGearModal">
      <Modal isOpen={isModalOpen} toggle={toggleAddGearModal}>
        <ModalHeader toggle={toggleAddGearModal}>Add Gear</ModalHeader>
        <ModalBody>
          <AddGearForm toggleAddGearModal={toggleAddGearModal} fetchUser={fetchUser} />
        </ModalBody>
      </Modal>
    </div>
  );
};

AddGearModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  toggleAddGearModal: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

export default AddGearModal;
