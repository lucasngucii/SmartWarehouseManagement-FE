import React from "react";
import "./OverLay.css";

interface OverLayProps {
  children: React.ReactNode;
  className?: string;
}

export const OverLay: React.FC<OverLayProps> = ({ children, className }) => {
  return (
    <div className={`container-overlay ${className}`}>
      {children}
    </div>
  );
};