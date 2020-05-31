import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardImg, Table, CardBody, CardTitle, Button } from 'reactstrap';
import SettingsModal from '../SettingsModal/SettingsModal';
import './ProfileCard.scss';
import { useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import Storage from '@aws-amplify/storage';
import { getUser } from '../../graphql/queries';

const ProfileCard = () => {
  const userID = useSelector((state) => state.user.id);
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [equippedGear, setEquippedGear] = useState('');

  const toggleSettingsModal = () => setIsModalOpen(!isModalOpen);

  const determineEquippedGear = useCallback(() => {
    const gear = userData?.gear?.items;

    if (gear) {
      // eslint-disable-next-line no-unused-expressions
      const equippedGear = gear.filter((gear) => {
        return gear.isEquipped;
      });

      return `${equippedGear[0].brand} ${equippedGear[0].model}`;
    }
  }, [userData]);

  const fetchUser = useCallback(async () => {
    try {
      const userDataFromCall = await API.graphql(graphqlOperation(getUser, { id: userID }));
      const userData = userDataFromCall.data.getUser;
      const { profilePictureS3FileKey } = userData;
      Storage.get(profilePictureS3FileKey).then((result) => {
        setProfilePictureURL(result);
        setUserData(userData);
      });
    } catch (error) {
      console.log(error);
    }
  }, [userID]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    console.log(determineEquippedGear());
    setEquippedGear(determineEquippedGear());
  }, [userData, determineEquippedGear]);

  return (
    <div className="ProfileCard">
      <Card className="card pt-3 profile-card-inner">
        <CardImg top className="profile-picture" src={profilePictureURL} alt="Card image cap" />
        <CardBody>
          <CardTitle className="font-styles">
            {userData.firstName} {userData.lastName}
          </CardTitle>
          <div className="setting-labels">
            User Settings
            <Table className="setting-labels">
              <tbody>
                <tr>
                  <th scope="row">Gender:</th>
                  <td>{userData.gender}</td>
                </tr>
                <tr>
                  <th scope="row">Weight:</th>
                  <td>{userData.weight}</td>
                </tr>
                <tr>
                  <th scope="row">Birthday:</th>
                  <td>{userData.age}</td>
                </tr>
                <tr>
                  <th scope="row" className="setting-labels">
                    Equipped Gear:
                  </th>
                  <td>{equippedGear}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <Button color="danger" onClick={toggleSettingsModal}>
            Edit
          </Button>
          <SettingsModal
            isModalOpen={isModalOpen}
            toggleSettingsModal={toggleSettingsModal}
            userData={userData}
            fetchUser={fetchUser}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfileCard;
