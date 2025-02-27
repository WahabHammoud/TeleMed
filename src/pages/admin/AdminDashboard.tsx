
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { UserManagement } from "./UserManagement";
import { PostModeration } from "./PostModeration";
import { AppointmentManagement } from "./AppointmentManagement";
import { ProductManagement } from "./ProductManagement";
import { Analytics } from "./Analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, MessageSquare, ShoppingCart } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ['admin-status'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return false;
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error || data?.role !== 'admin') {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard."
        });
        navigate("/");
        return false;
      }
      
      return true;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // Get user count
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      // Get appointment count
      const { count: appointmentCount } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true });
      
      // Get post count
      const { count: postCount } = await supabase
        .from('community_posts')
        .select('*', { count: 'exact', head: true });
      
      // Get product count
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });
      
      return {
        userCount: userCount || 0,
        appointmentCount: appointmentCount || 0,
        postCount: postCount || 0,
        productCount: productCount || 0
      };
    },
    enabled: !!isAdmin
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in query function
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your platform and users
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.userCount || "--"}</div>
              <p className="text-xs text-muted-foreground">Patients and doctors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.appointmentCount || "--"}</div>
              <p className="text-xs text-muted-foreground">Total appointments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.postCount || "--"}</div>
              <p className="text-xs text-muted-foreground">User discussions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.productCount || "--"}</div>
              <p className="text-xs text-muted-foreground">Items in your shop</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
            <TabsTrigger value="users" className="py-2">Users</TabsTrigger>
            <TabsTrigger value="posts" className="py-2">Posts</TabsTrigger>
            <TabsTrigger value="appointments" className="py-2">Appointments</TabsTrigger>
            <TabsTrigger value="products" className="py-2">Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Analytics />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="posts">
            <PostModeration />
          </TabsContent>
          
          <TabsContent value="appointments">
            <AppointmentManagement />
          </TabsContent>
          
          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
