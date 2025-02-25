
import { Link } from "react-router-dom";
import {
  Calendar,
  MessageSquare,
  Video,
  Users,
  FileText,
  ShoppingBag,
  Settings,
  HelpCircle,
} from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r hidden lg:block pt-20">
      <nav className="p-4">
        <div className="space-y-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
            <div className="space-y-1">
              <Link
                to="/appointments"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-medical-600"
              >
                <Calendar className="h-4 w-4" />
                Appointments
              </Link>
              <Link
                to="/consultations"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-medical-600"
              >
                <Video className="h-4 w-4" />
                Consultations
              </Link>
              <Link
                to="/messages"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-medical-600"
              >
                <MessageSquare className="h-4 w-4" />
                Messages
              </Link>
              <Link
                to="/community"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-medical-600"
              >
                <Users className="h-4 w-4" />
                Community
              </Link>
              <Link
                to="/documents"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-medical-600"
              >
                <FileText className="h-4 w-4" />
                Documents
              </Link>
              <Link
                to="/shop"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-medical-600"
              >
                <ShoppingBag className="h-4 w-4" />
                Shop
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-auto fixed bottom-8 space-y-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <Link
                to="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-medical-600"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Link
                to="/help"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-medical-600"
              >
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
