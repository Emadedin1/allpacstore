// src/app/api/checkout/session/route.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  const { cartItems, shipping } = await req.json();

  // Determine the correct origin for redirect URLs
  const rawOrigin =
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";
  const origin = rawOrigin.replace(/\/+$/, ""); // trim trailing slash

  // Build Stripe line items (use dynamic pricePerCup when present)
  const line_items = cartItems.map((item) => {
    const pricePerCup =
      item.pricePerCup ?? (item.priceCase / item.qtyCase); // fallback for old items
    return {
      price_data: {
        currency: "cad",
        unit_amount: Math.round(pricePerCup * 100), // cents per cup
        product_data: {
          name: `${item.size} oz Cup`,
          // optional metadata you may want on the Stripe side
          metadata: {
            slug: item.slug ?? "",
            designType: item.designType ?? "",
            designName: item.designName ?? "",
          },
        },
      },
      quantity: Number(item.quantity) || 0,
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    shipping_address_collection: {
      allowed_countries: ["CA"],
    },
    // These are where Stripe redirects AFTER payment/cancel,
    // the Back button still goes to the referrer (your site).
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
  });

  return new Response(JSON.stringify({ sessionId: session.id }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
