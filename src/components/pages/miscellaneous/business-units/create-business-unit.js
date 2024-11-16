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

const CreateBusinessUnit = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        if (toastShown) {
            toast.success('Business Unit created successfully', { theme: 'colored' });
            setToastShown(false);
            reset();
        }
    }, [toastShown, reset]);

    const handleSaveBusinessUnit = async (data) => {
        try {
            await axios.post(`${baseUrl}/businessunits`, {
                businessUnitId: data.businessUnitId,
                businessUnit: data.businessUnit,
                status: true
            });
            setToastShown(true);
            // navigate(paths.businessUnits); 
        } catch (error) {
            toast.error('Error creating business unit!', { theme: 'colored' });
            console.error('Error creating business unit:', error);
        }
    };

    const handleDiscard = () => {
        navigate(paths.businessUnits);
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleSaveBusinessUnit)}>
                <Row className="g-3">
                    <Col xs={12}>
                        <TitleHeader
                            title="Create Business Unit"
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
                        <FormBody title="Enter Business Unit Details">
                            <Row className="gx-2 gy-2">
                                <Col md="12">
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Business Unit ID:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            isInvalid={!!errors.businessUnitId}
                                            {...register('businessUnitId', { required: 'Business Unit ID is required' })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.businessUnitId?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md="12">
                                    <Form.Group>
                                        <Form.Label>Business Unit:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            isInvalid={!!errors.businessUnit}
                                            {...register('businessUnit', { required: 'Business Unit is required' })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.businessUnit?.message}
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
                                    name: 'Save Business Unit',
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

export default CreateBusinessUnit;