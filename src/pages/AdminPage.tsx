
import { Layout } from "@/components/layout/Layout";
import { AdminCreator } from "@/components/auth/AdminCreator";
import { DoctorList } from "@/components/admin/DoctorList";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Administration",
      description: "Bienvenue dans le tableau de bord d'administration.",
    });
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord d'administration</h1>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Création d'administrateurs</CardTitle>
              <CardDescription>
                Utilisez cet outil pour créer de nouveaux comptes administrateurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminCreator />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Liste des médecins</CardTitle>
              <CardDescription>
                Gérez les médecins enregistrés sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DoctorList />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
