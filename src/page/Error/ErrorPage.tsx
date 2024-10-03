import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle, faHome} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

const ErrorPage: React.FC = () => {

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center">
                <FontAwesomeIcon icon={faExclamationTriangle} size="5x" className="text-warning mb-4"/>
                <h1 className="display-4 fw-bold">404 Not Found</h1>
                <p className="lead">The page you are looking for does not exist.</p>
                <Link to="/" className="btn btn-primary mt-3">
                    <FontAwesomeIcon icon={faHome} className="mr-2"/> Go Back to Home
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;
