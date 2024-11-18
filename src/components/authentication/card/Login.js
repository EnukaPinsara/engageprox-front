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