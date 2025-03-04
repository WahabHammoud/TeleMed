
import React from "react";
import { Link } from "react-router-dom";
import { Ambulance, Users, Heart, Home } from "lucide-react";

export const NavigationLinks: React.FC = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      <Link to="/home" className="text-gray-600 hover:text-medical-600 transition-colors">
        <Home className="h-4 w-4 inline-block mr-1" />
        Accueil
      </Link>
      <Link to="/appointments" className="text-gray-600 hover:text-medical-600 transition-colors">
        Rendez-vous
      </Link>
      <Link to="/consultations" className="text-gray-600 hover:text-medical-600 transition-colors">
        Consultations
      </Link>
      <Link to="/emergency" className="text-gray-600 hover:text-medical-600 transition-colors">
        <Ambulance className="h-4 w-4 inline-block mr-1" />
        Urgences
      </Link>
      <Link to="/events" className="text-gray-600 hover:text-medical-600 transition-colors">
        <Users className="h-4 w-4 inline-block mr-1" />
        Événements
      </Link>
      <Link to="/home-visits" className="text-gray-600 hover:text-medical-600 transition-colors">
        <Heart className="h-4 w-4 inline-block mr-1" />
        Visites à domicile
      </Link>
      <Link to="/community" className="text-gray-600 hover:text-medical-600 transition-colors">
        Communauté
      </Link>
    </nav>
  );
};
