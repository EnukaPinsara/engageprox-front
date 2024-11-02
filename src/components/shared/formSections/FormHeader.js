import React from 'react';
import { Card, Col, Button, Row } from 'react-bootstrap';

const FormHeader = ({ title, primaryActionText, onPrimaryAction, onDiscard }) => {
  return (
    <Card>
      <Card.Body>
        <Row className="flex-between-center">
          <Col md>
            <h5 className="mb-2 mb-md-0">{title}</h5>
          </Col>
          <Col xs="auto">
            {onDiscard && (
              <Button
                variant="link"
                className="text-secondary fw-medium p-0 me-3"
                type="button"
                onClick={onDiscard}
              >
                Discard
              </Button>
            )}
            {onPrimaryAction && (
              <Button variant="primary" type="button" onClick={onPrimaryAction}>
                {primaryActionText}
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FormHeader;