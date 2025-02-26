
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HelpCircle, Book, MessageCircle, Phone, Mail, FileText } from "lucide-react";

export default function HelpPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground mt-2">
            Find answers to your questions or contact our support team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Learn how to get started with our platform and make the most of our services.
              </p>
              <Button variant="outline" className="w-full">View Guide</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Live Chat Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Chat with our support team in real-time for immediate assistance.
              </p>
              <Button variant="outline" className="w-full">Start Chat</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Phone Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Available Mon-Fri, 9am-5pm</p>
              <Button variant="outline" className="w-full">
                1-800-HEALTH
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">24/7 email support</p>
              <Button variant="outline" className="w-full">
                support@health.com
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Detailed platform guides</p>
              <Button variant="outline" className="w-full">View Docs</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment by navigating to the Appointments page and selecting your preferred date and time slot. Follow the prompts to complete your booking."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and digital payment methods including PayPal and Apple Pay."
  },
  {
    question: "How can I update my profile information?",
    answer: "To update your profile information, go to the Settings page and select the Profile tab. You can modify your personal details and save the changes."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Appointments can be cancelled up to 24 hours before the scheduled time without any charge. Late cancellations may incur a fee."
  },
  {
    question: "How do I access my medical documents?",
    answer: "You can access your medical documents through the Documents page. All files are securely stored and can be downloaded when needed."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take security seriously. All personal information is encrypted and stored securely following industry best practices."
  }
];
