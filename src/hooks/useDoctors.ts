
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface Doctor {
  id: string;
  first_name: string | null;
  last_name: string | null;
  specialty: string | null;
  bio: string | null;
  years_of_experience: number | null;
  consultation_fee: number | null;
  medical_license_number: string | null;
  languages: string[] | null;
}

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('is_doctor', true);
        
        if (error) throw error;
        
        setDoctors(data || []);
      } catch (error: any) {
        console.error('Error fetching doctors:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load doctors: " + error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [toast]);

  return { doctors, loading };
}
