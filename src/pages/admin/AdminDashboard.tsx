
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "./UserManagement";
import { PostModeration } from "./PostModeration";
import { AppointmentManagement } from "./AppointmentManagement";
import { ProductManagement } from "./ProductManagement";
import { Analytics } from "./Analytics";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { PieChart, BarChart, Users, ShoppingCart, Calendar, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setLoading(true);
        
        // Check if user is logged in
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/auth");
          return;
        }
        
        // Check if user has admin role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (profile?.role !== 'admin') {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to access the admin dashboard."
          });
          navigate("/");
          return;
        }
        
        setIsAdmin(true);
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [navigate, toast]);

  if (loading) {
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
    return null; // Will redirect in useEffect
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
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+248</div>
              <p className="text-xs text-muted-foreground">+4% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+1,243</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Product Sales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$16,853</div>
              <p className="text-xs text-muted-foreground">+6% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="posts">Community Posts</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>
          <TabsContent value="posts" className="space-y-4">
            <PostModeration />
          </TabsContent>
          <TabsContent value="appointments" className="space-y-4">
            <AppointmentManagement />
          </TabsContent>
          <TabsContent value="products" className="space-y-4">
            <ProductManagement />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
