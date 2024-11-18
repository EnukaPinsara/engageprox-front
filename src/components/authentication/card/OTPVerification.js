import React from 'react';
import { Image } from 'react-bootstrap';
import OTPForm from 'components/authentication/OTPForm';
import AuthCardLayout from 'layouts/AuthCardLayout';
import otpImage from 'assets/img/ui/otp-verification.jpg';
import { useLocation } from 'react-router-dom';

const OTPVerification = () => {
  const location = useLocation();
  const identifier = location.state?.identifier || '';

  return (
    <AuthCardLayout showLeftSection={false}>
      <div className="text-center">
        <Image
          src={otpImage}
          alt="otp-image"
          style={{ width: '250px', height: 'auto' }}
        />
        <h4>Enter Your OTP Code</h4>
        <p>
          We’ve sent a 6-digit verification code to your registered
          email/mobile.<br></br>
          Please enter it below to proceed.
        </p>
      </div>
      <OTPForm identifier={identifier} />
    </AuthCardLayout>
  );
};

export default OTPVerification;