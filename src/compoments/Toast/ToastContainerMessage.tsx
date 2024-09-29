import React from "react";
import {ToastContainer} from "react-bootstrap";
import {ToastPosition} from "react-bootstrap/ToastContainer";

interface ToastContainerProps {
    children: React.ReactNode;
    position?: ToastPosition;
}

const ToastContainerMessage: React.FC<ToastContainerProps> = ({children, position}) => {
    return (
        <ToastContainer position={position ? position : "middle-end"} className="p-3" style={{ zIndex: 3000 }}>
            {children}
        </ToastContainer>
    )
}

export default ToastContainerMessage;