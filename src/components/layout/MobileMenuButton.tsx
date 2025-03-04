
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarServices } from "./SidebarServices";
import { SidebarLogo } from "./SidebarLogo";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MobileMenuButton: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="py-4 border-b">
            <div className="px-4">
              <SidebarLogo />
            </div>
          </SheetHeader>
          <ScrollArea className="flex-1 py-2">
            <SidebarServices />
          </ScrollArea>
          <div className="p-4 border-t">
            <Button asChild variant="outline" className="w-full">
              <Link to="/shop/cart">
                Voir le panier
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
