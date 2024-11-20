import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Card, Badge, Button, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import TitleHeader from 'components/app/title-header/title-header';
import paths from 'routes/paths';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const EventDetails = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Event/${eventId}`);
                setEvent(response.data);
            } catch (err) {
                console.error('Error fetching event details:', err);
                setError('Failed to fetch event details. Please try again.');
            }
        };
        fetchEventDetails();
    }, [eventId]);

    if (error)
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    {error}
                </Alert>
            </Container>
        );

    if (!event)
        return (
            <Container className="mt-5 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );

    return (
        <>
            <TitleHeader
                title="Event Details"
                buttons={[
                    {
                        isPrimary: false,
                        icon: 'arrow-left',
                        name: 'Go Back',
                        onClick: () => navigate(paths.events),
                    }
                ]}
            />
            {/* <Container className="mt-4"> */}
            <Card className="shadow-lg mt-3">
                <Card.Body>
                    <Row>
                        <Col md={8}>
                            {event.eventBanner && (
                                <img
                                    src={`data:image/jpeg;base64,${event.eventBanner}`}
                                    alt={`${event.eventName} Banner`}
                                    className="mb-3"
                                    style={{
                                        width: '100%',
                                        maxHeight: '300px',
                                        borderRadius: '10px',
                                        objectFit: 'cover',
                                    }}
                                />
                            )}
                            <h2 className="mb-3 text-primary fw-bold">{event.eventName}</h2>
                            <p className="text-muted fst-italic">
                                <strong>Description: </strong>
                                {event.eventDescription}
                            </p>
                            <p>
                                <strong>Type: </strong>
                                <Badge bg="info" className="text-uppercase">
                                    {event.eventType}
                                </Badge>
                            </p>
                            <p>
                                <strong>Location: </strong>
                                {event.eventLocation}
                            </p>
                            <p>
                                <strong>Date: </strong>
                                {new Date(event.eventDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Start Time: </strong>
                                {new Date(`1970-01-01T${event.startTime}Z`).toLocaleTimeString()}
                            </p>
                            <p>
                                <strong>End Time: </strong>
                                {new Date(`1970-01-01T${event.endTime}Z`).toLocaleTimeString()}
                            </p>
                            <p>
                                <strong>Audience: </strong>
                                {event.audienceType}
                            </p>
                            <p>
                                <strong>Parking Available: </strong>
                                <Badge bg={event.parkingAvailability ? 'success' : 'secondary'}>
                                    {event.parkingAvailability ? 'Yes' : 'No'}
                                </Badge>
                            </p>
                            <p>
                                <strong>Online Link: </strong>
                                {event.isOnline ? (
                                    <a href={event.onlineLink} target="_blank" rel="noopener noreferrer">
                                        {event.onlineLink}
                                    </a>
                                ) : (
                                    'N/A'
                                )}
                            </p>
                            <p>
                                <strong>Status: </strong>
                                <Badge bg="warning">{event.status}</Badge>
                            </p>
                        </Col>
                        <Col
                            md={4}
                            className="d-flex flex-column align-items-center justify-content-center border-start"
                            style={{ borderColor: '#eee' }}
                        >
                            <Button
                                variant="primary"
                                className="w-100 mb-3"
                                onClick={() => alert('Event actions coming soon!')}
                            >
                                Take Action
                            </Button>
                            <Button variant="outline-secondary" className="w-100" onClick={() => navigate(paths.events)}>
                                Back to Events
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* </Container> */}
        </>
    );
};

export default EventDetails;
