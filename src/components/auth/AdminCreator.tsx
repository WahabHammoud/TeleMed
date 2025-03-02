
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

export const AdminCreator = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Function to create the admin user - no longer called automatically
  const createAdminUser = async () => {
    setLoading(true);
    try {
      // Check if admin exists
      const { data } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .maybeSingle();
      
      // If admin already exists, just return
      if (data) {
        toast({
          title: "Admin Exists",
          description: "An admin user already exists in the system.",
        });
        return;
      }

      toast({
        title: "Admin Creation",
        description: "Admin creation is now handled through the signup form with an admin code.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred checking admin status",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if admin exists and create if needed
  const checkAndCreateAdmin = async () => {
    // This method now just checks if an admin exists
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'admin')
      .maybeSingle();
    
    // No longer automatically creating an admin
    // This is now handled through the signup form
    return !!data; // Return whether admin exists
  };

  return { checkAndCreateAdmin };
};
