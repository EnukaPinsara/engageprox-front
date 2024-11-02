import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const BulkUploadContent = ({ onSubmit }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(file);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select CSV or Excel file</Form.Label>
                <Form.Control
                    type="file"
                    accept=".csv,.xls,.xlsx"
                    onChange={handleFileChange}
                    required
                />
            </Form.Group>
            <Button size="md" variant="falcon-primary" type="submit" className="me-3">
                Upload
            </Button>
            <hr />
            <a
                href={`${process.env.PUBLIC_URL}/templates/employee-template.xlsx`}
                download="SampleTemplate.xlsx"
                className="btn btn-link"
            >
                <FontAwesomeIcon icon={faDownload} className="me-2" /> Download Sample Template
            </a>
        </Form>
    );
};

export default BulkUploadContent;