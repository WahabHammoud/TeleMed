
import React from "react";
import { HeaderLogo } from "./HeaderLogo";
import { MobileMenuButton } from "./MobileMenuButton";
import { NavigationLinks } from "./NavigationLinks";
import { UserActions } from "./UserActions";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps = {}) => {
  const { userProfile, isAdmin, handleSignOut } = useHeaderProfile();

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-white to-blue-50 backdrop-blur-md border-b shadow-sm z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <MobileMenuButton onClick={onMenuToggle} />
            <HeaderLogo />
          </div>
          
          <NavigationLinks />

          <UserActions 
            isAdmin={isAdmin} 
            onSignOut={handleSignOut} 
          />
        </div>
      </div>
    </header>
  );
};
