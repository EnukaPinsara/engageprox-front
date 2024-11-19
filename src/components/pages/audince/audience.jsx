import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import TitleHeader from 'components/app/title-header/title-header';
import { useLocation, useNavigate } from 'react-router-dom';
import paths from 'routes/paths';
import { useAudienceStore, useEmployeeStore } from 'components/shared/storage/storage';

export const tableColumns = [
  {
    accessorKey: 'fullName',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'designation',
    header: 'Designation'
  },
  {
    accessorKey: 'department',
    header: 'Department'
  },
  {
    accessorKey: 'businessUnit',
    header: 'Business Unit'
  },
  {
    accessorKey: 'employeeType',
    header: 'Employee Type'
  },
];

const Audience = () => {
  const [selectedAudience, setSelectedAudience] = useState('All Staff');
  const [tableData, setTableData] = useState([]);
  const { audiences, fetchAudiences } = useAudienceStore();
  const { employees, fetchEmployees } = useEmployeeStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAudiences();
    fetchEmployees();
  }, [fetchAudiences, fetchEmployees]);

  useEffect(() => {
    if (selectedAudience === 'All Staff') {
      setTableData(employees);
    } else {
      setTableData([]);
    }
  }, [selectedAudience, employees]);

  const table = useAdvanceTable({
    data: tableData,
    columns: tableColumns,
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
      <Row className="g-3">
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
          <Form.Group className="mb-3 mt-3">
            <Form.Label>Current Audience</Form.Label>
            <Form.Select
              value={selectedAudience}
              onChange={({ target: { value } }) => handleSelectChange(value)}
            >
              <option disabled value="">
                Select audience
              </option>
              <option value="All Staff">All Staff</option>
              {audiences.map(audience => (
                <option key={audience.id} value={audience.audienc_e}>
                  {audience.audienc_e}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </TitleHeader>
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
      </Row>
    </>
  );
};

export default Audience;
