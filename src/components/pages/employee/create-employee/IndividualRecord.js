import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Col, Button, Row } from 'react-bootstrap';
import axios from 'axios';
// import FormHeader from 'components/shared/formSections/FormHeader';
import TitleHeader from 'components/app/title-header/title-header';
import FormBody from 'components/shared/formSections/FormBody';
import IconButton from 'components/common/IconButton';
import { toast } from 'react-toastify';
import paths from 'routes/paths';
import { useRoleStore, useEmployeeStore, useDesignationStore, useDepartmentStore, useBusinessUnitStore, useEmployeeTypeStore } from 'components/shared/storage/storage';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const IndividualRecord = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const { roles, fetchRoles } = useRoleStore();
    const { employees, fetchEmployees } = useEmployeeStore();
    const { designations, fetchDesignations } = useDesignationStore();
    const { departments, fetchDepartments } = useDepartmentStore();
    const { businessUnits, fetchBusinessUnits } = useBusinessUnitStore();
    const { employeeTypes, fetchEmployeeTypes } = useEmployeeTypeStore();
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const personalInfoRef = useRef(null);
    const profilePictureRef = useRef(null);
    const [formBodyHeight, setFormBodyHeight] = useState('auto');
    const [profilePictureBase64, setProfilePictureBase64] = useState(null);
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    useEffect(() => {
        fetchRoles();
        fetchEmployees();
        fetchDesignations();
        fetchDepartments();
        fetchBusinessUnits();
        fetchEmployeeTypes();
    }, [fetchRoles, fetchEmployees, fetchDesignations, fetchDepartments, fetchBusinessUnits, fetchEmployeeTypes]);

    useEffect(() => {
        if (roles.length > 0) {
            setValue('role', 'Employee');
        }
    });

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    };

    const handleFormSubmit = async (data) => {
        try {
            const payload = {
                employeeId: data.employeeId,
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                birthDate: data.birthDate,
                businessUnit: data.businessUnit,
                department: data.department,
                designation: data.designation,
                employeeType: data.employeeType,
                immediateSupervisor: data.immediateSupervisor,
                joinedDate: data.joinedDate,
                role: data.role,
                profilePicture: profilePictureBase64
            };
            const response = await axios.post(`${baseUrl}/user/CreateUser`, payload);

            if (response.status === 200 || response.status === 201) {
                toast.success('Employee created successfully');
                navigate(paths.employees)
            } else {
                throw new Error(response.data?.Message || 'Failed to check in');
            }
        } catch (error) {
            console.error('Error creating employee:', error);
            if (error.response) {
                toast.error('Error creating employee!', { theme: 'colored' });
            }
        }
    };
    const handleProfilePictureChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setProfilePicturePreview(previewUrl);

            const base64 = await toBase64(file);
            setProfilePictureBase64(base64);
        }
    };

    const updateHeight = () => {
        if (personalInfoRef.current) {
            setFormBodyHeight(personalInfoRef.current.offsetHeight);
        }
    };

    const handleDiscard = () => {
        navigate(paths.employees);
    };

    useEffect(() => {
        if (toastShown) {
            toast.success('Employee created successfully', { theme: 'colored' });
            setToastShown(false);
        }
    }, [toastShown]);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row className="g-3">
                <Col xs={12}>
                    <TitleHeader
                        title="Add an Employee"
                        buttons={[
                            {
                                icon: 'arrow-left',
                                name: 'Go Back',
                                onClick: handleDiscard,
                            }
                        ]}
                    />
                </Col>
                <Col md={8}>
                    <FormBody title="Personal Information" ref={personalInfoRef}>
                        <Row className="gx-2 gy-2">
                            <Col md="12">
                                <Form.Group>
                                    <Form.Label>Employee ID:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={!!errors.employeeId}
                                        {...register('employeeId', { required: 'Employee ID is required' })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.employeeId?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="12">
                                <Form.Group>
                                    <Form.Label>Employee Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={!!errors.fullName}
                                        {...register('fullName', { required: 'Employee Name is required' })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="12">
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        isInvalid={!!errors.email}
                                        {...register('email', { required: 'Email is required' })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="12">
                                <Form.Group>
                                    <Form.Label>Phone Number:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={!!errors.phoneNumber}
                                        {...register('phoneNumber', { required: 'Phone Number is required' })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phoneNumber?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="12">
                                <Form.Group>
                                    <Form.Label>Birth Date:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        isInvalid={!!errors.birthDate}
                                        {...register('birthDate')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.birthDate?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </FormBody>
                </Col>
                <Col lg={4}>
                    <div className="sticky-sidebar">
                        <FormBody title="Profile Picture" style={{ minHeight: formBodyHeight }} ref={profilePictureRef}>
                            <Row className="gx-2 gy-2 d-flex flex-column align-items-center justify-content-center h-100">
                                <Col md="12" className="d-flex justify-content-center">
                                    <div
                                        className="bg-body-tertiary"
                                        style={{
                                            width: '250px',
                                            height: '315px',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                            position: 'relative'
                                        }}
                                    >
                                        {profilePicturePreview ? (
                                            <img
                                                src={profilePicturePreview}
                                                alt="Profile Preview"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                                            />
                                        ) : (
                                            <i className="fas fa-camera" style={{ fontSize: '2rem', color: '#aaa' }}></i>
                                        )}
                                    </div>
                                </Col>
                                <Col md="12" className="d-flex justify-content-center mt-3">
                                    <Form.Group>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            isInvalid={!!errors.profilePicture}
                                            {...register('profilePicture', { required: 'Profile Picture is required' })}
                                            style={{ display: 'none' }}
                                            id="profilePictureUpload"
                                            onChange={handleProfilePictureChange}
                                        />
                                        <IconButton
                                            iconClassName="fs-11 me-1"
                                            variant="falcon-primary"
                                            size="md"
                                            icon="arrow-up"
                                            className='w-100 me-2'
                                            onClick={() => document.getElementById('profilePictureUpload').click()}
                                        >  Upload</IconButton>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.profilePicture?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </FormBody>
                    </div>
                </Col>
                <Col md={12}>
                    <FormBody title="Professional Information">
                        <Row className="gx-2 gy-2">
                            <Col md="6">
                                <Form.Group>
                                    <Form.Label>Designation:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        isInvalid={!!errors.designation}
                                        {...register('designation', { required: 'Designation is required' })}
                                    >
                                        <option value="">Select Designation</option>
                                        {designations.map((designation) => (
                                            <option key={designation.designation} value={designation.designation}>
                                                {designation.designation}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.designation?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group>
                                    <Form.Label>Department:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        isInvalid={!!errors.department}
                                        {...register('department', { required: 'Department is required' })}
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map((department) => (
                                            <option key={department.department} value={department.department}>
                                                {department.department}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.department?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group>
                                    <Form.Label>Business Unit:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        isInvalid={!!errors.businessUnit}
                                        {...register('businessUnit', { required: 'Business Unit is required' })}
                                    >
                                        <option value="">Select Business Unit</option>
                                        {businessUnits.map((businessUnit) => (
                                            <option key={businessUnit.businessUnit} value={businessUnit.businessUnit}>
                                                {businessUnit.businessUnit}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.businessUnit?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group>
                                    <Form.Label>Employee Type:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        isInvalid={!!errors.employeeType}
                                        {...register('employeeType', { required: 'Employee Type is required' })}
                                    >
                                        <option value="">Select Employee Type</option>
                                        {employeeTypes.map((employeeType) => (
                                            <option key={employeeType.employeeType} value={employeeType.employeeType}>
                                                {employeeType.employeeType}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.employeeType?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group>
                                    <Form.Label>Immediate Supervisor:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        isInvalid={!!errors.immediateSupervisor}
                                        {...register('immediateSupervisor', { required: 'Immediate Supervisor is required' })}
                                    >
                                        <option value="">Select Supervisor</option>
                                        {employees.map((employee) => (
                                            <option key={employee.fullName} value={employee.fullName}>
                                                {employee.fullName}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.immediateSupervisor?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group>
                                    <Form.Label>Joined Date:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        isInvalid={!!errors.joinedDate}
                                        {...register('joinedDate', { required: 'Joined Date is required' })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.joinedDate?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </FormBody>
                    <FormBody title="User Role">
                        <Row className="gx-2 gy-2">
                            <Col md="12">
                                <Form.Group>
                                    <Form.Label>Select User Role:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        isInvalid={!!errors.role}
                                        {...register('role', { required: 'Role is required' })}
                                    >
                                        {roles.map(role => (
                                            <option key={role.id} value={role.roleName}>
                                                {role.roleName}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.role?.message}
                                    </Form.Control.Feedback>
                                    <span className="text-muted small d-block mt-2">
                                        The Default User Role is <b>Employee</b>
                                    </span>
                                </Form.Group>
                            </Col>
                        </Row>
                    </FormBody>
                    <TitleHeader
                        title="You're almost done!"
                        buttons={[
                            {
                                isPrimary: true,
                                icon: 'folder-plus',
                                name: 'Save Employee',
                                type: 'submit'
                            },
                            {
                                isPrimary: false,
                                name: 'Discard',
                                onClick: handleDiscard
                            }
                        ]}
                    />
                </Col >
            </Row >
        </form >
    );
};

export default IndividualRecord;