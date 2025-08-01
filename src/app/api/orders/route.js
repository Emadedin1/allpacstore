import { NextResponse } from "next/server";
import Order from "@/models/order"; // Adjust if your Order model is elsewhere
import dbConnect from "@/lib/dbConnect"; // Adjust if your db connection util is elsewhere
import { getServerSession } from "next-auth"; // If using next-auth for session
import { authOptions } from "@/lib/authOptions"; // Adjust path to your NextAuth options

// Helper to get user ID. Update this if you use a different auth system.
async function getUserId(request) {
  // NextAuth example (update if using a different auth system):
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) return null;
  return session.user.id;
}

// GET /api/orders - get all orders for the logged-in user
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
