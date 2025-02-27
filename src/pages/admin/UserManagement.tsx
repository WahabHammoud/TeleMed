
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Search, RefreshCw } from "lucide-react";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email?: string;
  is_doctor: boolean | null;
  role: string | null;
  created_at: string;
}

export function UserManagement() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      setProfiles(data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load users",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleUpdateRole = async (userId: string, isAdmin: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: isAdmin ? 'admin' : 'user' })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
      
      fetchProfiles();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user role",
      });
    }
  };

  const handleUpdateDoctorStatus = async (userId: string, isDoctor: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_doctor: isDoctor })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Doctor status updated successfully",
      });
      
      fetchProfiles();
    } catch (error) {
      console.error('Error updating doctor status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update doctor status",
      });
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (profile.first_name?.toLowerCase().includes(searchLower) || 
      profile.last_name?.toLowerCase().includes(searchLower) ||
      profile.role?.toLowerCase().includes(searchLower)) ?? false
    );
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>User Management</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" onClick={fetchProfiles}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">
                    {profile.first_name} {profile.last_name}
                  </TableCell>
                  <TableCell>
                    <Badge variant={profile.role === 'admin' ? "destructive" : "outline"}>
                      {profile.role || 'User'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={profile.is_doctor ? "default" : "secondary"}>
                      {profile.is_doctor ? 'Doctor' : 'Patient'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={profile.role === 'admin'}
                          onCheckedChange={(checked) => handleUpdateRole(profile.id, checked)}
                        />
                        <span className="text-sm">Admin</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={profile.is_doctor || false}
                          onCheckedChange={(checked) => handleUpdateDoctorStatus(profile.id, checked)}
                        />
                        <span className="text-sm">Doctor</span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
