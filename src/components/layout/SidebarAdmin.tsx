
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarAdminProps {
  isAdmin: boolean;
  collapsed?: boolean;
}

export const SidebarAdmin: React.FC<SidebarAdminProps> = ({ isAdmin, collapsed = false }) => {
  const location = useLocation();
  
  if (!isAdmin) return null;
  
  // Make sure this path matches the one defined in App.tsx
  const adminLink = {
    path: "/admin",
    icon: LayoutDashboard,
    label: "Admin Dashboard"
  };
  
  return (
    <div className={cn("px-3 py-2", collapsed ? "px-1" : "")}>
      {!collapsed && (
        <h2 className="mb-3 px-4 text-lg font-semibold text-gray-700 flex items-center">
          <Shield className="h-4 w-4 mr-2 text-primary" />
          Administration
        </h2>
      )}
      <div className="space-y-2">
        {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={adminLink.path}
                  className={cn(
                    "flex justify-center items-center rounded-lg p-3 transition-all hover:text-primary",
                    location.pathname.startsWith(adminLink.path) 
                      ? "bg-primary/15 text-primary shadow-sm" 
                      : "text-gray-600 hover:bg-primary/5"
                  )}
                >
                  <adminLink.icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                {adminLink.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Link
            to={adminLink.path}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:text-primary",
              location.pathname.startsWith(adminLink.path) 
                ? "bg-primary/15 text-primary font-medium shadow-sm" 
                : "text-gray-600 hover:bg-primary/5"
            )}
          >
            <adminLink.icon className="h-5 w-5 flex-shrink-0" />
            <span>{adminLink.label}</span>
          </Link>
        )}
      </div>
    </div>
  );
};
