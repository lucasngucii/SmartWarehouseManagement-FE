import {Spinner} from "react-bootstrap";

const SpinnerLoading: React.FC = () => {
    return (
        <div className={"d-flex justify-content-center align-items-center py-2"}>
            <Spinner animation="border" variant="primary" />
        </div>
    )
}

export default SpinnerLoading;