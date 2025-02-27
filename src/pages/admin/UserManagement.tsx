
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { UserPlus, MoreHorizontal, Search, RefreshCw, Shield, User } from "lucide-react";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email?: string;
  is_doctor: boolean | null;
  specialty: string | null;
  role: string | null;
  created_at: string;
}

export function UserManagement() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { toast } = useToast();

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      
      // Get all profiles from the profiles table
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (profilesError) throw profilesError;
      
      // Get users from auth.users (this would require service role in production)
      // For demo purposes, we'll simulate this with the profiles we have
      const enhancedProfiles = profilesData.map(profile => ({
        ...profile,
        email: `user_${profile.id.substring(0, 6)}@example.com` // Simulated email
      }));
      
      setProfiles(enhancedProfiles);
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

  const handleUpdateUser = async (userId: string, updates: Partial<Profile>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "User updated successfully",
      });
      
      fetchProfiles();
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user",
      });
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (profile.first_name?.toLowerCase().includes(searchLower) || 
      profile.last_name?.toLowerCase().includes(searchLower) ||
      profile.email?.toLowerCase().includes(searchLower) ||
      profile.role?.toLowerCase().includes(searchLower)) ?? false
    );
  });

  return (
    <>
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
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
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
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">
                      {profile.first_name} {profile.last_name}
                    </TableCell>
                    <TableCell>{profile.email}</TableCell>
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
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            setSelectedUser(profile);
                            setOpenEditDialog(true);
                          }}>
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Disable Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">First Name</label>
                <Input
                  className="col-span-3"
                  value={selectedUser.first_name || ''}
                  onChange={(e) => 
                    setSelectedUser({ ...selectedUser, first_name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Last Name</label>
                <Input
                  className="col-span-3"
                  value={selectedUser.last_name || ''}
                  onChange={(e) => 
                    setSelectedUser({ ...selectedUser, last_name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Email</label>
                <Input
                  className="col-span-3"
                  value={selectedUser.email || ''}
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Role</label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch 
                    checked={selectedUser.role === 'admin'}
                    onCheckedChange={(checked) => 
                      setSelectedUser({ ...selectedUser, role: checked ? 'admin' : 'user' })
                    }
                  />
                  <span>Admin Access</span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Type</label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch 
                    checked={selectedUser.is_doctor || false}
                    onCheckedChange={(checked) => 
                      setSelectedUser({ ...selectedUser, is_doctor: checked })
                    }
                  />
                  <span>Doctor Account</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (selectedUser) {
                  handleUpdateUser(selectedUser.id, {
                    first_name: selectedUser.first_name,
                    last_name: selectedUser.last_name,
                    role: selectedUser.role,
                    is_doctor: selectedUser.is_doctor
                  });
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
