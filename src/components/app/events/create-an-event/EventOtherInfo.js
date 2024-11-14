import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form } from 'react-bootstrap';

const EventOtherInfo = ({ register, eventType }) => {
  return (
    <Card>
      <Card.Header as="h5">Other Info</Card.Header>
      <Card.Body className="bg-body-tertiary">

        <Form.Group controlId="maxAttendees" className="mb-3">
          <Form.Label>Max Attendees</Form.Label>
          <Form.Control
            type="number"
            name="maxAttendees"
            placeholder="Max Attendees"
            {...register('maxAttendees')}
          />
        </Form.Group>

        <Form.Group controlId="rsepContact">
          <Form.Label>RSEP Contact Details</Form.Label>
          <Form.Control
            type="text"
            name="rsepContact"
            placeholder="RSEP Contact"
            {...register('rsepContact')}
          />
        </Form.Group>

        {eventType === 'Physical' && (
          <>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Parking Availability</Form.Label>
              <Form.Select {...register('parkingAvailability')}>
                <option value="" disabled>
                  Select availability
                </option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Family Participation</Form.Label>
              <Form.Select {...register('familyParticipation')}>
                <option value="" disabled>
                  Select participation
                </option>
                <option value="1">Allow</option>
                <option value="0">Not Allow</option>
              </Form.Select>
            </Form.Group>
          </>
        )}

        {eventType === 'Virtual' && (
          <Form.Group controlId="onlineLink" className="mt-3">
            <Form.Label>Online Link</Form.Label>
            <Form.Control
              type="url"
              name="onlineLink"
              placeholder="Online Link"
              {...register('onlineLink')}
            />
          </Form.Group>
        )}
      </Card.Body>
    </Card>
  );
};

EventOtherInfo.propTypes = {
  register: PropTypes.func.isRequired,
  eventType: PropTypes.string.isRequired
};

export default EventOtherInfo;
