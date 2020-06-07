import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, Table, CardBody, CardTitle, Button } from 'reactstrap';
import SettingsModal from '../SettingsModal/SettingsModal';
import AddGearModal from '../AddGearModal/AddGearModal';
import ViewGearModal from '../ViewGearModal/ViewGearModal';
import './ProfileCard.scss';
import Storage from '@aws-amplify/storage';

const ProfileCard = ({ userData, fetchUser, equippedGear }) => {
  const { profilePictureS3FileKey, gear, firstName, lastName, gender, weight, age } = userData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [isAddGearModalOpen, setIsAddGearModalOpen] = useState(false);
  const [isViewGearModalOpen, setIsViewGearModalOpen] = useState(false);

  const toggleSettingsModal = () => setIsModalOpen(!isModalOpen);

  const toggleAddGearModal = () => setIsAddGearModalOpen(!isAddGearModalOpen);

  const toggleViewGearModal = () => setIsViewGearModalOpen(!isViewGearModalOpen);

  const getProfilePictureFromS3 = useCallback(async () => {
    try {
      if (profilePictureS3FileKey) {
        Storage.get(profilePictureS3FileKey).then((result) => {
          setProfilePictureURL(result);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [profilePictureS3FileKey]);

  useEffect(() => {
    getProfilePictureFromS3();
  }, [getProfilePictureFromS3]);

  return (
    <div className="ProfileCard">
      <Card className="card pt-3 profile-card-inner">
        <CardImg top className="profile-picture" src={profilePictureURL} alt="Card image cap" />
        <CardBody>
          <CardTitle className="font-styles">
            {firstName} {lastName}
          </CardTitle>
          <div className="setting-labels">
            User Settings
            <Table className="setting-labels">
              <tbody>
                <tr>
                  <th scope="row">Gender:</th>
                  <td>{gender}</td>
                </tr>
                <tr>
                  <th scope="row">Weight:</th>
                  <td>{weight}</td>
                </tr>
                <tr>
                  <th scope="row">Birthday:</th>
                  <td>{age}</td>
                </tr>
                <tr>
                  <th scope="row" className="setting-labels">
                    Equipped Gear:
                  </th>
                  <td>{`${equippedGear.brand} ${equippedGear.model}`}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Button color="danger" onClick={toggleSettingsModal}>
            Edit
          </Button>
          <Button color="success" onClick={toggleAddGearModal}>
            Add Gear
          </Button>
          <Button color="success" onClick={toggleViewGearModal}>
            View Gear
          </Button>
          <SettingsModal
            isModalOpen={isModalOpen}
            toggleSettingsModal={toggleSettingsModal}
            firstName={firstName}
            lastName={lastName}
            weight={weight}
            fetchUser={fetchUser}
          />
          <AddGearModal
            isModalOpen={isAddGearModalOpen}
            toggleAddGearModal={toggleAddGearModal}
            fetchUser={fetchUser}
          />
          <ViewGearModal
            isModalOpen={isViewGearModalOpen}
            toggleViewGearModal={toggleViewGearModal}
            gear={gear}
            equippedGear={equippedGear}
            fetchUser={fetchUser}
          />
        </CardBody>
      </Card>
    </div>
  );
};

ProfileCard.propTypes = {
  userData: PropTypes.shape({
    profilePictureS3FileKey: PropTypes.string,
    gear: PropTypes.shape({
      items: PropTypes.array,
    }),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
    weight: PropTypes.number,
    age: PropTypes.number,
  }),
  fetchUser: PropTypes.func.isRequired,
  equippedGear: PropTypes.shape({
    model: PropTypes.string,
    brand: PropTypes.string,
  }),
};

ProfileCard.defaultProps = {
  userData: {},
  equippedGear: {},
};

export default ProfileCard;
