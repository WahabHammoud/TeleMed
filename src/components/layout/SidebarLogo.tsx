
import React from "react";

export const SidebarLogo: React.FC = () => {
  return (
    <div className="mb-4 px-4">
      <img 
        src="/lovable-uploads/0db0dd53-2d90-4ed9-b30e-242032a996cd.png" 
        alt="MediConnect Logo"
        className="h-10 mx-auto mb-2"
      />
      <div className="text-center text-xs text-muted-foreground">
        Votre santé, notre priorité
      </div>
    </div>
  );
};
