
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuButtonProps {
  onClick?: () => void;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="lg:hidden hover:bg-primary/10 transition-colors" 
      onClick={onClick}
    >
      <Menu className="h-6 w-6 text-primary" />
      <span className="sr-only">Toggle menu</span>
    </Button>
  );
};
