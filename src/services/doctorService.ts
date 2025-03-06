
import { supabase } from "@/integrations/supabase/client";
import { testDoctors } from "@/data/testDoctors";

export type DoctorCreationResult = {
  email: string;
  success: boolean;
  message: string;
};

export const createTestDoctors = async (): Promise<DoctorCreationResult[]> => {
  const creationResults: DoctorCreationResult[] = [];
  
  for (const doctor of testDoctors) {
    try {
      // Sign up doctor with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: doctor.email,
        password: doctor.password,
        options: {
          data: {
            first_name: doctor.firstName,
            last_name: doctor.lastName,
            user_role: doctor.role
          }
        }
      });

      if (authError) throw new Error(authError.message);
      
      if (!authData.user) {
        creationResults.push({
          email: doctor.email,
          success: false,
          message: "User creation failed: No user returned"
        });
        continue;
      }

      // Update the profile with doctor details
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          specialty: doctor.specialty,
          years_of_experience: doctor.years,
          consultation_fee: doctor.fee,
          medical_license_number: doctor.license,
          bio: doctor.bio,
          languages: ['Français', 'Anglais'],
          is_doctor: true
        })
        .eq('id', authData.user.id);

      if (profileError) throw new Error(profileError.message);

      creationResults.push({
        email: doctor.email,
        success: true,
        message: "Doctor created successfully"
      });
      
    } catch (error: any) {
      console.error(`Error creating doctor ${doctor.email}:`, error);
      creationResults.push({
        email: doctor.email,
        success: false,
        message: error.message || "Unknown error"
      });
    }
  }
  
  return creationResults;
};
