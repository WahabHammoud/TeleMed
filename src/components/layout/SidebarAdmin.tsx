
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

interface SidebarAdminProps {
  isAdmin: boolean;
}

export const SidebarAdmin: React.FC<SidebarAdminProps> = ({ isAdmin }) => {
  const location = useLocation();
  
  if (!isAdmin) return null;
  
  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold">Administration</h2>
      <div className="space-y-1">
        <Link
          to="/admin"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            location.pathname.startsWith("/admin") ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
};
