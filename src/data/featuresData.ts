
import { CalendarCheck, MessageSquare, Users, ShoppingBag, FileText, Video, Ambulance, Heart } from "lucide-react";

export const features = [
  {
    title: "Rendez-vous",
    description: "Planifiez et gérez vos rendez-vous médicaux",
    icon: CalendarCheck,
    path: "/appointments",
    color: "bg-blue-100 text-blue-700"
  },
  {
    title: "Consultations",
    description: "Participez à des consultations vidéo avec des professionnels de santé",
    icon: Video,
    path: "/consultations",
    color: "bg-purple-100 text-purple-700"
  },
  {
    title: "Service d'urgence",
    description: "Accès rapide aux services d'urgence et ambulance",
    icon: Ambulance,
    path: "/emergency",
    color: "bg-red-100 text-red-700"
  },
  {
    title: "Services pour événements",
    description: "Solutions médicales pour vos événements",
    icon: Users,
    path: "/events",
    color: "bg-green-100 text-green-700"
  },
  {
    title: "Médecins à domicile",
    description: "Recevez des soins médicaux chez vous",
    icon: Heart,
    path: "/home-visits",
    color: "bg-pink-100 text-pink-700"
  },
  {
    title: "Communauté",
    description: "Échangez avec d'autres patients et médecins",
    icon: Users,
    path: "/community",
    color: "bg-green-100 text-green-700"
  },
  {
    title: "Messages",
    description: "Envoyez des messages directs à vos professionnels de santé",
    icon: MessageSquare,
    path: "/messages",
    color: "bg-yellow-100 text-yellow-700"
  },
  {
    title: "Documents",
    description: "Accédez à vos dossiers médicaux et ordonnances",
    icon: FileText,
    path: "/documents",
    color: "bg-indigo-100 text-indigo-700"
  },
  {
    title: "Boutique",
    description: "Achetez des médicaments et produits de santé",
    icon: ShoppingBag,
    path: "/shop",
    color: "bg-blue-100 text-blue-700"
  }
];
