import React, { useState, useCallback, useEffect } from 'react';
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate';
import { Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import ActivityCardContainer from '../../components/ActivityCardContainer/ActivityCardContainer';
import CreateActivityForm from '../../components/CreateActivityForm/CreateActivityForm';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../graphql/queries';
import './ProfilePage.scss';

const ProfilePage = () => {
  const [userData, setUserData] = useState();
  const userID = useSelector((state) => state.user.id);

  const fetchUser = useCallback(async () => {
    try {
      const userData = await API.graphql(graphqlOperation(getUser, { id: userID }));

      setUserData(userData.data.getUser);
    } catch (error) {
      console.log('Error');
    }
  }, [userID]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <DefaultTemplate>
      <div className="ProfilePage pt-4">
        <Row>
          <Col md="4">
            <ProfileCard />
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
              profilePictureS3FileKey={userData?.profilePictureS3FileKey}
              activities={userData?.activities?.items}
            />
          </Col>
        </Row>
      </div>
    </DefaultTemplate>
  );
};

export default ProfilePage;
