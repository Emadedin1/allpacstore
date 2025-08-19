import jwt from "jsonwebtoken";

const SECRET = process.env.ADMIN_JWT_SECRET;
if (!SECRET) throw new Error("ADMIN_JWT_SECRET not set");

export function signAdmin(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyAdmin(token) {
  try { return jwt.verify(token, SECRET); } catch { return null; }
}