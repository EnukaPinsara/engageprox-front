import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

const EntryOptionsContent = ({ handleBulkUploadShow, handleIndividualEntryShow }) => {
    return (
        <Row className="justify-content-center my-4 text-center">
            <Col xs={12} md={8}>
                <Button
                    variant="outline-primary"
                    className="d-flex align-items-center justify-content-center w-100 mb-3 py-2"
                    onClick={handleIndividualEntryShow}
                >
                    <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Individual Entry
                </Button>
                <Button
                    variant="outline-success"
                    className="d-flex align-items-center justify-content-center w-100 py-2"
                    onClick={handleBulkUploadShow}
                >
                    <FontAwesomeIcon icon={faUpload} className="me-2" /> Bulk Upload
                </Button>
            </Col>
        </Row>
    );
};

export default EntryOptionsContent;
