
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { supabase } from "@/integrations/supabase/client";

// Pages
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import AuthPage from "@/pages/AuthPage";
import AppointmentsPage from "@/pages/AppointmentsPage";
import ConsultationsPage from "@/pages/ConsultationsPage";
import MessagesPage from "@/pages/MessagesPage";
import CommunityPage from "@/pages/CommunityPage";
import DocumentsPage from "@/pages/DocumentsPage";
import ShopPage from "@/pages/ShopPage";
import SettingsPage from "@/pages/SettingsPage";
import HelpPage from "@/pages/HelpPage";
import NotificationsPage from "@/pages/NotificationsPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";

// Initialize the React Query client
const queryClient = new QueryClient();

function App() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Check active sessions and set state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes to auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index session={session} />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/consultations" element={<ConsultationsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
