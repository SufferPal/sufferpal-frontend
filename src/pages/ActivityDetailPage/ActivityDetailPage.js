import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate';
import SpeedGraph from '../../components/SpeedGraph/SpeedGraph';
import HeartRateGraph from '../../components/HeartRateGraph/HeartRateGraph';
import CadenceGraph from '../../components/CadenceGraph/CadenceGraph';
import Storage from '@aws-amplify/storage';
import { calculatePace } from '../../shared/functions/helpers';

const ActivityDetailPage = () => {
  const location = useLocation();
  const activityState = location.state?.activity;
  const [rawMeasurements, setRawMeasurements] = useState([]);
  const S3_Key = activityState.rawMeasurementsS3FileKey;
  const speedData = [];
  const HRData = [];
  const cadenceData = [];

  useEffect(() => {
    Storage.get(S3_Key, { download: true }).then((result) => {
      setRawMeasurements(result.Body);
    });
  }, []);

  const dataArray = () => {
    for (let i = 1; i < rawMeasurements.length; i++) {
      if (rawMeasurements[i].speed !== null && rawMeasurements[i].speed !== undefined) {
        speedData.push({ x: rawMeasurements[i].distance, y: rawMeasurements[i].speed });
      }
      if (rawMeasurements[i].heart_rate !== null && rawMeasurements[i].heart_rate !== undefined) {
        HRData.push({ x: rawMeasurements[i].distance, y: rawMeasurements[i].heart_rate });
      }
      if (rawMeasurements[i].cadence !== null && rawMeasurements[i].cadence !== undefined) {
        cadenceData.push({ x: rawMeasurements[i].distance, y: rawMeasurements[i].cadence * 2 });
      }
    }
  };

  dataArray();

  return (
    <DefaultTemplate>
      <div className="ActivityDetailPage pt-4">
        <Row>
          <Col md="2"></Col>
          <Col md="10">
            <div>
              <Row>
                <Col>
                  <p className="graphTitle">Speed</p>
                </Col>
                <Col>
                  <p className="graphTitle">
                    {calculatePace(activityState.totalMovingTime, activityState.totalDistance)}
                    <span className="graphAvg"> avg. min/mile </span>
                  </p>
                </Col>
              </Row>
              <SpeedGraph activity={speedData} />
            </div>
            <div>
              <Row>
                <Col>
                  <p className="graphTitle">Heart Rate</p>
                </Col>
                <Col>
                  <p className="graphTitle">
                    {activityState.avgHeartRate} <span className="graphAvg"> avg. Heart Rate </span>
                  </p>
                </Col>
              </Row>
              <HeartRateGraph activity={HRData} />
            </div>
            <div>
              <Row>
                <Col>
                  <p className="graphTitle">Cadence</p>
                </Col>
                <Col>
                  <p className="graphTitle">
                    {activityState.avgCadence * 2} <span className="graphAvg"> avg. Cadence </span>
                  </p>
                </Col>
              </Row>
              <CadenceGraph activity={cadenceData} />
            </div>
          </Col>
        </Row>
      </div>
    </DefaultTemplate>
  );
};

export default ActivityDetailPage;
