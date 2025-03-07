
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, userRole, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
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
