
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useSidebarProfile = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('role, first_name, last_name')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Error fetching profile:', error);
          
          // Try to determine role from user metadata as fallback
          const { data: authUser } = await supabase.auth.getUser();
          const metadata = authUser.user?.user_metadata;
          if (metadata && metadata.user_role) {
            setUserProfile({ 
              role: metadata.user_role,
              first_name: metadata.first_name,
              last_name: metadata.last_name
            });
            
            // Also try to fix the profile
            const { error: upsertError } = await supabase
              .from('profiles')
              .upsert({
                id: user.id,
                role: metadata.user_role,
                first_name: metadata.first_name,
                last_name: metadata.last_name
              });
              
            if (upsertError) {
              console.error('Error creating profile from metadata:', upsertError);
            }
          }
          return;
        }
        
        setUserProfile(data);
        
        // Log to help with debugging
        console.log('User profile loaded:', data);
      } catch (error) {
        console.error('Error in profile fetching:', error);
      }
    };
    
    getProfile();
  }, []);
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out.",
      });
    }
  };

  const isAdmin = userProfile?.role === 'admin';
  
  // Add debug info to console
  useEffect(() => {
    console.log('Current user role:', userProfile?.role);
    console.log('Is admin?', isAdmin);
  }, [userProfile, isAdmin]);

  return { userProfile, isAdmin, handleSignOut };
};
