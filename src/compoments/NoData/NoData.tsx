import React from 'react';
import './NoData.css';
import {faBoxOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const NoData: React.FC = () => {
  return (
    <div className="no-data-container">
        <div className={"d-flex flex-column justify-content-center align-items-center gap-3 text-secondary"}>
            <FontAwesomeIcon icon={faBoxOpen} size={"2x"} />
            <p>NO DATA</p>
        </div>
    </div>
  );
};