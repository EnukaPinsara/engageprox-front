import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import TitleHeader from 'components/app/title-header/title-header';

const CreateAudience = () => {
  return (
    <>
      <div className="mb-4">
        <TitleHeader
          title="Create Audience"
          buttons={[
            {
              isPrimary: true,
              name: 'Create Audience',
              icon: 'plus',
              onClick: () => {}
            }
          ]}
        />
        <Card className="my-3">
          <Card.Header as="h5">Event Audience</Card.Header>
          <Card.Body className="bg-body-tertiary">
            <Row className="gx-2 gy-3">
              <Col md="12">
                <Form.Group controlId="audienceName">
                  <Form.Label>Audience Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="audienceName"
                    placeholder="Audience Title"
                  />
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group controlId="audienceDescription">
                  <Form.Label>Audience</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="audienceDescription"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default CreateAudience;
