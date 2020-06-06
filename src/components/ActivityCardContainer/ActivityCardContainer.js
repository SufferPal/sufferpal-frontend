import React from 'react';
import PropTypes from 'prop-types';
import ActivityCard from '../ActivityCard/ActivityCard';

const ActivityCardContainer = ({ firstName, lastName, profilePictureS3FileKey, activities }) => {
  return (
    <>
      {activities.map((activity, index) => (
        <ActivityCard
          key={index}
          activity={activity}
          firstName={firstName}
          lastName={lastName}
          profilePictureS3FileKey={profilePictureS3FileKey}
        />
      ))}
    </>
  );
};

ActivityCardContainer.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  profilePictureS3FileKey: PropTypes.string,
  activities: PropTypes.array,
};

ActivityCardContainer.defaultProps = {
  firstName: '',
  lastName: '',
  profilePictureS3FileKey: '',
  activities: [],
};

export default ActivityCardContainer;
