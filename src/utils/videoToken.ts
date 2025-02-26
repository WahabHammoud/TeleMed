
import { supabase } from "@/integrations/supabase/client";

export async function createVideoToken(consultationId: string) {
  const { data, error } = await supabase.functions.invoke('video-token', {
    body: { consultationId },
  });

  if (error) throw error;
  return data.token;
}
