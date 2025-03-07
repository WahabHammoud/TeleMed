
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationsPopover } from "@/components/NotificationsPopover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserActionsProps {
  isAdmin: boolean;
  onSignOut: () => Promise<void>;
}

export const UserActions: React.FC<UserActionsProps> = ({ isAdmin, onSignOut }) => {
  // This would normally come from a cart context or state
  const cartItemCount = 2;
  
  return (
    <div className="flex items-center space-x-1 sm:space-x-3">
      <NotificationsPopover />
      
      <Link to="/shop/cart">
        <Button variant="ghost" size="icon" className="relative text-gray-700 hover:bg-primary/5 hover:text-primary">
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-primary/5">
            <Avatar className="h-8 w-8 border-2 border-primary/10">
              <AvatarFallback className="bg-primary/5 text-primary">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg mt-1">
          <DropdownMenuLabel className="flex items-center gap-2 border-b pb-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/5 text-primary">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">Mon compte</span>
              <span className="text-xs text-gray-500">Utilisateur</span>
            </div>
          </DropdownMenuLabel>
          
          <div className="py-1">
            <DropdownMenuItem asChild className="cursor-pointer gap-2 py-2">
              <Link to="/settings">
                <Settings className="h-4 w-4 mr-1" />
                Paramètres
              </Link>
            </DropdownMenuItem>
            
            {isAdmin && (
              <DropdownMenuItem asChild className="cursor-pointer gap-2 py-2 text-primary">
                <Link to="/admin">
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                  Dashboard Admin
                </Link>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuItem asChild className="cursor-pointer gap-2 py-2">
              <Link to="/help">
                Aide & Support
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="cursor-pointer gap-2 py-2">
              <Link to="/complaints">
                Réclamations
              </Link>
            </DropdownMenuItem>
          </div>
          
          <DropdownMenuSeparator />
          
          <div className="py-1">
            <DropdownMenuItem onClick={onSignOut} className="cursor-pointer text-red-500 hover:text-red-600 gap-2 py-2">
              <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              Déconnexion
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
