import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TitleHeader = ({ title, buttons, children }) => {
  return (
    <Card>
      <Card.Body>
        <Row className="flex-between-center">
          <Col md>
            <h5 className="mb-2 mb-md-0">{title}</h5>
          </Col>
          <Col xs="auto">
            {buttons?.length &&
              buttons.map(({ name, onClick, isPrimary, icon }) => {
                if (isPrimary) {
                  return (
                    <>
                      <Button
                        key={name}
                        size="md"
                        variant="falcon-primary"
                        className="me-2"
                        type="submit"
                        onClick={onClick}
                      >
                        {icon && <FontAwesomeIcon icon={icon} />}
                        <span style={{ marginLeft: icon ? '8px' : '0' }}>
                          {name}
                        </span>
                      </Button>
                    </>
                  );
                } else {
                  return (
                    <>
                      <Button
                        key={name}
                        size="md"
                        variant="falcon-default"
                        onClick={onClick}
                      >
                        {icon && <FontAwesomeIcon icon={icon} />}
                        <span style={{ marginLeft: icon ? '8px' : '0' }}>
                          {name}
                        </span>
                      </Button>
                    </>
                  );
                }
              })}
          </Col>
        </Row>
        <Row className="pt-2">{children}</Row>
      </Card.Body>
    </Card>
  );
};

TitleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      isPrimary: PropTypes.bool,
      icon: PropTypes.string
    })
  ).isRequired
};

export default TitleHeader;
