
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Send, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  is_doctor: boolean | null;
}

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const { toast } = useToast();

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return profile;
    },
  });

  const { data: contacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, is_doctor')
        .neq('id', currentUser?.id);
      
      if (error) throw error;
      return data as Profile[];
    },
    enabled: !!currentUser,
  });

  const { data: messages, refetch: refetchMessages } = useQuery({
    queryKey: ['messages', selectedUser?.id],
    queryFn: async () => {
      if (!selectedUser) return [];
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${currentUser?.id},receiver_id.eq.${currentUser?.id}`)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Message[];
    },
    enabled: !!selectedUser && !!currentUser,
  });

  const sendMessage = async () => {
    if (!messageContent.trim() || !selectedUser || !currentUser) return;

    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: currentUser.id,
        receiver_id: selectedUser.id,
        content: messageContent.trim()
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      });
      return;
    }

    setMessageContent("");
    refetchMessages();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground mt-2">
            Communicate with doctors and patients
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {contacts?.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedUser(contact)}
                    className={`w-full p-4 text-left hover:bg-accent flex items-center gap-3 ${
                      selectedUser?.id === contact.id ? "bg-accent" : ""
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <div>
                      <p className="font-medium">
                        {contact.first_name} {contact.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {contact.is_doctor ? "Doctor" : "Patient"}
                      </p>
                    </div>
                  </button>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {selectedUser 
                  ? `Chat with ${selectedUser.first_name} ${selectedUser.last_name}`
                  : "Select a contact"
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {messages?.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender_id === currentUser?.id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.sender_id === currentUser?.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="flex gap-2 mt-4">
                <Input
                  placeholder="Type your message..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                />
                <Button onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
