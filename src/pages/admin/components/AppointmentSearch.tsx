
import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AppointmentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  refreshAppointments: () => void;
}

export function AppointmentSearch({ 
  searchQuery, 
  setSearchQuery, 
  refreshAppointments 
}: AppointmentSearchProps) {
  return (
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
      <Button variant="outline" size="sm" onClick={refreshAppointments}>
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
}
