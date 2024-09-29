import React from "react";
import {Toast} from "react-bootstrap";

interface ToastProps {
    message: string;
    type: "success" | "danger";
    setMessage: () => void;
}

const ToastMessage: React.FC<ToastProps> = ({type, message, setMessage}) => {
    return (
        <Toast
            onClose={() => setMessage()} show={message !== ""} delay={3000} autohide
            className="d-inline-block m-1"
            bg={type}
        >
            <Toast.Header>
                <strong className="me-auto">{type.toUpperCase()}</strong>
            </Toast.Header>
            <Toast.Body className={'text-white'}>
                {message}
            </Toast.Body>
        </Toast>
    )
}

export default ToastMessage;