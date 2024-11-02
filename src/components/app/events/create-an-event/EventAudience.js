import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form } from 'react-bootstrap';

const EventAudience = ({ register }) => {
  return (
    <Card>
      <Card.Header as="h5">Audience Selection</Card.Header>
      <Card.Body className="bg-body-tertiary">
        <Form.Group className="mb-3">
          <Form.Label>Select Audience Type</Form.Label>
          <Form.Select {...register('audienceType')} defaultValue="">
            <option value="" disabled>Select audience</option>
            <option value="All Staff">All Staff</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="IT Operations">IT Operations</option>
          </Form.Select>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

EventAudience.propTypes = {
  register: PropTypes.func.isRequired
};

export default EventAudience;

// *******************************************************************************************************|

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Card, Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const EventAudience = ({ register }) => {
//   const [audienceSegments, setAudienceSegments] = useState([]);

//   const handleAddSegment = () => {
//     setAudienceSegments([...audienceSegments, { id: Date.now(), name: '' }]);
//   };

//   const handleRemoveSegment = (id) => {
//     setAudienceSegments(audienceSegments.filter(segment => segment.id !== id));
//   };

//   const handleSegmentChange = (id, newValue) => {
//     setAudienceSegments(audienceSegments.map(segment =>
//       segment.id === id ? { ...segment, name: newValue } : segment
//     ));
//   };

//   return (
//     <Card className="mb-3">
//       <Card.Header as="h5">Audience Selection</Card.Header>
//       <Card.Body className="bg-body-tertiary">
//         <Form.Group className="mb-3">
//           <Form.Label>Select Audience Type</Form.Label>
//           <Form.Select {...register('selectType')}>
//             <option value="1">Select audience</option>
//             <option value="2">All Staff</option>
//             <option value="3">Marketing</option>
//             <option value="4">HR</option>
//             <option value="5">IT Operations</option>
//           </Form.Select>
//         </Form.Group>

//         {/* Existing Audience Segment Dropdown */}
//         <Button variant="outline-primary" onClick={handleAddSegment}>
//           <FontAwesomeIcon icon="plus" className="me-2" /> Add Audience Segment
//         </Button>

//         {/* Dynamic Audience Segment Input Fields */}
//         {audienceSegments.map(segment => (
//           <Row key={segment.id} className="mt-3">
//             <Col md={10}>
//               <InputGroup>
//                 <Form.Control
//                   type="text"
//                   placeholder="Custom Audience Name"
//                   value={segment.name}
//                   onChange={(e) => handleSegmentChange(segment.id, e.target.value)}
//                 />
//               </InputGroup>
//             </Col>
//             <Col md={2} className="text-end">
//               <Button variant="link" size="sm" onClick={() => handleRemoveSegment(segment.id)}>
//                 <FontAwesomeIcon icon="times-circle" className="text-danger" />
//               </Button>
//             </Col>
//           </Row>
//         ))}
//       </Card.Body>
//     </Card>
//   );
// };

// EventAudience.propTypes = {
//   register: PropTypes.func.isRequired
// };

// export default EventAudience;
