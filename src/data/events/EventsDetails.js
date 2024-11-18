import React, { useEffect, useState } from 'react';
import EventCard from 'components/shared/EventCard';
import x from '../../assets/img/gallery/2.jpg';
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
  const sampleEvent = [
    {
      eventId: '12345',
      eventName: 'Annual Tech Conference',
      eventType: 'private', // or 'Virtual'
      eventBanner:
        'iVBORw0KGgoAAAANSUhEUgAAAAUA' + '...base64 encoded image...',
      x
    },
    {
      eventId: '12345',
      eventName: 'Annual Tech Conference',
      eventType: 'public', // or 'Virtual'
      eventBanner:
        'iVBORw0KGgoAAAANSUhEUgAAAAUA' + '...base64 encoded image...',
      x
    },
    {
      eventId: '12345',
      eventName: 'Annual Tech Conference',
      eventType: 'private', // or 'Virtual'
      eventBanner:
        'iVBORw0KGgoAAAANSUhEUgAAAAUA' + '...base64 encoded image...',
      x
    },
    {
      eventId: '12345',
      eventName: 'Annual Tech Conference',
      eventType: 'public', // or 'Virtual'
      eventBanner:
        'iVBORw0KGgoAAAANSUhEUgAAAAUA' + '...base64 encoded image...',
      x
    }
  ];
  return (
    <div className="event-list row g-4">
      {sampleEvent?.length ? (
        sampleEvent.map(event => (
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
