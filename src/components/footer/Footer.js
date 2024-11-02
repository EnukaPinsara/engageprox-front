import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { version } from 'config';

const Footer = () => (
  <footer className="footer">
    <hr
      style={{
        width: '100%',
        border: '1px solid #ddd',
        margin: 0,
        padding: 0
      }}
    />

    <Row className="justify-content-center text-center fs-10 mt-2 mb-3">
      <Col sm="auto">
        <p className="mb-0 text-600">
          &copy; 2024 EngageProX, v{version}. All Rights Reserved | Solutions By Extreme IT Solutions |
          <a href="/about-us" className="ms-2">About Us</a> |
          <a href="/privacy-policy" className="ms-2">Privacy Policy</a> |
          <a href="/contact-us" className="ms-2">Contact Us</a>
        </p>
      </Col>
    </Row>
  </footer>
);

export default Footer;