import React from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import IconButton from 'components/common/IconButton';
import { useAdvanceTableContext } from 'providers/AdvanceTableProvider';

const TableHeader = ({
    headerTitle = 'Items',
    onAdd,
    onFilter,
    onExport,
    showNewButton = true,
    showExportButton = true,
    showBulkActions = true,
    bulkActions = ['Refund', 'Delete', 'Archive'],
    onApply,
    buttons = [],
}) => {
    const { getSelectedRowModel } = useAdvanceTableContext();

    return (
        <Row className="flex-between-center">
            <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
                <h5 className="fs-9 mb-0 text-nowrap py-2 py-xl-0">{headerTitle}</h5>
            </Col>
            <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
                {getSelectedRowModel().rows.length > 0 && showBulkActions ? (
                    <div className="d-flex">
                        <Form.Select size="sm" aria-label="Bulk actions">
                            <option>Bulk Actions</option>
                            {bulkActions.map((action, index) => (
                                <option key={index} value={action.toLowerCase()}>
                                    {action}
                                </option>
                            ))}
                        </Form.Select>
                        {/* <Button type="button" variant="falcon-default" size="sm" className="ms-2">
                            Apply
                        </Button> */}
                        <Button
                            type="button"
                            variant="falcon-default"
                            size="sm"
                            className="ms-2"
                            onClick={() => {
                                const selectedAction = document.getElementById('bulkActionsSelect').value;
                                if (onApply) onApply(selectedAction);
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                ) : (
                    <div id="orders-actions">
                        {showNewButton && (
                            <IconButton
                                variant="falcon-default"
                                size="sm"
                                icon="plus"
                                transform="shrink-3"
                                className="mx-2"
                                onClick={onAdd}
                            >
                                <span className="d-none d-sm-inline-block ms-1">New</span>
                            </IconButton>
                        )}
                        {buttons.map(({ label, onClick, icon, variant = 'falcon-default' }, index) => (
                            <IconButton
                                key={index}
                                variant={variant}
                                size="sm"
                                icon={icon || 'filter'}
                                transform="shrink-3"
                                className="mx-2"
                                onClick={onClick}
                            >
                                <span className="d-none d-sm-inline-block ms-1">{label}</span>
                            </IconButton>
                        ))}
                        {showExportButton && (
                            <IconButton
                                variant="falcon-default"
                                size="sm"
                                icon="external-link-alt"
                                transform="shrink-3"
                                className="mx-2"
                                onClick={onExport}
                            >
                                <span className="d-none d-sm-inline-block ms-1">Export</span>
                            </IconButton>
                        )}
                    </div>
                )}
            </Col>
        </Row>
    );
};

export default TableHeader;