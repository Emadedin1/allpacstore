import { NextResponse } from "next/server";
import { signAdmin } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = signAdmin({ email });
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }
  return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
}