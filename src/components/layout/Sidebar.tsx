
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
  LayoutDashboard
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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r hidden lg:block pt-20">
      <nav className="p-4">
        <div className="space-y-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
            <div className="space-y-1">
              <Link
                to="/appointments"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-medical-600 ${
                  location.pathname === "/appointments" ? "bg-slate-100 text-medical-600 font-medium" : "text-gray-500"
                }`}
              >
                <Calendar className="h-4 w-4" />
                Appointments
              </Link>
              <Link
                to="/consultations"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-medical-600 ${
                  location.pathname === "/consultations" ? "bg-slate-100 text-medical-600 font-medium" : "text-gray-500"
                }`}
              >
                <Video className="h-4 w-4" />
                Consultations
              </Link>
              <Link
                to="/messages"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-medical-600 ${
                  location.pathname === "/messages" ? "bg-slate-100 text-medical-600 font-medium" : "text-gray-500"
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                Messages
              </Link>
              <Link
                to="/community"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-medical-600 ${
                  location.pathname === "/community" ? "bg-slate-100 text-medical-600 font-medium" : "text-gray-500"
                }`}
              >
                <Users className="h-4 w-4" />
                Community
              </Link>
              <Link
                to="/documents"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-medical-600 ${
                  location.pathname === "/documents" ? "bg-slate-100 text-medical-600 font-medium" : "text-gray-500"
                }`}
              >
                <FileText className="h-4 w-4" />
                Documents
              </Link>
              <Link
                to="/shop"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-medical-600 ${
                  location.pathname === "/shop" ? "bg-slate-100 text-medical-600 font-medium" : "text-gray-500"
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                Shop
              </Link>
            </div>
          </div>
          
          {userProfile?.role === 'admin' && (
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold">Admin</h2>
              <div className="space-y-1">
                <Link
                  to="/admin"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-medical-600 ${
                    location.pathname.startsWith("/admin") ? "bg-slate-100 text-medical-600 font-medium" : "text-gray-500"
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Admin Dashboard
                </Link>
              </div>
            </div>
          )}
          
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
            <div className="space-y-1">
              <Link
                to="/settings"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-medical-600 ${
                  location.pathname === "/settings" ? "bg-slate-100 text-medical-600 font-medium" : "text-gray-500"
                }`}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Link
                to="/help"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-medical-600 ${
                  location.pathname === "/help" ? "bg-slate-100 text-medical-600 font-medium" : "text-gray-500"
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </Link>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-medical-600"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
