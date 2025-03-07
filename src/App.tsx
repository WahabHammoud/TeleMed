
import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";

const AppContent = () => {
  const { session } = useAuth();
  return <AppRoutes session={session} />;
};

const App = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </React.StrictMode>
  );
};

export default App;
