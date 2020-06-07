import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Table, Input } from 'reactstrap';
import { useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteGear } from '../../graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './ViewGearModal.scss';

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
  const handleGearDelete = (gearId) => {
    console.log('clicked', gearId);
    deleteGearItem({ id: gearId }).then(() => {
      fetchUser();
    });
  };

  const deleteGearItem = async (gear) => {
    await API.graphql(graphqlOperation(deleteGear, { input: gear }));
  };

  const handleGearEquippedChange = (event) => {
    console.log(event.target.checked);

    const equippedGearCheckboxes = document.getElementsByClassName('equipped-gear');
    console.log(equippedGearCheckboxes);
    Array.from(equippedGearCheckboxes).forEach((checkbox) => {
      console.log(checkbox);
      checkbox.checked = false;
    });
    event.target.checked = true;
    // for (let i = 0; i <= x.length; i++) {
    //   x[i].checked = false;
    // }
  };

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
              {gear?.items?.map((gearItem, index) => {
                return (
                  <tr key={index}>
                    <td>{gearItem.brand}</td>
                    <td>{gearItem.model}</td>
                    <td>{gearItem.distance.toFixed(2)}</td>
                    <td>{gearItem.datePurchased}</td>
                    <td>
                      <Input type="checkbox" className="equipped-gear" onClick={handleGearEquippedChange} />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        className="delete-button"
                        onClick={() => {
                          handleGearDelete(gearItem.id);
                        }}
                        data-gear-id={gearItem.id}
                        icon={faTrash}
                      />
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
