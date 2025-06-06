
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, AlertTriangle, Info, Calendar, Video, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const supportNumbers = [
    { title: "Assistance générale", number: "01 23 45 67 89" },
    { title: "Urgences médicales", number: "15" },
    { title: "Support technique", number: "01 23 45 67 90" }
  ];

  const quickServices = [
    { title: "Prendre rendez-vous", icon: Calendar, path: "/appointments", color: "bg-blue-500" },
    { title: "Consultation vidéo", icon: Video, path: "/consultations", color: "bg-green-500" },
    { title: "Contacter un médecin", icon: MessageSquare, path: "/messages", color: "bg-purple-500" },
    { title: "Visiter notre boutique", icon: Users, path: "/shop", color: "bg-amber-500" },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <img 
            src="/lovable-uploads/0db0dd53-2d90-4ed9-b30e-242032a996cd.png" 
            alt="MediConnect Logo" 
            className="h-28 mx-auto mb-4" 
          />
          <h1 className="text-3xl font-bold tracking-tight mb-4 text-medical-600">Bienvenue chez MediConnect</h1>
          <p className="text-xl text-muted-foreground">
            Votre santé, notre priorité, partout et à tout moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickServices.map((service, index) => (
            <Link to={service.path} key={index}>
              <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={`${service.color} text-white p-3 rounded-full mb-4`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg">{service.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-6 w-6 text-blue-500" />
                À propos de MediConnect
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="mb-4">
                MediConnect est une plateforme de santé complète qui vous connecte avec des professionnels de santé qualifiés en quelques clics. Notre mission est de rendre les soins de santé accessibles à tous, où que vous soyez.
              </p>
              <p className="mb-4">
                Nous proposons une variété de services, des consultations en ligne aux visites à domicile, en passant par les services d'urgence et la mise à disposition de personnel médical pour vos événements.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button asChild size="sm" variant="outline" className="bg-white hover:bg-slate-50">
                  <Link to="/emergency">Services d'urgence</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="bg-white hover:bg-slate-50">
                  <Link to="/events">Services pour événements</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="bg-white hover:bg-slate-50">
                  <Link to="/home-visits">Visites à domicile</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="bg-white hover:bg-slate-50">
                  <Link to="/shop">Boutique médicale</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-6 w-6 text-green-500" />
                Numéros de support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportNumbers.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">{item.title}</span>
                    <Button variant="link" className="text-lg font-bold text-green-600">
                      {item.number}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              Réclamations
            </CardTitle>
          </CardHeader>
          <CardContent className="text-left">
            <p className="mb-4">
              Votre satisfaction est notre priorité. Si vous avez une réclamation à faire, nous vous invitons à nous contacter par l'un des moyens suivants:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />
                <div>
                  <h3 className="font-medium">Par email</h3>
                  <p className="text-muted-foreground">reclamations@mediconnect.fr</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />
                <div>
                  <h3 className="font-medium">Par téléphone</h3>
                  <p className="text-muted-foreground">01 23 45 67 91</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/complaints">Soumettre une réclamation</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
