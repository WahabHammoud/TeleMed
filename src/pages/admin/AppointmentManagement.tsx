
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Search, RefreshCw, Check, X, Calendar as CalendarIcon, Clock } from "lucide-react";

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
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true });
      
      if (appointmentsError) throw appointmentsError;
      
      // Get profiles for patient and doctor names
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

  const handleUpdateAppointment = async (appointmentId: string, updates: Partial<Appointment>) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', appointmentId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Appointment updated successfully",
      });
      
      fetchAppointments();
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update appointment",
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
    const matchesSearch = 
      appointment.title.toLowerCase().includes(searchLower) || 
      (appointment.description && appointment.description.toLowerCase().includes(searchLower));
    
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    
    const matchesDate = !filterDate || new Date(appointment.appointment_date).toDateString() === filterDate.toDateString();
    
    return matchesSearch && matchesStatus && matchesDate;
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
    <>
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
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <div className="grid gap-1.5">
                <label className="text-sm font-medium">Filter by date</label>
                <Calendar
                  mode="single"
                  selected={filterDate}
                  onSelect={setFilterDate}
                  className="rounded border p-1"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium">Status</label>
              <Select 
                value={filterStatus} 
                onValueChange={setFilterStatus}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {filterDate && (
              <Button 
                variant="ghost" 
                size="sm"
                className="mt-6"
                onClick={() => setFilterDate(undefined)}
              >
                Clear date
              </Button>
            )}
          </div>
          
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
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setEditDialogOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-green-600"
                          onClick={() => handleUpdateAppointment(appointment.id, { status: 'confirmed' })}
                          disabled={appointment.status !== 'pending'}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleUpdateAppointment(appointment.id, { status: 'cancelled' })}
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

      {/* Edit Appointment Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>
              Update appointment details and status
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Title</label>
                <Input
                  className="col-span-3"
                  value={selectedAppointment.title}
                  onChange={(e) => 
                    setSelectedAppointment({ ...selectedAppointment, title: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Description</label>
                <Textarea
                  className="col-span-3"
                  value={selectedAppointment.description || ''}
                  onChange={(e) => 
                    setSelectedAppointment({ ...selectedAppointment, description: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Patient</label>
                <Input
                  className="col-span-3"
                  value={getProfileName(selectedAppointment.patient_id)}
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm">Status</label>
                <Select 
                  value={selectedAppointment.status} 
                  onValueChange={(value) => 
                    setSelectedAppointment({ ...selectedAppointment, status: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (selectedAppointment) {
                  handleUpdateAppointment(selectedAppointment.id, {
                    title: selectedAppointment.title,
                    description: selectedAppointment.description,
                    status: selectedAppointment.status
                  });
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
