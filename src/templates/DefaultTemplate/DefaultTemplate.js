import React from 'react';
import Header from '../../components/Header/Header';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

const DefaultTemplate = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
};

DefaultTemplate.propTypes = { children: PropTypes.node.isRequired };

export default DefaultTemplate;
