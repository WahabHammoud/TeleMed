
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { createDailyRoom } from "@/utils/dailyApi";
import { createVideoToken } from "@/utils/videoToken";

type TimeSlot = {
  time: string;
  available: boolean;
};

const timeSlots: TimeSlot[] = Array.from({ length: 8 }, (_, i) => ({
  time: `${i + 9}:00`,
  available: Math.random() > 0.3,
}));

export default function ConsultationsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const { toast } = useToast();

  const { data: availableDoctors, isLoading } = useQuery({
    queryKey: ["available-doctors", searchQuery, specialty],
    queryFn: async () => {
      let query = supabase
        .from("profiles")
        .select("*")
        .eq("is_doctor", true);

      if (searchQuery) {
        query = query.or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%`);
      }

      if (specialty) {
        query = query.eq("specialty", specialty);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const bookConsultationMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDate || !selectedTime || !selectedDoctor) {
        throw new Error("Please select date, time and doctor");
      }

      const scheduledFor = new Date(selectedDate);
      const [hours] = selectedTime.split(":");
      scheduledFor.setHours(parseInt(hours), 0, 0, 0);

      const { data: consultation, error: bookingError } = await supabase
        .from("consultations")
        .insert({
          doctor_id: selectedDoctor,
          scheduled_for: scheduledFor.toISOString(),
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Create Daily.co room
      const room = await createDailyRoom(consultation.id);
      
      // Update consultation with room details
      const { error: updateError } = await supabase
        .from("consultations")
        .update({
          room_name: room.name,
          room_url: room.url,
        })
        .eq("id", consultation.id);

      if (updateError) throw updateError;

      return consultation;
    },
    onSuccess: () => {
      toast({
        title: "Consultation Booked!",
        description: `Your consultation is scheduled for ${selectedDate?.toLocaleDateString()} at ${selectedTime}`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: error.message,
      });
    },
  });

  useEffect(() => {
    // Subscribe to real-time updates
    const channel = supabase
      .channel("consultations-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "consultations",
        },
        (payload) => {
          console.log("Real-time update:", payload);
          // Refresh the consultations data
          // queryClient.invalidateQueries(["consultations"]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/eb72a9a6-e7d4-4fdb-afa5-3bd29cf13dec.png" 
            alt="MediConnect Logo" 
            className="h-24"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Calendar Section */}
          <Card>
            <CardHeader>
              <CardTitle>Select Consultation Date</CardTitle>
              <CardDescription>
                Choose your preferred date for the video consultation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Time Slots Section */}
          <Card>
            <CardHeader>
              <CardTitle>Available Time Slots</CardTitle>
              <CardDescription>
                Select your preferred time slot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    className="w-full"
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Doctor Search and Filter Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Find a Doctor</CardTitle>
              <div className="flex gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative flex-1">
                  <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Filter by specialty..."
                    className="pl-9"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Available Doctors Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Available Doctors</CardTitle>
              <CardDescription>
                Select a doctor for your consultation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                {isLoading ? (
                  <p>Loading doctors...</p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {availableDoctors?.map((doctor) => (
                      <Card 
                        key={doctor.id}
                        className={`cursor-pointer transition-all ${
                          selectedDoctor === doctor.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedDoctor(doctor.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-2">
                            <p className="font-semibold">
                              Dr. {doctor.first_name} {doctor.last_name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {doctor.specialty}
                            </p>
                            <p className="text-sm text-gray-500">
                              Experience: {doctor.years_of_experience} years
                            </p>
                            <p className="text-sm text-gray-500">
                              Languages: {doctor.languages?.join(", ")}
                            </p>
                            <p className="text-sm font-medium text-primary">
                              Fee: ${doctor.consultation_fee}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Book Consultation Button */}
          <div className="md:col-span-2">
            <Button
              className="w-full"
              size="lg"
              onClick={() => bookConsultationMutation.mutate()}
              disabled={!selectedDate || !selectedTime || !selectedDoctor || bookConsultationMutation.isPending}
            >
              {bookConsultationMutation.isPending ? "Booking..." : "Book Consultation"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
