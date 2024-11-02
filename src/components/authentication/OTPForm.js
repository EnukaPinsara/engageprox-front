import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import paths from 'routes/paths';

const OTPForm = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes (120 seconds)
  const [canResend, setCanResend] = useState(false); // State to track if OTP can be resent
  const inputs = useRef([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const identifier = query.get('identifier');
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      try {
        const response = await axios.post(`${baseUrl}/otp/verify`, {
          identifier: identifier,
          otp: otpCode,
        });

        if (response.data.message) {
          toast.success('OTP verified successfully!', { theme: 'colored' });
          navigate('/');
        } else {
          toast.error('Unexpected response from server.', { theme: 'colored' });
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Invalid OTP. Please try again.';
        toast.error(errorMessage, { theme: 'colored' });
      }
    } else {
      toast.error('Please enter a valid 6-digit OTP', { theme: 'colored' });
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Handle Resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await axios.post(`${baseUrl}/otp/send`, { identifier });
      if (response.data.message) {
        toast.success('OTP sent successfully!', { theme: 'colored' });
        setTimeLeft(120);
        setCanResend(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to resend OTP. Please try again.';
      toast.error(errorMessage, { theme: 'colored' });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-center">
      <div className="d-flex justify-content-center mb-3" style={{ gap: '10px' }}>
        {otp.map((digit, idx) => (
          <Form.Control
            key={idx}
            type="text"
            maxLength="1"
            className="text-center"
            style={{
              fontSize: '1.5rem',
              padding: '0.5rem',
              width: '50px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
            value={digit}
            onChange={(e) => handleOtpChange(e, idx)}
            ref={(el) => (inputs.current[idx] = el)}
          />
        ))}
      </div>

      {/* Countdown Timer Display */}
      <div className="mb-3">
        {timeLeft > 0 ? (
          <p>Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
        ) : (
          <p className="text-danger fw-semibold">OTP expired. Please resend OTP.</p>
        )}
      </div>

      {/* Resend OTP Button */}
      {canResend && (
        <Button onClick={handleResendOtp} className="mb-3">
          Resend OTP
        </Button>
      )}

      <Form.Group>
        <Button type="submit" className="w-50" disabled={timeLeft === 0}>
          Verify & Continue
        </Button>
      </Form.Group>

      <div className="text-center mt-2">
        <Link className="fs-10 mb-0 text-muted" to={paths.cardLogin}>
          Cancel
        </Link>
      </div>
    </Form>
  );
};

export default OTPForm;