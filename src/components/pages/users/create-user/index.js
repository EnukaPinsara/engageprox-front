import React, { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Col, Button, Row, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TitleHeader from 'components/app/title-header/title-header';
import FormBody from 'components/shared/formSections/FormBody';
import UserRoles from 'components/shared/UserRoles';
import paths from 'routes/paths';
import { toast } from 'react-toastify';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const AddUser = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const [searchTerm, setSearchTerm] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [showAdditionalSections, setShowAdditionalSections] = useState(false);
    const [toastShown, setToastShown] = useState(false);
    const { roles, error: rolesError } = UserRoles();

    useEffect(() => {
        setValue('role', 'Employee');
    }, [setValue]);

    const handleSearch = async () => {
        try {
            const isEmail = /\S+@\S+\.\S+/.test(searchTerm);
            const endpoint = isEmail ? `by-email/${searchTerm}` : `${searchTerm}`;
            const response = await axios.get(`${baseUrl}/User/${endpoint}`);
            const user = response.data;

            setValue('employeeId', user.employeeId);
            setValue('fullName', user.fullName);
            setValue('email', user.email);
            setValue('phoneNumber', user.phoneNumber);
            setValue('designation', user.designation);
            setValue('birthDate', user.birthDate);
            setValue('department', user.department);
            setValue('businessUnit', user.businessUnit);
            setValue('employeeType', user.employeeType);
            setValue('immediateSupervisor', user.immediateSupervisor);
            setValue('joinedDate', user.joinedDate);
            setValue('profilePicture', user.profilePicture);

            if (user.profilePicture) {
                const imageBase64 = `data:image/jpeg;base64,${user.profilePicture}`;
                setProfilePicture(imageBase64);
            } else {
                setProfilePicture(null);
            }
            setShowAdditionalSections(true);
        } catch (error) {
            console.error('Error fetching user:', error);
            alert('User not found');
        }
    };

    const handleFormSubmit = async (data) => {
        try {
            const payload = {
                employeeId: data.employeeId,
                fullName: data.fullName,
                email: data.email,
                role: data.role,
                phoneNumber: data.phoneNumber,
                passwordHash: data.passwordHash,
                designation: data.designation,
                birthDate: data.birthDate,
                department: data.department,
                businessUnit: data.businessUnit,
                employeeType: data.employeeType,
                immediateSupervisor: data.immediateSupervisor,
                joinedDate: data.joinedDate,
                profilePicture: data.profilePicture,
            };

            await axios.put(`${baseUrl}/user/UpdateUser/${data.employeeId}`, payload);
            setToastShown(true);
        } catch (error) {
            toast.error(`No user with ${searchTerm}`, { theme: 'colored' });
            console.error('Error updating user role:', error);
        }
    };

    useEffect(() => {
        if (toastShown) {
            toast.success('User created successfully', { theme: 'colored' });
            setToastShown(false);
        }
    }, [toastShown]);

    const handleSaveUser = () => {
        handleSubmit(handleFormSubmit)();
        navigate(paths.users);
    };

    return (
        <form>
            <Row className="g-3">
                <Col xs={12}>
                    <TitleHeader
                        title="Add User"
                        buttons={[
                            {
                                isPrimary: false,
                                name: 'Discard',
                                onClick: () => navigate(paths.users),
                            }
                        ]}
                    />
                </Col>
                <Col md={12}>
                    <FormBody title="Action">
                        <Row className="gx-2 gy-2">
                            <Col md="12">
                                <Form.Group>
                                    <span className="text-900 fw-semibold">Search Employee Here</span>
                                    <InputGroup className="mt-3 mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search by Employee ID or Email"
                                            isInvalid={!!errors.employeeId}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <Button variant="secondary" onClick={handleSearch}>
                                            <FontAwesomeIcon icon="search" className="text-400" />
                                        </Button>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.employeeId?.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                    </FormBody>

                    {showAdditionalSections && (
                        <>
                            <FormBody title="Employee Details">
                                <Row className="gx-2 gy-2">
                                    <Col md="4" className="d-flex align-items-center justify-content-center">
                                        <Form.Group>
                                            {profilePicture ? (
                                                <img
                                                    src={profilePicture}
                                                    alt="Profile"
                                                    style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '50%' }}
                                                />
                                            ) : (
                                                <p>No profile picture available</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md="8">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Employee ID:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...register('employeeId')}
                                                disabled
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...register('fullName')}
                                                disabled
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...register('email')}
                                                disabled
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Contact Number:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...register('phoneNumber')}
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </FormBody>
                            <FormBody title="User Role">
                                <Row className="gx-2 gy-2">
                                    <Col md="12">
                                        <Form.Group>
                                            <Form.Label>Add User Role:</Form.Label>
                                            <Form.Select
                                                isInvalid={!!errors.role}
                                                {...register('role', { required: 'Role is required' })}
                                            >
                                                {roles.map(role => (
                                                    <option key={role.id} value={role.roleName}>
                                                        {role.roleName}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.role?.message}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </FormBody>
                            <TitleHeader
                                title="You're almost done!"
                                buttons={[
                                    {
                                        isPrimary: true,
                                        name: 'Save User',
                                        icon: 'folder-plus',
                                        onClick: handleSaveUser, // Trigger form submission
                                    },
                                    {
                                        isPrimary: false,
                                        name: 'Discard',
                                        onClick: () => navigate(paths.users),
                                    }
                                ]}
                            />
                            {/* <FormBody title="You're almost done!">
                                <Button variant="primary" type="submit">
                                    Save User
                                </Button>
                                <Button variant="secondary" onClick={handleDiscard}>
                                    Discard
                                </Button>
                            </FormBody> */}
                        </>
                    )}
                </Col>
            </Row>
        </form>
    );
};

export default AddUser;