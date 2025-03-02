
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function useAdminStatus() {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useQuery({
    queryKey: ['admin-status'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log("No user found, redirecting to auth");
        navigate("/auth");
        return false;
      }
      
      // First try to check the profile
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      // Log to help with debugging
      console.log("Profile data:", data);
      console.log("Profile error:", error);
      
      if (error || (data && data.role !== 'admin')) {
        // If profile check fails, try to check user metadata as fallback
        const metadata = user.user_metadata;
        console.log("User metadata:", metadata);
        
        if (metadata && metadata.user_role === 'admin') {
          console.log("Admin role found in metadata");
          
          // Try to update the profile
          await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              role: 'admin',
              first_name: metadata.first_name,
              last_name: metadata.last_name
            });
            
          return true;
        }
        
        console.log("Not an admin, redirecting to home");
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have permission to access the admin dashboard."
        });
        navigate("/");
        return false;
      }
      
      console.log("Admin role confirmed in profile");
      return true;
    },
  });
}
