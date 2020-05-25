import React from 'react';
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate';
import { Row, Col } from 'reactstrap';
import ActivityCardContainer from '../../components/ActivityCardContainer/ActivityCardContainer';
import CreateActivityForm from '../../components/CreateActivityForm/CreateActivityForm';
import './ProfilePage.scss';

const ProfilePage = () => {
  return (
    <DefaultTemplate>
      <div className="ProfilePage pt-4">
        <Row>
          <Col md="4">Settings</Col>
          <Col md="8" className="p-0">
            <div className="your-activities-cont d-flex align-items-center justify-content-start px-3 py-2 mb-3">
              <h3 className="your-activities m-0">YOUR ACTIVITIES</h3>
            </div>
            {/* Upload Component */}
            <CreateActivityForm />
            {/* List of Card */}
            <ActivityCardContainer />
          </Col>
        </Row>
      </div>
    </DefaultTemplate>
  );
};

export default ProfilePage;
