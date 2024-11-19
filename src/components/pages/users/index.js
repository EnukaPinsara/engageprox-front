import React, { useState, useEffect } from 'react';
import { Card, Dropdown, Form } from 'react-bootstrap';
import CardDropdown from 'components/common/CardDropdown';
import UsersTableHeader from 'components/app/users/UsersTableHeader';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import CustomModal from 'components/shared/CustomModal';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRoleStore } from 'components/shared/storage/storage';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [toastShown, setToastShown] = useState(false);
    const { roles, fetchRoles } = useRoleStore();

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    useEffect(() => {
        if (toastShown) {
            toast.success('User Role updated successfully', { theme: 'colored' });
            setToastShown(false);
        }
    }, [toastShown]);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${baseUrl}/user/UpdateUser/${selectedUser.employeeId}`, selectedUser);
            setToastShown(true);
            setShowEditModal(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error('Error updating user details!', { theme: 'colored' });
            console.error('Error updating user:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/user`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            accessorKey: 'employeeId',
            header: 'Employee ID',
            meta: {
                headerProps: { className: 'pe-1 text-900' },
                cellProps: {
                    className: 'py-2'
                }
            },
        },
        {
            accessorKey: 'fullName',
            header: 'Name',
            meta: {
                headerProps: { className: 'pe-1 text-900' },
                cellProps: {
                    className: 'py-2'
                }
            },
        },
        {
            accessorKey: 'role',
            header: 'User Role',
            meta: {
                headerProps: { className: 'pe-1 text-900' },
                cellProps: {
                    className: 'py-2'
                }
            },
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
                            <Dropdown.Item href="#!">Delete</Dropdown.Item>
                        </div>
                    </CardDropdown>
                );
            }
        }
    ];

    const table = useAdvanceTable({
        data: users,
        columns,
        selection: true,
        sortable: true,
        pagination: true,
        perPage: 10
    });

    const renderModalBodyContent = () => (
        <Form>
            <Form.Group controlId="formUserId">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                    disabled
                    type="text"
                    value={selectedUser?.employeeId || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, employeeId: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formUserName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    disabled
                    type="text"
                    value={selectedUser?.fullName || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, fullName: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formUserRole">
                <Form.Label>User Role</Form.Label>
                <Form.Select
                    value={selectedUser?.role || ''}
                    onChange={(e) =>
                        setSelectedUser({ ...selectedUser, role: e.target.value })
                    }
                    className="mb-3"
                >
                    <option value="" disabled>
                        Select a role
                    </option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.roleName}>
                            {role.roleName}
                        </option>
                    ))}
                </Form.Select>
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
                    <UsersTableHeader />
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
                title="Edit User"
                bodyContent={renderModalBodyContent()}
                buttons={modalButtons}
                bodyClassName="bg-body-tertiary"
            />
        </AdvanceTableProvider>
    );
};

export default Users;