import React from "react";
import {ToastContainer} from "react-bootstrap";

interface ToastContainerProps {
    children: React.ReactNode;
}

const ToastContainerMessage: React.FC<ToastContainerProps> = ({children}) => {
    return (
        <ToastContainer position="middle-end" className="p-3" style={{ zIndex: 1 }}>
            {children}
        </ToastContainer>
    )
}

export default ToastContainerMessage;