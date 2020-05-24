import React from 'react';
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate';
import { Row, Col } from 'reactstrap';
// import ActivityCard from '../../components/ActivityCard/ActivityCard';
import CreateActivityForm from '../../components/CreateActivityForm/CreateActivityForm';
import SufferPalLogo from '../../assets/logo-sufferpal.png';
import './ProfilePage.scss';

const ProfilePage = () => {
  return (
    <DefaultTemplate>
      <div className="ProfilePage pt-4">
        <Row>
          <Col md="4">Settings</Col>
          <Col md="8">
            <div className="your-activities-cont d-flex align-items-center justify-content-start px-3 py-2 mb-3">
              <h3 className="your-activities m-0">YOUR ACTIVITIES</h3>
            </div>
            <img className="sufferpal-logo" src={SufferPalLogo} alt="SufferPal Logo" />
            {/* Upload Component */}
            <CreateActivityForm />
            {/* List of Card */}
          </Col>
        </Row>
      </div>
    </DefaultTemplate>
  );
};

export default ProfilePage;
