
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";

interface UserWelcomeProps {
  firstName: string | undefined;
  isAdmin: boolean;
}

export function UserWelcome({ firstName, isAdmin }: UserWelcomeProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 md:p-8 mb-8">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold mb-2">
          Bonjour, {firstName || 'utilisateur'}!
        </h2>
        <p className="text-muted-foreground">
          Bienvenue sur votre espace santé. Ici, vous pouvez gérer vos rendez-vous, 
          consulter des médecins, accéder à vos documents médicaux, et plus encore.
        </p>
        {isAdmin && (
          <div className="mt-4">
            <Button asChild>
              <Link to="/admin">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Accéder au Dashboard Admin
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
