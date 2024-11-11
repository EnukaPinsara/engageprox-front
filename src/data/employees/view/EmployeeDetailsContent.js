import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import IconButton from 'components/common/IconButton';
import axios from 'axios';
import { toast } from 'react-toastify';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const EmployeeDetailsContent = ({ userData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(userData);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('updateSuccess')) {
            toast.success('Employee details updated successfully!', { theme: 'colored' });
            localStorage.removeItem('updateSuccess');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const toggleEditMode = () => {
        if (isEditing) {
            setFormData(userData);
        }
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            setError(null);

            const response = await axios.put(`${baseUrl}/user/UpdateUser/${formData.userId}`, formData);

            if (response.status === 200 || response.status === 204) {
                localStorage.setItem('updateSuccess', 'true');
                setIsEditing(false);

                window.location.reload();
            }
        } catch (err) {
            setError('Failed to update employee details. Please try again.');
            toast.error('Error updating employee details!', { theme: 'colored' });
        }
    };

    return (
        <Card className="mb-3">
            <Card.Header>
                <Row className="align-items-center">
                    <Col>
                        <h5 className="mb-0">Details</h5>
                    </Col>
                    <Col xs="auto">
                        <IconButton
                            iconClassName="fs-11 me-1"
                            variant="falcon-default"
                            size="sm"
                            icon={isEditing ? "times" : "pencil-alt"}
                            onClick={toggleEditMode}
                        >
                            {isEditing ? "Cancel" : "Update details"}
                        </IconButton>
                    </Col>
                </Row>
            </Card.Header>

            <Card.Body className="bg-body-tertiary border-top">
                <Row>
                    <Col lg xxl={5}>
                        <h6 className="fw-semibold ls mb-3 text-uppercase">
                            Personal Information
                        </h6>

                        <Row>
                            <Col xs={5} sm={4}>
                                <p className="fw-semibold mb-1">Name</p>
                            </Col>
                            <Col>
                                {isEditing ? (
                                    <Form.Control
                                        type="text"
                                        name="userName"
                                        value={formData.userName}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{formData.userName}</p>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={5} sm={4}>
                                <p className="fw-semibold mb-1">Email</p>
                            </Col>
                            <Col>
                                {isEditing ? (
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p><a href={`mailto:${formData.email}`}>{formData.email}</a></p>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={5} sm={4}>
                                <p className="fw-semibold mb-1">Phone Number</p>
                            </Col>
                            <Col>
                                {isEditing ? (
                                    <Form.Control
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p><a href={`tel:${formData.phoneNumber}`}>{formData.phoneNumber}</a></p>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={5} sm={4}>
                                <p className="fw-semibold mb-1">Birth Date</p>
                            </Col>
                            <Col>
                                {isEditing ? (
                                    <Form.Control
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate.slice(0, 10)}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>
                                        {new Date(formData.birthDate).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                )}
                            </Col>
                        </Row>
                    </Col>

                    <Col lg xxl={{ span: 5, offset: 1 }} className="mt-4 mt-lg-0">
                        <h6 className="fw-semibold ls mb-3 text-uppercase">
                            Employment Details
                        </h6>

                        <Row>
                            <Col xs={5} sm={4}>
                                <p className="fw-semibold mb-1">Designation</p>
                            </Col>
                            <Col>
                                {isEditing ? (
                                    <Form.Control
                                        type="text"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p className="fw-bold">{formData.designation}</p>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={5} sm={4}>
                                <p className="fw-semibold mb-1">Department</p>
                            </Col>
                            <Col>
                                {isEditing ? (
                                    <Form.Control
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{formData.department}</p>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={5} sm={4}>
                                <p className="fw-semibold mb-1">Business Unit</p>
                            </Col>
                            <Col>
                                {isEditing ? (
                                    <Form.Control
                                        type="text"
                                        name="businessUnit"
                                        value={formData.businessUnit}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{formData.businessUnit}</p>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={5} sm={4}>
                                <p className="fw-semibold mb-1">Employment Type</p>
                            </Col>
                            <Col>
                                {isEditing ? (
                                    <Form.Control
                                        type="text"
                                        name="employeeType"
                                        value={formData.employeeType}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{formData.employeeType}</p>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={5} sm={4}>
                                <p className="fw-semibold mb-1">Immediate Supervisor</p>
                            </Col>
                            <Col>
                                {isEditing ? (
                                    <Form.Control
                                        type="text"
                                        name="immediateSupervisor"
                                        value={formData.immediateSupervisor}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{formData.immediateSupervisor}</p>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={5} sm={4}>
                                <p className="fw-semibold mb-1">Joined Date</p>
                            </Col>
                            <Col>
                                {isEditing ? (
                                    <Form.Control
                                        type="date"
                                        name="joinedDate"
                                        value={formData.joinedDate.slice(0, 10)}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{new Date(formData.joinedDate).toLocaleDateString('en-GB')}</p>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>

            {isEditing && (
                <Card.Footer className="border-top text-end">
                    <Button variant="falcon-default" className="me-2" type="submit" onClick={toggleEditMode}>
                        Cancel
                    </Button>
                    <Button
                        className='me-2' variant="falcon-primary" onClick={handleSave}>
                        Save changes
                    </Button>
                </Card.Footer>
            )}
        </Card>
    );
};

export default EmployeeDetailsContent;