import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Col, Form, Row, Button } from 'react-bootstrap';
import IconButton from 'components/common/IconButton';
import EntryOptions from 'components/pages/employee/create-employee/EntryOptions';
import { useAdvanceTableContext } from 'providers/AdvanceTableProvider';
import paths from 'routes/paths';

const EmployeesTableHeader = () => {
    const { getSelectedRowModel } = useAdvanceTableContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [showEntryOptions, setShowEntryOptions] = useState(false);

    const handleShow = () => {
        setShowEntryOptions(true);
        navigate(paths.addEmployeeOptions);
    };

    const handleCloseModal = () => {
        setShowEntryOptions(false);
        navigate(paths.employees);
    };

    return (
        <Row className="flex-between-center">
            <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
                <h5 className="fs-9 mb-0 text-nowrap py-2 py-xl-0">Employees</h5>
            </Col>
            <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
                {getSelectedRowModel().rows.length > 0 ? (
                    <div className="d-flex">
                        <Form.Select size="sm" aria-label="Bulk actions">
                            <option>Bulk Actions</option>
                            <option value="refund">Refund</option>
                            <option value="delete">Delete</option>
                            <option value="archive">Archive</option>
                        </Form.Select>
                        <Button
                            type="button"
                            variant="falcon-default"
                            size="sm"
                            className="ms-2"
                        >
                            Apply
                        </Button>
                    </div>
                ) : (
                    <div id="orders-actions">
                        <IconButton
                            variant="falcon-default"
                            size="sm"
                            icon="plus"
                            transform="shrink-3"
                            onClick={handleShow}
                        >
                            <span className="d-none d-sm-inline-block ms-1">New</span>
                        </IconButton>

                        <IconButton
                            variant="falcon-default"
                            size="sm"
                            icon="filter"
                            transform="shrink-3"
                            className="mx-2"
                        >
                            <span className="d-none d-sm-inline-block ms-1">Filter</span>
                        </IconButton>
                        <IconButton
                            variant="falcon-default"
                            size="sm"
                            icon="external-link-alt"
                            transform="shrink-3"
                        >
                            <span className="d-none d-sm-inline-block ms-1">Export</span>
                        </IconButton>

                        <EntryOptions show={showEntryOptions} onHide={handleCloseModal} />
                    </div>
                )}
            </Col>
        </Row>
    );
};

export default EmployeesTableHeader;