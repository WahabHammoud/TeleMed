
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useAdminStats(isAdmin: boolean | undefined) {
  return useQuery({
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
}
