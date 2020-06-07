import React from 'react';
import { Navbar, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import './Footer.scss';
import logo from '../../assets/sufferPalSquare.png';

const Footer = () => {
  return (
    <div className="Footer">
      <Row className="Col-format">
        <Col className="Col-format">
          <Navbar light expand="md">
            <NavLink tag={RRNavLink} exact to="/" id="font-list">
              <img src={logo} alt="sufferpal logo"></img>
            </NavLink>
          </Navbar>
        </Col>
        <Col className="Col-format">
          <Navbar light expand="md">
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink id="font-list" tag={RRNavLink} exact to="/profile">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink id="font-list" tag={RRNavLink} exact to="/calendar">
                  Calendar
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
          <p className="foot-description">
            This is sufferpal we are a class made program. we track fitness and blah blah blah
          </p>
        </Col>
        <Col className="Col-format">
          <p className="foot-description"> SufferPal ©2020 by Sarun, Jacob, Daniel, and Jason</p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
