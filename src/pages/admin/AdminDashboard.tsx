import { Layout } from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Tableau de Bord Administrateur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Utilisateurs Actifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,432</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">845</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">€32,580</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}