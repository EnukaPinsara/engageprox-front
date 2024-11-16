import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import TitleHeader from 'components/app/title-header/title-header';
import FormBody from 'components/shared/formSections/FormBody';
import paths from 'routes/paths';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const CreateDepartment = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        if (toastShown) {
            toast.success('Department created successfully', { theme: 'colored' });
            setToastShown(false);
            reset();
        }
    }, [toastShown, reset]);

    const handleSaveDepartment = async (data) => {
        try {
            await axios.post(`${baseUrl}/departments`, {
                departmentId: data.departmentId,
                department: data.department,
                status: true
            });
            setToastShown(true);
            // navigate(paths.departments); 
        } catch (error) {
            toast.error('Error creating department!', { theme: 'colored' });
            console.error('Error creating department:', error.response ? error.response.data : error);
        }
    };

    const handleDiscard = () => {
        navigate(paths.departments);
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleSaveDepartment)}>
                <Row className="g-3">
                    <Col xs={12}>
                        <TitleHeader
                            title="Create Department"
                            buttons={[
                                {
                                    icon: 'arrow-left',
                                    name: 'Go Back',
                                    onClick: handleDiscard,
                                }
                            ]}
                        />
                    </Col>
                    <Col md={12}>
                        <FormBody title="Enter Department Details">
                            <Row className="gx-2 gy-2">
                                <Col md="12">
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Department ID:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            isInvalid={!!errors.departmentId}
                                            {...register('departmentId', { required: 'Department ID is required' })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.departmentId?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md="12">
                                    <Form.Group>
                                        <Form.Label>Department:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            isInvalid={!!errors.department}
                                            {...register('department', { required: 'Department Name is required' })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.department?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </FormBody>
                        <TitleHeader
                            buttons={[
                                {
                                    isPrimary: true,
                                    icon: 'folder-plus',
                                    name: 'Save Department',
                                    type: 'submit'
                                },
                                {
                                    isPrimary: false,
                                    name: 'Discard',
                                    onClick: handleDiscard
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </form>
        </>
    );
};

export default CreateDepartment;