/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import SettingsForm from '../SettingsForm/SettingsForm';
import { API, graphqlOperation } from 'aws-amplify';
import { createGear } from '../../graphql/mutations';
import { useSelector } from 'react-redux';

const SettingsModal = (props) => {
  const { userData } = props;
  const userID = useSelector((state) => state.user.id);
  const addGear = async (gear) => {
    await API.graphql(graphqlOperation(createGear, { input: gear }));
  };

  return (
    <div className="SettingsModal">
      <Modal isOpen={props.isModalOpen} toggle={props.toggleSettingsModal}>
        <ModalHeader toggle={props.toggleSettingsModal}>Edit User</ModalHeader>
        <ModalBody>
          <SettingsForm toggleSettingsModal={props.toggleSettingsModal} userData={userData} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SettingsModal;
