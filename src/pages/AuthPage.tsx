
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { AdminCreator } from "@/components/auth/AdminCreator";

export default function AuthPage() {
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("signin");
  const [showAdminTools, setShowAdminTools] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Set active tab based on URL parameter
    const tab = searchParams.get("tab");
    if (tab === "signin" || tab === "signup") {
      setActiveTab(tab);
    }

    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        // Check if the user is an admin to show admin tools
        supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data?.role === 'admin') {
              setShowAdminTools(true);
            }
          });
      }
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          // Check if the user is an admin
          supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()
            .then(({ data }) => {
              if (data?.role === 'admin') {
                setShowAdminTools(true);
              } else {
                navigate("/");
              }
            });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, searchParams]);

  // Special key combination to show admin tools (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdminTools(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (session && !showAdminTools) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md p-4">
          {showAdminTools && session ? (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-center">Admin Tools</h1>
              <AdminCreator />
              <Card>
                <CardContent className="pt-6">
                  <button 
                    onClick={() => navigate("/")} 
                    className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-md"
                  >
                    Return to Dashboard
                  </button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Welcome to MediConnect</CardTitle>
                <CardDescription className="text-center">
                  Sign in to your account or create a new one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="signin">
                    <SignInForm />
                  </TabsContent>
                  <TabsContent value="signup">
                    <SignUpForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
