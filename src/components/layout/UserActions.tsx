
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
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

interface UserActionsProps {
  isAdmin: boolean;
  onSignOut: () => Promise<void>;
}

export const UserActions: React.FC<UserActionsProps> = ({ isAdmin, onSignOut }) => {
  return (
    <div className="flex items-center space-x-4">
      <NotificationsPopover />
      <Link to="/shop/cart">
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/settings">Paramètres</Link>
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link to="/admin">Dashboard Admin</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link to="/help">Aide & Support</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/complaints">Réclamations</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onSignOut}>
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
