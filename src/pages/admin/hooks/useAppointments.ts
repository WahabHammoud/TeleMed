
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface Appointment {
  id: string;
  title: string;
  description: string | null;
  appointment_date: string;
  patient_id: string;
  doctor_id: string | null;
  status: string;
}

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  is_doctor: boolean | null;
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true });
      
      if (appointmentsError) throw appointmentsError;
      
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, is_doctor');
      
      if (profilesError) throw profilesError;
      
      setAppointments(appointmentsData);
      setProfiles(profilesData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load appointments",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appointmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Appointment status updated successfully",
      });
      
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update appointment status",
      });
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getProfileName = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    return profile 
      ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() 
      : 'Unknown User';
  };

  const filteredAppointments = appointments.filter(appointment => {
    const searchLower = searchQuery.toLowerCase();
    return (
      appointment.title.toLowerCase().includes(searchLower) || 
      (appointment.description && appointment.description.toLowerCase().includes(searchLower))
    );
  });

  return {
    appointments: filteredAppointments,
    profiles,
    loading,
    searchQuery,
    setSearchQuery,
    fetchAppointments,
    handleUpdateStatus,
    getProfileName
  };
}
