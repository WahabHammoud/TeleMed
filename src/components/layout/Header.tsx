
import React from "react";
import { HeaderLogo } from "./HeaderLogo";
import { MobileMenuButton } from "./MobileMenuButton";
import { NavigationLinks } from "./NavigationLinks";
import { UserActions } from "./UserActions";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";

export const Header = () => {
  const { userProfile, isAdmin, handleSignOut } = useHeaderProfile();

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <MobileMenuButton />
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
