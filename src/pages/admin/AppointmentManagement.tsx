
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw, Check, X } from "lucide-react";

interface Appointment {
  id: string;
  title: string;
  description: string | null;
  appointment_date: string;
  patient_id: string;
  doctor_id: string | null;
  status: string;
}

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  is_doctor: boolean | null;
}

export function AppointmentManagement() {
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

  useEffect(() => {
    fetchAppointments();
  }, []);

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Appointment Management</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" onClick={fetchAppointments}>
            <RefreshCw className="h-4 w-4" />
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
                <TableHead>Title</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    {appointment.title}
                  </TableCell>
                  <TableCell>
                    {getProfileName(appointment.patient_id)}
                  </TableCell>
                  <TableCell>
                    {appointment.doctor_id 
                      ? `Dr. ${getProfileName(appointment.doctor_id)}`
                      : 'Unassigned'}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{new Date(appointment.appointment_date).toLocaleDateString()}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(appointment.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-green-600"
                        onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}
                        disabled={appointment.status !== 'pending'}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleUpdateStatus(appointment.id, 'cancelled')}
                        disabled={appointment.status === 'cancelled' || appointment.status === 'completed'}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
