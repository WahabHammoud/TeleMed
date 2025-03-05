
import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import ConsultationsPage from "./pages/ConsultationsPage";
import DocumentsPage from "./pages/DocumentsPage";
import AdminPage from "./pages/AdminPage";
import { supabase } from "./integrations/supabase/client";
import AuthPage from "./pages/AuthPage";

const App = () => {
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
      element: <ConsultationsPage />,
    },
    {
      path: "/documents",
      element: <DocumentsPage />,
    },
    {
      path: "/admin-tools",
      element: <AdminPage />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
