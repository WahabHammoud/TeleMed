import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, userRole, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && userRole !== 'admin' && session) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Privilèges administrateur requis",
      });
    }
  }, [userRole, loading, session, toast]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return userRole === 'admin' ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};