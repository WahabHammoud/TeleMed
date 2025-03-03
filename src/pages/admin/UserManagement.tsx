
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserSearch } from "./components/UserSearch";
import { UserTable } from "./components/UserTable";
import { LoadingState } from "./components/LoadingState";
import { useProfiles } from "./hooks/useProfiles";

export function UserManagement() {
  const {
    profiles,
    loading,
    searchQuery,
    setSearchQuery,
    fetchProfiles,
    handleUpdateRole,
    handleUpdateDoctorStatus
  } = useProfiles();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>User Management</CardTitle>
        <UserSearch 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={fetchProfiles}
        />
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingState />
        ) : (
          <UserTable 
            profiles={profiles}
            onUpdateRole={handleUpdateRole}
            onUpdateDoctorStatus={handleUpdateDoctorStatus}
          />
        )}
      </CardContent>
    </Card>
  );
}
