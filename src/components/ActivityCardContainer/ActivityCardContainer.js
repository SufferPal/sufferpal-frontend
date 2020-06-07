import React from 'react';
import PropTypes from 'prop-types';
import ActivityCard from '../ActivityCard/ActivityCard';

const ActivityCardContainer = ({ firstName, lastName, activities }) => {
  return (
    <>
      {activities.map((activity, index) => (
        <ActivityCard key={index} activity={activity} firstName={firstName} lastName={lastName} />
      ))}
    </>
  );
};

ActivityCardContainer.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  activities: PropTypes.array,
};

ActivityCardContainer.defaultProps = {
  firstName: '',
  lastName: '',
  activities: [],
};

export default ActivityCardContainer;
