
import React from "react";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarServices } from "./SidebarServices";
import { SidebarAdmin } from "./SidebarAdmin";
import { SidebarSupport } from "./SidebarSupport";
import { useSidebarProfile } from "@/hooks/useSidebarProfile";

export const Sidebar = () => {
  const { isAdmin, handleSignOut } = useSidebarProfile();
  
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r hidden lg:block pt-20">
      <nav className="p-4">
        <div className="space-y-4">
          <div className="px-3 py-2">
            <SidebarLogo />
            <SidebarServices />
          </div>
          
          <SidebarAdmin isAdmin={isAdmin} />
          
          <SidebarSupport onSignOut={handleSignOut} />
        </div>
      </nav>
    </aside>
  );
};
