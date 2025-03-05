
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";
import { Loader2 } from "lucide-react";

type UserRole = Database["public"]["Enums"]["user_role"];

const testDoctors = [
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

export const AdminCreator = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Array<{ email: string, success: boolean, message: string }>>([]);
  const { toast } = useToast();

  const createTestDoctors = async () => {
    setLoading(true);
    setResults([]);
    
    const creationResults = [];
    
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
    
    setResults(creationResults);
    
    const successCount = creationResults.filter(r => r.success).length;
    if (successCount > 0) {
      toast({
        title: "Test doctors created",
        description: `Successfully created ${successCount} out of ${testDoctors.length} test doctors.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to create test doctors",
        description: "Check the results for details.",
      });
    }
    
    setLoading(false);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Create Test Doctors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This will create {testDoctors.length} test doctor accounts that can be used for testing 
            consultations, messages, and document sharing. All accounts will have the password: <code>Test123456!</code>
          </p>
          
          <Button 
            onClick={createTestDoctors} 
            disabled={loading}
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Creating Test Doctors..." : "Create Test Doctors"}
          </Button>
          
          {results.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium">Results:</h3>
              <div className="max-h-60 overflow-y-auto rounded border p-2">
                {results.map((result, index) => (
                  <div 
                    key={index} 
                    className={`mb-1 text-xs ${result.success ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {result.email}: {result.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
