// frontend/src/app/api/checkout/session/route.js

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  const { cartItems, shipping } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cartItems.map((i) => ({
      price_data: {
        currency: "cad",
        unit_amount: Math.round((i.priceCase / i.qtyCase) * 100), // cents
        product_data: { name: `${i.size} oz Cup` },
      },
      quantity: i.quantity,
    })),
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["CA"] },
    // replace with your actual shipping rate ID from Stripe dashboard
    shipping_options: [{ shipping_rate: "shr_standardFlatRate" }],
    allow_promotion_codes: true,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancelled`,
  });

  return new Response(JSON.stringify({ sessionId: session.id }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
