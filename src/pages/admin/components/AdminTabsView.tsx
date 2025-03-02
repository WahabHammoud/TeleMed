
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, MessageSquare, ShoppingCart, BarChart2 } from "lucide-react";
import { UserManagement } from "../UserManagement";
import { PostModeration } from "../PostModeration";
import { AppointmentManagement } from "../AppointmentManagement";
import { ProductManagement } from "../ProductManagement";
import { Analytics } from "../Analytics";

interface AdminTabsViewProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export function AdminTabsView({ activeTab, setActiveTab }: AdminTabsViewProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-5 h-auto">
        <TabsTrigger value="overview" className="py-2">
          <BarChart2 className="h-4 w-4 mr-2" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="users" className="py-2">
          <Users className="h-4 w-4 mr-2" />
          Users
        </TabsTrigger>
        <TabsTrigger value="posts" className="py-2">
          <MessageSquare className="h-4 w-4 mr-2" />
          Posts
        </TabsTrigger>
        <TabsTrigger value="appointments" className="py-2">
          <Calendar className="h-4 w-4 mr-2" />
          Appointments
        </TabsTrigger>
        <TabsTrigger value="products" className="py-2">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Products
        </TabsTrigger>
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
  );
}
