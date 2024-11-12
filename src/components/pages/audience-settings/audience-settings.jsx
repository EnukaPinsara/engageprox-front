import React from 'react';
import { Card, Dropdown, Form } from 'react-bootstrap';
import TitleHeader from 'components/app/title-header/title-header';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths';
import CardDropdown from 'components/common/CardDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const sampleData = [
  { id: 1, title: 'Engineering Team', contacts: 1000, status: 'Active' },
  { id: 2, title: 'Marketing Team', contacts: 2000, status: 'Inactive' },
  { id: 3, title: 'Product Development', contacts: 1500, status: 'Active' },
  { id: 4, title: 'Finance Department', contacts: 800, status: 'Inactive' },
  { id: 5, title: 'Human Resources', contacts: 1200, status: 'Active' },
  { id: 6, title: 'Customer Service', contacts: 900, status: 'Inactive' },
  { id: 7, title: 'IT Support', contacts: 1300, status: 'Active' },
  { id: 8, title: 'Logistics Team', contacts: 1700, status: 'Inactive' },
  { id: 9, title: 'Quality Assurance', contacts: 1100, status: 'Active' },
  { id: 10, title: 'Operations Team', contacts: 950, status: 'Inactive' },
  { id: 11, title: 'Administration', contacts: 1600, status: 'Active' },
  { id: 12, title: 'Legal Department', contacts: 1400, status: 'Inactive' }
];

// Format contacts to display as "1k" if over 1000
const formattedData = sampleData.map(item => ({
  ...item,
  contacts:
    item.contacts >= 1000
      ? `${(item.contacts / 1000).toFixed(0)}k`
      : item.contacts
}));

const Audience = () => {
  const navigate = useNavigate();

  const columns = [
    { accessorKey: 'title', header: 'User Group Name' },
    { accessorKey: 'contacts', header: 'Contacts' },
    {
      accessorKey: 'status',
      header: 'Status'
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row: { original } }) => {
        return (
          <CardDropdown>
            <div className="py-2">
              <Dropdown.Item
                onClick={() => {
                  navigate('/settings/audience?group=Marketing');
                }}
              >
                View contacts
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate('/settings/audience/create-audience');
                }}
              >
                Add contacts
              </Dropdown.Item>
            </div>
          </CardDropdown>
        );
      }
    }
  ];

  const table = useAdvanceTable({
    data: formattedData,
    columns: columns,
    selection: true,
    sortable: true,
    pagination: true,
    perPage: 10
  });

  const handleOnClickManageAudience = () => {
    navigate('/settings/audience/create-audience');
  };

  return (
    <>
      <div className="mb-4">
        <TitleHeader
          title="Audience"
          buttons={[
            {
              isPrimary: true,
              name: 'Create Audience',
              icon: 'folder-plus',
              onClick: handleOnClickManageAudience
            }
          ]}
        >
          <div>Dynamic Selected Audience</div>
        </TitleHeader>
      </div>
      <AdvanceTableProvider {...table}>
        <Card className="mb-3">
          <Card.Header className="d-flex justify-content-between">
            <h5>Employee Groups</h5>
            <Form className="position-relative">
              <Form.Control
                type="search"
                placeholder="Search..."
                size="sm"
                aria-label="Search"
                className="rounded search-input ps-4"
                onChange={({ target }) => { }}
              />
              <FontAwesomeIcon
                icon="search"
                className="fs-10 text-400 position-absolute text-400 start-0 top-50 translate-middle-y ms-2"
              />
            </Form>
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
