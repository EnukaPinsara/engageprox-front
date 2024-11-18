import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Dropdown, Form } from 'react-bootstrap';
import CardDropdown from 'components/common/CardDropdown';
import TableHeader from 'components/shared/TableHeader';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import CustomModal from 'components/shared/CustomModal';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import paths from 'routes/paths';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const EmployeeTypes = () => {
    const navigate = useNavigate();
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [selectedEmployeeType, setSelectedEmployeeType] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [selectedEmployeeTypeForUpdate, setSelectedEmployeeTypeForUpdate] = useState(null);
    const [selectedEmployeeTypeForDelete, setSelectedEmployeeTypeForDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        if (toastShown) {
            toast.success('Employee Type updated successfully', { theme: 'colored' });
            setToastShown(false);
        }
    }, [toastShown]);

    const handleAddEmployeeType = () => {
        navigate(paths.addEmployeeType);
    };

    const handleFilterEmployeeTypes = () => {
        // Logic for filtering employee types
    };

    const handleExportEmployeeTypes = () => {
        // Logic for exporting employee types
    };

    const handleEdit = (unit) => {
        setSelectedEmployeeType(unit);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedEmployeeType(null);
    };

    const handleDelete = (unit) => {
        setSelectedEmployeeTypeForDelete(unit);
        setConfirmationMessage(`Are you sure you want to delete the Employee Type ${unit.employeeType}?`);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedEmployeeTypeForDelete) return;

        try {
            await axios.delete(`${baseUrl}/employeetypes/${selectedEmployeeTypeForDelete.employeeTypeId}`);
            setEmployeeTypes((prev) =>
                prev.filter((item) => item.employeeTypeId !== selectedEmployeeTypeForDelete.employeeTypeId)
            );
            toast.success('Employee Type deleted successfully', { theme: 'colored' });
        } catch (error) {
            toast.error('Error deleting Employee Type!', { theme: 'colored' });
            console.error('Error deleting Employee Type:', error);
        }

        setShowDeleteModal(false);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${baseUrl}/employeetypes/${selectedEmployeeType.employeeTypeId}`, selectedEmployeeType);
            setToastShown(true);
            setShowEditModal(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error('Error updating Employee Type details!', { theme: 'colored' });
            console.error('Error updating Employee Type:', error);
        }
    };

    const handleToggle = (unit) => {
        const updatedStatus = unit.status === true ? false : true;
        setSelectedEmployeeTypeForUpdate(unit);

        setConfirmationMessage(
            updatedStatus
                ? `Are you sure you want to enable this Employee Type?`
                : `Are you sure you want to disable this Employee Type?`
        );

        setShowConfirmModal(true);
    };

    const handleConfirmUpdate = async () => {
        if (!selectedEmployeeTypeForUpdate) return;

        try {
            const updatedStatus = selectedEmployeeTypeForUpdate.status === true ? false : true;

            await axios.put(`${baseUrl}/employeetypes/${selectedEmployeeTypeForUpdate.employeeTypeId}`, {
                ...selectedEmployeeTypeForUpdate,
                status: updatedStatus,
            });

            setEmployeeTypes((prev) =>
                prev.map((item) =>
                    item.employeeTypeId === selectedEmployeeTypeForUpdate.employeeTypeId
                        ? { ...item, status: updatedStatus }
                        : item
                )
            );

            toast.success(`Employee Type ${updatedStatus ? 'Enabled' : 'Disabled'}`, { theme: 'colored' });
        } catch (error) {
            toast.error('Error updating status!', { theme: 'colored' });
            console.error('Error toggling status:', error);
        }

        setShowConfirmModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/employeetypes`);
                setEmployeeTypes(response.data);
            } catch (error) {
                console.error('Error fetching Employee Types:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            accessorKey: 'employeeTypeId',
            header: 'Employee Type ID',
            meta: {
                headerProps: { className: 'pe-1 text-900' },
                cellProps: { className: 'py-2' },
            },
        },
        {
            accessorKey: 'employeeType',
            header: 'Employee Type',
            meta: {
                headerProps: { className: 'pe-1 text-900' },
                cellProps: { className: 'py-2' },
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            meta: {
                headerProps: { className: 'pe-1 text-900' },
                cellProps: { className: 'py-2' },
            },
            cell: ({ row: { original } }) => {
                return (
                    <Form.Check
                        type="switch"
                        id={`status-toggle-${original.employeeTypeId}`}
                        checked={original.status === true}
                        onChange={() => handleToggle(original)}
                    />
                );
            },
        },
        {
            accessorKey: 'none',
            header: '',
            enableSorting: false,
            meta: { cellProps: { className: 'text-end' } },
            cell: ({ row: { original } }) => {
                return (
                    <CardDropdown>
                        <div className="py-2">
                            <Dropdown.Item onClick={() => handleEdit(original)}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelete(original)}>Delete</Dropdown.Item>
                        </div>
                    </CardDropdown>
                );
            },
        },
    ];

    const table = useAdvanceTable({
        data: employeeTypes,
        columns,
        selection: true,
        sortable: true,
        pagination: true,
        perPage: 10,
    });

    const renderModalBodyContent = () => (
        <Form>
            <Form.Group controlId="formEmployeeTypeId">
                <Form.Label>Employee Type ID</Form.Label>
                <Form.Control
                    disabled
                    type="text"
                    value={selectedEmployeeType?.employeeTypeId || ''}
                    onChange={(e) =>
                        setSelectedEmployeeType({ ...selectedEmployeeType, employeeTypeId: e.target.value })
                    }
                    className="mb-3"
                />
            </Form.Group>
            <Form.Group controlId="formEmployeeType">
                <Form.Label>Employee Type</Form.Label>
                <Form.Control
                    type="text"
                    value={selectedEmployeeType?.employeeType || ''}
                    onChange={(e) => setSelectedEmployeeType({ ...selectedEmployeeType, employeeType: e.target.value })}
                    className="mb-3"
                />
            </Form.Group>
            <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Check
                    type="switch"
                    id="status-toggle"
                    checked={selectedEmployeeType?.status === true}
                    onChange={(e) => setSelectedEmployeeType({ ...selectedEmployeeType, status: e.target.checked })}
                />
            </Form.Group>
        </Form>
    );

    const modalButtons = [
        {
            label: 'Close',
            variant: 'falcon-default',
            className: 'me-2',
            onClick: handleCloseModal,
        },
        {
            label: 'Save Changes',
            variant: 'falcon-primary',
            onClick: handleUpdate,
        },
    ];

    return (
        <AdvanceTableProvider {...table}>
            <Card className="mb-3">
                <Card.Header>
                    <TableHeader
                        headerTitle="Employee Types"
                        onAdd={handleAddEmployeeType}
                        onFilter={handleFilterEmployeeTypes}
                        onExport={handleExportEmployeeTypes}
                        bulkActions={['Delete', 'Archive']}
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

            <CustomModal
                show={showEditModal}
                handleClose={handleCloseModal}
                title="Edit Employee Type"
                bodyContent={renderModalBodyContent()}
                buttons={modalButtons}
            />

            <CustomModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                title="Confirm Delete"
                bodyContent={<p>{confirmationMessage}</p>}
                buttons={[
                    {
                        label: 'Close',
                        variant: 'falcon-default',
                        className: 'me-2',
                        onClick: () => setShowDeleteModal(false),
                    },
                    {
                        label: 'Confirm Delete',
                        variant: 'danger',
                        onClick: handleConfirmDelete,
                    },
                ]}
            />

            <CustomModal
                show={showConfirmModal}
                handleClose={() => setShowConfirmModal(false)}
                title="Confirm Action"
                bodyContent={<p>{confirmationMessage}</p>}
                buttons={[
                    {
                        label: 'Close',
                        variant: 'falcon-default',
                        className: 'me-2',
                        onClick: () => setShowConfirmModal(false),
                    },
                    {
                        label: 'Confirm',
                        variant: 'falcon-primary',
                        onClick: handleConfirmUpdate,
                    },
                ]}
            />
        </AdvanceTableProvider>
    );
};

export default EmployeeTypes;