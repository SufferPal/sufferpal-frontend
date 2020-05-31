import React from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate';

const ActivityDetailPage = () => {
  const location = useLocation();
  const activityState = location.state?.activity;

  return (
    <DefaultTemplate>
      <div className="ActivityDetailPage pt-4">
        <Row>
          <Col md="2"></Col>
          <Col md="10">
            {/* <GraphContainer acivity={activityState} /> */}
            {/* const GraphContainer = (activity) => {} */}
          </Col>
        </Row>
      </div>
    </DefaultTemplate>
  );
};

export default ActivityDetailPage;
