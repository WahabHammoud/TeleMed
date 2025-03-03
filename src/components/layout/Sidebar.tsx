
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  MessageSquare,
  Video,
  Users,
  FileText,
  ShoppingBag,
  Settings,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  Ambulance,
  Heart,
  Home,
  AlertTriangle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
        
        if (error) {
          console.error('Error fetching profile:', error);
          
          // Try to determine role from user metadata as fallback
          const { data: authUser } = await supabase.auth.getUser();
          const metadata = authUser.user?.user_metadata;
          if (metadata && metadata.user_role) {
            setUserProfile({ 
              role: metadata.user_role,
              first_name: metadata.first_name,
              last_name: metadata.last_name
            });
            
            // Also try to fix the profile
            const { error: upsertError } = await supabase
              .from('profiles')
              .upsert({
                id: user.id,
                role: metadata.user_role,
                first_name: metadata.first_name,
                last_name: metadata.last_name
              });
              
            if (upsertError) {
              console.error('Error creating profile from metadata:', upsertError);
            }
          }
          return;
        }
        
        setUserProfile(data);
        
        // Log to help with debugging
        console.log('User profile loaded:', data);
      } catch (error) {
        console.error('Error in profile fetching:', error);
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

  const isAdmin = userProfile?.role === 'admin';
  
  // Add debug info to console
  useEffect(() => {
    console.log('Current user role:', userProfile?.role);
    console.log('Is admin?', isAdmin);
  }, [userProfile, isAdmin]);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r hidden lg:block pt-20">
      <nav className="p-4">
        <div className="space-y-4">
          <div className="px-3 py-2">
            <div className="mb-4 px-4">
              <img 
                src="/mediconnect-logo.png" 
                alt="MediConnect Logo"
                className="h-10 mx-auto mb-2"
              />
              <div className="text-center text-xs text-muted-foreground">
                Votre santé, notre priorité
              </div>
            </div>
            <h2 className="mb-2 px-4 text-lg font-semibold">Services</h2>
            <div className="space-y-1">
              <Link
                to="/home"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/home" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <Home className="h-4 w-4" />
                Accueil
              </Link>
              <Link
                to="/appointments"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/appointments" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <Calendar className="h-4 w-4" />
                Rendez-vous
              </Link>
              <Link
                to="/consultations"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/consultations" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <Video className="h-4 w-4" />
                Consultations
              </Link>
              <Link
                to="/emergency"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/emergency" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <Ambulance className="h-4 w-4" />
                Service d'urgence
              </Link>
              <Link
                to="/events"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/events" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <Users className="h-4 w-4" />
                Services pour événements
              </Link>
              <Link
                to="/home-visits"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/home-visits" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <Heart className="h-4 w-4" />
                Médecins à domicile
              </Link>
              <Link
                to="/messages"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/messages" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                Messages
              </Link>
              <Link
                to="/community"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/community" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <Users className="h-4 w-4" />
                Communauté
              </Link>
              <Link
                to="/documents"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/documents" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <FileText className="h-4 w-4" />
                Documents
              </Link>
              <Link
                to="/shop"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/shop" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                Boutique
              </Link>
            </div>
          </div>
          
          {isAdmin && (
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold">Administration</h2>
              <div className="space-y-1">
                <Link
                  to="/admin"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    location.pathname.startsWith("/admin") ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Admin Dashboard
                </Link>
              </div>
            </div>
          )}
          
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">Support</h2>
            <div className="space-y-1">
              <Link
                to="/settings"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/settings" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <Settings className="h-4 w-4" />
                Paramètres
              </Link>
              <Link
                to="/help"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/help" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                Aide & Support
              </Link>
              <Link
                to="/complaints"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  location.pathname === "/complaints" ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
                Réclamations
              </Link>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
