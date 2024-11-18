// import React from 'react';

// const EventCard = ({ event }) => {
//     const imageSrc = event.eventBanner.startsWith("data:image")
//         ? event.eventBanner
//         : `data:image/jpeg;base64,${event.eventBanner}`;

//     const badgeColor = event.eventType.toLowerCase() === 'physical' ? '#007bff' : '#6c757d';
//     const badgeText = event.eventType.toLowerCase() === 'physical' ? 'Physical' : 'Virtual';

//     return (
//         <div style={{
//             border: "1px solid #ddd",
//             borderRadius: "8px",
//             overflow: "hidden",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             width: "250px",
//             position: "relative"
//         }}>
//             <img src={imageSrc} alt={`${event.eventName} Banner`} style={{
//                 width: "100%",
//                 height: "150px",
//                 objectFit: "cover",
//             }} />
//             <div style={{ padding: "12px" }}>
//                 <span style={{
//                     backgroundColor: badgeColor,
//                     color: "#fff",
//                     borderRadius: "4px",
//                     padding: "4px 8px",
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     marginBottom: "8px",
//                     display: "inline-block"
//                 }}>
//                     {badgeText}
//                 </span>
//                 <h3 style={{
//                     fontSize: "18px",
//                     margin: "8px 0",
//                     color: "#333",
//                 }}>{event.eventName}</h3>
//                 <button style={{
//                     marginTop: "12px",
//                     padding: "8px 16px",
//                     fontSize: "14px",
//                     color: "#007bff",
//                     backgroundColor: "transparent",
//                     border: "1px solid #007bff",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                     width: "100%"
//                 }}>
//                     View Details
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default EventCard;

import { getTimeLeft } from 'components/utilities/getTimeLeft';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState();

  const handleViewDetails = () => {
    if (event.eventId) {
      navigate(paths.viewEvent.replace(':eventId', event.eventId));
    } else {
      console.error('Event ID is undefined.');
    }
  };

  const imageSrc = event.eventBanner.startsWith('data:image')
    ? event.eventBanner
    : `data:image/jpeg;base64,${event.eventBanner}`;

  const badgeColor =
    event.eventType.toLowerCase() === 'public' ? '#82F5BF' : '#F582B9';
  const badgeText =
    event.eventType.toLowerCase() === 'public' ? 'Public' : 'Private';
  // Example usage:
  // Target date in ISO format

  useEffect(() => {
    console.log("test 2")
    const targetDate = '2024-12-31T23:59:59';
    if (typeof timeLeft === 'undefined') {
      setTimeLeft(getTimeLeft(targetDate));
    }
    const interval = setInterval(() => {
      console.log('time updated!');
      setTimeLeft(getTimeLeft(targetDate));
    }, [1000 * 60 * 60]);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(timeLeft);
  }, [timeLeft])

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        // width: '250px',
        position: 'relative'
      }}
    >
      <img
        src={event.x}
        alt={`${event.eventName} Banner`}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover'
        }}
      />
      <div style={{ padding: '12px' }}>
        <span
          style={{
            backgroundColor: badgeColor,
            color: '#fff',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '12px',
            fontWeight: 'bold',
            marginBottom: '8px',
            display: 'inline-block'
          }}
        >
          {badgeText}
        </span>
        <h3
          style={{
            fontSize: '18px',
            margin: '8px 0',
            color: '#333'
          }}
        >
          {event.eventName}
        </h3>
        <h3
          style={{
            fontSize: '12px',
            margin: '8px 0',
            color: '#333'
          }}
        >
          {timeLeft}
        </h3>
        <button
          onClick={handleViewDetails}
          style={{
            marginTop: '12px',
            padding: '8px 16px',
            fontSize: '14px',
            color: '#007bff',
            backgroundColor: 'transparent',
            border: '1px solid #007bff',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
