
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, CalendarCheck, Users, ShoppingBag, FileText, Video, LogOut, LayoutDashboard, Ambulance, Heart } from "lucide-react";

interface IndexProps {
  session: any;
}

export default function Index({ session }: IndexProps) {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      if (!session?.user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          
          // Try to create profile from metadata as fallback
          const metadata = session.user.user_metadata;
          if (metadata) {
            const userRole = metadata.user_role || 'patient';
            
            const newProfile = {
              id: session.user.id,
              first_name: metadata.first_name,
              last_name: metadata.last_name,
              role: userRole
            };
            
            const { error: upsertError, data: profileData } = await supabase
              .from('profiles')
              .upsert(newProfile)
              .select()
              .single();
            
            if (!upsertError && profileData) {
              setUserProfile(profileData);
            } else {
              console.error('Error creating profile:', upsertError);
              // Use metadata as profile
              setUserProfile({
                ...newProfile,
                // Add any other needed fields with defaults
              });
            }
          }
        } else {
          setUserProfile(data);
        }
      } catch (error) {
        console.error('Error in profile fetching:', error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [session]);

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

  const features = [
    {
      title: "Rendez-vous",
      description: "Planifiez et gérez vos rendez-vous médicaux",
      icon: CalendarCheck,
      path: "/appointments",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Consultations",
      description: "Participez à des consultations vidéo avec des professionnels de santé",
      icon: Video,
      path: "/consultations",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Service d'urgence",
      description: "Accès rapide aux services d'urgence et ambulance",
      icon: Ambulance,
      path: "/emergency",
      color: "bg-red-100 text-red-700"
    },
    {
      title: "Services pour événements",
      description: "Solutions médicales pour vos événements",
      icon: Users,
      path: "/events",
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Médecins à domicile",
      description: "Recevez des soins médicaux chez vous",
      icon: Heart,
      path: "/home-visits",
      color: "bg-pink-100 text-pink-700"
    },
    {
      title: "Communauté",
      description: "Échangez avec d'autres patients et médecins",
      icon: Users,
      path: "/community",
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Messages",
      description: "Envoyez des messages directs à vos professionnels de santé",
      icon: MessageSquare,
      path: "/messages",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      title: "Documents",
      description: "Accédez à vos dossiers médicaux et ordonnances",
      icon: FileText,
      path: "/documents",
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      title: "Boutique",
      description: "Achetez des médicaments et produits de santé",
      icon: ShoppingBag,
      path: "/shop",
      color: "bg-blue-100 text-blue-700"
    }
  ];

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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 md:p-8 mb-8">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold mb-2">
                  Bonjour, {userProfile?.first_name || 'utilisateur'}!
                </h2>
                <p className="text-muted-foreground">
                  Bienvenue sur votre espace santé. Ici, vous pouvez gérer vos rendez-vous, 
                  consulter des médecins, accéder à vos documents médicaux, et plus encore.
                </p>
                {isAdmin && (
                  <div className="mt-4">
                    <Button asChild>
                      <Link to="/admin">
                        Accéder au Dashboard Admin
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to={feature.path}>Accéder à {feature.title}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 min-h-[60vh] mt-10">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Des soins de santé accessibles</h2>
              <p className="text-muted-foreground text-lg">
                Connectez-vous avec des médecins, gérez vos rendez-vous, accédez à vos dossiers médicaux, 
                et rejoignez une communauté de patients et de professionnels de santé.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" asChild>
                  <Link to="/auth">S'inscrire maintenant</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/auth?tab=signin">Se connecter</Link>
                </Button>
              </div>
              <div className="pt-4">
                <Button variant="link" asChild>
                  <Link to="/home">En savoir plus sur MediConnect</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="/mediconnect-logo.png" 
                alt="MediConnect" 
                className="rounded-lg object-cover max-h-[300px]"
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
