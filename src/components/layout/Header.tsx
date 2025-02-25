
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Menu, ShoppingCart, User } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <Link to="/" className="text-2xl font-bold text-medical-600">
              TeleMed
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/appointments" className="text-gray-600 hover:text-medical-600 transition-colors">
              Appointments
            </Link>
            <Link to="/consultations" className="text-gray-600 hover:text-medical-600 transition-colors">
              Consultations
            </Link>
            <Link to="/community" className="text-gray-600 hover:text-medical-600 transition-colors">
              Community
            </Link>
            <Link to="/shop" className="text-gray-600 hover:text-medical-600 transition-colors">
              Shop
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
