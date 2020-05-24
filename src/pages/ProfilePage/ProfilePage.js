import React from 'react';
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate';
import MapContainer from '../../components/Map/MapContainer';
import { Row, Col } from 'reactstrap';

const ProfilePage = () => {
  return (
    <DefaultTemplate>
      <Row>
        <Col md="4">Settings</Col>
        <Col md="8">Timeline</Col>
      </Row>
    </DefaultTemplate>
  );
};

export default ProfilePage;
