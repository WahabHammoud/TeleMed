
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, CalendarCheck, Users, ShoppingBag, FileText, Video, LogOut, LayoutDashboard } from "lucide-react";

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
      title: "Appointments",
      description: "Schedule and manage your doctor appointments",
      icon: CalendarCheck,
      path: "/appointments",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Consultations",
      description: "Join video consultations with medical professionals",
      icon: Video,
      path: "/consultations",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Community",
      description: "Connect with other patients and doctors",
      icon: Users,
      path: "/community",
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Messages",
      description: "Send direct messages to your healthcare providers",
      icon: MessageSquare,
      path: "/messages",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      title: "Documents",
      description: "Access your medical records and prescriptions",
      icon: FileText,
      path: "/documents",
      color: "bg-red-100 text-red-700"
    },
    {
      title: "Shop",
      description: "Purchase medications and health products",
      icon: ShoppingBag,
      path: "/shop",
      color: "bg-indigo-100 text-indigo-700"
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome to TeleMed</h1>
            <p className="text-muted-foreground mt-2">
              Your complete healthcare platform
            </p>
          </div>
          {!session ? (
            <Button asChild>
              <Link to="/auth">Sign In / Sign Up</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Button variant="outline" asChild>
                  <Link to="/admin">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </Button>
              )}
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          )}
        </div>

        {session ? (
          <>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 md:p-8 mb-8">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold mb-2">
                  Hello, {userProfile?.first_name || 'there'}!
                </h2>
                <p className="text-muted-foreground">
                  Welcome to your healthcare dashboard. Here you can manage your appointments, 
                  consult with doctors, access your medical documents, and more.
                </p>
                {isAdmin && (
                  <div className="mt-4">
                    <Button asChild>
                      <Link to="/admin">
                        Go to Admin Dashboard
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
                      <Link to={feature.path}>Go to {feature.title}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 min-h-[60vh] mt-10">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Healthcare made accessible</h2>
              <p className="text-muted-foreground text-lg">
                Connect with doctors, manage appointments, access your medical records, 
                and join a community of patients and healthcare professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" asChild>
                  <Link to="/auth">Sign Up Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/auth?tab=signin">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Doctor using tablet" 
                className="rounded-lg object-cover max-h-[400px]"
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
