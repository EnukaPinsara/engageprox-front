// import React from 'react';
// import ForgetPasswordForm from 'components/authentication/ForgetPasswordForm';
// import AuthCardLayout from 'layouts/AuthCardLayout';

// const ForgetPassword = () => {
//   return (
//     <AuthCardLayout>
//       <h4 className="mb-0"> Forgot your password?</h4>
//       <p className="mb-0">Enter your email and we'll send you a reset link.</p>
//       <ForgetPasswordForm layout="card" />
//     </AuthCardLayout>
//   );
// };

// export default ForgetPassword;

// import React from 'react';
// import { Image } from 'react-bootstrap';
// import OTPForm from 'components/authentication/OTPForm';
// import AuthCardLayout from 'layouts/AuthCardLayout';
// import otpImage from 'assets/img/ui/otp-verification.jpg';

// const OTPVerification = () => {
//   return (
//     <AuthCardLayout showLeftSection={false}>
//       <div className="text-center">
//         <Image
//           src={otpImage}
//           alt="otp-image"
//           style={{ width: '250px', height: 'auto' }}
//         />
//         <h4>Enter Your OTP Code</h4>
//         <p>
//           We’ve sent a 6-digit verification code to your registered
//           email/mobile.<br></br>
//           Please enter it below to proceed.
//         </p>
//       </div>
//       <OTPForm />
//     </AuthCardLayout>
//   );
// };

// export default OTPVerification;

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