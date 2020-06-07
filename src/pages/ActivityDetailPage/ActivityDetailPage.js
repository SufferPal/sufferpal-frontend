import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate';
import SpeedGraph from '../../components/SpeedGraph/SpeedGraph';
import HeartRateGraph from '../../components/HeartRateGraph/HeartRateGraph';
import CadenceGraph from '../../components/CadenceGraph/CadenceGraph';
import Storage from '@aws-amplify/storage';
import { calculatePace, createCustomTimeString } from '../../shared/functions/helpers';
import MapContainer from '../../components/Map/MapContainer';
import SufferPalLogo from '../../assets/logo-sufferpal.png';
import '../ActivityDetailPage/ActivityDetailPage.scss';
import MileSplitsTable from '../../components/MileSplitsTable/MileSplitsTable';

const ActivityDetailPage = () => {
  const location = useLocation();
  const activityState = location.state?.activity;
  const [rawMeasurements, setRawMeasurements] = useState([]);
  //const [splits, setSplits] = useState([]);
  const S3_Key = activityState.rawMeasurementsS3FileKey;
  const speedData = [];
  const HRData = [];
  const cadenceData = [];

  //DATE
  const isoString = new Date(activityState.startTime).toISOString();
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const date = new Date(isoString);
  const americanDate = new Intl.DateTimeFormat('en-US', options).format(date);
  //console.log(americanDate);

  //TIME
  const isoStringTime = new Date(activityState.startTime).toISOString();
  const optionsTime = { hour: 'numeric', minute: 'numeric' };
  const time = new Date(isoStringTime);
  const americanTime = new Intl.DateTimeFormat('en-US', optionsTime).format(time);
  //console.log(americanTime);

  useEffect(() => {
    Storage.get(S3_Key, { download: true }).then((result) => {
      setRawMeasurements(result.Body);
    });
  }, [S3_Key]);

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
  //const splits = mileSplits(rawMeasurements);

  return (
    <DefaultTemplate>
      <img className="sufferpal-logo" src={SufferPalLogo} alt="SufferPal Logo" />

      <div className="ActivityDetailPage pt-4">
        <Row>
          <Col md="2"></Col>
          <Col md="10">
            <div>
              <Row>
                <div>
                  {' '}
                  <MapContainer
                    rawMeasurements={rawMeasurements}
                    mapDimensions={{
                      height: '500px',
                      width: '750px',
                    }}
                  />
                </div>
              </Row>
              <Row>
                <Col md="3">
                  <Row className="bold">{americanDate}</Row>
                  <Row className="notBold">{americanTime}</Row>
                  <Row className="description">{activityState.description}</Row>
                </Col>
                <Col md="9" className="data">
                  <ListGroup horizontal>
                    <ListGroupItem className="horizontalList">
                      <Row className="bold">
                        {activityState.totalDistance.toFixed(2)} <span className="units"> miles </span>
                      </Row>
                      <Row className="detail">Distance</Row>
                    </ListGroupItem>
                    <ListGroupItem className="horizontalList">
                      <Row className="bold">
                        {calculatePace(activityState.totalMovingTime, activityState.totalDistance)}{' '}
                        <span className="units"> min/mile </span>
                      </Row>
                      <Row className="detail">Pace</Row>
                    </ListGroupItem>
                    <ListGroupItem className="horizontalList">
                      <Row className="bold">
                        {createCustomTimeString(activityState.totalMovingTime)} <span className="units"> hours </span>
                      </Row>
                      <Row className="detail">Run time</Row>
                    </ListGroupItem>
                    <ListGroupItem className="horizontalList">
                      <Row className="bold">
                        {' '}
                        {activityState.avgHeartRate} <span className="units"> bpm</span>
                      </Row>
                      <Row className="detail"> Avg. HeartRate</Row>
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <MileSplitsTable SplitData={rawMeasurements} />
              </Row>
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
