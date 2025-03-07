
import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import ConsultationsPage from "./pages/ConsultationsPage";
import DocumentsPage from "./pages/DocumentsPage";
import AdminPage from "./pages/AdminPage";
import { supabase } from "./integrations/supabase/client";
import AuthPage from "./pages/AuthPage";
import { useToast } from "./components/ui/use-toast";
import HomePage from "./pages/HomePage";
import AppointmentsPage from "./pages/AppointmentsPage";
import EmergencyPage from "./pages/EmergencyPage";
import EventsPage from "./pages/EventsPage";
import HomeVisitsPage from "./pages/HomeVisitsPage";
import MessagesPage from "./pages/MessagesPage";
import ShopPage from "./pages/ShopPage";
import CommunityPage from "./pages/CommunityPage";
import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import HelpPage from "./pages/HelpPage";
import ComplaintsPage from "./pages/ComplaintsPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import NotFound from "./pages/NotFound";

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
        setUserRole(null);
      } else {
        setUserRole(data?.role || null);
        console.log('User role fetched:', data?.role);
      }
    } catch (error) {
      console.error('Error in role fetching:', error);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  // Component for protected admin routes
  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    
    if (loading) {
      return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }
    
    if (!session) {
      return <Navigate to="/auth" state={{ from: location }} replace />;
    }
    
    if (userRole !== 'admin') {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'administrateur pour accéder à cette page.",
      });
      return <Navigate to="/" replace />;
    }
    
    return <>{children}</>;
  };

  // Component for protected authenticated routes
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    
    if (loading) {
      return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }
    
    if (!session) {
      return <Navigate to="/auth" state={{ from: location }} replace />;
    }
    
    return <>{children}</>;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index session={session} />,
    },
    {
      path: "/home",
      element: <ProtectedRoute><HomePage /></ProtectedRoute>,
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },
    {
      path: "/appointments",
      element: <ProtectedRoute><AppointmentsPage /></ProtectedRoute>,
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
      path: "/emergency",
      element: <ProtectedRoute><EmergencyPage /></ProtectedRoute>,
    },
    {
      path: "/events",
      element: <ProtectedRoute><EventsPage /></ProtectedRoute>,
    },
    {
      path: "/home-visits",
      element: <ProtectedRoute><HomeVisitsPage /></ProtectedRoute>,
    },
    {
      path: "/messages",
      element: <ProtectedRoute><MessagesPage /></ProtectedRoute>,
    },
    {
      path: "/shop",
      element: <ProtectedRoute><ShopPage /></ProtectedRoute>,
    },
    {
      path: "/shop/cart",
      element: <ProtectedRoute><ShoppingCartPage /></ProtectedRoute>,
    },
    {
      path: "/community",
      element: <ProtectedRoute><CommunityPage /></ProtectedRoute>,
    },
    {
      path: "/settings",
      element: <ProtectedRoute><SettingsPage /></ProtectedRoute>,
    },
    {
      path: "/notifications",
      element: <ProtectedRoute><NotificationsPage /></ProtectedRoute>,
    },
    {
      path: "/help",
      element: <ProtectedRoute><HelpPage /></ProtectedRoute>,
    },
    {
      path: "/complaints",
      element: <ProtectedRoute><ComplaintsPage /></ProtectedRoute>,
    },
    {
      path: "/admin",
      element: <AdminRoute><AdminPage /></AdminRoute>,
    },
    {
      path: "*",
      element: <NotFound />,
    }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
