import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Table, Input } from 'reactstrap';
import { useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { createGear } from '../../graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ViewGearModal = ({ fetchUser, toggleViewGearModal, isModalOpen, gear }) => {
  const userID = useSelector((state) => state.user.id);

  //   const handleBrandOnChange = (event) => {
  //     const { value } = event.target;
  //     setBrand(value);
  //   };

  //   const handleModelOnChange = (event) => {
  //     const { value } = event.target;
  //     setModel(value);
  //   };

  //   const handlePurchaseDateOnChange = (event) => {
  //     const { value } = event.target;
  //     setPurchaseDate(value);
  //   };

  //   const addGear = async (gear) => {
  //     await API.graphql(graphqlOperation(createGear, { input: gear }));
  //   };

  //   const handleAddGearSubmit = (event) => {
  //     event.preventDefault();

  //     const gearData = {
  //       brand,
  //       model,
  //       datePurchased: purchaseDate,
  //       isEquipped: false,
  //       userID: userID,
  //       distance: 0,
  //     };

  //     addGear(gearData).then(() => {
  //       toggleAddGearModal();
  //       fetchUser();
  //     });
  //   };

  return (
    <div className="ViewGearModal">
      <Modal isOpen={isModalOpen} toggle={toggleViewGearModal}>
        <ModalHeader toggle={toggleViewGearModal}>View Gear</ModalHeader>

        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Miles</th>
                <th>Purchase Date</th>
                <th>Equipped</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {gear?.items?.map((gearItem) => {
                return (
                  <tr>
                    <td>{gearItem.brand}</td>
                    <td>{gearItem.model}</td>
                    <td>{gearItem.distance.toFixed(2)}</td>
                    <td>{gearItem.datePurchased}</td>
                    <td>
                      <Input type="checkbox" />
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
};

ViewGearModal.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  toggleViewGearModal: PropTypes.func.isRequired,
  gear: PropTypes.shape({
    items: PropTypes.array,
  }),
  isModalOpen: PropTypes.bool.isRequired,
};

ViewGearModal.defaultProps = {
  gear: {},
};

export default ViewGearModal;
