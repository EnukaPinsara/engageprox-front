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

const CreateEmployeeType = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        if (toastShown) {
            toast.success('Employee Type created successfully', { theme: 'colored' });
            setToastShown(false);
            reset();
        }
    }, [toastShown, reset]);

    const handleSaveEmployeeType = async (data) => {
        try {
            await axios.post(`${baseUrl}/employeetypes`, {
                employeeTypeId: data.employeeTypeId,
                employeeType: data.employeeType,
                status: true
            });
            setToastShown(true);
            // navigate(paths.employeeTypes); 
        } catch (error) {
            toast.error('Error creating Employee Type!', { theme: 'colored' });
            console.error('Error creating Employee Type:', error);
        }
    };

    const handleDiscard = () => {
        navigate(paths.employeeTypes);
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleSaveEmployeeType)}>
                <Row className="g-3">
                    <Col xs={12}>
                        <TitleHeader
                            title="Create Employee Type"
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
                        <FormBody title="Enter Employee Type Details">
                            <Row className="gx-2 gy-2">
                                <Col md="12">
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Employee Type ID:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            isInvalid={!!errors.employeeTypeId}
                                            {...register('employeeTypeId', { required: 'Employee Type ID is required' })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.employeeTypeId?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md="12">
                                    <Form.Group>
                                        <Form.Label>Employee Type:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            isInvalid={!!errors.employeeType}
                                            {...register('employeeType', { required: 'Employee Type is required' })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.employeeType?.message}
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
                                    name: 'Save Employee Type',
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

export default CreateEmployeeType;
