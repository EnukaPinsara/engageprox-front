import { jwtDecode } from 'jwt-decode';

export const getUserRole = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    return jwtDecode(token)?.userRole ?? '';
  } else {
    return null;
  }
};
