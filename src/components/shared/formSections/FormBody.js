import React from 'react';
import { Card, Row } from 'react-bootstrap';

const FormBody = ({ title, children }) => {
    return (
        <Card className="mb-3">
            <Card.Header as="h6" className="bg-body-tertiary">
                {title}
            </Card.Header>
            <Card.Body>
                <Row className="gx-2 gy-3">
                    {children}
                </Row>
            </Card.Body>
        </Card>
    );
};

export default FormBody;