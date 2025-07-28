import { NextResponse } from "next/server";
import Stripe from "stripe";

// Use environment variable for your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { cartItems } = await req.json();

  // Map cart items to Stripe line items
  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: "cad",
      product_data: {
        name: `${item.size} oz Cup`,
        images: item.image ? [item.image] : [],
      },
      unit_amount: Math.round(item.priceCase / item.qtyCase * 100), // cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: "https://allpacstore.com/success", // Update if needed
    cancel_url: "https://allpacstore.com/cart",
    shipping_address_collection: { allowed_countries: ['CA'] },
  });

  return NextResponse.json({ url: session.url });
}
