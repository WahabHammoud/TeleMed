
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState<UserRole>("patient");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Helper function to handle radio group value change with proper typing
  const handleUserTypeChange = (value: string) => {
    // Cast the string value to UserRole type
    setUserType(value as UserRole);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password || !firstName || !lastName) {
        throw new Error("Please fill in all fields");
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            user_type: userType
          },
        },
      });

      if (error) throw error;

      // Create the profile with appropriate settings
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: (await supabase.auth.getUser()).data.user?.id,
          first_name: firstName,
          last_name: lastName,
          is_doctor: userType === 'doctor',
          role: userType // This will now use the enum type 'doctor' or 'patient'
        });

      if (profileError) throw profileError;

      toast({
        title: "Success!",
        description: "Check your email for the confirmation link.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred during sign up",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <div className="space-y-2">
        <Label>I am a:</Label>
        <RadioGroup value={userType} onValueChange={handleUserTypeChange} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="patient" id="patient" />
            <Label htmlFor="patient">Patient</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="doctor" id="doctor" />
            <Label htmlFor="doctor">Doctor</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
};
