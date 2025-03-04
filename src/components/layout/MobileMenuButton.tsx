
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const MobileMenuButton: React.FC = () => {
  return (
    <Button variant="ghost" size="icon" className="lg:hidden">
      <Menu className="h-6 w-6" />
    </Button>
  );
};
