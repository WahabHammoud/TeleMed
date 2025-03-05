
import React from "react";
import { Link } from "react-router-dom";

interface SidebarLogoProps {
  collapsed?: boolean;
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ collapsed = false }) => {
  return (
    <div className={`mb-4 px-4 ${collapsed ? 'text-center' : ''}`}>
      <Link to="/" className={`flex ${collapsed ? 'flex-col' : 'flex-col'} items-center`}>
        <img 
          src="/lovable-uploads/0db0dd53-2d90-4ed9-b30e-242032a996cd.png" 
          alt="MediConnect Logo"
          className={`${collapsed ? 'h-8 mx-auto mb-1' : 'h-10 mx-auto mb-2'}`}
        />
        {!collapsed && (
          <div className="text-center text-xs text-muted-foreground">
            Votre santé, notre priorité
          </div>
        )}
      </Link>
    </div>
  );
};
