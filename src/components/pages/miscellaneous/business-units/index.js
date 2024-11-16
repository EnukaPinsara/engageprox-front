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

const BusinessUnits = () => {
    const navigate = useNavigate();
    const [businessUnits, setBusinessUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [selectedUnitForUpdate, setSelectedUnitForUpdate] = useState(null);
    const [selectedUnitForDelete, setSelectedUnitForDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        if (toastShown) {
            toast.success('Business Unit updated successfully', { theme: 'colored' });
            setToastShown(false);
        }
    }, [toastShown]);

    const handleAddBusinessUnit = () => {
        navigate(paths.addBusinessUnit);
    };

    const handleFilterBusinessUnits = () => {
        // Logic for filtering business units
    };

    const handleExportBusinessUnits = () => {
        // Logic for exporting business units
    };

    const handleEdit = (unit) => {
        setSelectedUnit(unit);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedUnit(null);
    };

    const handleDelete = (unit) => {
        setSelectedUnitForDelete(unit);
        setConfirmationMessage(`Are you sure you want to delete the Business Unit ${unit.businessUnit}?`);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedUnitForDelete) return;

        try {
            await axios.delete(`${baseUrl}/businessunits/${selectedUnitForDelete.businessUnitId}`);
            setBusinessUnits((prev) =>
                prev.filter((item) => item.businessUnitId !== selectedUnitForDelete.businessUnitId)
            );
            toast.success('Business Unit deleted successfully', { theme: 'colored' });
        } catch (error) {
            toast.error('Error deleting Business Unit!', { theme: 'colored' });
            console.error('Error deleting Business Unit:', error);
        }

        setShowDeleteModal(false);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${baseUrl}/businessunits/${selectedUnit.businessUnitId}`, selectedUnit);
            setToastShown(true);
            setShowEditModal(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error('Error updating Business Unit details!', { theme: 'colored' });
            console.error('Error updating Business Unit:', error);
        }
    };

    const handleToggle = (unit) => {
        const updatedStatus = unit.status === true ? false : true;
        setSelectedUnitForUpdate(unit);

        setConfirmationMessage(
            updatedStatus
                ? `Are you sure you want to enable this Business Unit?`
                : `Are you sure you want to disable this Business Unit?`
        );

        setShowConfirmModal(true);
    };

    const handleConfirmUpdate = async () => {
        if (!selectedUnitForUpdate) return;

        try {
            const updatedStatus = selectedUnitForUpdate.status === true ? false : true;

            await axios.put(`${baseUrl}/businessunits/${selectedUnitForUpdate.businessUnitId}`, {
                ...selectedUnitForUpdate,
                status: updatedStatus,
            });

            setBusinessUnits((prev) =>
                prev.map((item) =>
                    item.businessUnitId === selectedUnitForUpdate.businessUnitId
                        ? { ...item, status: updatedStatus }
                        : item
                )
            );

            toast.success(`Business Unit ${updatedStatus ? 'Enabled' : 'Disabled'}`, { theme: 'colored' });
        } catch (error) {
            toast.error('Error updating status!', { theme: 'colored' });
            console.error('Error toggling status:', error);
        }

        setShowConfirmModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/businessunits`);
                setBusinessUnits(response.data);
            } catch (error) {
                console.error('Error fetching Business Units:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            accessorKey: 'businessUnitId',
            header: 'Business Unit ID',
            meta: {
                headerProps: { className: 'pe-1 text-900' },
                cellProps: { className: 'py-2' },
            },
        },
        {
            accessorKey: 'businessUnit',
            header: 'Business Unit',
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
                        id={`status-toggle-${original.businessUnitId}`}
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
        data: businessUnits,
        columns,
        selection: true,
        sortable: true,
        pagination: true,
        perPage: 10,
    });

    const renderModalBodyContent = () => (
        <Form>
            <Form.Group controlId="formBusinessUnitId">
                <Form.Label>Business Unit ID</Form.Label>
                <Form.Control
                    disabled
                    type="text"
                    value={selectedUnit?.businessUnitId || ''}
                    onChange={(e) =>
                        setSelectedUnit({ ...selectedUnit, businessUnitId: e.target.value })
                    }
                    className="mb-3"
                />
            </Form.Group>
            <Form.Group controlId="formBusinessUnit">
                <Form.Label>Business Unit</Form.Label>
                <Form.Control
                    type="text"
                    value={selectedUnit?.businessUnit || ''}
                    onChange={(e) => setSelectedUnit({ ...selectedUnit, businessUnit: e.target.value })}
                    className="mb-3"
                />
            </Form.Group>
            <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Check
                    type="switch"
                    id="status-toggle"
                    checked={selectedUnit?.status === true}
                    onChange={(e) => setSelectedUnit({ ...selectedUnit, status: e.target.checked })}
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
                        headerTitle="Business Units"
                        onAdd={handleAddBusinessUnit}
                        onFilter={handleFilterBusinessUnits}
                        onExport={handleExportBusinessUnits}
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
                title="Edit Business Unit"
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

export default BusinessUnits;