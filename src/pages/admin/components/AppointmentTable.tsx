
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { AppointmentStatusBadge } from "./AppointmentStatusBadge";
import type { Appointment } from "../hooks/useAppointments";

interface AppointmentTableProps {
  appointments: Appointment[];
  getProfileName: (profileId: string) => string;
  handleUpdateStatus: (appointmentId: string, newStatus: string) => Promise<void>;
}

export function AppointmentTable({ 
  appointments, 
  getProfileName, 
  handleUpdateStatus 
}: AppointmentTableProps) {
  return (
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
        {appointments.map((appointment) => (
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
            <TableCell>
              <AppointmentStatusBadge status={appointment.status} />
            </TableCell>
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
  );
}
