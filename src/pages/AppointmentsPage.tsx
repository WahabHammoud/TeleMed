
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarPlus, CalendarCheck, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Appointment {
  id: string;
  title: string;
  description: string | null;
  appointment_date: string;
  status: string;
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load appointments",
        });
        throw error;
      }
      
      return data as Appointment[];
    },
  });

  const handleCreateAppointment = async () => {
    if (!selectedDate) return;

    const { error } = await supabase
      .from('appointments')
      .insert({
        title: 'New Appointment',
        appointment_date: selectedDate.toISOString(),
        patient_id: (await supabase.auth.getUser()).data.user?.id,
        status: 'pending'
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create appointment",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Appointment created successfully",
    });
  };

  const filteredAppointments = appointments?.filter(appointment => {
    if (!selectedDate) return true;
    const appointmentDate = new Date(appointment.appointment_date);
    return (
      appointmentDate.getDate() === selectedDate.getDate() &&
      appointmentDate.getMonth() === selectedDate.getMonth() &&
      appointmentDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5" />
                Appointment Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
              />
              <Button 
                className="w-full mt-4"
                onClick={handleCreateAppointment}
              >
                <CalendarPlus className="mr-2 h-4 w-4" />
                Book New Appointment
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? (
                  `Appointments for ${selectedDate.toLocaleDateString()}`
                ) : (
                  "All Appointments"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : filteredAppointments?.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No appointments found for this date
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments?.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="font-medium">{appointment.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(appointment.appointment_date).toLocaleTimeString()}
                          </p>
                          {appointment.description && (
                            <p className="text-sm mt-1">{appointment.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs capitalize
                            ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {appointment.status}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
