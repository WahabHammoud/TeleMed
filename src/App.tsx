
import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";

const AppContent = () => {
  const { session } = useAuth();
  console.log("AppContent rendering with session:", session ? "exists" : "none");
  return <AppRoutes session={session} />;
};

const App = () => {
  console.log("App initializing");
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
