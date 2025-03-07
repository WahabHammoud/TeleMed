
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Ambulance, Users, Heart, Home, ShoppingBag, Calendar, Video, MessageSquare, FileText, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const NavigationLinks: React.FC = () => {
  const location = useLocation();
  
  const links = [
    { path: "/home", label: "Accueil", icon: Home },
    { path: "/appointments", label: "Rendez-vous", icon: Calendar },
    { path: "/consultations", label: "Consultations", icon: Video },
    { path: "/emergency", label: "Urgences", icon: Ambulance },
    { path: "/events", label: "Événements", icon: Users },
    { path: "/home-visits", label: "Visites à domicile", icon: Heart },
    { path: "/messages", label: "Messages", icon: MessageSquare },
    { path: "/shop", label: "Boutique", icon: ShoppingBag },
    { path: "/documents", label: "Documents", icon: FileText },
    { path: "/community", label: "Communauté", icon: Users },
  ];
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden xl:flex items-center space-x-6 py-2">
        {links.slice(0, 6).map((link) => {
          const Icon = link.icon;
          return (
            <Link 
              key={link.path}
              to={link.path} 
              className={cn(
                "flex items-center px-3 py-1.5 rounded-md hover:bg-primary/5 transition-colors whitespace-nowrap",
                isActive(link.path) 
                  ? "text-primary font-medium bg-primary/10" 
                  : "text-gray-600"
              )}
            >
              <Icon className="h-4 w-4 inline-block mr-1.5" />
              {link.label}
            </Link>
          );
        })}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-3 py-1.5 flex items-center hover:bg-primary/5 rounded-md">
              Plus
              <ChevronDown className="h-4 w-4 ml-1.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg p-1 border-gray-100">
            <ScrollArea className="h-[300px]">
              {links.slice(6).map((link) => {
                const Icon = link.icon;
                return (
                  <DropdownMenuItem key={link.path} asChild className="py-2">
                    <Link 
                      to={link.path} 
                      className="flex items-center w-full rounded-md hover:bg-primary/5"
                    >
                      <Icon className="h-4 w-4 mr-2 text-primary" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* Medium screen navigation with fewer items */}
      <nav className="hidden lg:flex xl:hidden items-center space-x-3 py-2">
        {links.slice(0, 4).map((link) => {
          const Icon = link.icon;
          return (
            <Link 
              key={link.path}
              to={link.path} 
              className={cn(
                "flex items-center px-2.5 py-1.5 rounded-md hover:bg-primary/5 transition-colors whitespace-nowrap",
                isActive(link.path) 
                  ? "text-primary font-medium bg-primary/10" 
                  : "text-gray-600"
              )}
            >
              <Icon className="h-4 w-4 inline-block mr-1" />
              {link.label}
            </Link>
          );
        })}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-2.5 py-1.5 flex items-center hover:bg-primary/5 rounded-md">
              Plus
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg p-1 border-gray-100">
            <ScrollArea className="h-[300px]">
              {links.slice(4).map((link) => {
                const Icon = link.icon;
                return (
                  <DropdownMenuItem key={link.path} asChild className="py-2">
                    <Link 
                      to={link.path} 
                      className="flex items-center w-full rounded-md hover:bg-primary/5"
                    >
                      <Icon className="h-4 w-4 mr-2 text-primary" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
};
