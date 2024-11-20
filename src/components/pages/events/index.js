import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Form, Button } from 'react-bootstrap';
import FormHeader from 'components/shared/formSections/FormHeader';
import FormBody from 'components/shared/formSections/FormBody';
import EventsDetails from 'data/events/EventsDetails';
import TitleHeader from 'components/app/title-header/title-header';
import paths from 'routes/paths';

const Events = () => {
  const [searchType, setSearchType] = useState('eventID');
  const navigate = useNavigate();

  const handleSearchType = type => {
    setSearchType(type);
  };

  const handleAddEvent = () => {
    navigate(paths.createEvent);
  };

  const handleDiscard = () => {
    navigate('/');
  };

  return (
    <>
      <Row className="g-3">
        <Col xs={12}>
          <TitleHeader
            title="Evnents"
            buttons={[
              {
                isPrimary: true,
                name: 'Add Event',
                onClick: handleAddEvent,
              },
              {
                isPrimary: false,
                name: 'Discard',
                onClick: () => navigate('/'),
              }
            ]}
          />

        </Col>
        <Col>
          <FormBody title="All Events">
            <Row className="gx-2 gy-2">
              <EventsDetails />
            </Row>
          </FormBody>
        </Col>
        <Col lg={4}>
          <div className="sticky-sidebar">
            <FormBody title="Search">
              <Row>
                <Col className="mb-3">
                  <Form.Label>Select Search Criteria</Form.Label>
                  <div
                    className="btn-group flex flex-wrap gap-2"
                    role="group"
                    aria-label="Search Criteria"
                  >
                    <Button
                      variant={
                        searchType === 'eventID' ? 'primary' : 'outline-primary'
                      }
                      className="me-2"
                      onClick={() => handleSearchType('eventID')}
                    >
                      Event ID
                    </Button>
                    <Button
                      variant={
                        searchType === 'eventName'
                          ? 'primary'
                          : 'outline-primary'
                      }
                      className="me-2"
                      onClick={() => handleSearchType('eventName')}
                    >
                      Event Name
                    </Button>
                    <Button
                      variant={
                        searchType === 'eventLocation'
                          ? 'primary'
                          : 'outline-primary'
                      }
                      className="me-2"
                      onClick={() => handleSearchType('eventLocation')}
                    >
                      Event Location
                    </Button>
                  </div>
                </Col>
                <Col md="12">
                  <Form.Group controlId="eventSearch" className="mb-3">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your search term"
                    />
                  </Form.Group>
                </Col>
                <Col md="12">
                  <Button variant="primary" style={{ width: '100%' }}>
                    Search
                  </Button>
                </Col>
              </Row>
            </FormBody>

            <FormBody title="Filters">
              <Row>
                <Col md="12">
                  <Form.Group controlId="eventType" className="mb-3">
                    <Form.Label>Filter by Event Type</Form.Label>
                    <Form.Check
                      type="radio"
                      label="Physical"
                      name="eventType"
                    />
                    <Form.Check type="radio" label="Virtual" name="eventType" />
                  </Form.Group>

                  <Form.Group controlId="eventDate" className="mb-3">
                    <Form.Label>Filter by Date</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>

                  <Form.Group controlId="audienceType" className="mb-3">
                    <Form.Label>Filter by Audience Type</Form.Label>
                    <Form.Control as="select">
                      <option value="1" default disabled>
                        Select Audience Type
                      </option>
                      <option value="all">All</option>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </Form.Control>
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="mt-3"
                    style={{ width: '100%' }}
                  >
                    Apply Filters
                  </Button>
                </Col>
              </Row>
            </FormBody>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Events;
