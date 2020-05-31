import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate';
import SpeedGraph from '../../components/SpeedGraph/SpeedGraph';
import Storage from '@aws-amplify/storage';

const ActivityDetailPage = () => {
  const location = useLocation();
  const activityState = location.state?.activity;

  const [rawMeasurements, setRawMeasurements] = useState([]);
  const S3_Key = activityState.rawMeasurementsS3FileKey;
  const speedData = [[]];
  const HRData = [[]];
  const cadenceData = [[]];

  useEffect(() => {
    //console.log('activity', activity);
    Storage.get(S3_Key, { download: true }).then((result) => {
      setRawMeasurements(result.Body);
    });
  }, []);

  const dataArray = () => {
    for (let i = 1; i < rawMeasurements.length; i++) {
      //console.log(rawMeasurements[i].speed);
      if (rawMeasurements[i].speed !== null) {
        speedData.push([rawMeasurements[i].speed, rawMeasurements[i].distance]);
      }
      if (rawMeasurements[i].speed !== null) {
        HRData.push([rawMeasurements[i].heart_rate, rawMeasurements[i].distance]);
      }
      if (rawMeasurements[i].speed !== null) {
        cadenceData.push([rawMeasurements[i].cadence, rawMeasurements[i].distance]);
      }
    }
  };

  dataArray();
  console.log(speedData);
  console.log(HRData);
  console.log(cadenceData);
  //console.log(activityState);

  return (
    <DefaultTemplate>
      <div className="ActivityDetailPage pt-4">
        <Row>
          <Col md="2"></Col>
          <Col md="10">
            <SpeedGraph activity={speedData} />
            {/* <GraphContainer acivity={activityState} /> */}
            {/* const GraphContainer = (activity) => {} */}
          </Col>
        </Row>
      </div>
    </DefaultTemplate>
  );
};

export default ActivityDetailPage;
