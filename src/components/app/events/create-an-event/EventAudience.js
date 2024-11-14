import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'components/common/IconButton';

const TicketRow = ({ name, description, id, handleChange, handleRemove }) => (
  <tr>
    <td>
      <Form.Control
        size="sm"
        style={{ minWidth: '10rem' }}
        type="text"
        placeholder="Audience Title"
        value={name}
        onChange={({ target }) => handleChange(id, 'name', target.value)}
      />
    </td>
    <td>
      <Form.Control
        size="sm"
        style={{ minWidth: '10rem' }}
        type="text"
        placeholder="Description"
        value={description}
        onChange={({ target }) => handleChange(id, 'description', target.value)}
      />
    </td>
    <td className="text-center align-middle">
      <Button variant="link" size="sm" onClick={() => handleRemove(id)}>
        <FontAwesomeIcon className="text-danger" icon="times-circle" />
      </Button>
    </td>
  </tr>
);

const EventAudience = ({ register }) => {
  const [tickets, setTickets] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [audienceType, setAudienceType] = useState(''); // Track selected audience type

  const handleAddTicket = () => {
    setShowOptions(true);
    setTickets([...tickets, { name: '', description: '' }]);
  };

  const changeTicket = (id, field, value) => {
    const updatedTickets = tickets.map((ticket, index) =>
      index === id ? { ...ticket, [field]: value } : ticket
    );
    setTickets(updatedTickets);
  };

  const removeTicket = id => {
    const updatedTickets = tickets.filter((_, index) => index !== id);
    setTickets(updatedTickets);
    if (updatedTickets.length === 0) setShowOptions(false);
  };

  const handleAudienceTypeChange = (e) => {
    const selectedType = e.target.value;
    setAudienceType(selectedType);
    if (selectedType !== 'Private') {
      setShowOptions(false);
      setTickets([]);
    }
  };

  return (
    <Card>
      <Card.Header as="h5">Audience Selection</Card.Header>
      <Card.Body className="bg-body-tertiary">
        <Form.Group className="mb-3">
          <Form.Label>Audience Type</Form.Label>
          <Form.Select {...register('audienceType')} defaultValue="" onChange={handleAudienceTypeChange}>
            <option value="" disabled>Select audience type</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </Form.Select>
        </Form.Group>

        {audienceType === 'Private' && (
          <>
            <Form.Group>
              <Form.Label>Audience</Form.Label>
              <Form.Select {...register('audienceScope')} defaultValue="">
                <option value="" disabled>Select audience</option>
                <option value="All Staff">All Staff</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="IT Operations">IT Operations</option>
              </Form.Select>
            </Form.Group>

            <IconButton
              onClick={handleAddTicket}
              variant="falcon-default"
              size="md"
              icon="plus"
              transform="shrink-3"
              className="mt-3"
            >
              Add New Audience
            </IconButton>

            {showOptions && (
              <>
                <Table
                  className="mb-2 border-200 mt-3 bg-body-emphasis table-responsive"
                  bordered
                >
                  <thead>
                    <tr className="fs-10">
                      <th>Audience Title</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket, index) => (
                      <TicketRow
                        key={index}
                        id={index}
                        name={ticket.name}
                        description={ticket.description}
                        handleChange={changeTicket}
                        handleRemove={removeTicket}
                      />
                    ))}
                  </tbody>
                </Table>
                <div className="d-flex justify-content-end mt-2">
                  <IconButton
                    onClick=""
                    variant="falcon-primary"
                    size="md"
                    icon="folder-plus"
                    transform="shrink-3"
                    className="mt-2"
                  >
                    Create Audience
                  </IconButton>
                </div>
              </>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

TicketRow.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
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
