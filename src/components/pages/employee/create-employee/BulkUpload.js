import React from 'react';
import CustomModal from 'components/shared/CustomModal';
import BulkUploadContent from 'data/employees/create/BulkUploadContent';

const BulkUpload = ({ show, onHide }) => {
    const handleUploadSubmit = (file) => {
        console.log('File to upload:', file);
        onHide();
    };

    const buttons = [
        {
            label: 'Close',
            onClick: onHide,
            variant: 'falcon-default',
        },
    ];

    return (
        <CustomModal
            show={show}
            handleClose={onHide}
            title="Bulk Upload"
            bodyContent={<BulkUploadContent onSubmit={handleUploadSubmit} />}
            buttons={buttons}
        />
    );
};

export default BulkUpload;
