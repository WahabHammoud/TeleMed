
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Ambulance, Users, Heart, Home, ShoppingBag, Calendar, Video, MessageSquare, FileText } from "lucide-react";

export const NavigationLinks: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? "text-medical-600" : "text-gray-600";
  };

  return (
    <nav className="hidden lg:flex items-center space-x-6 overflow-x-auto py-2">
      <Link to="/home" className={`${isActive('/home')} hover:text-medical-600 transition-colors whitespace-nowrap`}>
        <Home className="h-4 w-4 inline-block mr-1" />
        Accueil
      </Link>
      <Link to="/appointments" className={`${isActive('/appointments')} hover:text-medical-600 transition-colors whitespace-nowrap`}>
        <Calendar className="h-4 w-4 inline-block mr-1" />
        Rendez-vous
      </Link>
      <Link to="/consultations" className={`${isActive('/consultations')} hover:text-medical-600 transition-colors whitespace-nowrap`}>
        <Video className="h-4 w-4 inline-block mr-1" />
        Consultations
      </Link>
      <Link to="/emergency" className={`${isActive('/emergency')} hover:text-medical-600 transition-colors whitespace-nowrap`}>
        <Ambulance className="h-4 w-4 inline-block mr-1" />
        Urgences
      </Link>
      <Link to="/events" className={`${isActive('/events')} hover:text-medical-600 transition-colors whitespace-nowrap`}>
        <Users className="h-4 w-4 inline-block mr-1" />
        Événements
      </Link>
      <Link to="/home-visits" className={`${isActive('/home-visits')} hover:text-medical-600 transition-colors whitespace-nowrap`}>
        <Heart className="h-4 w-4 inline-block mr-1" />
        Visites à domicile
      </Link>
      <Link to="/messages" className={`${isActive('/messages')} hover:text-medical-600 transition-colors whitespace-nowrap`}>
        <MessageSquare className="h-4 w-4 inline-block mr-1" />
        Messages
      </Link>
      <Link to="/shop" className={`${isActive('/shop')} hover:text-medical-600 transition-colors whitespace-nowrap`}>
        <ShoppingBag className="h-4 w-4 inline-block mr-1" />
        Boutique
      </Link>
      <Link to="/documents" className={`${isActive('/documents')} hover:text-medical-600 transition-colors whitespace-nowrap`}>
        <FileText className="h-4 w-4 inline-block mr-1" />
        Documents
      </Link>
      <Link to="/community" className={`${isActive('/community')} hover:text-medical-600 transition-colors whitespace-nowrap`}>
        <Users className="h-4 w-4 inline-block mr-1" />
        Communauté
      </Link>
    </nav>
  );
};
