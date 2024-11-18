import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import TitleHeader from 'components/app/title-header/title-header';
import paths from 'routes/paths';
// import useCounterStore from 'components/shared/storage/storage';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const CreateAudience = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [toastShown, setToastShown] = useState(false);

  // const { count, increaseCount, decreaseCount, resetCount } = useCounterStore();

  useEffect(() => {
    if (toastShown) {
      toast.success('Audience created successfully', { theme: 'colored' });
      setToastShown(false);
      reset();
    }
  }, [toastShown, reset]);

  const handleSaveAudience = async (data) => {
    try {
      await axios.post(`${baseUrl}/audience`, {
        Audienc_e: data.audienceName,
        Descrption: data.audienceDescription,
      });
      setToastShown(true);
    } catch (error) {
      toast.error('Error creating Audience!', { theme: 'colored' });
      console.error('Error creating Audience:', error);
    }
  };

  const handleDiscard = () => {
    navigate(paths.audienceSettings);
  };

  return (
    <>
      {/* <div><button onClick={() => increaseCount()}>Submit</button><button onClick={() => resetCount()}>Submit</button>{count}</div> */}
      <form onSubmit={handleSubmit(handleSaveAudience)}>
        <Row>
          <Col xs={12}>
            <TitleHeader
              title="Create Audience"
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
            <Card className="my-3">
              <Card.Header as="h6">Enter Audience Details</Card.Header>
              <Card.Body className="bg-body-tertiary">
                <Row className="gx-2 gy-3">
                  <Col md="12">
                    <Form.Group controlId="audienceName" className='mb-3'>
                      <Form.Label>Audience Title</Form.Label>
                      <Form.Control
                        type="text"
                        isInvalid={!!errors.audienceName}
                        {...register('audienceName', { required: 'Audience Title is required' })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.audienceName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md="12">
                    <Form.Group controlId="audienceDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        isInvalid={!!errors.audienceDescription}
                        {...register('audienceDescription', { required: 'Audience Description is required' })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.audienceDescription?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12}>
            <TitleHeader
              buttons={[
                {
                  isPrimary: true,
                  icon: 'folder-plus',
                  name: 'Save Audience',
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

export default CreateAudience;