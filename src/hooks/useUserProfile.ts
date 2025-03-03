
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useUserProfile(session: any) {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      if (!session?.user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          
          // Try to create profile from metadata as fallback
          const metadata = session.user.user_metadata;
          if (metadata) {
            const userRole = metadata.user_role || 'patient';
            
            const newProfile = {
              id: session.user.id,
              first_name: metadata.first_name,
              last_name: metadata.last_name,
              role: userRole
            };
            
            const { error: upsertError, data: profileData } = await supabase
              .from('profiles')
              .upsert(newProfile)
              .select()
              .single();
            
            if (!upsertError && profileData) {
              setUserProfile(profileData);
            } else {
              console.error('Error creating profile:', upsertError);
              // Use metadata as profile
              setUserProfile({
                ...newProfile,
                // Add any other needed fields with defaults
              });
            }
          }
        } else {
          setUserProfile(data);
        }
      } catch (error) {
        console.error('Error in profile fetching:', error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [session]);

  return { userProfile, loading };
}
