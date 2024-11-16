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

const Departments = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [selectedDepartmentForUpdate, setSelectedDepartmentForUpdate] = useState(null);
    const [selectedDepartmentForDelete, setSelectedDepartmentForDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        if (toastShown) {
            toast.success('Department updated successfully', { theme: 'colored' });
            setToastShown(false);
        }
    }, [toastShown]);

    const handleAddDepartment = () => {
        navigate(paths.addDepartment);
    };

    const handleFilterDepartments = () => {
        // Logic for filtering departments
    };

    const handleExportDepartments = () => {
        // Logic for exporting departments
    };

    const handleEdit = (department) => {
        setSelectedDepartment(department);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedDepartment(null);
    };

    const handleDelete = (department) => {
        setSelectedDepartmentForDelete(department);
        setConfirmationMessage(`Are you sure you want to delete the department ${department.department}?`);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedDepartmentForDelete) return;

        try {
            await axios.delete(`${baseUrl}/departments/${selectedDepartmentForDelete.departmentId}`);
            setDepartments((prev) =>
                prev.filter((item) => item.departmentId !== selectedDepartmentForDelete.departmentId)
            );
            toast.success('Department deleted successfully', { theme: 'colored' });
        } catch (error) {
            toast.error('Error deleting department!', { theme: 'colored' });
            console.error('Error deleting department:', error);
        }

        setShowDeleteModal(false);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${baseUrl}/departments/${selectedDepartment.departmentId}`, selectedDepartment);
            setToastShown(true);
            setShowEditModal(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error('Error updating department details!', { theme: 'colored' });
            console.error('Error updating department:', error);
        }
    };

    const handleToggle = (department) => {
        const updatedStatus = department.status === true ? false : true;
        setSelectedDepartmentForUpdate(department);

        setConfirmationMessage(
            updatedStatus
                ? `Are you sure you want to enable this department?`
                : `Are you sure you want to disable this department?`
        );

        setShowConfirmModal(true);
    };

    const handleConfirmUpdate = async () => {
        if (!selectedDepartmentForUpdate) return;

        try {
            const updatedStatus = selectedDepartmentForUpdate.status === true ? false : true;

            await axios.put(`${baseUrl}/departments/${selectedDepartmentForUpdate.departmentId}`, {
                ...selectedDepartmentForUpdate,
                status: updatedStatus,
            });

            setDepartments((prev) =>
                prev.map((item) =>
                    item.departmentId === selectedDepartmentForUpdate.departmentId
                        ? { ...item, status: updatedStatus }
                        : item
                )
            );

            toast.success(`Department ${updatedStatus ? 'Enabled' : 'Disabled'}`, { theme: 'colored' });
        } catch (error) {
            toast.error('Error updating status!', { theme: 'colored' });
            console.error('Error toggling status:', error);
        }

        setShowConfirmModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/departments`);
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            accessorKey: 'departmentId',
            header: 'Department ID',
            meta: {
                headerProps: { className: 'pe-1 text-900' },
                cellProps: {
                    className: 'py-2'
                }
            },
        },
        {
            accessorKey: 'department',
            header: 'Department',
            meta: {
                headerProps: { className: 'pe-1 text-900' },
                cellProps: {
                    className: 'py-2'
                }
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            meta: {
                headerProps: { className: 'pe-1 text-900' },
                cellProps: {
                    className: 'py-2'
                }
            },
            cell: ({ row: { original } }) => {
                return (
                    <Form.Check
                        type="switch"
                        id={`status-toggle-${original.departmentId}`}
                        checked={original.status === true}
                        onChange={() => handleToggle(original)}
                    />
                );
            }
        },
        {
            accessorKey: 'none',
            header: '',
            enableSorting: false,
            meta: {
                cellProps: {
                    className: 'text-end'
                }
            },
            cell: ({ row: { original } }) => {
                return (
                    <CardDropdown>
                        <div className="py-2">
                            <Dropdown.Item onClick={() => handleEdit(original)}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelete(original)}>Delete</Dropdown.Item>
                        </div>
                    </CardDropdown>
                );
            }
        }
    ];

    const table = useAdvanceTable({
        data: departments,
        columns,
        selection: true,
        sortable: true,
        pagination: true,
        perPage: 10
    });

    const renderModalBodyContent = () => (
        <Form>
            <Form.Group controlId="formDepartmentId">
                <Form.Label>Department ID</Form.Label>
                <Form.Control
                    disabled
                    type="text"
                    value={selectedDepartment?.departmentId || ''}
                    onChange={(e) => setSelectedDepartment({ ...selectedDepartment, departmentId: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formDepartment">
                <Form.Label>Department</Form.Label>
                <Form.Control
                    type="text"
                    value={selectedDepartment?.department || ''}
                    onChange={(e) => setSelectedDepartment({ ...selectedDepartment, department: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Check
                    type="switch"
                    id="status-toggle"
                    checked={selectedDepartment?.status === true}
                    onChange={(e) => setSelectedDepartment({ ...selectedDepartment, status: e.target.checked })}
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
        }
    ];

    return (
        <AdvanceTableProvider {...table}>
            <Card className="mb-3">
                <Card.Header>
                    <TableHeader
                        headerTitle="Departments"
                        onAdd={handleAddDepartment}
                        onFilter={handleFilterDepartments}
                        onExport={handleExportDepartments}
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
                show={showConfirmModal}
                handleClose={() => setShowConfirmModal(false)}
                title="Confirm Status Update"
                bodyContent={confirmationMessage}
                buttons={[
                    {
                        label: 'Cancel',
                        variant: 'falcon-default',
                        onClick: () => setShowConfirmModal(false)
                    },
                    {
                        label: 'Confirm',
                        variant: 'falcon-primary',
                        onClick: handleConfirmUpdate
                    }
                ]}
            />

            <CustomModal
                show={showEditModal}
                handleClose={handleCloseModal}
                title="Edit Department"
                bodyContent={renderModalBodyContent()}
                buttons={modalButtons}
            />

            <CustomModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                title="Delete Department"
                bodyContent={confirmationMessage}
                buttons={[
                    {
                        label: 'Cancel',
                        variant: 'falcon-default',
                        onClick: () => setShowDeleteModal(false)
                    },
                    {
                        label: 'Confirm',
                        variant: 'falcon-danger',
                        onClick: handleConfirmDelete
                    }
                ]}
            />
        </AdvanceTableProvider>
    );
};

export default Departments;