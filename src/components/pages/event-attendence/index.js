import React, { useState, useEffect } from 'react';
import { Card, Form, Modal, Button, Row, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import TableHeader from 'components/shared/TableHeader';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import CardDropdown from 'components/common/CardDropdown';
import TitleHeader from 'components/app/title-header/title-header';
import paths from 'routes/paths';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const EventAttendence = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [currentFilter, setCurrentFilter] = useState(null);
    const [selectedEventQr, setSelectedEventQr] = useState([]);
    const [selectedParkingQr, setSelectedParkingQr] = useState([]);
    const [toastShown, setToastShown] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/eventParticipation`);
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    const applyFilters = () => {
        const filtered = users.filter(user => {
            const matchesEventQr =
                selectedEventQr !== null
                    ? selectedEventQr
                        ? !!user.eventQrCode
                        : !user.eventQrCode
                    : true;

            const matchesParkingQr =
                selectedParkingQr !== null
                    ? selectedParkingQr
                        ? !!user.parkingQrCode
                        : !user.parkingQrCode
                    : true;

            return matchesEventQr && matchesParkingQr;
        });

        setFilteredUsers(filtered);
        setShowFilterModal(false);
    };

    const handleApplyBulkAction = async (action) => {
        // if (action === 'add contacts') {
        //     const selectedRows = table.getSelectedRowModel().rows;
        //     const employeeIds = selectedRows.map(row => row.original.employeeId);

        //     try {
        //         await axios.post(`${baseUrl}/audiences/${audienceId}/add-contacts`, {
        //             audienceId,
        //             employeeIds,
        //         });
        //         toast.success('Contacts added successfully!');
        //     } catch (error) {
        //         console.error('Error adding contacts:', error);
        //         toast.error('Failed to add contacts. Please try again.');
        //     }
        // }
    };

    const renderModalBody = () => {
        switch (currentFilter) {
            case 'eventQr':
                return (
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Event QR Generated"
                            name="eventQr"
                            checked={selectedEventQr === true}
                            onChange={() => setSelectedEventQr(true)}
                        />
                        <Form.Check
                            type="radio"
                            label="Event QR Not Generated"
                            name="eventQr"
                            checked={selectedEventQr === false}
                            onChange={() => setSelectedEventQr(false)}
                        />
                    </Form.Group>
                );
            case 'parkingQr':
                return (
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Parking QR Generated"
                            name="parkingQr"
                            checked={selectedParkingQr === true}
                            onChange={() => setSelectedParkingQr(true)}
                        />
                        <Form.Check
                            type="radio"
                            label="Parking QR Not Generated"
                            name="parkingQr"
                            checked={selectedParkingQr === false}
                            onChange={() => setSelectedParkingQr(false)}
                        />
                    </Form.Group>
                );
            default:
                return <p>Please select a filter type.</p>;
        }
    };

    const columns = [
        {
            accessorKey: 'employeeId',
            header: 'Employee Id',
            meta: {
                headerProps: { className: 'ps-5 text-900' },
                cellProps: { className: 'ps-5' }
            }
        },
        {
            accessorKey: 'nic',
            header: 'NIC',
            meta: {
                headerProps: { className: 'ps-5 text-900' },
                cellProps: { className: 'ps-5' }
            }
        },
        {
            accessorKey: 'familyInclude',
            header: 'Family Included',
            meta: {
                headerProps: { className: 'ps-5 text-900' },
                cellProps: { className: 'ps-5' }
            },
            cell: ({ row: { original } }) => {
                return original.familyInclude ? 'Yes' : 'No';
            }
        },
        {
            accessorKey: 'vehicleNumber',
            header: 'Vehicle Number',
            meta: {
                headerProps: { className: 'ps-5 text-900' },
                cellProps: { className: 'ps-5' }
            }
        },
        {
            accessorKey: 'eventQrCode',
            header: 'Event QR Generated',
            meta: {
                headerProps: { className: 'ps-5 text-900' },
                cellProps: { className: 'text-center' }
            },
            cell: ({ row: { original } }) => {
                return original.eventQrCode ? (
                    <FaCheckCircle style={{ color: 'green' }} size={18} />
                ) : (
                    <FaTimesCircle style={{ color: 'red' }} size={18} />
                );
            }
        },
        {
            accessorKey: 'parkingQrCode',
            header: 'Parking QR Generated',
            meta: {
                headerProps: { className: 'ps-5 text-900' },
                cellProps: { className: 'text-center' }
            },
            cell: ({ row: { original } }) => {
                return original.parkingQrCode ? (
                    <FaCheckCircle style={{ color: 'green' }} size={18} />
                ) : (
                    <FaTimesCircle style={{ color: 'red' }} size={18} />
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
                            <Dropdown.Item onClick={() => handleEdit(original)}>Send Event QR</Dropdown.Item>
                            <Dropdown.Item href="#!">Send Parking QR</Dropdown.Item>
                        </div>
                    </CardDropdown>
                );
            }
        }
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
                    title="Event Attendees"
                    buttons={[
                        {
                            isPrimary: false,
                            icon: 'arrow-left',
                            name: 'Go Back',
                            onClick: () => navigate(paths.events),
                        }
                    ]}
                >
                </TitleHeader>
                <AdvanceTableProvider {...table}>
                    <Card className="mb-3">
                        <Card.Header>
                            <TableHeader
                                headerTitle="Employees Registered for the Event"
                                showNewButton={false}
                                showExportButton={false}
                                // onApply={handleApplyBulkAction}
                                buttons={[
                                    {
                                        label: 'Filter by Event QR',
                                        onClick: () => {
                                            setCurrentFilter('eventQr');
                                            setShowFilterModal(true);
                                        },
                                        icon: 'filter',
                                    },
                                    {
                                        label: 'Filter by Parking QR',
                                        onClick: () => {
                                            setCurrentFilter('parkingQr');
                                            setShowFilterModal(true);
                                        },
                                        icon: 'filter',
                                    },
                                ]}
                                bulkActions={['Generate Event QR', ' Generate Parking QR']}
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
                    <Modal.Title>Filter Participants</Modal.Title>
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

export default EventAttendence; 