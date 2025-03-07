
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }
  
  if (!session) {
    console.log("No session found, redirecting to /auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  console.log("Session found, rendering protected content");
  return <>{children}</>;
};
