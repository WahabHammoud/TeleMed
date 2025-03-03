
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User, Ambulance, Users, Heart, Home } from "lucide-react";
import { NotificationsPopover } from "@/components/NotificationsPopover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const Header = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('role, first_name, last_name')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    getProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out.",
      });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <Link to="/" className="flex items-center">
              <img src="/mediconnect-logo.png" alt="MediConnect Logo" className="h-9 mr-2" />
              <span className="text-xl font-bold text-medical-600">MediConnect</span>
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/home" className="text-gray-600 hover:text-medical-600 transition-colors">
              <Home className="h-4 w-4 inline-block mr-1" />
              Accueil
            </Link>
            <Link to="/appointments" className="text-gray-600 hover:text-medical-600 transition-colors">
              Rendez-vous
            </Link>
            <Link to="/consultations" className="text-gray-600 hover:text-medical-600 transition-colors">
              Consultations
            </Link>
            <Link to="/emergency" className="text-gray-600 hover:text-medical-600 transition-colors">
              <Ambulance className="h-4 w-4 inline-block mr-1" />
              Urgences
            </Link>
            <Link to="/events" className="text-gray-600 hover:text-medical-600 transition-colors">
              <Users className="h-4 w-4 inline-block mr-1" />
              Événements
            </Link>
            <Link to="/home-visits" className="text-gray-600 hover:text-medical-600 transition-colors">
              <Heart className="h-4 w-4 inline-block mr-1" />
              Visites à domicile
            </Link>
            <Link to="/community" className="text-gray-600 hover:text-medical-600 transition-colors">
              Communauté
            </Link>
          </nav>

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
                {userProfile?.role === 'admin' && (
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
                <DropdownMenuItem onClick={handleSignOut}>
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
