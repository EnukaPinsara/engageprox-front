// import React, { useEffect, useState } from 'react';
// import { Card, Col, Form, Row } from 'react-bootstrap';
// import AdvanceTable from 'components/common/advance-table/AdvanceTable';
// import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
// import useAdvanceTable from 'hooks/useAdvanceTable';
// import AdvanceTableProvider from 'providers/AdvanceTableProvider';
// import TitleHeader from 'components/app/title-header/title-header';
// import { useLocation, useNavigate } from 'react-router-dom';
// import paths from 'routes/paths';
// import { useAudienceStore, useEmployeeStore } from 'components/shared/storage/storage';

// export const tableColumns = [
//     {
//         accessorKey: 'fullName',
//         header: 'Name'
//     },
//     {
//         accessorKey: 'email',
//         header: 'Email'
//     },
//     {
//         accessorKey: 'designation',
//         header: 'Designation'
//     },
//     {
//         accessorKey: 'department',
//         header: 'Department'
//     },
//     {
//         accessorKey: 'businessUnit',
//         header: 'Business Unit'
//     },
//     {
//         accessorKey: 'employeeType',
//         header: 'Employee Type'
//     },
// ];

// const Audience = () => {
//     const [selectedAudience, setSelectedAudience] = useState('All Staff');
//     const [tableData, setTableData] = useState([]);
//     const { audiences, fetchAudiences } = useAudienceStore();
//     const { employees, fetchEmployees } = useEmployeeStore();
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchAudiences();
//         fetchEmployees();
//     }, [fetchAudiences, fetchEmployees]);

//     useEffect(() => {
//         if (selectedAudience === 'All Staff') {
//             setTableData(employees);
//         } else {
//             setTableData([]);
//         }
//     }, [selectedAudience, employees]);

//     const table = useAdvanceTable({
//         data: tableData,
//         columns: tableColumns,
//         selection: true,
//         sortable: true,
//         pagination: true,
//         perPage: 10
//     });

//     const handleOnClickManageAudience = () => {
//         navigate(paths.audienceSettings);
//     };

//     const handleSelectChange = value => {
//         setSelectedAudience(value);
//     };

//     return (
//         <>
//             <Row className="g-3">
//                 <TitleHeader
//                     title="Add Contacts"
//                     buttons={[
//                         {
//                             isPrimary: false,
//                             icon: 'arrow-left',
//                             name: 'Go Back',
//                             onClick: handleOnClickManageAudience
//                         }
//                     ]}
//                 >
//                     <Form.Group className="mb-3">
//                         <Form.Label>Selected Audience</Form.Label>
//                         <Form.Select
//                             value={selectedAudience}
//                             onChange={({ target: { value } }) => handleSelectChange(value)}
//                         >
//                             <option disabled value="">
//                                 Select audience
//                             </option>
//                             <option value="All Staff">All Staff</option>
//                             {audiences.map(audience => (
//                                 <option key={audience.id} value={audience.audienc_e}>
//                                     {audience.audienc_e}
//                                 </option>
//                             ))}
//                         </Form.Select>
//                     </Form.Group>
//                 </TitleHeader>
//                 <AdvanceTableProvider {...table}>
//                     <Card className="mb-3">
//                         <Card.Header>
//                             <h5>Employee list</h5>
//                         </Card.Header>
//                         <Card.Body className="p-0">
//                             <AdvanceTable
//                                 headerClassName="bg-200 text-nowrap align-middle"
//                                 rowClassName="align-middle white-space-nowrap"
//                                 tableProps={{
//                                     size: 'sm',
//                                     striped: true,
//                                     className: 'fs-10 mb-0 overflow-hidden'
//                                 }}
//                             />
//                         </Card.Body>
//                         <Card.Footer>
//                             <AdvanceTablePagination />
//                         </Card.Footer>
//                     </Card>
//                 </AdvanceTableProvider>
//             </Row>
//         </>
//     );
// };

// export default Audience;


import React, { useState, useEffect } from 'react';
import { Card, Dropdown, Form } from 'react-bootstrap';
import CardDropdown from 'components/common/CardDropdown';
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

const AddContacts = () => {
    const [users, setUsers] = useState([]);
    const [toastShown, setToastShown] = useState(false);

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
        data: users,
        columns,
        selection: true,
        sortable: true,
        pagination: true,
        perPage: 10
    });

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
        </AdvanceTableProvider>
    );
};

export default AddContacts;