
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";

// Pages
import Index from "@/pages/Index";
import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import AppointmentsPage from "@/pages/AppointmentsPage";
import ConsultationsPage from "@/pages/ConsultationsPage";
import DocumentsPage from "@/pages/DocumentsPage";
import EmergencyPage from "@/pages/EmergencyPage";
import EventsPage from "@/pages/EventsPage";
import HomeVisitsPage from "@/pages/HomeVisitsPage";
import MessagesPage from "@/pages/MessagesPage";
import ShopPage from "@/pages/ShopPage";
import CommunityPage from "@/pages/CommunityPage";
import SettingsPage from "@/pages/SettingsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import HelpPage from "@/pages/HelpPage";
import ComplaintsPage from "@/pages/ComplaintsPage";
import ShoppingCartPage from "@/pages/ShoppingCartPage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/NotFound";

export const AppRoutes: React.FC<{ session: any }> = ({ session }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index session={session} />,
    },
    {
      path: "/home",
      element: session ? <HomePage /> : <Navigate to="/" replace />,
    },
    {
      path: "/auth",
      element: session ? <Navigate to="/" replace /> : <AuthPage />,
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

  return <RouterProvider router={router} />;
};
