
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { createTestDoctors, DoctorCreationResult } from "@/services/doctorService";
import { DoctorCreationResults } from "@/components/admin/DoctorCreationResults";
import { testDoctors } from "@/data/testDoctors";

export const AdminCreator = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DoctorCreationResult[]>([]);
  const { toast } = useToast();

  const handleCreateTestDoctors = async () => {
    setLoading(true);
    setResults([]);
    
    try {
      const creationResults = await createTestDoctors();
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
    } catch (error) {
      console.error("Error in doctor creation process:", error);
      toast({
        variant: "destructive",
        title: "Error occurred",
        description: "An unexpected error occurred during the creation process.",
      });
    } finally {
      setLoading(false);
    }
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
            onClick={handleCreateTestDoctors} 
            disabled={loading}
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Creating Test Doctors..." : "Create Test Doctors"}
          </Button>
          
          <DoctorCreationResults results={results} />
        </div>
      </CardContent>
    </Card>
  );
};
