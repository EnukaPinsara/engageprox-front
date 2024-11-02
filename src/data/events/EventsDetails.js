import React, { useEffect, useState } from 'react';
import EventCard from 'components/shared/EventCard';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const EventsDetails = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Event`);
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="event-list" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '10px'
        }}>
            {events.map(event => (
                <div key={event.eventId}>
                    <EventCard event={event} />
                </div>
            ))}
        </div>
    );
};

export default EventsDetails;
