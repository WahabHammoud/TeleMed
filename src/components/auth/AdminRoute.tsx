
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, userRole, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  console.log("AdminRoute - Session:", session ? "exists" : "none", "Role:", userRole);
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-gray-500">Verifying admin privileges...</p>
        </div>
      </div>
    );
  }
  
  if (!session) {
    console.log("No session found, redirecting to /auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  if (userRole !== 'admin') {
    console.log("User is not admin, redirecting to homepage");
    toast({
      variant: "destructive",
      title: "Accès refusé",
      description: "Vous n'avez pas les droits d'administrateur pour accéder à cette page.",
    });
    return <Navigate to="/" replace />;
  }
  
  console.log("Admin access granted, rendering admin content");
  return <>{children}</>;
};
