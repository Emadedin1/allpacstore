import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import { requireAdmin } from "../../../_utils";

export async function POST(_req, { params }) {
  if (!requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const order = await Order.findById(params.id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  order.status = "fulfilled";
  order.timeline.push({ type: "fulfilled", note: "Marked fulfilled by admin" });
  await order.save();
  return NextResponse.json({ ok: true });
}