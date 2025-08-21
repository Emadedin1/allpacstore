// File: src/app/api/orders/confirm/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import mongoose from "mongoose";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Ensure DB connection (simple inline connector)
async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    await dbConnect();

    // Fetch session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer_details"],
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Try to find an existing order
    let order = await Order.findOne({ "stripe.sessionId": session.id });

    if (!order) {
      // Build new order if none exists yet
      order = new Order({
        customer: {
          email: session.customer_details?.email || "",
          name: session.customer_details?.name || "",
        },
        items: (session.line_items?.data || []).map((item) => ({
          name: item.description,
          quantity: item.quantity,
          unitPrice: item.price?.unit_amount / 100,
          currency: item.price?.currency,
        })),
        totals: {
          currency: session.currency,
          grandTotal: session.amount_total / 100,
          subTotal: session.amount_subtotal / 100,
        },
        status: "paid",
        stripe: {
          sessionId: session.id,
          paymentIntentId: session.payment_intent,
        },
      });
    } else {
      // Update existing order to paid
      order.status = "paid";
      order.stripe = {
        sessionId: session.id,
        paymentIntentId: session.payment_intent,
      };
    }

    await order.save();

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error("Confirm route error:", err);
    return NextResponse.json(
      { error: "Failed to confirm order" },
      { status: 500 }
    );
  }
}
