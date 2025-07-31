import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(request) {
  const { name, email, password } = await request.json();
  await dbConnect();

  // duplicate-email check
  if (await User.findOne({ email })) {
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });

  return NextResponse.json({ message: "User registered" }, { status: 201 });
}
