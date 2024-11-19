import { useAuth } from 'providers/AuthProvider';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/authentication/card/login" />;
  }

  return children;
};

export default ProtectedRoute;
