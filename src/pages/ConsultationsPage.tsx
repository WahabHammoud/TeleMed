
import { useState } from "react";
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
import { useQuery } from "@tanstack/react-query";

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
  const { toast } = useToast();

  const { data: availableDoctors, isLoading } = useQuery({
    queryKey: ["available-doctors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("is_doctor", true);

      if (error) throw error;
      return data;
    },
  });

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select both date and time for your consultation",
      });
      return;
    }

    toast({
      title: "Consultation Booked!",
      description: `Your consultation is scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
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

          {/* Available Doctors Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Available Doctors</CardTitle>
              <CardDescription>
                Select a doctor for your consultation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] rounded-md border p-4">
                {isLoading ? (
                  <p>Loading doctors...</p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {availableDoctors?.map((doctor) => (
                      <Card key={doctor.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-2">
                            <p className="font-semibold">
                              Dr. {doctor.first_name} {doctor.last_name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {doctor.specialty}
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
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
