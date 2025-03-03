
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Flag, Music, Trophy } from "lucide-react";

export default function EventsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Services médicaux pour événements</h1>
            <p className="text-muted-foreground mt-2">
              Solutions médicales professionnelles pour tous types d'événements
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 md:p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-2">
              Une équipe médicale dédiée pour votre événement
            </h2>
            <p className="text-muted-foreground">
              Que vous organisiez un événement sportif, un festival, un concert ou une conférence, 
              MediConnect assure une présence médicale professionnelle pour garantir la sécurité 
              et le bien-être de tous les participants.
            </p>
            <div className="mt-6">
              <Button size="lg">Demander un devis</Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="sports" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="sports" className="py-3">
              <Trophy className="h-4 w-4 mr-2" />
              Événements sportifs
            </TabsTrigger>
            <TabsTrigger value="festivals" className="py-3">
              <Music className="h-4 w-4 mr-2" />
              Festivals et concerts
            </TabsTrigger>
            <TabsTrigger value="corporate" className="py-3">
              <Users className="h-4 w-4 mr-2" />
              Événements d'entreprise
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sports" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 bg-green-100 text-green-700">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <CardTitle>Compétitions sportives</CardTitle>
                  <CardDescription>Services médicaux pour les événements sportifs</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Médecins du sport</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Kinésithérapeutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Équipe de premiers secours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Poste médical avancé</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">En savoir plus</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 bg-blue-100 text-blue-700">
                    <Flag className="h-6 w-6" />
                  </div>
                  <CardTitle>Marathons et courses</CardTitle>
                  <CardDescription>Dispositif médical spécifique</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Points médicaux sur le parcours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Équipes mobiles d'intervention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Ambulances dédiées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Coordination avec les secours locaux</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">En savoir plus</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 bg-purple-100 text-purple-700">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle>Tournois et championnats</CardTitle>
                  <CardDescription>Couverture médicale complète</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Médecins spécialisés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Gestion des blessures sportives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Équipement médical spécifique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Présence sur toute la durée</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">En savoir plus</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="festivals" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 bg-pink-100 text-pink-700">
                    <Music className="h-6 w-6" />
                  </div>
                  <CardTitle>Festivals de musique</CardTitle>
                  <CardDescription>Dispositif médical adapté aux grands rassemblements</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Postes médicaux avancés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Équipes mobiles de secouristes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Médecins urgentistes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Coordination avec les services d'urgence</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">En savoir plus</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 bg-yellow-100 text-yellow-700">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <CardTitle>Concerts et spectacles</CardTitle>
                  <CardDescription>Couverture médicale adaptée</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Équipe médicale discrète</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Intervention rapide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Points médicaux stratégiques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Formation du personnel de sécurité</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">En savoir plus</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 bg-red-100 text-red-700">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle>Grands rassemblements</CardTitle>
                  <CardDescription>Dispositif médical à grande échelle</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Poste médical principal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Antennes médicales secondaires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Gestion des flux de patients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Plan d'évacuation médicale</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">En savoir plus</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="corporate" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 bg-indigo-100 text-indigo-700">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle>Conférences et séminaires</CardTitle>
                  <CardDescription>Présence médicale discrète et professionnelle</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Médecin ou infirmier sur place</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Trousse médicale complète</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Gestion des urgences médicales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Coordination avec les services locaux</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">En savoir plus</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 bg-cyan-100 text-cyan-700">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <CardTitle>Salons professionnels</CardTitle>
                  <CardDescription>Dispositif médical adapté</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Poste de secours dédié</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Personnel médical qualifié</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Équipement pour premiers soins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Procédures d'évacuation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">En savoir plus</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 bg-teal-100 text-teal-700">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle>Team buildings</CardTitle>
                  <CardDescription>Sécurité médicale pour activités d'entreprise</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Médecin ou secouriste présent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Adapté aux activités sportives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Évaluation préalable des risques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Conseils de prévention</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">En savoir plus</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Comment réserver nos services ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-700 font-bold text-lg">1</span>
                </div>
                <h3 className="font-medium mb-2">Demande de devis</h3>
                <p className="text-sm text-muted-foreground">
                  Remplissez notre formulaire en ligne avec les détails de votre événement
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-700 font-bold text-lg">2</span>
                </div>
                <h3 className="font-medium mb-2">Évaluation personnalisée</h3>
                <p className="text-sm text-muted-foreground">
                  Nos experts évaluent vos besoins et vous proposent un dispositif adapté
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-700 font-bold text-lg">3</span>
                </div>
                <h3 className="font-medium mb-2">Mise en place</h3>
                <p className="text-sm text-muted-foreground">
                  Notre équipe médicale est déployée selon le plan établi le jour de votre événement
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button size="lg">Demander un devis</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
