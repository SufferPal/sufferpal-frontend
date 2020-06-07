import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './ActivityCard.scss';
import { Row, Col } from 'reactstrap';
import { calculatePace, createCustomTimeString } from '../../shared/functions/helpers';
import MapContainer from '../Map/MapContainer';
import Storage from '@aws-amplify/storage';
import { useHistory } from 'react-router-dom';

const ActivityCard = ({ firstName, lastName, activity }) => {
  const { avgHeartRate, totalMovingTime, totalDistance, description, rawMeasurementsS3FileKey } = activity;
  const [rawMeasurements, setRawMeasurements] = useState([]);
  const history = useHistory();
  const profilePictureHref = useSelector((state) => state.profilePictureHref);

  useEffect(() => {
    Storage.get(rawMeasurementsS3FileKey, { download: true }).then((result) => {
      setRawMeasurements(result.Body);
    });
  }, [rawMeasurementsS3FileKey]);

  const handleActivityCardClick = () => {
    history.push({
      pathname: `/activity/${activity.id}`,
      state: {
        activity,
      },
    });
  };

  return (
    <div className="ActivityCard w-100 py-2 px-4 mb-3">
      <Row onClick={handleActivityCardClick}>
        <Col sm="3" className="d-flex flex-column justify-content-start align-items-center">
          <img className="profile-picture mb-2 " src={profilePictureHref} alt="profilePicture" />
          <h3 className="user-name mb-2">
            {firstName} {lastName}
          </h3>
          {description && <p className="activity-description text-center">{description}</p>}
        </Col>
        <Col sm="9">
          <Row>
            <Col sm="12" className="data-column d-flex justify-content-center align-items-center px-3">
              <div className="data-header-container d-flex justify-content-center align-items-center flex-column p-1 mr-1">
                <h3 className="data-header">
                  {totalDistance?.toFixed(2)}
                  <span className="units">mi</span>
                </h3>
                <h4 className="data-label">Distance</h4>
              </div>
              <div className="data-header-container d-flex justify-content-center align-items-center flex-column p-1 mr-1">
                <h3 className="data-header">
                  {calculatePace(totalMovingTime, totalDistance)}
                  <span className="units">/mi</span>
                </h3>
                <h4 className="data-label">Pace</h4>
              </div>
              <div className="data-header-container d-flex justify-content-center align-items-center flex-column p-1 mr-1">
                <h3 className="data-header">{createCustomTimeString(totalMovingTime)}</h3>
                <h4 className="data-label">Run Time</h4>
              </div>
              <div className="data-header-container d-flex justify-content-center align-items-center flex-column p-1 mr-1">
                <h3>
                  {avgHeartRate}
                  <span className="units">bpm</span>
                </h3>
                <h4 className="data-label">Avg Heartrate</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12" className="d-flex justify-content-center align-items-center">
              <MapContainer
                rawMeasurements={rawMeasurements}
                mapDimensions={{
                  height: '300px',
                  width: '400px',
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

ActivityCard.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  activity: PropTypes.shape({
    avgHeartRate: PropTypes.number,
    totalMovingTime: PropTypes.number,
    totalDistance: PropTypes.number,
    description: PropTypes.string,
    rawMeasurementsS3FileKey: PropTypes.string,
    id: PropTypes.string,
  }),
};

ActivityCard.defaultProps = {
  firstName: '',
  lastName: '',
  activity: {},
};

export default ActivityCard;
