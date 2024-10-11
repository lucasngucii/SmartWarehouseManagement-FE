import { Spinner } from "react-bootstrap";
import { OverLay } from "../OverLay/OverLay";
import React from "react";

const SpinnerLoadingOverLayer: React.FC = () => {
    return (
        <OverLay>
            <Spinner animation="border" variant="light" />
        </OverLay>
    )
}

export default SpinnerLoadingOverLayer;