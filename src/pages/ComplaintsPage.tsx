
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle } from "lucide-react";

export default function ComplaintsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Réclamation envoyée",
        description: "Nous avons bien reçu votre réclamation et la traiterons dans les plus brefs délais.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Réclamations</h1>
            <p className="text-muted-foreground mt-2">
              Nous sommes à votre écoute pour améliorer nos services
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Soumettre une réclamation</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Téléphone
                      </label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Sujet <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Votre réclamation <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Envoi en cours..." : "Envoyer ma réclamation"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informations importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <p className="text-sm">
                    Toutes les réclamations sont traitées dans un délai de 48h ouvrées.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <p className="text-sm">
                    Pour les urgences médicales, veuillez contacter directement le 15 ou le 112.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <p className="text-sm">
                    Vous pouvez également nous joindre par téléphone au 01 23 45 67 91 ou par email à reclamations@mediconnect.fr
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Processus de traitement</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 pl-4">
                  <li className="pl-2">
                    <span className="font-medium">1. Réception de votre réclamation</span>
                    <p className="text-sm text-muted-foreground">Vous recevrez un accusé de réception par email.</p>
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">2. Analyse de votre demande</span>
                    <p className="text-sm text-muted-foreground">Notre équipe analysera votre réclamation.</p>
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">3. Traitement et réponse</span>
                    <p className="text-sm text-muted-foreground">Une réponse vous sera apportée sous 48h ouvrées.</p>
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">4. Suivi et amélioration</span>
                    <p className="text-sm text-muted-foreground">Votre réclamation nous aide à améliorer nos services.</p>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
