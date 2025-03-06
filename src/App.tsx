
import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ConsultationsPage from "./pages/ConsultationsPage";
import DocumentsPage from "./pages/DocumentsPage";
import AdminPage from "./pages/AdminPage";
import { supabase } from "./integrations/supabase/client";
import AuthPage from "./pages/AuthPage";
import { useToast } from "./components/ui/use-toast";

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check active sessions and set state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes to auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user role:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch user role. Please try again later.",
        });
      } else {
        setUserRole(data?.role);
        console.log('User role fetched:', data?.role);
      }
    } catch (error) {
      console.error('Error in role fetching:', error);
    } finally {
      setLoading(false);
    }
  };

  // Component for protected admin routes
  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) {
      return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }
    
    if (!session) {
      return <Navigate to="/auth" replace />;
    }
    
    if (userRole !== 'admin') {
      return <Navigate to="/" replace />;
    }
    
    return <>{children}</>;
  };

  // Component for protected authenticated routes
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) {
      return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }
    
    if (!session) {
      return <Navigate to="/auth" replace />;
    }
    
    return <>{children}</>;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index session={session} />,
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },
    {
      path: "/consultations",
      element: <ProtectedRoute><ConsultationsPage /></ProtectedRoute>,
    },
    {
      path: "/documents",
      element: <ProtectedRoute><DocumentsPage /></ProtectedRoute>,
    },
    {
      path: "/admin",
      element: <AdminRoute><AdminPage /></AdminRoute>,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
