import { NextResponse } from "next/server";
import Order from "../../../models/Order"; // Fix the path as per your structure
import dbConnect from "../../../lib/dbConnect"; // Fix the path if needed

// Stub: Replace this with your real user ID check!
async function getUserId(request) {
  // TODO: Extract userId from your auth/session/cookie/JWT
  // For now, return a dummy value or throw unauthorized
  return null; // e.g. "64c3ef0b7b9d2b7bb9e5420a"
}

export async function GET(request) {
  await dbConnect();

  const userId = await getUserId(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
