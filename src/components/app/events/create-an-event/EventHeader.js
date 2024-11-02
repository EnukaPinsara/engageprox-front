import React from 'react';
import { Card, Col, Button, Row } from 'react-bootstrap';

const EventHeader = ({ handleDiscard }) => {
  return (
    <Card>
      <Card.Body>
        <Row className="flex-between-center">
          <Col md>
            <h5 className="mb-2 mb-md-0">Create Event</h5>
          </Col>
          <Col xs="auto">
            <Button
              size="md"
              variant="falcon-primary"
              className="me-2"
              type="submit"
            >
              Publish
            </Button>
            <Button size="md" variant="falcon-default" onClick={handleDiscard}>
              Discard
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default EventHeader;
