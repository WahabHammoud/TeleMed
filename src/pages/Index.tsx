
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { LogOut, LayoutDashboard, ArrowRight, CheckCircle } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { WelcomeHero } from "@/components/home/WelcomeHero";
import { UserWelcome } from "@/components/home/UserWelcome";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface IndexProps {
  session: any;
}

export default function Index({ session }: IndexProps) {
  const { userProfile, loading } = useUserProfile(session);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isAdmin = userProfile?.role === 'admin';
  
  // Debug
  useEffect(() => {
    if (userProfile) {
      console.log('Home page - User profile:', userProfile);
      console.log('Home page - Is admin?', isAdmin);
    }
  }, [userProfile, isAdmin]);

  return (
    <Layout>
      <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fadeIn">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-medical-700 to-primary bg-clip-text text-transparent">
              Bienvenue sur MediConnect
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Votre santé, notre priorité, partout et à tout moment
            </p>
          </div>
          {!session ? (
            <Button size="lg" className="shadow-md hover:shadow-lg transition-all" asChild>
              <Link to="/auth">Se connecter / S'inscrire</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              
              
                    {isAdmin && (
                      <Button 
                        variant="outline" 
                        asChild 
                        className="shadow-sm hover:shadow-md transition-all"
                      >
                        <Link to="/admin/dashboard">  {/* Changed to direct link */}
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard Admin
                        </Link>
                      </Button>
                    )}
              <Button variant="outline" onClick={handleSignOut} className="shadow-sm hover:shadow-md transition-all">
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          )}
        </div>

        {session ? (
          <>
            <UserWelcome 
              firstName={userProfile?.first_name} 
              isAdmin={isAdmin} 
            />
            <FeaturesGrid />
          </>
        ) : (
          <>
            {/* Hero Section */}
            <div className="w-full rounded-2xl overflow-hidden relative bg-gradient-to-r from-blue-50 to-indigo-50 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-medical-700/10 to-primary/5 z-0"></div>
              <div className="flex flex-col lg:flex-row items-center px-6 py-12 lg:py-16 relative z-10">
                <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
                  <Badge variant="outline" className="bg-white/80 mb-4 px-3 py-1 text-sm font-medium">
                    Nouveau sur MediConnect
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    Prenez rendez-vous avec un médecin <span className="text-primary">en quelques clics</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    MediConnect vous permet de consulter un médecin en ligne, de prendre rendez-vous et d'accéder à votre dossier médical en toute sécurité.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild className="shadow-lg">
                      <Link to="/auth?register=true">Créer un compte</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="bg-white/80">
                      <Link to="/home">En savoir plus</Link>
                    </Button>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                    alt="MediConnect Telemedicine" 
                    className="rounded-xl shadow-lg w-full max-h-[420px] object-cover object-center"
                  />
                </div>
              </div>
            </div>
            
            {/* Features Section */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <Badge variant="outline" className="bg-blue-50 mb-3 px-3 py-1">Nos services</Badge>
                <h2 className="text-3xl font-bold mb-4">Pourquoi choisir MediConnect?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Notre plateforme combine technologie avancée et expertise médicale pour vous offrir une expérience de santé optimale.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1651008376398-27c145b3de43" 
                      alt="Médecins qualifiés" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-bold text-lg">Médecins qualifiés</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Accédez à un réseau de professionnels de santé certifiés et expérimentés.</p>
                    <Button variant="link" asChild className="p-0">
                      <Link to="/doctors" className="flex items-center">
                        Découvrir nos médecins <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                      alt="Consultations en ligne" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-bold text-lg">Consultations en ligne</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Consultez un médecin depuis le confort de votre domicile, 24h/24 et 7j/7.</p>
                    <Button variant="link" asChild className="p-0">
                      <Link to="/consultations" className="flex items-center">
                        Prendre rendez-vous <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                      alt="Dossier médical sécurisé" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-bold text-lg">Dossier médical sécurisé</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Accédez à votre historique médical et vos documents en toute sécurité.</p>
                    <Button variant="link" asChild className="p-0">
                      <Link to="/documents" className="flex items-center">
                        Gérer vos documents <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-medical-50 to-blue-50 rounded-xl p-8 mt-16 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4">Rejoignez notre communauté</h2>
                  <p className="text-muted-foreground mb-6">
                    Plus de 50 000 patients font confiance à MediConnect pour leurs besoins de santé. 
                    Rejoignez-nous et découvrez une nouvelle façon de prendre soin de votre santé.
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Accès à des médecins 24h/24 et 7j/7</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Consultations par vidéo ou messagerie</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Dossier médical sécurisé</span>
                    </li>
                  </ul>
                  <Button size="lg" asChild className="shadow-lg">
                    <Link to="/auth">Créer un compte gratuitement</Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="Communauté MediConnect" 
                    className="rounded-lg w-full max-h-96 object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="my-16">
              <div className="text-center mb-12">
                <Badge variant="outline" className="bg-blue-50 mb-3 px-3 py-1">Témoignages</Badge>
                <h2 className="text-3xl font-bold mb-4">Ce que disent nos utilisateurs</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Découvrez les expériences de nos patients avec MediConnect
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white shadow-md border border-gray-100">
                  <CardContent className="pt-6">
                    <p className="italic text-muted-foreground mb-4">
                      "MediConnect a changé ma façon de consulter un médecin. C'est tellement pratique de pouvoir consulter depuis chez moi !"
                    </p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">
                        MS
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Marie S.</p>
                        <p className="text-sm text-muted-foreground">Paris</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-md border border-gray-100">
                  <CardContent className="pt-6">
                    <p className="italic text-muted-foreground mb-4">
                      "J'ai pu consulter un médecin en urgence un dimanche soir. Le service est impeccable et les médecins très professionnels."
                    </p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">
                        TL
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Thomas L.</p>
                        <p className="text-sm text-muted-foreground">Lyon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-md border border-gray-100">
                  <CardContent className="pt-6">
                    <p className="italic text-muted-foreground mb-4">
                      "L'application est très intuitive et le suivi médical est excellent. Je recommande vivement MediConnect à tous mes proches."
                    </p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">
                        SR
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Sophie R.</p>
                        <p className="text-sm text-muted-foreground">Marseille</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
