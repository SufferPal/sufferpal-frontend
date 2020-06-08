import React, { useState, useCallback, useEffect } from 'react';
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate';
import { Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import ActivityCardContainer from '../../components/ActivityCardContainer/ActivityCardContainer';
import CreateActivityForm from '../../components/CreateActivityForm/CreateActivityForm';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../graphql/queries';
import './ProfilePage.scss';
import { setProfilePictureS3Key, setProfilePictureHref } from '../../store/action-creators';
import Storage from '@aws-amplify/storage';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [equippedGear, setEquippedGear] = useState();
  const userID = useSelector((state) => state.user.id);
  const profilePictureS3Key = useSelector((state) => state.profilePictureS3Key);
  const [isModalButtonDisabled, setIsModalButtonDisabled] = useState(true);

  const determineEquippedGear = useCallback((gear) => {
    if (gear) {
      // eslint-disable-next-line no-unused-expressions
      const equippedGear = gear.filter((gearItem) => {
        return gearItem.isEquipped;
      });

      return equippedGear[0];
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const userData = await API.graphql(graphqlOperation(getUser, { id: userID }));

      setUserData(userData.data.getUser);
      const userProfilePictureS3Key = userData.data.getUser.profilePictureS3FileKey;
      const gear = userData.data.getUser.gear.items;

      setEquippedGear(determineEquippedGear(gear));

      if (isModalButtonDisabled) {
        setIsModalButtonDisabled(false);
      }

      if (userProfilePictureS3Key !== profilePictureS3Key) {
        dispatch(setProfilePictureS3Key(userProfilePictureS3Key));
        Storage.get(userProfilePictureS3Key).then((result) => {
          dispatch(setProfilePictureHref(result));
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [userID, determineEquippedGear, profilePictureS3Key, dispatch, isModalButtonDisabled]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <DefaultTemplate>
      <div className="ProfilePage pt-4">
        <Row>
          <Col md="4">
            <ProfileCard
              isModalButtonDisabled={isModalButtonDisabled}
              userData={userData}
              fetchUser={fetchUser}
              equippedGear={equippedGear}
            />
          </Col>
          <Col md="8" className="p-0">
            <div className="your-activities-cont d-flex align-items-center justify-content-start px-3 py-2 mb-3">
              <h3 className="your-activities m-0">YOUR ACTIVITIES</h3>
            </div>
            {/* Upload Component */}
            <CreateActivityForm fetchUser={fetchUser} />
            {/* List of Card */}
            <ActivityCardContainer
              firstName={userData?.firstName}
              lastName={userData?.lastName}
              activities={userData?.activities?.items}
            />
          </Col>
        </Row>
      </div>
    </DefaultTemplate>
  );
};

export default ProfilePage;
