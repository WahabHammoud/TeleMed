
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, paymentMethodId, cartItems, amount, customerEmail } = await req.json();

    console.log('Processing payment for order:', orderId);
    console.log('Cart items:', cartItems);
    console.log('Total amount:', amount);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'eur',
      payment_method: paymentMethodId,
      confirm: true,
      receipt_email: customerEmail,
      return_url: `${req.headers.get('origin')}/order-confirmation`,
      metadata: {
        order_id: orderId,
      },
    });

    console.log('Payment intent created:', paymentIntent.id);

    // If we have an order in the database, update its status
    if (orderId) {
      try {
        const { error } = await supabaseClient
          .from('orders')
          .update({ 
            status: paymentIntent.status === 'succeeded' ? 'paid' : 'processing',
            payment_intent_id: paymentIntent.id,
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId);

        if (error) {
          console.error('Error updating order status:', error);
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue processing even if database update fails
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        clientSecret: paymentIntent.client_secret,
        status: paymentIntent.status
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error processing payment:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
