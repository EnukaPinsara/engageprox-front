// import React from 'react';
// import { Image } from 'react-bootstrap';
// import LoginForm from 'components/authentication/LoginForm';
// import AuthCardLayout from 'layouts/AuthCardLayout';
// import logo from 'assets/img/logos/logo-white-bg-horizontal-new.jpg';

// const Login = () => {
//   return (
//     <AuthCardLayout>
//       <div className="mb-4">
//         <Image src={logo} alt="Logo" style={{ width: '250px', height: 'auto' }} />
//       </div>
//       {/* <h3 className="font-sans-serif fw-medium fs-6">Welcome to EngageProX</h3> */}

//       <p className="mt-3 mb-4 font-sans-serif fw-semibold">Effortlessly manage your events, bookings, and teams all in one place</p>

//       <LoginForm layout="card" hasLabel />
//     </AuthCardLayout>
//   );
// };

// export default Login;

// import React from 'react';
// import LoginForm from 'components/authentication/LoginForm';
// import { Image } from 'react-bootstrap';
// import AuthCardLayout from 'layouts/AuthCardLayout';
// import logo from 'assets/img/logos/logo-white-bg-horizontal-new.jpg';
// import loginAnimation from 'assets/animations/login-animation.json'; // Login specific animation

// const Login = () => {
//   return (
//     <AuthCardLayout animationSrc={loginAnimation}>
//       <div className="mb-4">
//         <Image src={logo} alt="Logo" style={{ width: '250px', height: 'auto' }} />
//       </div>
//       <p className="mt-3 mb-4 font-sans-serif fw-semibold">
//         Effortlessly manage your events, bookings, and teams all in one place
//       </p>
//       <LoginForm layout="card" hasLabel />
//     </AuthCardLayout>
//   );
// };

// export default Login;

import React from 'react';
import LoginForm from 'components/authentication/LoginForm';
import { Image } from 'react-bootstrap';
import AuthCardLayout from 'layouts/AuthCardLayout';
import logo from 'assets/img/logos/logo-transparent.png';

const Login = () => {
  return (
    <AuthCardLayout
      leftSideContent={
        <Image
          src={logo}
          alt="Logo"
          style={{ width: '250px', height: 'auto' }}
        />
      }
      showLeftSection={true}
    >
      <div className="mb-4"></div>
      <h3 className="mb-3 font-sans-serif fw-semibold">
        Welcome to EngageProX
      </h3>
      <p className="mt-3 mb-4 font-sans-serif fw-medium">
        Effortlessly manage your events, bookings, and teams all in one place
      </p>
      <LoginForm layout="card" hasLabel />
    </AuthCardLayout>
  );
};

export default Login;
