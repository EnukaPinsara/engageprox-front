import { useEffect, useState } from 'react';
import axios from 'axios';

const UserRoles = () => {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(`${baseUrl}/Role`);
                setRoles(response.data);
            } catch (err) {
                setError('Error fetching roles');
                console.error(err);
            }
        };

        fetchRoles();
    }, [baseUrl]);

    return { roles, error };
};

export default UserRoles;
