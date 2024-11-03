import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form } from 'react-bootstrap';

const EventOtherInfo = ({ register }) => {
  return (
    <Card>
      <Card.Header as="h5">Other Info</Card.Header>
      <Card.Body className="bg-body-tertiary">
        <Form.Group className="mb-3">
          <Form.Label>Parking Availability</Form.Label>
          <Form.Select {...register('parkingAvailability')}>
            <option value="" disabled>
              Select availability
            </option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="maxAttendees" className="mb-3">
          <Form.Label>Max Attendees</Form.Label>
          <Form.Control
            type="number"
            name="maxAttendees"
            placeholder="Max Attendees"
            {...register('maxAttendees')}
          />
        </Form.Group>
        <Form.Group controlId="onlineLink">
          <Form.Label>Online URL (If Applicable)</Form.Label>
          <Form.Control
            type="text"
            name="onlineLink"
            placeholder="Online URL"
            {...register('onlineLink')}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};
EventOtherInfo.propTypes = {
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired
};

export default EventOtherInfo;
