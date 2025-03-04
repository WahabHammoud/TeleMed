
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { SidebarServices } from "./SidebarServices";
import { SidebarLogo } from "./SidebarLogo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export const MobileMenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // This would normally come from a cart context
  const cartItemCount = 2;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="py-4 border-b">
            <div className="px-4 flex items-center justify-between">
              <SidebarLogo />
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>
          <ScrollArea className="flex-1 py-2">
            <SidebarServices />
          </ScrollArea>
          <div className="p-4 border-t">
            <Button asChild variant="default" className="w-full mb-2">
              <Link to="/shop/cart" onClick={() => setIsOpen(false)}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Voir le panier
                {cartItemCount > 0 && (
                  <Badge variant="outline" className="ml-2 bg-white text-primary">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
