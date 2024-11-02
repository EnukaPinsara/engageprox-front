// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import DatePicker from 'react-datepicker';
// import { Card, Form } from 'react-bootstrap';
// import CustomDateInput from 'components/common/CustomDateInput';

// const EventRegistrationStatus = ({ register }) => {
//   const [formData, setFormData] = useState({
//     startDate: null,
//     endDate: null,
//     regDate: null,
//     startTime: null,
//     endTime: null
//   });

//   const handleChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   return (
//     <Card>
//       <Card.Header as="h5">Registration Requirements</Card.Header>
//       <Card.Body className="bg-body-tertiary">


//         <h6>Registration Required?</h6>
//         <Form.Check className="mb-3"
//           id="registrationRequired"
//           type="checkbox"
//           label="Yes, It is mandatory to register to this event."
//           {...register(`registrationRequired`)}
//         />

//         <Form.Group controlId="registrationDeadline">
//           <Form.Label>Registration Deadline</Form.Label>
//           <DatePicker
//             selected={formData.regDate}
//             onChange={newDate => {
//               handleChange('regDate', newDate);
//               setValue('regDate', newDate);
//             }}
//             customInput={
//               <CustomDateInput
//                 formControlProps={{
//                   placeholder: 'dd/mm/yyyy',
//                   name: 'regDate',
//                   ...register('regDate')
//                 }}
//               />
//             }
//           />
//         </Form.Group>
//       </Card.Body>
//     </Card>
//   );
// };
// EventRegistrationStatus.propTypes = {
//   register: PropTypes.func.isRequired,
//   control: PropTypes.object.isRequired
// };

// export default EventRegistrationStatus;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Card, Form } from 'react-bootstrap';
import CustomDateInput from 'components/common/CustomDateInput';

const EventRegistrationStatus = ({ register, setValue }) => {
  const [regDate, setRegDate] = useState(null);

  return (
    <Card>
      <Card.Header as="h5">Registration Requirements</Card.Header>
      <Card.Body className="bg-body-tertiary pb-5">
        <h6>Registration Required?</h6>
        <Form.Check
          className="mb-3"
          id="registrationRequired"
          type="checkbox"
          label="Yes, it is mandatory to register for this event."
          {...register('registrationRequired')}
        />

        <Form.Group controlId="registrationDeadline">
          <Form.Label>Registration Deadline</Form.Label>
          <DatePicker
            selected={regDate}
            onChange={newDate => {
              setRegDate(newDate);
              setValue('registrationDeadline', newDate);
            }}
            customInput={
              <CustomDateInput
                formControlProps={{
                  placeholder: 'dd/mm/yyyy',
                  name: 'registrationDeadline',
                  ...register('registrationDeadline')
                }}
              />
            }
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

EventRegistrationStatus.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
};

export default EventRegistrationStatus;