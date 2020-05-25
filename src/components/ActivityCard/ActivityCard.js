import React from 'react';
import './ActivityCard.scss';
import { Row, Col } from 'reactstrap';
import { calculatePace, createCustomTimeString } from '../../shared/functions/helpers';

const ActivityCard = (props) => {
  const { firstName, lastName, profilePicture, activity } = props;
  const { avgHeartRate, totalMovingTime, totalDistance, description, rawMeasurementsS3FileKey } = activity;
  console.log(avgHeartRate);
  return (
    <div className="ActivityCard w-100 py-2 px-4">
      <Row>
        <Col sm="3">
          <div className="profile-picture-container"></div>
          <h3 className="user-name">
            {firstName}
            {lastName}
          </h3>
          {activity?.description && <p className="activity-description">{activity?.description}</p>}
        </Col>
        <Col sm="9">
          <Row>
            <Col sm="12" className="data-column">
              <h3>{totalDistance.toFixed(2)}</h3>
              <h3>{calculatePace(totalMovingTime, totalDistance)}</h3>
              <h3>{createCustomTimeString(totalMovingTime)}</h3>
              <h3>{avgHeartRate}</h3>
            </Col>
          </Row>
          <Row>
            <Col sm="12"></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ActivityCard;
