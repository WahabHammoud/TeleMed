
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { AccessToken } from 'npm:twilio@4.19.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
const twilioApiKey = Deno.env.get('TWILIO_API_KEY');
const twilioApiSecret = Deno.env.get('TWILIO_API_SECRET');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, roomName } = await req.json();

    // Create an access token
    const token = new AccessToken(
      twilioAccountSid!,
      twilioApiKey!,
      twilioApiSecret!,
      { identity: userId }
    );

    // Create a video grant
    const videoGrant = new AccessToken.VideoGrant({
      room: roomName,
    });

    // Add the grant to the token
    token.addGrant(videoGrant);

    // Generate the token
    const accessToken = token.toJwt();

    return new Response(
      JSON.stringify({ token: accessToken }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
