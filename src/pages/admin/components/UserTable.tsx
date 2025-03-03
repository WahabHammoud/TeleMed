
import { Profile } from "../hooks/useProfiles";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserTableProps {
  profiles: Profile[];
  onUpdateRole: (userId: string, isAdmin: boolean) => Promise<void>;
  onUpdateDoctorStatus: (userId: string, isDoctor: boolean) => Promise<void>;
}

export function UserTable({ profiles, onUpdateRole, onUpdateDoctorStatus }: UserTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {profiles.map((profile) => (
          <TableRow key={profile.id}>
            <TableCell className="font-medium">
              {profile.first_name} {profile.last_name}
            </TableCell>
            <TableCell>
              <Badge variant={profile.role === 'admin' ? "destructive" : "outline"}>
                {profile.role || 'User'}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={profile.is_doctor ? "default" : "secondary"}>
                {profile.is_doctor ? 'Doctor' : 'Patient'}
              </Badge>
            </TableCell>
            <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={profile.role === 'admin'}
                    onCheckedChange={(checked) => onUpdateRole(profile.id, checked)}
                  />
                  <span className="text-sm">Admin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={profile.is_doctor || false}
                    onCheckedChange={(checked) => onUpdateDoctorStatus(profile.id, checked)}
                  />
                  <span className="text-sm">Doctor</span>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
