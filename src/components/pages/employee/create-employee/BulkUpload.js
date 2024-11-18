import React from 'react';
import CustomModal from 'components/shared/CustomModal';
import BulkUploadContent from 'data/employees/create/BulkUploadContent';
import axios from 'axios';
import { toast } from 'react-toastify';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const BulkUpload = ({ show, onHide }) => {

    const handleUploadSubmit = async (file) => {
        if (!file) {
            toast.error("No file selected for upload.", { theme: 'colored' });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(`${baseUrl}/user/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                params: {
                    isActive: true,
                },
            });

            if (response.status === 200) {
                toast.success(response.data.message || "File uploaded successfully!", { theme: 'colored' });
                onHide();
                window.location.reload();
            } else {
                toast.error(response.data.message || "File upload failed.", { theme: 'colored' });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during upload.", { theme: 'colored' });
            console.error("Error during file upload:", error);
        }
    };


    const buttons = [
        {
            label: 'Close',
            onClick: () => {
                onHide();
                window.location.reload();
            },
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