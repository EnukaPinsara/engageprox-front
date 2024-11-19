import React, { useState, useEffect } from 'react';
import { Card, Form, Modal, Button, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableHeader from 'components/shared/TableHeader';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import TitleHeader from 'components/app/title-header/title-header';
import paths from 'routes/paths';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { useDesignationStore, useDepartmentStore, useBusinessUnitStore } from 'components/shared/storage/storage';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const AddContacts = () => {
    const location = useLocation();
    const { audienceId, audienc_e } = location.state || {};
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [currentFilter, setCurrentFilter] = useState(null);
    const [selectedDesignations, setSelectedDesignations] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedBusinessUnits, setSelectedBusinessUnits] = useState([])
    const { designations, fetchDesignations } = useDesignationStore();
    const { departments, fetchDepartments } = useDepartmentStore();
    const { businessUnits, fetchBusinessUnits } = useBusinessUnitStore();
    const [toastShown, setToastShown] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/user`);
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchDesignations();
        fetchDepartments();
        fetchBusinessUnits();
        fetchData();
    }, []);

    useEffect(() => {
        if (!audienceId || !audienc_e) {
            console.error('Audience data not found. Redirecting back.');
            navigate(paths.audienceSettings);
        }
    }, [audienceId, audienc_e, navigate]);

    const applyFilters = () => {
        const filtered = users.filter(user => {
            const matchesDesignation = selectedDesignations.length
                ? selectedDesignations.includes(user.designation)
                : true;
            const matchesDepartment = selectedDepartments.length
                ? selectedDepartments.includes(user.department)
                : true;
            const matchesBusinessUnit = selectedBusinessUnits.length
                ? selectedBusinessUnits.includes(user.businessUnit)
                : true;

            return matchesDesignation && matchesDepartment && matchesBusinessUnit;
        });
        setFilteredUsers(filtered);
        setShowFilterModal(false);
    };

    const toggleFilter = (filter, value, setFilter) => {
        setFilter(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const handleApplyBulkAction = async (action) => {
        if (action === 'add contacts') {
            const selectedRows = table.getSelectedRowModel().rows;
            const employeeIds = selectedRows.map(row => row.original.employeeId);

            try {
                await axios.post(`${baseUrl}/audiences/${audienceId}/add-contacts`, {
                    audienceId,
                    employeeIds,
                });
                toast.success('Contacts added successfully!');
            } catch (error) {
                console.error('Error adding contacts:', error);
                toast.error('Failed to add contacts. Please try again.');
            }
        }
    };

    const renderModalBody = () => {
        switch (currentFilter) {
            case 'designations':
                return (
                    <Form.Group>
                        {designations.map(designation => (
                            <Form.Check
                                key={designation.designationId}
                                type="checkbox"
                                label={designation.designation}
                                checked={selectedDesignations.includes(designation.designation)}
                                onChange={() =>
                                    toggleFilter(selectedDesignations, designation.designation, setSelectedDesignations)
                                }
                            />
                        ))}
                    </Form.Group>
                );
            case 'departments':
                return (
                    <Form.Group>
                        {departments.map(department => (
                            <Form.Check
                                key={department.departmentId}
                                type="checkbox"
                                label={department.department}
                                checked={selectedDepartments.includes(department.department)}
                                onChange={() =>
                                    toggleFilter(selectedDepartments, department.department, setSelectedDepartments)
                                }
                            />
                        ))}
                    </Form.Group>
                );
            case 'businessUnits':
                return (
                    <Form.Group>
                        {businessUnits.map(unit => (
                            <Form.Check
                                key={unit.businessUnitId}
                                type="checkbox"
                                label={unit.businessUnit}
                                checked={selectedBusinessUnits.includes(unit.businessUnit)}
                                onChange={() =>
                                    toggleFilter(selectedBusinessUnits, unit.businessUnit, setSelectedBusinessUnits)
                                }
                            />
                        ))}
                    </Form.Group>
                );
            default:
                return <p>Please select a filter type.</p>;
        }
    };

    const columns = [
        {
            accessorKey: 'fullName',
            header: 'Name',
            meta: {
                headerProps: { className: 'ps-5 text-900' },
                cellProps: { className: 'ps-5' }
            }
        },
        {
            accessorKey: 'email',
            header: 'Email',
            meta: {
                headerProps: { className: 'ps-5 text-900' },
                cellProps: { className: 'ps-5' }
            }
        },
        {
            accessorKey: 'designation',
            header: 'Designation',
            meta: {
                headerProps: { className: 'ps-5 text-900' },
                cellProps: { className: 'ps-5' }
            }
        },
        {
            accessorKey: 'department',
            header: 'Department',
            meta: {
                headerProps: { className: 'ps-5 text-900' },
                cellProps: { className: 'ps-5' }
            }
        },
        {
            accessorKey: 'businessUnit',
            header: 'Business Unit',
            meta: {
                headerProps: { className: 'ps-5 text-900' },
                cellProps: { className: 'ps-5' }
            }
        },
        {
            accessorKey: 'employeeType',
            header: 'Employee Type',
            meta: {
                headerProps: { className: 'ps-5 text-900' },
                cellProps: { className: 'ps-5' }
            }
        },
    ];

    const table = useAdvanceTable({
        data: filteredUsers,
        columns,
        selection: true,
        sortable: true,
        pagination: true,
        perPage: 15
    });

    return (
        <>
            <Row className="g-3">
                <TitleHeader
                    title="Add Contacts"
                    buttons={[
                        {
                            isPrimary: false,
                            icon: 'arrow-left',
                            name: 'Go Back',
                            onClick: () => navigate(paths.audienceSettings),
                        }
                    ]}
                >
                    <Form.Group className="mb-3 mt-3">
                        <Form.Label>Selected Audience</Form.Label>
                        <Form.Control
                            disabled
                            type="text"
                            value={audienc_e || ''}
                        />
                    </Form.Group>
                </TitleHeader>
                <AdvanceTableProvider {...table}>
                    <Card className="mb-3">
                        <Card.Header>
                            <TableHeader
                                headerTitle="Employees"
                                showNewButton={false}
                                showExportButton={false}
                                onApply={handleApplyBulkAction}
                                buttons={[
                                    {
                                        label: 'Filter by designations',
                                        onClick: () => {
                                            setCurrentFilter('designations');
                                            setShowFilterModal(true);
                                        }, icon: 'filter',
                                    },
                                    {
                                        label: 'Filter by departments',
                                        onClick: () => {
                                            setCurrentFilter('departments');
                                            setShowFilterModal(true);
                                        }, icon: 'filter',
                                    },
                                    {
                                        label: 'Filter by business units',
                                        onClick: () => {
                                            setCurrentFilter('businessUnits');
                                            setShowFilterModal(true);
                                        }, icon: 'filter',
                                    },
                                ]}
                                bulkActions={['Add Contacts']}
                            />
                        </Card.Header>
                        <Card.Body className="p-0">
                            <AdvanceTable
                                headerClassName="bg-200 text-nowrap align-middle"
                                rowClassName="align-middle white-space-nowrap"
                                tableProps={{
                                    size: 'sm',
                                    striped: true,
                                    className: 'fs-10 mb-0 overflow-hidden'
                                }}
                            />
                        </Card.Body>
                        <Card.Footer>
                            <AdvanceTablePagination />
                        </Card.Footer>
                    </Card>
                </AdvanceTableProvider>
            </Row>

            <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter Employees</Modal.Title>
                </Modal.Header>
                <Modal.Body>{renderModalBody()}</Modal.Body>
                <Modal.Footer>
                    <Button variant="falcon-default" onClick={() => setShowFilterModal(false)}>
                        Close
                    </Button>
                    <Button variant="falcon-primary" onClick={applyFilters}>
                        Apply Filters
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddContacts; 