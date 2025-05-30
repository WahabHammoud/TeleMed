
import { Badge } from "@/components/ui/badge";

interface AppointmentStatusBadgeProps {
  status: string;
}

export function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
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
}
