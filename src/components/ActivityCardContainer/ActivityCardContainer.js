import React, { useEffect, useState } from 'react';
import ActivityCard from '../ActivityCard/ActivityCard';
import { useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../graphql/queries';

const ActivityCardContainer = () => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const [activities, setActivities] = useState([]);
  const userID = useSelector((state) => state.user.id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await API.graphql(graphqlOperation(getUser, { id: userID }));

        const firstName = userData.data.getUser.firstName;
        const lastName = userData.data.getUser.lastName;
        const profilePicture = userData.data.getUser.profilePictureS3FileKey;
        const activities = userData.data.getUser.activities.items;

        setUserFirstName(firstName);
        setUserLastName(lastName);
        setUserProfilePicture(profilePicture);
        setActivities(activities);
      } catch (error) {
        console.log('Error');
      }
    };
    fetchUser();
  }, [userID]);

  return 'Hello';
};

export default ActivityCardContainer;
