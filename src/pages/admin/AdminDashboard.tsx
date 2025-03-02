
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAdminStatus } from "./hooks/useAdminStatus";
import { useAdminStats } from "./hooks/useAdminStats";
import { StatsOverview } from "./components/StatsOverview";
import { AdminTabsView } from "./components/AdminTabsView";
import { LoadingState } from "./components/LoadingState";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: isAdmin, isLoading } = useAdminStatus();
  const { data: stats } = useAdminStats(isAdmin);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isAdmin) {
    return null; // Will redirect in query function
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your platform and users
          </p>
        </div>
        
        {/* Stats Overview */}
        <StatsOverview stats={stats} />

        {/* Admin Management Tabs */}
        <AdminTabsView activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Layout>
  );
}
