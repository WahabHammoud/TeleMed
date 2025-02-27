
import { supabase } from "@/integrations/supabase/client";
import { Notification } from "@/types/notifications";

interface NotificationPayload {
  userId: string;
  title: string;
  message: string;
  type?: string;
}

export const sendNotification = async ({ userId, title, message, type = "general" }: NotificationPayload) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        title,
        message,
        type,
        read: false
      } as any);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { success: false, error };
  }
};

export const getNotificationsCount = async (userId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false);
    
    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error getting notifications count:', error);
    return 0;
  }
};
