
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Settings, HelpCircle, LogOut, AlertTriangle } from "lucide-react";

interface SidebarSupportProps {
  onSignOut: () => Promise<void>;
}

export const SidebarSupport: React.FC<SidebarSupportProps> = ({ onSignOut }) => {
  const location = useLocation();
  
  const supportLinks = [
    { path: "/settings", icon: Settings, label: "Paramètres" },
    { path: "/help", icon: HelpCircle, label: "Aide & Support" },
    { path: "/complaints", icon: AlertTriangle, label: "Réclamations" }
  ];
  
  return (
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold">Support</h2>
      <div className="space-y-1">
        {supportLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                location.pathname === link.path ? "bg-slate-100 text-primary font-medium" : "text-gray-500"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-primary"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};
