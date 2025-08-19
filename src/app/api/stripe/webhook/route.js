import { NextResponse } from "next/server";
import Stripe from "stripe";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Guard: quietly no-op if keys are not present (local dev without Stripe access)
const hasStripe = !!(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET);
const stripe = hasStripe ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export async function POST(req) {
  if (!hasStripe) {
    return NextResponse.json({ received: true, skipped: "Stripe not configured" });
  }

  const sig = req.headers.get("stripe-signature");
  const buf = await req.text(); // raw body for Stripe signature verification

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const sessionFull = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items", "customer_details", "shipping_details"],
    });

    // Prefer your app cart from metadata for richer item details
    const cart = (() => {
      try { return JSON.parse(sessionFull.metadata?.cart || "null"); } catch { return null; }
    })();

    const items = cart?.items?.length ? cart.items.map(i => ({
      productId: i.productId || i.slug || "",
      name: i.name || "Paper Cup",
      size: i.size || "",
      designType: i.designType || "plain",
      designName: i.designName || "",
      designFileUrl: i.designFileUrl || "",
      quantity: Number(i.quantity || 1),
      unitPrice: Number(i.unitPrice ?? i.pricePerCup ?? 0),
      currency: (i.currency || sessionFull.currency || "cad").toUpperCase(),
      subtotal: Number(i.quantity || 1) * Number(i.unitPrice ?? i.pricePerCup ?? 0),
    })) : (sessionFull.line_items?.data || []).map(li => ({
      productId: li.price?.product || "",
      name: li.description || li.price?.nickname || "Paper Cup",
      size: "",
      designType: "plain",
      designName: "",
      designFileUrl: "",
      quantity: li.quantity || 1,
      unitPrice: (li.amount_total || 0) / 100 / (li.quantity || 1),
      currency: (sessionFull.currency || "cad").toUpperCase(),
      subtotal: (li.amount_total || 0) / 100,
    }));

    const totals = {
      itemsTotal: items.reduce((s, i) => s + (i.subtotal || 0), 0),
      tax: (sessionFull.total_details?.amount_tax || 0) / 100,
      shipping: (sessionFull.total_details?.amount_shipping || 0) / 100,
      grandTotal: (sessionFull.amount_total || 0) / 100,
      currency: (sessionFull.currency || "cad").toUpperCase(),
    };

    await dbConnect();
    await Order.create({
      status: "paid",
      paymentStatus: "paid",
      stripeSessionId: sessionFull.id,
      items,
      customer: {
        name: sessionFull.customer_details?.name || "",
        email: sessionFull.customer_details?.email || "",
        phone: sessionFull.customer_details?.phone || "",
      },
      shippingAddress: {
        line1: sessionFull.shipping_details?.address?.line1 || "",
        line2: sessionFull.shipping_details?.address?.line2 || "",
        city: sessionFull.shipping_details?.address?.city || "",
        province: sessionFull.shipping_details?.address?.state || "",
        postalCode: sessionFull.shipping_details?.address?.postal_code || "",
        country: sessionFull.shipping_details?.address?.country || "",
      },
      totals,
      timeline: [
        { type: "created", note: "Order created via Stripe webhook" },
        { type: "paid", note: "Payment confirmed" },
      ],
    });
  }

  return NextResponse.json({ received: true });
}