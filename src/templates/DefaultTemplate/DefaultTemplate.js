import React from 'react';
import Header from '../../components/Header/Header';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer/Footer';
import './DefaultTemplate.scss';

const DefaultTemplate = ({ children }) => {
  return (
    <>
      <Header />
      <main class="ContainerStyles">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

DefaultTemplate.propTypes = { children: PropTypes.node.isRequired };

export default DefaultTemplate;
