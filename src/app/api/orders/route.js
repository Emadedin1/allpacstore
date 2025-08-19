// File: src/app/api/orders/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// --- Mongo connection helper (no external deps) ---
let cached = global.__allpac_mongoose;
if (!cached) {
  cached = global.__allpac_mongoose = { conn: null, promise: null };
}
async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI not set");
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 20000,
    }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// GET /api/orders?mine=1&page=&limit=
// Returns the signed-in customer's orders.
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const mine = (url.searchParams.get("mine") || "").toLowerCase();
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)));

    if (!(mine === "1" || mine === "true")) {
      return NextResponse.json({ error: "Not implemented" }, { status: 400 });
    }

    // --- Auth: accept cookie (jwt/user_jwt) or Authorization: Bearer ---
    const cookieStore = cookies();
    const cookieToken = cookieStore.get("jwt")?.value || cookieStore.get("user_jwt")?.value;
    const authHeader = req.headers.get("authorization") || "";
    const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const token = cookieToken || bearer;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!process.env.JWT_SECRET) return NextResponse.json({ error: "Server misconfigured (JWT_SECRET)" }, { status: 500 });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = payload?.email?.toLowerCase?.();
    if (!email) return NextResponse.json({ orders: [], total: 0, page: 1, pages: 1 });

    await dbConnect();
    const col = mongoose.connection.db.collection("orders");
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
  } catch (err) {
    console.error("/api/orders GET error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
