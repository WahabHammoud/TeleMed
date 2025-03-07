
import React from "react";
import { Link } from "react-router-dom";

interface SidebarLogoProps {
  collapsed?: boolean;
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ collapsed = false }) => {
  return (
    <div className={`px-4 ${collapsed ? 'text-center' : ''}`}>
      <Link to="/" className={`flex ${collapsed ? 'flex-col' : 'flex-col'} items-center group`}>
        <div className="relative overflow-hidden rounded-lg transition-all duration-300">
          <img 
            src="/mediconnect-logo.png" 
            alt="MediConnect Logo"
            className={`${collapsed ? 'h-8 mx-auto mb-1' : 'h-10 mx-auto mb-2'} transition-transform duration-300 group-hover:scale-110`}
            onError={(e) => {
              e.currentTarget.src = "/lovable-uploads/2e41f227-d6f4-4bca-a077-855c632ffa81.jpg";
              console.log("Falling back to uploaded logo");
            }}
          />
        </div>
        {!collapsed && (
          <div className="text-center">
            <div className="text-base font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              MediConnect
            </div>
            <div className="text-xs text-muted-foreground">
              Votre santé, notre priorité
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};
