import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null); // Store the token (null by default)
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('authToken')
  );

  // Login function to set the token
  const login = token => {
    setAuthToken(token);
    localStorage.setItem('authToken', token); // Store the token in localStorage
  };

  // Logout function to clear the token
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken'); // Remove the token from localStorage
  };

  // Load the token from localStorage on mount
  React.useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  useEffect(() => {
    console.log(authToken);
    if (authToken || localStorage.getItem('authToken')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context data
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
