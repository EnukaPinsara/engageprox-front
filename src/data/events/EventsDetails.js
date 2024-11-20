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
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="event-list row g-4">
      {events.length ? (
        events.map(event => (
          <div key={event.eventId} className="col-12 col-md-6 col-lg-4">
            <EventCard event={event} />
          </div>
        ))
      ) : (
        <div className="m-0">No Events Available</div>
      )}
    </div>
  );
};

export default EventsDetails;
