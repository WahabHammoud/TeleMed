
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { LogOut, LayoutDashboard, ArrowRight } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { WelcomeHero } from "@/components/home/WelcomeHero";
import { UserWelcome } from "@/components/home/UserWelcome";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bienvenue sur MediConnect</h1>
            <p className="text-muted-foreground mt-2">
              Votre santé, notre priorité, partout et à tout moment
            </p>
          </div>
          {!session ? (
            <Button asChild>
              <Link to="/auth">Se connecter / S'inscrire</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Button variant="outline" asChild>
                  <Link to="/admin">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard Admin
                  </Link>
                </Button>
              )}
              <Button variant="outline" onClick={handleSignOut}>
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
            <WelcomeHero />
            
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">Pourquoi choisir MediConnect?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src="/lovable-uploads/0db0dd53-2d90-4ed9-b30e-242032a996cd.png" 
                      alt="Médecins qualifiés" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">Médecins qualifiés</h3>
                    <p className="text-muted-foreground">Accédez à un réseau de professionnels de santé certifiés et expérimentés.</p>
                    <Button variant="link" asChild className="p-0 mt-2">
                      <Link to="/home" className="flex items-center">
                        En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                      alt="Consultations en ligne" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">Consultations en ligne</h3>
                    <p className="text-muted-foreground">Consultez un médecin depuis le confort de votre domicile, 24h/24 et 7j/7.</p>
                    <Button variant="link" asChild className="p-0 mt-2">
                      <Link to="/consultations" className="flex items-center">
                        En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                      alt="Dossier médical sécurisé" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-2">Dossier médical sécurisé</h3>
                    <p className="text-muted-foreground">Accédez à votre historique médical et vos documents en toute sécurité.</p>
                    <Button variant="link" asChild className="p-0 mt-2">
                      <Link to="/documents" className="flex items-center">
                        En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mt-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-4">Rejoignez notre communauté</h2>
                  <p className="text-muted-foreground mb-6">
                    Plus de 50 000 patients font confiance à MediConnect pour leurs besoins de santé. 
                    Rejoignez-nous et découvrez une nouvelle façon de prendre soin de votre santé.
                  </p>
                  <Button size="lg" asChild>
                    <Link to="/auth">Créer un compte gratuitement</Link>
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="Communauté MediConnect" 
                    className="rounded-lg w-full max-h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
