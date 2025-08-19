import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function requireAdmin() {
  const token = cookies().get("admin_jwt")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.ADMIN_JWT_SECRET);
  } catch (e) {
    return null;
  }
}