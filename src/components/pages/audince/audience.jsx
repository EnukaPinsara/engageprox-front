import React, { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import TitleHeader from 'components/app/title-header/title-header';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import paths from 'routes/paths';
export const sampleData = [
  {
    id: 1,
    name: 'Kamal Perera',
    email: 'kamal@example.com',
    department: 'Engineering'
  },
  {
    id: 2,
    name: 'Nimal Fernando',
    email: 'nimal@example.com',
    department: 'Marketing'
  },
  {
    id: 3,
    name: 'Amara Silva',
    email: 'amara@example.com',
    department: 'Sales'
  },
  {
    id: 4,
    name: 'Sunil De Silva',
    email: 'sunil@example.com',
    department: 'Finance'
  },
  {
    id: 5,
    name: 'Lakshmi Perera',
    email: 'lakshmi@example.com',
    department: 'Human Resources'
  },
  {
    id: 6,
    name: 'Saman Jayawardena',
    email: 'saman@example.com',
    department: 'Engineering'
  },
  {
    id: 7,
    name: 'Chandani Ratnayake',
    email: 'chandani@example.com',
    department: 'Customer Service'
  },
  {
    id: 8,
    name: 'Priyantha Rajapaksha',
    email: 'priyantha@example.com',
    department: 'Logistics'
  },
  {
    id: 9,
    name: 'Madhavi Wijesinghe',
    email: 'madhavi@example.com',
    department: 'Product Management'
  },
  {
    id: 10,
    name: 'Ruwan Gamage',
    email: 'ruwan@example.com',
    department: 'Legal'
  },
  {
    id: 11,
    name: 'Dilini Karunaratne',
    email: 'dilini@example.com',
    department: 'Quality Assurance'
  },
  {
    id: 12,
    name: 'Kasun Abeywardena',
    email: 'kasun@example.com',
    department: 'Operations'
  },
  {
    id: 13,
    name: 'Sarath Kumara',
    email: 'sarath@example.com',
    department: 'Procurement'
  },
  {
    id: 14,
    name: 'Manjula Wickramasinghe',
    email: 'manjula@example.com',
    department: 'IT Support'
  },
  {
    id: 15,
    name: 'Shanika Ekanayake',
    email: 'shanika@example.com',
    department: 'Administration'
  }
];

export const sampleColumns = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'department',
    header: 'Department'
  }
];

const Audience = () => {
  const [selectedAudience, setSelectedAudience] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const group = queryParams.get('group');

  useEffect(() => {
    if (group) {
      setSelectedAudience(group);
    }
  }, []);

  const table = useAdvanceTable({
    data: sampleData,
    columns: sampleColumns,
    selection: true,
    sortable: true,
    pagination: true,
    perPage: 10
  });

  const handleOnClickManageAudience = () => {
    navigate(paths.audienceSettings);
  };

  const handleSelectChange = value => {
    setSelectedAudience(value);
  };

  return (
    <>
      <div className="mb-4">
        <TitleHeader
          title="Audience"
          buttons={[
            {
              isPrimary: true,
              name: 'Manage Audience',
              icon: 'wrench',
              onClick: handleOnClickManageAudience
            }
          ]}
        >
          <Form.Group className="mb-3">
            <Form.Label>Selected Audience</Form.Label>
            <Form.Select
              value={selectedAudience}
              onChange={({ target: { value } }) => handleSelectChange(value)}
            >
              <option disabled>Select audience</option>
              <option value="All-Staff">All Staff</option>
              <option value="Marketing">Marketing</option>
            </Form.Select>
          </Form.Group>
        </TitleHeader>
      </div>
      <AdvanceTableProvider {...table}>
        <Card className="mb-3">
          <Card.Header>
            <h5>Employee list</h5>
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
    </>
  );
};

export default Audience;
