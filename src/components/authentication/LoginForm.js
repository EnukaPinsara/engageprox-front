import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths';

const LoginForm = ({ hasLabel = false }) => {
  const [formData, setFormData] = useState({
    input: ''
  });
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const validateInput = input => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const employeeIdPattern = /^E\d+$/;
    const mobilePattern = /^\d{10}$/;

    if (
      emailPattern.test(input) ||
      employeeIdPattern.test(input) ||
      mobilePattern.test(input)
    ) {
      return true;
    }
    return false;
  };

  // Handler
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/otp/send`, {
        identifier: formData.input
      });

      if (response.status === 200) {
        toast.success('OTP sent successfully! Check your phone.', { theme: 'colored' });
        navigate(`${paths.cardOTPVerification}?identifier=${formData.input}`);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data, { theme: 'colored' });
      } else {
        toast.error('An error occurred while sending OTP.', {
          theme: 'colored'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = e => {
    const { value } = e.target;
    setFormData({ ...formData, input: value });
    setIsValid(validateInput(value));
  };

  const handleResetLogin = () => {
    toast.info(
      'Please contact your administrator or HR to reset your login details.',
      {
        theme: 'colored'
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && (
          <Form.Label>Employee ID | Email Address | Mobile Number</Form.Label>
        )}
        <Form.Control
          placeholder={
            !hasLabel ? 'Enter your Employee ID, Email, or Mobile Number' : ''
          }
          value={formData.input}
          name="input"
          onChange={handleFieldChange}
          type="text"
          isInvalid={!isValid && formData.input.length > 0}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid Employee ID, Email, or Mobile Number.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Button
          type="submit"
          className="mt-3 w-100"
          disabled={!isValid || loading}
        >
          {loading ? 'Sending OTP...' : 'Log in'}
        </Button>
      </Form.Group>

      <div className="text-center mt-3">
        <a
          href="#!"
          onClick={handleResetLogin}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          Reset Login Details
        </a>
      </div>
    </Form>
  );
};

LoginForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default LoginForm;