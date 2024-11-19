import React, { useEffect, useState } from 'react';
import { Card, Dropdown, Form } from 'react-bootstrap';
import TitleHeader from 'components/app/title-header/title-header';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTablePagination from 'components/common/advance-table/AdvanceTablePagination';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { useNavigate } from 'react-router-dom';
import CardDropdown from 'components/common/CardDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAudienceStore } from 'components/shared/storage/storage';
import paths from 'routes/paths';

const Audience = () => {
  const navigate = useNavigate();
  const { audiences, fetchAudiences } = useAudienceStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchAudiences();
  }, [fetchAudiences]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = audiences.filter((item) =>
        item.audienc_e.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else if (audiences?.length) {
      setFilteredData(audiences);
    }
  }, [audiences, searchQuery]);

  const columns = [
    { accessorKey: 'audienc_e', header: 'Audience' },
    {
      accessorKey: 'descrption',
      header: 'Description'
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
                  navigate(`/settings/audience?group=${original.audienc_e}`);
                }}
              >
                View contacts
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate(paths.addContact, {
                    state: { audienceId: original.audienceId, audienc_e: original.audienc_e }
                  });
                }}
              >
                Add contacts
              </Dropdown.Item>
            </div>
          </CardDropdown >
        );
      }
    }
  ];

  const table = useAdvanceTable({
    data: filteredData,
    columns: columns,
    selection: true,
    sortable: true,
    pagination: true,
    perPage: 10
  });

  const handleOnClickManageAudience = () => {
    navigate(paths.audienceCreate);
  };

  const handleDiscard = () => {
    navigate(paths.audience);
  };

  return (
    <>
      <div className="mb-3">
        <TitleHeader
          title="Audience"
          buttons={[
            {
              isPrimary: true,
              name: 'Create Audience',
              icon: 'folder-plus',
              onClick: handleOnClickManageAudience
            },
            {
              isPrimary: false,
              name: 'Discard',
              onClick: handleDiscard
            }
          ]}
        />
      </div>
      <AdvanceTableProvider {...table}>
        <Card className="mb-3">
          <Card.Header className="d-flex justify-content-between">
            <h5>Employee Groups</h5>
            <Form className="position-relative" id="test">
              <Form.Control
                type="search"
                placeholder="Search..."
                size="sm"
                aria-label="Search"
                className="rounded search-input ps-4"
                onChange={({ target }) => setSearchQuery(target.value)}
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