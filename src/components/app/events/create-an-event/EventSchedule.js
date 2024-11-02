import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomDateInput from 'components/common/CustomDateInput';
import { Card, Col, Form, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

const EventSchedule = ({ register, setValue }) => {
  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null
  });

  const handleChange = (name, value) => {
    let formattedValue;
    if (name === 'startDate' || name === 'endDate') {
      formattedValue = format(value, 'yyyy-MM-dd HH:mm:ss.SSSSSSS');
    } else {
      formattedValue = format(value, 'HH:mm:ss.SSSSSSS');
    }

    setFormData({
      ...formData,
      [name]: value
    });
    setValue(name, formattedValue);
  };

  return (
    <Card className="mb-3">
      <Card.Header as="h5">Date and Time</Card.Header>
      <Card.Body className="bg-body-tertiary">
        <Row className="gx-2 gy-3">
          <Col md="6">
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                selected={formData.startDate}
                onChange={newDate => handleChange('startDate', newDate)}
                customInput={
                  <CustomDateInput
                    formControlProps={{
                      placeholder: 'dd/mm/yyyy',
                      ...register('startDate')
                    }}
                  />
                }
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <DatePicker
                selected={formData.startTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm"
                onChange={newDate => handleChange('startTime', newDate)}
                customInput={
                  <CustomDateInput
                    formControlProps={{
                      placeholder: 'H:M',
                      ...register('startTime')
                    }}
                  />
                }
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <DatePicker
                selected={formData.endDate}
                onChange={newDate => handleChange('endDate', newDate)}
                customInput={
                  <CustomDateInput
                    formControlProps={{
                      placeholder: 'dd/mm/yyyy',
                      ...register('endDate')
                    }}
                  />
                }
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <DatePicker
                selected={formData.endTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm"
                onChange={newDate => handleChange('endTime', newDate)}
                customInput={
                  <CustomDateInput
                    formControlProps={{
                      placeholder: 'H:M',
                      ...register('endTime')
                    }}
                  />
                }
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

EventSchedule.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};

export default EventSchedule;