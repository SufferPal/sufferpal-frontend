import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Table, Input } from 'reactstrap';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteGear, updateGear } from '../../graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './ViewGearModal.scss';

const ViewGearModal = ({ fetchUser, toggleViewGearModal, isModalOpen, gear, equippedGear }) => {
  const [newEquippedGear, setNewEquippedGear] = useState({});

  const handleGearDelete = (gearId) => {
    deleteGearItem({ id: gearId }).then(() => {
      fetchUser();
    });
  };

  const deleteGearItem = async (gear) => {
    await API.graphql(graphqlOperation(deleteGear, { input: gear }));
  };

  const updateEquippedGear = async (oldEquippedGearID, newEquippedGearID) => {
    await API.graphql(graphqlOperation(updateGear, { input: { id: oldEquippedGearID, isEquipped: false } }));
    await API.graphql(graphqlOperation(updateGear, { input: { id: newEquippedGearID, isEquipped: true } }));
  };

  const handleGearEquippedChange = (event, gearItem) => {
    const equippedGearCheckboxes = document.getElementsByClassName('equipped-gear');

    Array.from(equippedGearCheckboxes).forEach((checkbox) => {
      checkbox.checked = false;
    });
    event.target.checked = true;
    setNewEquippedGear(gearItem);
  };

  const handleModalClose = () => {
    const { id: oldEquippedGearID } = equippedGear;
    const { id: newEquippedGearID } = newEquippedGear;

    if (newEquippedGearID) {
      updateEquippedGear(oldEquippedGearID, newEquippedGearID).then(() => {
        fetchUser();
      });
    }
  };

  return (
    <div className="ViewGearModal">
      <Modal
        isOpen={isModalOpen}
        toggle={toggleViewGearModal}
        onClosed={() => {
          handleModalClose();
        }}
      >
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
                      <Input
                        defaultChecked={gearItem.id === equippedGear.id}
                        type="checkbox"
                        className="equipped-gear"
                        onClick={(event) => {
                          handleGearEquippedChange(event, gearItem);
                        }}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        className="delete-button"
                        onClick={() => {
                          handleGearDelete(gearItem.id);
                        }}
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
  equippedGear: PropTypes.shape({
    model: PropTypes.string,
    brand: PropTypes.string,
    id: PropTypes.string,
  }),
};

ViewGearModal.defaultProps = {
  gear: {},
  equippedGear: {},
};

export default ViewGearModal;
