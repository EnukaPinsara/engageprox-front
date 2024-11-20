import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Col, Button, Row, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TitleHeader from 'components/app/title-header/title-header';
import FormBody from 'components/shared/formSections/FormBody';
import paths from 'routes/paths';
import { toast } from 'react-toastify';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const EventCheckIn = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const [searchTerm, setSearchTerm] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [showAdditionalSections, setShowAdditionalSections] = useState(false);
    const [recordNotFound, setRecordNotFound] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);

    const handleSearch = async () => {
        try {
            setRecordNotFound(false);
            setShowAdditionalSections(false);

            let foundEmployeeId = null;

            if (/^\d+$/.test(searchTerm)) {
                const phoneResponse = await axios.get(`${baseUrl}/EventParticipation/by-phone?phoneNumber=${searchTerm}`);
                foundEmployeeId = phoneResponse.data.employeeId;
            } else if (/\S+@\S+\.\S+/.test(searchTerm)) {
                const emailResponse = await axios.get(`${baseUrl}/EventParticipation/by-email?email=${searchTerm}`);
                foundEmployeeId = emailResponse.data.employeeId;
            } else {
                const idResponse = await axios.get(`${baseUrl}/EventParticipation?employeeId=${searchTerm}`);
                const participation = idResponse.data.find((p) => p.employeeId === searchTerm);
                foundEmployeeId = participation?.employeeId;
            }

            if (!foundEmployeeId) {
                throw new Error('No employee found');
            }

            const userResponse = await axios.get(`${baseUrl}/User/${foundEmployeeId}`);
            const user = userResponse.data;

            setEmployeeId(foundEmployeeId);
            setValue('employeeId', user.employeeId);
            setValue('fullName', user.fullName);
            setValue('phoneNumber', user.phoneNumber);
            setValue('designation', user.designation);
            setValue('department', user.department);
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
            setRecordNotFound(true);
        }
    };

    const handleCheckIn = async () => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            const attendanceData = {
                EventID: "0680210c-2d8e-44ef-829c-c5c46bb0078e",
                EmployeeID: employeeId,
                UserID: employeeId,
                CheckinTime: new Date().toISOString(),
                AttendanceStatus: "Check-In",
            };

            const response = await axios.post(`${baseUrl}/Attendance`, attendanceData);

            if (response.status === 200 || response.status === 201) {
                toast.success('Check-in successful!', {
                    onClose: () => {
                        window.location.reload();
                    }
                });
            } else {
                throw new Error(response.data?.Message || 'Failed to check in');
            }
        } catch (error) {
            console.error('Error during check-in:', error);
            toast.error(
                error.response?.data?.Message ||
                error.message ||
                'An error occurred during check-in.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <Row className="g-3">
                <Col xs={12}>
                    <TitleHeader
                        title="Event Check-In"
                        buttons={[
                            {
                                isPrimary: true,
                                name: 'Scan QR',
                                icon: 'camera',
                            },
                            {
                                isPrimary: false,
                                name: 'Discard',
                                onClick: () => navigate(paths.events),
                            }
                        ]}
                    />
                </Col>
                <Col md={12}>
                    <FormBody title="Manual Search">
                        <Row className="gx-2 gy-2">
                            <Col md="12">
                                <Form.Group>
                                    <span className="text-900 fw-semibold">Search Participant here...</span>
                                    <InputGroup className="mt-3 mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="search..."
                                            isInvalid={!!errors.employeeId}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Handle enter key press
                                        />
                                        <Button variant="falcon-primary" onClick={handleSearch}>
                                            <FontAwesomeIcon icon="search" className="text-400" />
                                        </Button>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.employeeId?.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    <span className="text-muted small d-block mt-2">
                                        You can perform a manual search by either <b>Employee ID</b>, <b>Email</b>, or <b>Mobile Number</b>
                                    </span>
                                </Form.Group>
                            </Col>
                        </Row>
                    </FormBody>

                    {recordNotFound && (
                        <TitleHeader>
                            <div className="text-center my-5">
                                <h1 className="text-danger">No matching participant found for this event</h1>
                                <p className="text-muted">Please verify the QR code or ensure the participant is registered</p>
                            </div>
                        </TitleHeader>
                    )}

                    {showAdditionalSections && (
                        <>
                            <FormBody title="Participant Details">
                                <Row className="gx-2 gy-2">
                                    <Col md="4" className="d-flex align-items-center justify-content-center">
                                        <Form.Group>
                                            {profilePicture ? (
                                                <img
                                                    src={profilePicture}
                                                    alt="Profile"
                                                    style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '2%' }}
                                                />
                                            ) : (
                                                <p>No profile picture available</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md="8">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...register('fullName')}
                                                disabled
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Designation:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...register('designation')}
                                                disabled
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Department:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                {...register('department')}
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
                            <TitleHeader>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        type="button"
                                        variant="falcon-primary"
                                        onClick={handleCheckIn}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Checking In...' : 'Check In'}
                                    </Button>
                                </div>
                            </TitleHeader>
                        </>
                    )}
                </Col>
            </Row>
        </form>
    );
};

export default EventCheckIn;
