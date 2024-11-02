import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomModal from 'components/shared/CustomModal';
import EntryOptionsContent from 'data/employees/create/EntryOptionsContent';
import BulkUpload from './BulkUpload';
import paths from 'routes/paths';

const EntryOptions = ({ show, onHide }) => {
    const [showBulkUpload, setShowBulkUpload] = useState(false);
    const navigate = useNavigate();

    const handleBulkUploadShow = () => {
        setShowBulkUpload(true);
        onHide();
        navigate(paths.addBulkEmployees);
    };

    const handleBulkUploadClose = () => {
        setShowBulkUpload(false);
        navigate(paths.employees);
    };

    const handleIndividualEntryShow = () => {
        onHide();
        navigate(paths.addIndividualEmployee);
    };

    return (
        <>
            <CustomModal
                show={show}
                handleClose={onHide}
                title="Choose Entry Type"
                bodyContent={
                    <EntryOptionsContent
                        handleBulkUploadShow={handleBulkUploadShow}
                        handleIndividualEntryShow={handleIndividualEntryShow}
                    />
                }
                buttons={[
                    {
                        label: 'Close',
                        variant: 'falcon-default',
                        onClick: onHide,
                    },
                ]}
            />

            <BulkUpload show={showBulkUpload} onHide={handleBulkUploadClose} />
        </>
    );
};

export default EntryOptions;
