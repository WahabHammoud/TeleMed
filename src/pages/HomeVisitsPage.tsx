
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, User, Clock, Home, CheckCircle } from "lucide-react";

export default function HomeVisitsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Médecins et infirmiers à domicile</h1>
            <p className="text-muted-foreground mt-2">
              Soins médicaux professionnels dans le confort de votre domicile
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 md:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-2">
              Des soins de qualité sans vous déplacer
            </h2>
            <p className="text-muted-foreground">
              MediConnect vous permet d'accéder à des soins médicaux professionnels directement chez vous.
              Nos médecins et infirmiers qualifiés se déplacent à votre domicile pour vous offrir des consultations
              et des soins adaptés à vos besoins.
            </p>
            <div className="mt-6">
              <Button size="lg">Prendre rendez-vous</Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 bg-blue-100 text-blue-700">
                <User className="h-6 w-6" />
              </div>
              <CardTitle>Consultation médicale à domicile</CardTitle>
              <CardDescription>Un médecin se déplace chez vous</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Nos médecins généralistes et spécialistes se déplacent directement chez vous pour des consultations complètes, sans que vous ayez à vous déplacer.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Diagnostic et traitement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Prescriptions médicales</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Suivi médical régulier</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Conseils personnalisés</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Réserver un médecin</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 bg-green-100 text-green-700">
                <Heart className="h-6 w-6" />
              </div>
              <CardTitle>Soins infirmiers à domicile</CardTitle>
              <CardDescription>Des infirmiers qualifiés à votre service</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Notre équipe d'infirmiers diplômés d'État se déplace à votre domicile pour réaliser tous types de soins infirmiers sur prescription médicale.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Prélèvements sanguins</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Injections et perfusions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Pansements et soins de plaies</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Soins post-opératoires</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Réserver un infirmier</Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nos avantages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-indigo-700" />
                </div>
                <h3 className="font-medium text-lg mb-2">Disponibilité étendue</h3>
                <p className="text-sm text-muted-foreground">
                  Service disponible 7j/7, de 8h à 22h, y compris les week-ends et jours fériés
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-purple-700" />
                </div>
                <h3 className="font-medium text-lg mb-2">Confort maximal</h3>
                <p className="text-sm text-muted-foreground">
                  Recevez des soins de qualité dans l'environnement familier de votre domicile
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="font-medium text-lg mb-2">Professionnels qualifiés</h3>
                <p className="text-sm text-muted-foreground">
                  Tous nos médecins et infirmiers sont diplômés et expérimentés
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tarifs et remboursements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-4">Consultations médicales</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Consultation médecin généraliste</span>
                    <span className="font-medium">60€</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Consultation médecin spécialiste</span>
                    <span className="font-medium">80-120€</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Majoration nuit/week-end</span>
                    <span className="font-medium">+20€</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Les consultations sont prises en charge par l'Assurance Maladie selon les tarifs conventionnels en vigueur.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-4">Soins infirmiers</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Prélèvement sanguin</span>
                    <span className="font-medium">Tarif conventionné</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Injection</span>
                    <span className="font-medium">Tarif conventionné</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Pansement simple</span>
                    <span className="font-medium">Tarif conventionné</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Les soins infirmiers sont pris en charge à 60% par l'Assurance Maladie sur prescription médicale et à 100% en ALD.
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button>Consulter tous nos tarifs</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
