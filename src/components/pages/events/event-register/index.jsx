import TitleHeader from 'components/app/title-header/title-header';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import DEFAULT_IMAGE from '../../../../assets/img/gallery/2.jpg';
import { useEventStore } from 'components/shared/storage/storage';
import { useParams } from 'react-router-dom';

const EventRegister = () => {
  const params = useParams();
  const { setEvent, resetEvent, eventId, isParticipating } = useEventStore();
  const [isInviteConfirm, setIsInviteConfirm] = useState(false);
  const [parkingNeed, setParkingNeed] = useState(false);
  const [familyInclude, setFamilyInclude] = useState(false);
  const [reason, setReason] = useState('');
  const [familyMembers, setFamilyMembers] = useState([
    { name: '', age: '', gender: '' }
  ]);

  // get event data

  const eventData = {
    name: 'event-name',
    location: 'colombo',
    deadline: '2024-11-23'
  };

  const onClickParticipating = () => {
    setEvent(params['invite-id'], true);
  };

  const onClickNotParticipating = () => {
    // api to be with reason
    resetEvent();
  };

  const handleAddMember = () => {
    const isValid = familyMembers.every(
      member => member.name.trim() && member.age.trim() && member.gender.trim()
    );

    if (!isValid) {
      alert(
        'Please fill out all fields for the current members before adding a new one.'
      );
      return;
    }
    setFamilyMembers([...familyMembers, { name: '', age: '', gender: '' }]);
  };

  const handleRemoveMember = index => {
    if (familyMembers.length < 2) {
      alert(
        'Please fill out all fields for the current members before adding a new one.'
      );
      return;
    }
    const updatedMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(updatedMembers);
  };

  const handleInputChange = (index, field, value) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index][field] = value;
    setFamilyMembers(updatedMembers);
  };
  const handleSave = () => {
    console.log('Family Members:', familyMembers);
    // Add save logic saave here
  };

  useEffect(() => {
    console.log(params);

    if (params['invite-id'] === eventId && isParticipating) {
      setIsInviteConfirm(true);
    } else {
      setIsInviteConfirm(false);
    }
  }, [params, isParticipating, eventId]);

  return (
    <>
      <TitleHeader title="Event Register" />
      <Card className="my-3">
        <Card.Header as="h5">Event Details</Card.Header>
        <img
          src={DEFAULT_IMAGE}
          alt="banner"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover'
          }}
        />
        <Card.Body className="bg-body-tertiary">
          <div className="mb-3">
            <strong>Event Name:</strong> {eventData.name}
          </div>
          <div className="mb-3">
            <strong>Event Location:</strong> {eventData.location}
          </div>
          <div className="mb-3">
            <strong>Event Deadline:</strong> {eventData.deadline}
          </div>
        </Card.Body>
      </Card>

      {!isInviteConfirm ? (
        <Card className="my-3">
          <Card.Header as="h5">Event Confirmation</Card.Header>
          <Card.Body className="bg-body-tertiary">
            <div className="mb-3">
              <strong>
                Are you sure you want to participate in this event?
              </strong>
            </div>
            <Button
              key="Yes"
              size="md"
              variant="me-2 btn btn-primary"
              className="me-2 mb-3"
              type="submit"
              style={{ minWidth: '80px' }}
              onClick={onClickParticipating}
            >
              Yes
            </Button>
            <Button
              key="No"
              size="md"
              variant="me-2 btn btn-secondary"
              className="me-2 mb-3"
              type="submit"
              style={{ minWidth: '80px' }}
              onClick={onClickNotParticipating}
            >
              No
            </Button>
            <Form.Group controlId="eventName">
              <Form.Label>
                Please provide a reason for not participating.
              </Form.Label>
              <Form.Control
                type="text"
                name="reason"
                placeholder="reason"
                onChange={({ target: { value } }) => {
                  setReason(value);
                }}
              />
            </Form.Group>
          </Card.Body>
        </Card>
      ) : (
        <Card className="my-3">
          <Card.Header as="h5">Personal Information</Card.Header>
          <Card.Body className="bg-body-tertiary">
            <Form.Group controlId="employeeID" className="mb-3">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                name="employeeID"
                placeholder="Employee ID"
              />
            </Form.Group>

            <Form.Group controlId="nic">
              <Form.Label>NIC</Form.Label>
              <Form.Control
                type="text"
                name="nic"
                placeholder="NIC"
                className="mb-3"
              />
            </Form.Group>

            <Form.Check
              className="mb-3 d-flex gap-2"
              id="parking"
              type="checkbox"
              label="Do you need parking for this event?"
              checked={parkingNeed}
              onChange={({ target: { checked } }) => setParkingNeed(checked)}
            />
            {parkingNeed && (
              <>
                <Form.Group controlId="vehicle">
                  <Form.Label>Vehicle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle"
                    placeholder="Vehicle Name"
                  />
                </Form.Group>
                <Form.Group controlId="vehicle-no">
                  <Form.Label>Vehicle Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicle-no"
                    placeholder="Vehicle Number"
                    className="mb-3"
                  />
                </Form.Group>
              </>
            )}
            {/* ------------------------ family section --------------- */}
            <Form.Check
              className="mb-3 d-flex gap-2"
              id="family"
              type="checkbox"
              label="Are any of your family members planning to participate in this event?"
              checked={familyInclude}
              onChange={({ target: { checked } }) => setFamilyInclude(checked)}
            />
            {familyInclude && (
              <>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title className="mb-4">
                      Family Members (all fields are required)
                    </Card.Title>
                    <div className="d-flex flex-column gap-3">
                      {familyMembers.map((member, index) => (
                        <Row key={index} className="align-items-center g-3 ">
                          <Col xs={12} md={4}>
                            <Form.Control
                              type="text"
                              placeholder="Name"
                              value={member.name}
                              onChange={e =>
                                handleInputChange(index, 'name', e.target.value)
                              }
                            />
                          </Col>
                          <Col xs={12} md={3}>
                            <Form.Control
                              type="number"
                              placeholder="Age"
                              value={member.age}
                              onChange={e =>
                                handleInputChange(index, 'age', e.target.value)
                              }
                            />
                          </Col>
                          <Col xs={12} md={3}>
                            <Form.Select
                              value={member.gender}
                              onChange={e =>
                                handleInputChange(
                                  index,
                                  'gender',
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </Form.Select>
                          </Col>
                          <Col
                            xs={12}
                            md={2}
                            className="text-sm-end text-start"
                          >
                            <Button
                              variant="danger"
                              onClick={() => handleRemoveMember(index)}
                              className="w-100 w-md-auto"
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      ))}
                    </div>
                    <div className="d-grid d-sm-flex gap-2 mt-4">
                      <Button
                        variant="primary"
                        onClick={handleAddMember}
                        style={{ minWidth: '200px' }}
                      >
                        Add Family Member
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleSave}
                        style={{ minWidth: '200px' }}
                      >
                        Save
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default EventRegister;
