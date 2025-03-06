
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

export const testDoctors = [
  {
    email: 'sophie.martin@example.com',
    password: 'Test123456!',
    firstName: 'Sophie',
    lastName: 'Martin',
    role: 'doctor' as UserRole,
    specialty: 'Cardiologie',
    years: 12,
    fee: 85,
    license: 'FR-CARD-78945',
    bio: 'Spécialiste en cardiologie avec 12 ans d\'expérience dans les hôpitaux universitaires.'
  },
  {
    email: 'thomas.bernard@example.com',
    password: 'Test123456!',
    firstName: 'Thomas',
    lastName: 'Bernard',
    role: 'doctor' as UserRole,
    specialty: 'Pédiatrie',
    years: 8,
    fee: 75,
    license: 'FR-PED-35712',
    bio: 'Pédiatre certifié spécialisé dans le développement de l\'enfant et les troubles du comportement.'
  },
  {
    email: 'amina.diallo@example.com',
    password: 'Test123456!',
    firstName: 'Amina',
    lastName: 'Diallo',
    role: 'doctor' as UserRole,
    specialty: 'Dermatologie',
    years: 15,
    fee: 95,
    license: 'FR-DERM-20145',
    bio: 'Dermatologue expérimentée, spécialisée dans les maladies inflammatoires de la peau et les dermatoses.'
  },
  {
    email: 'jean.dupont@example.com',
    password: 'Test123456!',
    firstName: 'Jean',
    lastName: 'Dupont',
    role: 'doctor' as UserRole,
    specialty: 'Médecine générale',
    years: 20,
    fee: 60,
    license: 'FR-MG-12456',
    bio: 'Médecin généraliste avec une vaste expérience dans les soins préventifs et la gestion des maladies chroniques.'
  },
  {
    email: 'chloe.lefebvre@example.com',
    password: 'Test123456!',
    firstName: 'Chloe',
    lastName: 'Lefebvre',
    role: 'doctor' as UserRole,
    specialty: 'Neurologie',
    years: 10,
    fee: 90,
    license: 'FR-NEURO-45678',
    bio: 'Neurologue spécialisée dans la prise en charge des céphalées et des maladies neurodégénératives.'
  }
];
