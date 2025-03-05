
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  MessageSquare,
  Video,
  Users,
  FileText,
  ShoppingBag,
  Ambulance,
  Heart,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarServicesProps {
  collapsed?: boolean;
}

export const SidebarServices: React.FC<SidebarServicesProps> = ({ collapsed = false }) => {
  const location = useLocation();
  
  const serviceLinks = [
    { path: "/home", icon: Home, label: "Accueil" },
    { path: "/appointments", icon: Calendar, label: "Rendez-vous" },
    { path: "/consultations", icon: Video, label: "Consultations" },
    { path: "/emergency", icon: Ambulance, label: "Service d'urgence" },
    { path: "/events", icon: Users, label: "Services pour événements" },
    { path: "/home-visits", icon: Heart, label: "Médecins à domicile" },
    { path: "/messages", icon: MessageSquare, label: "Messages" },
    { path: "/community", icon: Users, label: "Communauté" },
    { path: "/documents", icon: FileText, label: "Documents" },
    { path: "/shop", icon: ShoppingBag, label: "Boutique" }
  ];
  
  return (
    <div className="px-3 py-2">
      {!collapsed && <h2 className="mb-2 px-4 text-lg font-semibold">Services</h2>}
      <div className="space-y-1">
        {serviceLinks.map((link) => {
          const Icon = link.icon;
          
          if (collapsed) {
            return (
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
            );
          }
          
          return (
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
      </div>
    </div>
  );
};
