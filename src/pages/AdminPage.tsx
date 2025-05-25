import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, UserPlus, Users, Activity } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function AdminPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    toast({
      title: "Administration",
      description: "Bienvenue dans le tableau de bord d'administration",
    });
  }, [toast]);

  // Get current path segment
  const currentTab = location.pathname.split('/')[2] || 'dashboard';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Tabs value={currentTab} className="space-y-8">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger 
              value="dashboard" 
              onClick={() => navigate('/admin/dashboard')}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="users"
              onClick={() => navigate('/admin/users')}
              disabled
            >
              <Users className="mr-2 h-4 w-4" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              onClick={() => navigate('/admin/stats')}
              disabled
            >
              <Activity className="mr-2 h-4 w-4" />
              Statistiques
            </TabsTrigger>
          </TabsList>
          
          {/* This renders the nested routes */}
          <Outlet />
        </Tabs>
      </div>
    </Layout>
  );
}