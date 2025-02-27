
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check, Trash2 } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
  user_id: string;
  type: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();

    // Listen for new notifications
    const channel = supabase
      .channel('notifications_changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${supabase.auth.getUser().then(({ data }) => data.user?.id)}`
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load notifications",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;

      setNotifications(
        notifications.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        )
      );

      toast({
        title: "Success",
        description: "Notification marked as read",
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update notification",
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);

      if (error) throw error;

      setNotifications(
        notifications.map(notification => ({ ...notification, read: true }))
      );

      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update notifications",
      });
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotifications(
        notifications.filter(notification => notification.id !== id)
      );

      toast({
        title: "Success",
        description: "Notification deleted",
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete notification",
      });
    }
  };

  const clearAllNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setNotifications([]);

      toast({
        title: "Success",
        description: "All notifications cleared",
      });
    } catch (error) {
      console.error('Error clearing notifications:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to clear notifications",
      });
    }
  };

  const getFilteredNotifications = () => {
    if (activeTab === "unread") {
      return notifications.filter(notification => !notification.read);
    }
    return notifications;
  };

  // Generate demo notifications if none exist
  const demoNotifications = [
    {
      id: '1',
      title: 'Appointment Reminder',
      message: 'You have an appointment with Dr. Smith tomorrow at 10:00 AM.',
      created_at: new Date().toISOString(),
      read: false,
      user_id: '1',
      type: 'appointment'
    },
    {
      id: '2',
      title: 'New Message',
      message: 'You have a new message from Dr. Johnson regarding your recent visit.',
      created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      read: true,
      user_id: '1',
      type: 'message'
    },
    {
      id: '3',
      title: 'Prescription Ready',
      message: 'Your prescription for Amoxicillin is ready for pickup at the pharmacy.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: false,
      user_id: '1',
      type: 'prescription'
    },
    {
      id: '4',
      title: 'Test Results Available',
      message: 'Your blood test results are now available. Please check your documents section.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      read: true,
      user_id: '1',
      type: 'test'
    },
    {
      id: '5',
      title: 'New Product Available',
      message: 'A new product you might be interested in is now available in our shop.',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      read: false,
      user_id: '1',
      type: 'product'
    }
  ];

  const displayNotifications = notifications.length > 0 ? getFilteredNotifications() : demoNotifications;
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground mt-2">
              View and manage your notifications
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            )}
            <Button variant="outline" onClick={clearAllNotifications}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear all
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge className="ml-2" variant="destructive">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : displayNotifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No notifications</h3>
                    <p className="text-muted-foreground">
                      You don't have any notifications at the moment.
                    </p>
                  </div>
                ) : (
                  <div>
                    {displayNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`border-b p-4 hover:bg-gray-50 ${notification.read ? '' : 'bg-blue-50'}`}
                      >
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{notification.title}</h3>
                            <p className="text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(notification.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unread" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : displayNotifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No unread notifications</h3>
                    <p className="text-muted-foreground">
                      You've read all your notifications.
                    </p>
                  </div>
                ) : (
                  <div>
                    {displayNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="border-b p-4 hover:bg-gray-50 bg-blue-50"
                      >
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{notification.title}</h3>
                            <p className="text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(notification.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
