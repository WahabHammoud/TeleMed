
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
      {!collapsed && <h2 className="mb-3 px-4 text-lg font-semibold text-gray-700 flex items-center">Services</h2>}
      <div className="space-y-2">
        {serviceLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          
          if (collapsed) {
            return (
              <TooltipProvider key={link.path}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={link.path}
                      className={cn(
                        "flex justify-center items-center rounded-lg p-3 transition-all hover:text-primary",
                        isActive 
                          ? "bg-primary/10 text-primary shadow-sm" 
                          : "text-gray-600 hover:bg-primary/5"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
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
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:text-primary",
                isActive 
                  ? "bg-primary/10 text-primary font-medium shadow-sm" 
                  : "text-gray-600 hover:bg-primary/5"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
