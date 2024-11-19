import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import EventHeader from './EventHeader';
import EventDetails from './EventDetails';
import EventUpload from './EventUpload';
import EventSchedule from './EventSchedule';
import EventAudience from './EventAudience';
import EventOtherInfo from './EventOtherInfo';
import EventRegistrationStatus from './EventRegistrationStatus';
import EventFooter from './EventFooter';
import CustomModal from 'components/shared/CustomModal';
import paths from 'routes/paths';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const CreateEvent = () => {
  const [toastShown, setToastShown] = useState(false);
  const [eventLink, setEventLink] = useState('');
  const [eventName, setEventName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [eventType, setEventType] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, control, reset } = useForm({
    defaultValues: {
      eventName: '',
      eventDescription: '',
      eventType: '',
      eventLocation: '',
      eventBanner: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      audienceType: '',
      audience: '',
      parkingAvailability: '',
      familyParticipation: '',
      maxAttendees: '',
      onlineLink: '',
      rseP_Contact: '',
      registrationRequired: false,
      registrationDeadline: null,
      status: 'scheduled',
    }
  });

  const onSubmit = async (data) => {
    const payload = {
      EventName: data.eventName,
      EventDescription: data.eventDescription,
      EventType: data.eventType,
      EventLocation: data.eventLocation,
      EventBanner: data.eventBanner,
      StartDate: data.startDate,
      StartTime: data.startTime,
      EndDate: data.endDate,
      EndTime: data.endTime,
      AudienceType: data.audienceType,
      Audience: data.audience,
      AudienceId: data.audienceId,
      ParkingAvailability: data.parkingAvailability === "1",
      FamilyParticipation: data.familyParticipation,
      MaxAttendees: data.maxAttendees,
      OnlineLink: data.onlineLink,
      RSEP_Contact: data.rseP_Contact,
      RegistrationRequired: data.registrationRequired,
      RegistrationDeadline: data.registrationDeadline,
      Status: data.status,
    };

    try {
      const response = await axios.post(`${baseUrl}/Event`, payload);
      const eventId = response.data.eventId;

      const link = `www.engageprox.org/events/internal/${eventId}`;

      setEventLink(link);
      setEventName(data.eventName);
      setShowModal(true);
      setToastShown(true);
      reset();
      setValue('uploadedFiles', []);
    } catch (error) {
      toast.error('Error creating event!', { theme: 'colored' });
      console.error('Error creating event:', error.response.data);
    }
  };

  useEffect(() => {
    if (toastShown) {
      toast.success('Event created successfully', { theme: 'colored' });
      setToastShown(false);
    }
  }, [toastShown]);

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(eventLink);
    toast.success('Link copied to clipboard!', { theme: 'colored' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDiscard = () => {
    navigate(paths.events);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="g-3">
          <Col xs={12}>
            <EventHeader handleDiscard={handleDiscard} />
          </Col>
          <Col lg={8}>
            <EventDetails
              register={register}
              setValue={setValue}
              onEventTypeChange={handleEventTypeChange}
              eventType={eventType}
            />
            <EventUpload register={register} setValue={setValue} />
            <EventSchedule register={register} setValue={setValue} />
            <EventAudience register={register} control={control} setValue={setValue} />
          </Col>
          <Col lg={4}>
            <div className="sticky-sidebar">
              <div className='mb-3'>
                <EventOtherInfo register={register} control={control} eventType={eventType} />
              </div>
              <div>
                <EventRegistrationStatus register={register} setValue={setValue} />
              </div>
            </div>
          </Col>
          <Col>
            <EventFooter handleDiscard={handleDiscard} />
          </Col>
        </Row>
      </Form>
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        title="Event Created Successfully"
        bodyContent={
          <div style={{ textAlign: 'center' }}>
            <p>Your event link for <strong>{eventName}</strong> has been generated successfully:</p>
            <div style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px', display: 'inline-block', wordWrap: 'break-word', margin: '10px 0' }}>
              <strong>{eventLink}</strong>
            </div>
            <Button variant="outline-primary" onClick={handleCopyLink} style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-copy"></i> Copy Link
            </Button>
          </div>
        }
      />
    </>
  );
};

export default CreateEvent;