
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ambulance, Phone, MapPin, Clock } from "lucide-react";

export default function EmergencyPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Service d'urgence rapide</h1>
            <p className="text-muted-foreground mt-2">
              Assistance médicale d'urgence et service d'ambulance rapide
            </p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-red-100 rounded-full p-4">
              <Ambulance className="h-16 w-16 text-red-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-red-700 mb-2">Urgence médicale ?</h2>
              <p className="mb-4 text-gray-700">En cas d'urgence vitale, composez immédiatement le :</p>
              <div className="flex gap-4 flex-wrap">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-xl">
                  <Phone className="mr-2 h-5 w-5" />
                  15
                </Button>
                <Button size="lg" variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 text-xl">
                  <Phone className="mr-2 h-5 w-5" />
                  112
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ambulance className="h-5 w-5 text-red-500" />
                Services d'ambulance
              </CardTitle>
              <CardDescription>Transport médical d'urgence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Notre service d'ambulance est disponible 24h/24 et 7j/7 pour tous types d'urgences médicales. Nos équipes sont formées pour intervenir rapidement et efficacement.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Temps de réponse moyen : 8 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Couverture : Paris et région parisienne</span>
                </li>
              </ul>
              <Button className="w-full mt-4">
                <Phone className="mr-2 h-4 w-4" />
                Appeler une ambulance
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-500" />
                Téléconsultation d'urgence
              </CardTitle>
              <CardDescription>Consultation médicale immédiate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Pour les situations non vitales mais nécessitant un avis médical rapide, notre service de téléconsultation d'urgence vous met en relation avec un médecin en moins de 5 minutes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Disponible 24h/24 et 7j/7</span>
                </li>
              </ul>
              <Button className="w-full mt-4">
                Démarrer une téléconsultation d'urgence
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quand appeler les urgences ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 bg-red-50">
                <h3 className="font-bold text-red-700 mb-2">Situations critiques</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Douleur thoracique intense</li>
                  <li>• Difficultés respiratoires sévères</li>
                  <li>• Perte de conscience</li>
                  <li>• Hémorragie importante</li>
                  <li>• Traumatisme grave</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4 bg-yellow-50">
                <h3 className="font-bold text-yellow-700 mb-2">Situations urgentes</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Fièvre élevée persistante</li>
                  <li>• Douleur intense inexpliquée</li>
                  <li>• Réaction allergique</li>
                  <li>• Brûlures importantes</li>
                  <li>• Blessures nécessitant des points de suture</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
