import Stripe from "stripe";

export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-07-30.basil",
    httpClient: Stripe.createFetchHttpClient()
  });

  const line_items = body.items.map(item => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: item.price,
      product_data: {
        name: item.name
      }
    }
  }));

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    mode: "payment",
    line_items,
    return_url: `${env.PUBLIC_SITE_URL}/?success=1&session_id={CHECKOUT_SESSION_ID}`
  });

  return Response.json({
    clientSecret: session.client_secret
  });
}
