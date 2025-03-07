
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { AdminCreator } from "@/components/auth/AdminCreator";
import { DoctorList } from "@/components/admin/DoctorList";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, UserPlus, Users, Activity } from "lucide-react";

export default function AdminPage() {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Administration",
      description: "Bienvenue dans le tableau de bord d'administration.",
    });
  }, [toast]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <LayoutDashboard className="mr-2 h-6 w-6 text-primary" />
              Tableau de bord d'administration
            </h1>
            <p className="text-muted-foreground mt-2">
              Gérez les utilisateurs, les médecins et les fonctionnalités de la plateforme
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="doctors" className="space-y-8">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="admins" className="flex items-center">
              <UserPlus className="mr-2 h-4 w-4" />
              Administrateurs
            </TabsTrigger>
            <TabsTrigger value="doctors" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Médecins
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Statistiques
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="admins" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="doctors" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques de la plateforme</CardTitle>
                <CardDescription>
                  Consultez les statistiques d'utilisation de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,432</div>
                      <p className="text-xs text-muted-foreground">+12% depuis le mois dernier</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Consultations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">845</div>
                      <p className="text-xs text-muted-foreground">+5% depuis le mois dernier</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Revenus</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">€32,580</div>
                      <p className="text-xs text-muted-foreground">+18% depuis le mois dernier</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
