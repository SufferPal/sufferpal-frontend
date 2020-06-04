import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddGearForm from '../AddGearForm/AddGearForm';
import { API, graphqlOperation } from 'aws-amplify';
import { createGear } from '../../graphql/mutations';
import { useSelector } from 'react-redux';

const AddGearModal = (props) => {
  const { userData, fetchUser, isModalOpen, toggleAddGearModal } = props;
  const userID = useSelector((state) => state.user.id);
  const addGear = async (gear) => {
    await API.graphql(graphqlOperation(createGear, { input: gear }));
  };

  return (
    <div className="AddGearModal">
      <Modal isOpen={isModalOpen} toggle={toggleAddGearModal}>
        <ModalHeader toggle={toggleAddGearModal}>Edit User</ModalHeader>
        <ModalBody>
          <AddGearForm toggleAddGearModal={toggleAddGearModal} userData={userData} fetchUser={fetchUser} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddGearModal;
