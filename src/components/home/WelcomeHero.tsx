
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function WelcomeHero() {
  return (
    <div className="grid gap-6 md:grid-cols-2 min-h-[60vh] mt-10">
      <div className="flex flex-col justify-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Des soins de santé accessibles</h2>
        <p className="text-muted-foreground text-lg">
          Connectez-vous avec des médecins, gérez vos rendez-vous, accédez à vos dossiers médicaux, 
          et rejoignez une communauté de patients et de professionnels de santé.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button size="lg" asChild>
            <Link to="/auth">S'inscrire maintenant</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/auth?tab=signin">Se connecter</Link>
          </Button>
        </div>
        <div className="pt-4">
          <Button variant="link" asChild>
            <Link to="/home">En savoir plus sur MediConnect</Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img 
          src="/mediconnect-logo.png" 
          alt="MediConnect" 
          className="rounded-lg object-cover max-h-[300px]"
        />
      </div>
    </div>
  );
}
