
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { WelcomeHero } from "@/components/home/WelcomeHero";
import { UserWelcome } from "@/components/home/UserWelcome";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";

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
      <div className="space-y-8">
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
          <WelcomeHero />
        )}
      </div>
    </Layout>
  );
}
