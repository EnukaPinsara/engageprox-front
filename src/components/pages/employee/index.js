import React, { useState, useEffect } from 'react';
import { Card, Dropdown, Form } from 'react-bootstrap';
import CardDropdown from 'components/common/CardDropdown';
import { Link } from 'react-router-dom';
import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';
import EmployeesTableHeader from 'components/app/employees/EmployeesTableHeader';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import CustomModal from 'components/shared/CustomModal';
import paths from 'routes/paths';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const Employees = () => {
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        if (toastShown) {
            toast.success('Employee details updated successfully', { theme: 'colored' });
            setToastShown(false);
        }
    }, [toastShown]);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${baseUrl}/user/UpdateUser/${selectedUser.userId}`, selectedUser);
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

    const confirmDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/user/${userToDelete.userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userToDelete.userId));
            toast.success('Employee deleted successfully', { theme: 'colored' });
        } catch (error) {
            toast.error('Error deleting employee!', { theme: 'colored' });
            console.error('Error deleting user:', error);
        }
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/user`);
                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            accessorKey: 'userName',
            header: 'Name',
            meta: {
                headerProps: { className: 'pe-1 text-900' },
                cellProps: {
                    className: 'py-2'
                }
            },
            cell: ({ row: { original } }) => {
                const { userName, profilePicture } = original;
                return (
                    <Link to={paths.employeeDetails.replace(':userId', original.userId)}>
                        <Flex alignItems="center">
                            {original.profilePicture ? (
                                <Avatar src={`data:image/jpeg;base64,${original.profilePicture}`} size="xl" className="me-2" />
                            ) : (
                                <Avatar size="xl" name={original.userName} className="me-2" />
                            )}
                            <div className="flex-1">
                                <h5 className="mb-0 fs-10">{original.userName}</h5>
                            </div>
                        </Flex>
                    </Link>
                );
            }
        },
        {
            accessorKey: 'email',
            header: 'Email',
            meta: {
                headerProps: { className: 'text-900' }
            },
            cell: ({ row: { original } }) => {
                const { email } = original;
                return <a href={`mailto:${email}`}>{email}</a>;
            }
        },
        {
            accessorKey: 'phoneNumber',
            header: 'Phone',
            meta: {
                headerProps: { className: 'text-900' }
            },
            cell: ({ row: { original } }) => {
                const { phoneNumber } = original;
                return <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>;
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
            accessorKey: 'joinedDate',
            header: 'Joined',
            meta: {
                headerProps: { className: 'text-900' }
            },
            cell: ({ row: { original } }) => {
                const { joinedDate } = original;
                return new Date(joinedDate).toLocaleDateString('en-GB');
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
                            <Dropdown.Item onClick={() => handleDeleteClick(original)}>Delete</Dropdown.Item>
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
            <Form.Group controlId="formUserName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={selectedUser?.userName || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, userName: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={selectedUser?.email || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="text"
                    value={selectedUser?.phoneNumber || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formBirthDate">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                    type="date"
                    value={selectedUser?.birthDate.slice(0, 10) || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, birthDate: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                    type="text"
                    value={selectedUser?.designation || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, designation: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formDepartment">
                <Form.Label>Department</Form.Label>
                <Form.Control
                    type="text"
                    value={selectedUser?.department || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, department: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formBusinessUnit">
                <Form.Label>Business Unit</Form.Label>
                <Form.Control
                    type="text"
                    value={selectedUser?.businessUnit || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, businessUnit: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formEmployeeType">
                <Form.Label>Employment Type</Form.Label>
                <Form.Control
                    type="text"
                    value={selectedUser?.employeeType || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, employeeType: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formImmediateSupervisor">
                <Form.Label>Immediate Supervisor</Form.Label>
                <Form.Control
                    type="text"
                    value={selectedUser?.immediateSupervisor || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, immediateSupervisor: e.target.value })}
                    className='mb-3'
                />
            </Form.Group>
            <Form.Group controlId="formJoinedDate">
                <Form.Label>Joined Date</Form.Label>
                <Form.Control
                    type="date"
                    value={selectedUser?.joinedDate.slice(0, 10) || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, joinedDate: e.target.value })}
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
                    <EmployeesTableHeader />
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
                title="Edit Employee"
                bodyContent={renderModalBodyContent()}
                buttons={modalButtons}
                bodyClassName="bg-body-tertiary"
            />
            <CustomModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                title="Delete Employee"
                bodyContent={<p>Are you sure you want to delete this employee?</p>}
                buttons={[
                    { label: 'Cancel', variant: 'secondary', onClick: () => setShowDeleteModal(false) },
                    { label: 'Delete', variant: 'danger', onClick: confirmDelete }
                ]}
                bodyClassName="bg-body-tertiary"
            />

        </AdvanceTableProvider>
    );
};

export default Employees;