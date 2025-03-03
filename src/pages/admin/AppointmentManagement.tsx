
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentSearch } from "./components/AppointmentSearch";
import { AppointmentTable } from "./components/AppointmentTable";
import { useAppointments } from "./hooks/useAppointments";

export function AppointmentManagement() {
  const {
    appointments,
    loading,
    searchQuery,
    setSearchQuery,
    fetchAppointments,
    handleUpdateStatus,
    getProfileName
  } = useAppointments();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Appointment Management</CardTitle>
        <AppointmentSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          refreshAppointments={fetchAppointments}
        />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <AppointmentTable 
            appointments={appointments}
            getProfileName={getProfileName}
            handleUpdateStatus={handleUpdateStatus}
          />
        )}
      </CardContent>
    </Card>
  );
}
