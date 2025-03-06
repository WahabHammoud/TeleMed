
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
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
        <h2 className="mb-2 px-4 text-lg font-semibold">Administration</h2>
      )}
      <div className="space-y-1">
        {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={adminLink.path}
                  className={cn(
                    "flex justify-center items-center rounded-lg p-2 transition-all hover:text-primary",
                    location.pathname.startsWith(adminLink.path) ? "bg-slate-100 text-primary" : "text-gray-500"
                  )}
                >
                  <adminLink.icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {adminLink.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Link
            to={adminLink.path}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
              location.pathname.startsWith(adminLink.path) ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
            )}
          >
            <adminLink.icon className="h-4 w-4" />
            {adminLink.label}
          </Link>
        )}
      </div>
    </div>
  );
};
