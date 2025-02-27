
import { supabase } from "@/integrations/supabase/client";

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
      });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { success: false, error };
  }
};
