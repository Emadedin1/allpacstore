import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Order from "../../../models/Order"; // keep your current relative path
import dbConnect from "../../../lib/dbConnect"; // keep your current relative path

/**
 * GET /api/orders
 * - Customer history:   /api/orders?mine=1&page=1&limit=20
 *   Reads JWT from cookie ("jwt" or "user_jwt"), finds orders by customer.email
 * - (Reserved) Admin list lives under /api/admin/orders — unchanged
 */
export async function GET(req) {
  const url = new URL(req.url);
  const mine = (url.searchParams.get("mine") || "").toLowerCase();
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)));

  await dbConnect();

  if (mine === "1" || mine === "true") {
    // ---- Customer's own orders ----
    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value || cookieStore.get("user_jwt")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = payload?.email?.toLowerCase?.();
    if (!email) return NextResponse.json({ orders: [], total: 0, page: 1, pages: 1 });

    const col = (await import("mongoose")).default.connection.db.collection("orders");
    const query = { "customer.email": email };

    const total = await col.countDocuments(query);
    const orders = await col
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      orders,
      total,
      page,
      pages: Math.max(1, Math.ceil(total / limit)),
    });
  }

  // Fallback for any other (non-customer) use. Keep locked-down by default.
  return NextResponse.json({ error: "Not implemented" }, { status: 400 });
}