import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

const SessionExpiredPage: React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center">
                <FontAwesomeIcon icon={faClock} size="5x" className="text-warning mb-4" />
                <h1 className="display-4 fw-bold">Session Expired</h1>
                <p className="lead">You need to log in again to continue.</p>
                <Link to="/login" className="btn btn-primary mt-3">
                    <FontAwesomeIcon icon={faClock} className="mr-2" /> Log In Again
                </Link>
            </div>
        </div>
    );
}

export default SessionExpiredPage;
