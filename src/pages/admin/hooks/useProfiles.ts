
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email?: string;
  is_doctor: boolean | null;
  role: UserRole | null;
  created_at: string;
}

export function useProfiles() {
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
      setProfiles(data || []);
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

  const handleUpdateRole = async (userId: string, isAdmin: boolean) => {
    try {
      const newRole: UserRole = isAdmin ? 'admin' : 'patient';
      
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
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
      const updates: {
        is_doctor: boolean;
        role?: UserRole;
      } = {
        is_doctor: isDoctor
      };
      
      // If toggling doctor status, also update the role if needed
      if (isDoctor) {
        updates.role = 'doctor';
      } else {
        // Get current profile to check if it's a doctor
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single();
          
        if (data?.role === 'doctor') {
          updates.role = 'patient';
        }
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
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
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      (profile.first_name?.toLowerCase().includes(searchLower) || 
      profile.last_name?.toLowerCase().includes(searchLower) ||
      profile.role?.toLowerCase().includes(searchLower)) ?? false
    );
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  return {
    profiles: filteredProfiles,
    loading,
    searchQuery,
    setSearchQuery,
    fetchProfiles,
    handleUpdateRole,
    handleUpdateDoctorStatus
  };
}
