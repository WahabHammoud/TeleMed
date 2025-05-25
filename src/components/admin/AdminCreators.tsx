import { AdminCreator } from "@/components/auth/AdminCreator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AdminCreators = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Administrators Management</CardTitle>
      </CardHeader>
      <CardContent>
        <AdminCreator />
      </CardContent>
    </Card>
  );
};