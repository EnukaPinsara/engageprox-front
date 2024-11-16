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

const CreateDesignation = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        if (toastShown) {
            toast.success('Designation created successfully', { theme: 'colored' });
            setToastShown(false);
            reset();
        }
    }, [toastShown, reset]);

    const handleSaveDesignation = async (data) => {
        try {
            await axios.post(`${baseUrl}/designations`, {
                designationId: data.designationId,
                designation: data.designation,
                status: true
            });
            setToastShown(true);
            // navigate(paths.designations);
        } catch (error) {
            toast.error('Error creating designation!', { theme: 'colored' });
            console.error('Error creating designation:', error);
        }
    };

    const handleDiscard = () => {
        navigate(paths.designations);
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleSaveDesignation)}>
                <Row className="g-3">
                    <Col xs={12}>
                        <TitleHeader
                            title="Create Designation"
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
                        <FormBody title="Enter Designation Details">
                            <Row className="gx-2 gy-2">
                                <Col md="12">
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Designation ID:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            isInvalid={!!errors.designationId}
                                            {...register('designationId', { required: 'Designation ID is required' })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.designationId?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md="12">
                                    <Form.Group>
                                        <Form.Label>Designation:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            isInvalid={!!errors.designation}
                                            {...register('designation', { required: 'Designation is required' })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.designation?.message}
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
                                    name: 'Save Designation',
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

export default CreateDesignation;