import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployeesDetailsHeader from 'components/app/employees-details/EmployeesDetailsHeader';
import EmployeeDetailsContent from 'data/employees/view/EmployeeDetailsContent';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const EmployeeDetails = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userData && (
        <>
          <EmployeesDetailsHeader userData={userData} />
          <EmployeeDetailsContent userData={userData} />
        </>
      )}
    </>
  );
};

export default EmployeeDetails;
