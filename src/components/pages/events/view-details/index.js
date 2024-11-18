import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Event/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };
        fetchEventDetails();
    }, [id]);

    if (!event) return <p>Loading...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>{event.eventName}</h2>
            <img src={`data:image/jpeg;base64,${event.eventBanner}`} alt={`${event.eventName} Banner`} style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />
            <p><strong>Description:</strong> {event.eventDescription}</p>
            <p><strong>Type:</strong> {event.eventType}</p>
            <p><strong>Location:</strong> {event.eventLocation}</p>
            <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
            <p><strong>Start Time:</strong> {event.startTime}</p>
            <p><strong>End Time:</strong> {event.endTime}</p>
            <p><strong>Audience:</strong> {event.audienceType}</p>
            <p><strong>Parking Available:</strong> {event.parkingAvailability ? 'Yes' : 'No'}</p>
            <p><strong>Online Link:</strong> {event.isOnline ? event.onlineLink : 'N/A'}</p>
            <p><strong>Status:</strong> {event.status}</p>
        </div>
    );
};

export default EventDetails;