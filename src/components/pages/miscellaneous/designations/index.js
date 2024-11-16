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

const Designations = () => {
    const navigate = useNavigate();
    const [designations, setDesignations] = useState([]);
    const [selectedDesignation, setSelectedDesignation] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [selectedDesignationForUpdate, setSelectedDesignationForUpdate] = useState(null);
    const [selectedDesignationForDelete, setSelectedDesignationForDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        if (toastShown) {
            toast.success('Designation updated successfully', { theme: 'colored' });
            setToastShown(false);
        }
    }, [toastShown]);

    const handleAddDesignation = () => {
        navigate(paths.addDesignation);
    };

    const handleFilterDesignations = () => {
        // Logic
    };

    const handleExportDesignations = () => {
        // Logic
    };

    const handleEdit = (designation) => {
        setSelectedDesignation(designation);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedDesignation(null);
    };

    const handleDelete = (designation) => {
        setSelectedDesignationForDelete(designation);
        setConfirmationMessage(`Are you sure you want to delete the designation ${designation.designation}?`);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedDesignationForDelete) return;

        try {
            await axios.delete(`${baseUrl}/designations/${selectedDesignationForDelete.designationId}`);
            setDesignations((prev) =>
                prev.filter((item) => item.designationId !== selectedDesignationForDelete.designationId)
            );
            toast.success('Designation deleted successfully', { theme: 'colored' });
        } catch (error) {
            toast.error('Error deleting designation!', { theme: 'colored' });
            console.error('Error deleting designation:', error);
        }

        setShowDeleteModal(false);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${baseUrl}/designations/${selectedDesignation.designationId}`, selectedDesignation);
            setToastShown(true);
            setShowEditModal(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error('Error updating designation details!', { theme: 'colored' });
            console.error('Error updating designation:', error);
        }
    };

    const handleToggle = (designation) => {
        const updatedStatus = designation.status === true ? false : true;
        setSelectedDesignationForUpdate(designation);

        setConfirmationMessage(
            updatedStatus
                ? `Are you sure you want to enable this designation?`
                : `Are you sure you want to disable this designation?`
        );

        setShowConfirmModal(true);
    };


    const handleConfirmUpdate = async () => {
        if (!selectedDesignationForUpdate) return;

        try {
            const updatedStatus = selectedDesignationForUpdate.status === true ? false : true;

            await axios.put(`${baseUrl}/designations/${selectedDesignationForUpdate.designationId}`, {
                ...selectedDesignationForUpdate,
                status: updatedStatus,
            });

            setDesignations((prev) =>
                prev.map((item) =>
                    item.designationId === selectedDesignationForUpdate.designationId
                        ? { ...item, status: updatedStatus }
                        : item
                )
            );

            toast.success(`Designation ${updatedStatus ? 'Enabled' : 'Disabled'}`, { theme: 'colored' });
        } catch (error) {
            toast.error('Error updating status!', { theme: 'colored' });
            console.error('Error toggling status:', error);
        }

        setShowConfirmModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/designations`);
                setDesignations(response.data);
            } catch (error) {
                console.error('Error fetching designations:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            accessorKey: 'designationId',
            header: 'Designation ID',
            meta: {
                headerProps: { className: 'pe-1 text-900' },
                cellProps: {
                    className: 'py-2'
                }
            },
        },
        {
            accessorKey: 'designation',
            header: 'Designation',
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
                        id={`status-toggle-${original.designationId}`}
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
        data: designations,
        columns,
        selection: true,
        sortable: true,
        pagination: true,
        perPage: 10
    });

    const renderModalBodyContent = () => (
        <Form>
            <Form.Group controlId="formDesignationId">
                <Form.Label>Designation ID</Form.Label>
                <Form.Control
                    disabled
                    type="text"
                    value={selectedDesignation?.designationId || ''}
                    onChange={(e) => setSelectedDesignation({ ...selectedDesignation, designationId: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                    type="text"
                    value={selectedDesignation?.designation || ''}
                    onChange={(e) => setSelectedDesignation({ ...selectedDesignation, designation: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Check
                    type="switch"
                    id="status-toggle"
                    checked={selectedDesignation?.status === true}
                    onChange={(e) => setSelectedDesignation({ ...selectedDesignation, status: e.target.checked })}
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
                        headerTitle="Designations"
                        onAdd={handleAddDesignation}
                        onFilter={handleFilterDesignations}
                        onExport={handleExportDesignations}
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
                title="Confirm Status Change"
                bodyContent={<p>{confirmationMessage}</p>}
                buttons={[
                    {
                        label: 'Cancel',
                        variant: 'falcon-default',
                        onClick: () => setShowConfirmModal(false),
                    },
                    {
                        label: 'Confirm',
                        variant: 'falcon-primary',
                        onClick: handleConfirmUpdate,
                    }
                ]}
            />

            <CustomModal
                show={showEditModal}
                handleClose={handleCloseModal}
                title="Edit Designation"
                bodyContent={renderModalBodyContent()}
                buttons={modalButtons}
                bodyClassName="bg-body-tertiary"
            />

            <CustomModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                title="Confirm Deletion"
                bodyContent={<p>{confirmationMessage}</p>}
                buttons={[
                    {
                        label: 'Cancel',
                        variant: 'falcon-default',
                        onClick: () => setShowDeleteModal(false),
                    },
                    {
                        label: 'Confirm',
                        variant: 'falcon-primary',
                        onClick: handleConfirmDelete,
                    }
                ]}
            />
        </AdvanceTableProvider>
    );
};

export default Designations;