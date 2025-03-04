
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Settings, HelpCircle, LogOut, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarSupportProps {
  onSignOut: () => Promise<void>;
  collapsed?: boolean;
}

export const SidebarSupport: React.FC<SidebarSupportProps> = ({ onSignOut, collapsed = false }) => {
  const location = useLocation();
  
  const supportLinks = [
    { path: "/settings", icon: Settings, label: "Paramètres" },
    { path: "/help", icon: HelpCircle, label: "Aide & Support" },
    { path: "/complaints", icon: AlertTriangle, label: "Réclamations" }
  ];
  
  return (
    <div className={cn("px-3 py-2", collapsed ? "px-1" : "")}>
      {!collapsed && (
        <h2 className="mb-2 px-4 text-lg font-semibold">Support</h2>
      )}
      <div className="space-y-1">
        {supportLinks.map((link) => {
          const Icon = link.icon;
          return collapsed ? (
            <TooltipProvider key={link.path}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={link.path}
                    className={cn(
                      "flex justify-center items-center rounded-lg p-2 transition-all hover:text-primary",
                      location.pathname === link.path ? "bg-slate-100 text-primary" : "text-gray-500"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {link.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                location.pathname === link.path ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
        {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onSignOut}
                  className="flex justify-center w-full items-center rounded-lg p-2 text-gray-500 transition-all hover:text-primary"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Déconnexion
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <button
            onClick={onSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        )}
      </div>
    </div>
  );
};
