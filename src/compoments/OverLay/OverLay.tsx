import React from "react";
import "./OverLay.css";

interface OverLayProps {
  children: React.ReactNode;
}

export const OverLay: React.FC<OverLayProps> = ({ children }) => {
  return (
    <div className="container-overlay">
      {children}
    </div>
  );
};