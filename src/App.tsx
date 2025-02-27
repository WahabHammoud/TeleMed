
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./integrations/supabase/client";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ConsultationsPage from "./pages/ConsultationsPage";
import DocumentsPage from "./pages/DocumentsPage";
import AuthPage from "./pages/AuthPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import ShopPage from "./pages/ShopPage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";
import MessagesPage from "./pages/MessagesPage";
import CommunityPage from "./pages/CommunityPage";
import NotificationsPage from "./pages/NotificationsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return authenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

// Admin route with role check
const AdminRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }
        
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        setIsAdmin(data?.role === 'admin');
        setLoading(false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setLoading(false);
      }
    };
    
    checkAdminStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
};

const App = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Check current auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index session={session} />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/consultations" element={
              <ProtectedRoute>
                <ConsultationsPage />
              </ProtectedRoute>
            } />
            <Route path="/documents" element={
              <ProtectedRoute>
                <DocumentsPage />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute>
                <AppointmentsPage />
              </ProtectedRoute>
            } />
            <Route path="/shop" element={
              <ProtectedRoute>
                <ShopPage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute>
                <HelpPage />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <CommunityPage />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/*" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
