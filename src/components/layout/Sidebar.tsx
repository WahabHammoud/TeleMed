
import React, { useState } from "react";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarServices } from "./SidebarServices";
import { SidebarAdmin } from "./SidebarAdmin";
import { SidebarSupport } from "./SidebarSupport";
import { useSidebarProfile } from "@/hooks/useSidebarProfile";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ open, onClose }: SidebarProps = {}) => {
  const { isAdmin, handleSignOut } = useSidebarProfile();
  const [collapsed, setCollapsed] = useState(false);
  const isOpen = open !== undefined ? open : true;
  
  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen transition-all duration-300 z-40 shadow-lg",
      "bg-gradient-to-b from-blue-50 via-white to-blue-50 border-r",
      "lg:flex flex-col",
      collapsed ? "w-20" : "w-64",
      isOpen ? "lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="h-20 flex items-center justify-between border-b px-4 bg-white/90 backdrop-blur-sm">
        <SidebarLogo collapsed={collapsed} />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto text-primary hover:bg-primary/10 hover:text-primary-foreground", 
            !collapsed ? "" : "mx-auto")}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <nav className={cn("p-4", collapsed ? "px-2" : "")}>
          <div className="space-y-6">
            <SidebarServices collapsed={collapsed} />
            
            {isAdmin && (
              <SidebarAdmin isAdmin={isAdmin} collapsed={collapsed} />
            )}
            
            <SidebarSupport onSignOut={handleSignOut} collapsed={collapsed} />
          </div>
        </nav>
      </ScrollArea>
    </aside>
  );
};
