
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { consultationId } = await req.json()

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get consultation details
    const { data: consultation, error: consultationError } = await supabaseClient
      .from('consultations')
      .select('*')
      .eq('id', consultationId)
      .single()

    if (consultationError) throw consultationError

    // Create Daily.co meeting token
    const response = await fetch('https://api.daily.co/v1/meeting-tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Deno.env.get('DAILY_API_KEY')}`,
      },
      body: JSON.stringify({
        properties: {
          room_name: consultation.room_name,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2, // 2 hour expiration
        },
      }),
    })

    const data = await response.json()

    return new Response(
      JSON.stringify({ token: data.token }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
