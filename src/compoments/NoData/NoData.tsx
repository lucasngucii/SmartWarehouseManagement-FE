import React from 'react';
import './NoData.css';

interface NoDataProps {
  message?: string;
}

export const NoData: React.FC<NoDataProps> = ({ message }) => {
  return (
    <div className="no-data-container">
      <p className="no-data-message">{message || "Không có dữ liệu!"}</p>
    </div>
  );
};