import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, title, bodyContent, buttons, bodyClassName }) => {
    const modalBackdropStyle = {
        backdropFilter: 'blur(5px)'
    };

    return (
        <Modal show={show} onHide={handleClose} centered style={modalBackdropStyle}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body
                className={bodyClassName}
                style={{ maxHeight: '400px', overflowY: 'auto' }}
            >
                {bodyContent}
            </Modal.Body>
            {buttons && buttons.length > 0 && (
                <Modal.Footer>
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className={`btn btn-${button.variant || 'primary'} ${button.className || ''}`}
                            onClick={button.onClick}
                            type={button.type || 'button'}
                        >
                            {button.label}
                        </button>
                    ))}
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default CustomModal;
