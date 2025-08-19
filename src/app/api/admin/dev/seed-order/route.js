import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";

export async function POST() {
  await dbConnect();
  const o = await Order.create({
    status: "paid",
    paymentStatus: "paid",
    items: [
      { productId: "10oz-hot", name: "Hot Cup", size: "10 oz", designType: "custom", designName: "cafe-logo.png", quantity: 2, unitPrice: 0.089, subtotal: 0.178 },
      { productId: "22oz-cold", name: "Cold Cup", size: "22 oz", designType: "plain", designName: "", quantity: 1, unitPrice: 0.129, subtotal: 0.129 },
    ],
    customer: { name: "Test Buyer", email: "buyer@test.com" },
    shippingAddress: { line1: "123 Riverside Dr", city: "Windsor", province: "ON", postalCode: "N9A 0A1", country: "CA" },
    totals: { itemsTotal: 0.307, tax: 0.04, shipping: 0, grandTotal: 0.347, currency: "CAD" },
    timeline: [{ type: "created" }, { type: "paid" }],
  });
  return NextResponse.json({ ok: true, id: o._id });
}