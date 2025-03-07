
import React from "react";
import { Link } from "react-router-dom";

export const HeaderLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/mediconnect-logo.png" 
        alt="MediConnect Logo" 
        className="h-9 mr-2" 
        onError={(e) => {
          e.currentTarget.src = "/lovable-uploads/2e41f227-d6f4-4bca-a077-855c632ffa81.jpg";
          console.log("Falling back to uploaded logo");
        }}
      />
      <span className="text-xl font-bold text-primary">MediConnect</span>
    </Link>
  );
};
