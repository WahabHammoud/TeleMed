
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

export function FeatureCard({ title, description, icon: Icon, path, color }: FeatureCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={path}>Accéder à {title}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
