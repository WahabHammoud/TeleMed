
import React from "react";

export const SidebarLogo: React.FC = () => {
  return (
    <div className="mb-4 px-4">
      <img 
        src="/mediconnect-logo.png" 
        alt="MediConnect Logo"
        className="h-10 mx-auto mb-2"
      />
      <div className="text-center text-xs text-muted-foreground">
        Votre santé, notre priorité
      </div>
    </div>
  );
};
