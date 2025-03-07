
import React from "react";
import { Link } from "react-router-dom";

export const HeaderLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center group">
      <div className="relative overflow-hidden rounded-lg transition-all duration-300 mr-2">
        <img 
          src="/mediconnect-logo.png" 
          alt="MediConnect Logo" 
          className="h-10 transition-transform duration-300 group-hover:scale-110" 
          onError={(e) => {
            e.currentTarget.src = "/lovable-uploads/2e41f227-d6f4-4bca-a077-855c632ffa81.jpg";
            console.log("Falling back to uploaded logo");
          }}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          MediConnect
        </span>
        <span className="text-xs text-gray-500 hidden sm:block">Votre santé, notre priorité</span>
      </div>
    </Link>
  );
};
