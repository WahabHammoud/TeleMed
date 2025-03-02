
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

export const AdminCreator = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Function to create the admin user
  const createAdminUser = async () => {
    setLoading(true);
    try {
      // Sign up the admin user
      const { error: signUpError } = await supabase.auth.signUp({
        email: "wahab.hammoud2002@gmail.com",
        password: "admin123",
        options: {
          data: {
            first_name: "Admin",
            last_name: "User",
            user_type: "admin" as UserRole
          },
        },
      });

      if (signUpError) throw signUpError;

      // Create the admin profile
      const { data: userData } = await supabase.auth.getUser();
      const adminId = userData.user?.id;

      if (adminId) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: adminId,
            first_name: "Admin",
            last_name: "User",
            is_doctor: false,
            role: "admin" as UserRole
          });

        if (profileError) throw profileError;
      }

      toast({
        title: "Admin Created",
        description: "Admin user has been created successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred creating the admin",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if admin exists and create if needed
  const checkAndCreateAdmin = async () => {
    // Check if admin exists
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'admin')
      .maybeSingle();
    
    // If admin doesn't exist, create it
    if (!data) {
      createAdminUser();
    }
  };

  return { checkAndCreateAdmin };
};
