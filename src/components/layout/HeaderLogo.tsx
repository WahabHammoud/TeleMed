
import React from "react";
import { Link } from "react-router-dom";

export const HeaderLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <img src="/mediconnect-logo.png" alt="MediConnect Logo" className="h-9 mr-2" />
      <span className="text-xl font-bold text-medical-600">MediConnect</span>
    </Link>
  );
};
