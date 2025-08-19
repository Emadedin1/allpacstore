// src/app/api/checkout/session/route.js
import Stripe from "stripe";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return new Response(
      JSON.stringify({ error: "Stripe not configured (missing STRIPE_SECRET_KEY)" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2022-11-15" });
  const { cartItems = [], shipping } = await req.json();

  const rawOrigin =
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";
  const origin = rawOrigin.replace(/\/+$/, "");

  const items = Array.isArray(cartItems)
    ? cartItems.filter((i) => Number(i?.quantity) > 0)
    : [];

  const line_items = items.map((item) => {
    const pricePerCup =
      item.pricePerCup ?? (item.priceCase && item.qtyCase ? item.priceCase / item.qtyCase : 0);

    return {
      price_data: {
        currency: "cad",
        unit_amount: Math.round(pricePerCup * 100),
        product_data: {
          name: `${item.size} oz Cup`,
          metadata: {
            slug: item.slug ?? "",
            designType: item.designType ?? "",
            designName: item.designName ?? "",
          },
        },
      },
      quantity: Number(item.quantity),
    };
  });

  let metadata = {};
  try {
    metadata.cart = JSON.stringify({
      items: items.map((i) => ({
        productId: i.productId || i.slug || "",
        name: i.name || `${i.size} oz Cup`,
        size: i.size || "",
        designType: i.designType || (i.isCustom ? "custom" : "plain"),
        designName: i.designName || i.designFileName || "",
        designFileUrl: i.designFileUrl || "",
        quantity: Number(i.quantity || 1),
        unitPrice: Number(
          i.pricePerCup ?? (i.priceCase && i.qtyCase ? i.priceCase / i.qtyCase : 0)
        ),
        currency: "CAD",
      })),
      shipping: shipping ? { method: shipping.method || "", note: shipping.note || "" } : undefined,
    });
  } catch {}

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    shipping_address_collection: { allowed_countries: ["CA"] },
    phone_number_collection: { enabled: true },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
    metadata,
  });

  return new Response(JSON.stringify({ sessionId: session.id }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
